<?php
// ava.php — Ambiente Virtual de Aprendizagem | Sophie Link (Estilo Brightspace)
session_start();

require_once '../../includes/auth.php';
protect_page(['aluno']);

require_once '../../includes/db.php';
/** @var \PDO $pdo */

$nivelUsuario = $_SESSION['usuario_nivel'] ?? 'aluno';
$isProf = ($nivelUsuario === 'professor' || $nivelUsuario === 'admin');

// ─── PROFESSOR ────────────────────────────────────────────────────────────────
if ($isProf) {
    $nomeAluno      = $_SESSION['usuario_nome'] ?? 'Professor';
    $aluno_id       = null;
    $notasDb        = [];
    $progressoTotal = 0;
    $boletim        = [];
    $ra             = '—';
    $materiaisAluno = [];
    $atividadesAluno= [];
    $frequenciaAluno= [];
    $disciplinasAluno = [];
    $avisosTurma = [];
    $proximosEventos = [];
    $percPresenca = 100;
    $notificacoesAluno = [];
    $unreadNotifCount = 0;

    $stmtTurmasProf = $pdo->prepare("
        SELECT pd.*, t.nome AS turma_nome, d.nome AS disciplina_nome
        FROM professor_disciplina pd
        JOIN turmas t ON t.id = pd.turma_id
        JOIN disciplinas d ON d.id = pd.disciplina_id
        WHERE pd.usuario_id = ?
    ");
    $stmtTurmasProf->execute([$_SESSION['usuario_id']]);
    $turmasProfAva = $stmtTurmasProf->fetchAll();

// ─── ALUNO ────────────────────────────────────────────────────────────────────
} else {
    $turmasProfAva = [];

    // Dados básicos do aluno
    $stmtAluno = $pdo->prepare("SELECT a.* FROM aprendizes a
                                JOIN usuarios u ON u.email = a.email OR u.nome = a.nome
                                WHERE u.id = ? LIMIT 1");
    $stmtAluno->execute([$_SESSION['usuario_id']]);
    $aluno = $stmtAluno->fetch();
    if (!$aluno) {
        $aluno = ['id' => 0, 'nome' => $_SESSION['usuario_nome'] ?? 'Aluno', 'turma_id' => null];
    }

    $aluno_id  = $aluno['id'];
    $nomeAluno = $aluno['nome'];
    $turma_id  = $aluno['turma_id'] ?? null;
    $ra        = str_pad($aluno['id'], 6, '0', STR_PAD_LEFT);

    // Notas para progresso e boletim
    $stmtNotas = $pdo->prepare("
        SELECT n.atividade, n.valor_nota, d.nome AS disciplina_nome
        FROM notas n
        LEFT JOIN disciplinas d ON d.id = n.disciplina_id
        WHERE n.aprendiz_id = ?
        ORDER BY n.data_registro DESC
    ");
    $stmtNotas->execute([$aluno_id]);
    $notasDb = $stmtNotas->fetchAll();
    $progressoTotal = count($notasDb) > 0 ? min(100, count($notasDb) * 33) : 10;

    // Boletim agrupado por disciplina
    $boletim = [];
    $stmtBoletim = $pdo->prepare("
        SELECT n.valor_nota, d.nome AS disciplina_nome, n.disciplina_id,
               (SELECT COUNT(f2.id) FROM frequencia f2 WHERE f2.aprendiz_id = n.aprendiz_id AND f2.disciplina_id = n.disciplina_id AND f2.status = 'falta') AS total_faltas
        FROM notas n
        LEFT JOIN disciplinas d ON d.id = n.disciplina_id
        WHERE n.aprendiz_id = ?
        ORDER BY n.disciplina_id, n.data_registro ASC
    ");
    $stmtBoletim->execute([$aluno_id]);
    foreach ($stmtBoletim->fetchAll() as $row) {
        $disc = $row['disciplina_nome'] ?? 'Disciplina';
        if (!isset($boletim[$disc])) {
            $boletim[$disc] = ['notas' => [], 'faltas' => (int)$row['total_faltas']];
        }
        $boletim[$disc]['notas'][] = $row['valor_nota'];
    }

    // ─── Disciplinas da turma do aluno ────────────────────────────────────────
    $disciplinasAluno = [];
    $avisosTurma = [];
    $proximosEventos = [];
    if ($turma_id) {
        $stmtDiscs = $pdo->prepare("
            SELECT DISTINCT d.id, d.nome, d.carga_horaria,
                   u.nome AS professor_nome
            FROM professor_disciplina pd
            JOIN disciplinas d ON d.id = pd.disciplina_id
            LEFT JOIN usuarios u ON u.id = pd.usuario_id
            WHERE pd.turma_id = ?
            ORDER BY d.nome ASC
        ");
        $stmtDiscs->execute([$turma_id]);
        $disciplinasAluno = $stmtDiscs->fetchAll();
    }

    // ─── Todos os materiais do AVA agrupados por disciplina e tipo ───────────
    $materiaisAluno   = [];
    $atividadesAluno  = [];
    $avisosTurma = [];
    $proximosEventos = [];
    $materiaisPorDisc = [];
    if ($turma_id) {
        $stmtAllMats = $pdo->prepare("
            SELECT m.*, d.nome AS disciplina_nome, u.nome AS professor_nome,
                   e.status AS entrega_status, e.criado_em AS entrega_em
            FROM ava_materiais m
            LEFT JOIN disciplinas d ON d.id = m.disciplina_id
            LEFT JOIN usuarios u ON u.id = m.professor_id
            LEFT JOIN ava_entregas e ON e.material_id = m.id AND e.aprendiz_id = ?
            WHERE m.turma_id = ?
            ORDER BY m.tipo, m.criado_em DESC
        ");
        $stmtAllMats->execute([$aluno_id, $turma_id]);
        foreach ($stmtAllMats->fetchAll() as $mat) {
            $disc_id_mat = $mat['disciplina_id'] ?? 0;
            if (!isset($materiaisPorDisc[$disc_id_mat])) {
                $materiaisPorDisc[$disc_id_mat] = [
                    'apresentacao' => [], 'pdf' => [],
                    'atividade'    => [], 'avaliacao' => [], 'aviso' => []
                ];
            }
            $tipo_mat = $mat['tipo'] ?? 'pdf';
            if (isset($materiaisPorDisc[$disc_id_mat][$tipo_mat])) {
                $materiaisPorDisc[$disc_id_mat][$tipo_mat][] = $mat;
            }
            // Compat: listas antigas
            if (in_array($tipo_mat, ['pdf', 'aviso']))    $materiaisAluno[]  = $mat;
            if ($tipo_mat === 'atividade')                 $atividadesAluno[] = $mat;

            // Extrair eventos para o calendário (atividades com data de entrega)
            if (!empty($mat['data_entrega'])) {
                $statusColor = ($mat['entrega_status'] === 'entregue' || $mat['entrega_status'] === 'corrigida') ? 'info' : 'warning';
                if ($mat['data_entrega'] < date('Y-m-d') && $statusColor === 'warning') {
                    $statusColor = 'danger'; // Atrasado
                }
                
                $meses = ['01'=>'Jan','02'=>'Fev','03'=>'Mar','04'=>'Abr','05'=>'Mai','06'=>'Jun','07'=>'Jul','08'=>'Ago','09'=>'Set','10'=>'Out','11'=>'Nov','12'=>'Dez'];
                list($ano, $mes, $dia) = explode('-', $mat['data_entrega']);
                
                $proximosEventos[] = [
                    'dia' => $dia,
                    'mes' => $meses[$mes],
                    'titulo' => $mat['titulo'],
                    'descricao' => $mat['disciplina_nome'] . ' · Entrega ' . ($statusColor==='info'?'(Concluída)':'(Pendente)'),
                    'cor' => $statusColor,
                    'data_real' => $mat['data_entrega']
                ];
            }
        }

        usort($proximosEventos, fn($a, $b) => strcmp($a['data_real'], $b['data_real']));

        // Busca os simulados da IA para a turma
        $stmtSims = $pdo->prepare("
            SELECT s.*, d.nome AS disciplina_nome 
            FROM ava_simulados s 
            JOIN disciplinas d ON s.disciplina_id = d.id 
            WHERE s.turma_id = ? 
            ORDER BY s.criado_em DESC
        ");
        $stmtSims->execute([$turma_id]);
        $simuladosAluno = $stmtSims->fetchAll();
    }

    // ─── Frequência real do aluno (últimas 30 presenças) ───────────────────────
    $stmtFreq = $pdo->prepare("
        SELECT f.data_registro, f.status, f.horario_entrada, f.horario_saida,
               d.nome AS disciplina_nome
        FROM frequencia f
        LEFT JOIN disciplinas d ON d.id = f.disciplina_id
        WHERE f.aprendiz_id = ?
        ORDER BY f.data_registro DESC
        LIMIT 30
    ");
    $stmtFreq->execute([$aluno_id]);
    $frequenciaAluno = $stmtFreq->fetchAll();

    // Calcular % de presença
    $totalRegistros = count($frequenciaAluno);
    $totalPresente  = count(array_filter($frequenciaAluno, fn($f) => $f['status'] === 'presente'));
    $percPresenca   = $totalRegistros > 0 ? round(($totalPresente / $totalRegistros) * 100) : 100;

    // ─── Busca de Notificações Reais ───────────────────────────────────────────
    $stmtNotif = $pdo->prepare("SELECT * FROM ava_notificacoes WHERE aprendiz_id = ? ORDER BY criado_em DESC LIMIT 10");
    $stmtNotif->execute([$aluno_id]);
    $notificacoesAluno = $stmtNotif->fetchAll();
    $unreadNotifCount = count(array_filter($notificacoesAluno, fn($n) => $n['lida'] == 0));
}

$primeiroNome = explode(' ', $nomeAluno)[0];

// ─── Prepara dados das disciplinas para o JavaScript ──────────────────────────
$cursosAVAData = [];
if (!$isProf) {
    foreach ($disciplinasAluno as $disc) {
        $did  = $disc['id'];
        $mats = $materiaisPorDisc[$did] ?? [
            'apresentacao' => [], 'pdf' => [], 'atividade' => [], 'avaliacao' => [], 'aviso' => []
        ];
        $totalItens = count($mats['pdf']) + count($mats['atividade']) + count($mats['avaliacao']) + count($mats['apresentacao']);
        $cursosAVAData[] = [
            'id'           => $did,
            'nome'         => $disc['nome'],
            'professor'    => $disc['professor_nome'] ?? '',
            'carga_horaria'=> (int)($disc['carga_horaria'] ?? 0),
            'total_itens'  => $totalItens,
            'apresentacao' => array_values($mats['apresentacao']),
            'pdfs'         => array_values($mats['pdf']),
            'atividades'   => array_values($mats['atividade']),
            'avaliacoes'   => array_values($mats['avaliacao']),
            'simulados'    => array_values(array_filter($simuladosAluno ?? [], fn($s) => $s['disciplina_id'] == $did)),
        ];
    }
}
?>
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AVA — Centro Técnico Sophie Link</title>
    <meta name="description" content="Ambiente Virtual de Aprendizagem do Centro Técnico Profissionalizante Sophie Link.">
    <meta name="robots" content="noindex">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&display=swap" rel="stylesheet">
    <script src="https://unpkg.com/lucide@latest"></script>
<link rel="stylesheet" href="../assets/css/ava.css">
    <script src="../assets/js/a11y.js" defer></script>
</head>
<body>

<!-- ================================================================
     TOP NAVBAR
     ================================================================ -->
<nav class="topnav">
    <a href="../index.php" class="tn-logo" style="gap: 8px;">
        <img src="../assets/images/logo_hd.png" alt="Sophie Link Logo" style="height: 38px; object-fit: contain;">
        <div class="tn-logo-text">
            <div class="tn-logo-name">SOPHIE LINK</div>
            <div class="tn-logo-sub">Centro Técnico Profissionalizante</div>
        </div>
    </a>

    <div class="tn-divider"></div>
    <div class="tn-site-name">Câmpus Virtual — AVA</div>

    <div class="tn-spacer"></div>

    <div class="tn-icons">
        <!-- Acessibilidade (a11y) -->
        <button class="tn-icon-btn" title="Alto Contraste" id="a11y-contrast">
            <i data-lucide="contrast"></i>
        </button>
        <button class="tn-icon-btn" title="Aumentar Fonte" id="a11y-font-inc">
            <i data-lucide="zoom-in"></i>
        </button>
        <button class="tn-icon-btn" title="Diminuir Fonte" id="a11y-font-dec">
            <i data-lucide="zoom-out"></i>
        </button>
        
        <div style="width:1px;background:var(--c-border);height:20px;margin:0 4px;"></div>

        <button class="tn-icon-btn" title="Apps">
            <i data-lucide="layout-grid"></i>
        </button>
        <button class="tn-icon-btn" title="Mensagens" onclick="showSec('mensagens')">
            <i data-lucide="mail"></i>
            <span class="tn-badge">2</span>
        </button>
        <button class="tn-icon-btn" title="Chat">
            <i data-lucide="message-circle"></i>
        </button>
        <div style="position: relative;">
            <button class="tn-icon-btn" title="Notificações" onclick="toggleNotifDropdown()">
                <i data-lucide="bell"></i>
                <?php if ($unreadNotifCount > 0): ?>
                    <span class="tn-badge"><?= $unreadNotifCount ?></span>
                <?php endif; ?>
            </button>
            <div id="notif-dropdown" style="display:none; position:absolute; top:40px; right:0; width:300px; background:#fff; border:1px solid var(--c-border); border-radius:var(--radius); box-shadow:0 10px 25px rgba(0,0,0,0.1); z-index:9999;">
                <div style="padding:10px 15px; border-bottom:1px solid var(--c-border); font-weight:600; font-size:0.85rem; color:var(--c-brand);">Notificações</div>
                <div style="max-height:300px; overflow-y:auto;">
                    <?php if (empty($notificacoesAluno)): ?>
                        <div style="padding:15px; text-align:center; color:var(--c-text-muted); font-size:0.8rem;">Nenhuma notificação.</div>
                    <?php else: ?>
                        <?php foreach($notificacoesAluno as $notif): ?>
                            <a href="<?= htmlspecialchars($notif['link'] ?? '#') ?>" style="display:block; padding:10px 15px; border-bottom:1px solid var(--c-border); text-decoration:none; color:var(--c-text); background:<?= $notif['lida'] ? '#fff' : '#f8f9fa' ?>;">
                                <div style="font-size:0.8rem; font-weight:600;"><?= htmlspecialchars($notif['titulo']) ?></div>
                                <div style="font-size:0.75rem; color:var(--c-text-muted); margin-top:3px;"><?= htmlspecialchars(substr($notif['mensagem'], 0, 60)) ?>...</div>
                            </a>
                        <?php endforeach; ?>
                    <?php endif; ?>
                </div>
            </div>
        </div>
    </div>

    <script>
    function toggleNotifDropdown() {
        const dd = document.getElementById('notif-dropdown');
        dd.style.display = dd.style.display === 'none' ? 'block' : 'none';
    }
    </script>

    <div style="width:1px;background:var(--c-border);height:28px;margin:0 8px;"></div>

    <div class="tn-user">
        <div class="tn-avatar"><?= strtoupper(substr($nomeAluno, 0, 2)) ?></div>
        <div class="tn-user-name"><?= strtoupper(htmlspecialchars($nomeAluno)) ?></div>
    </div>

    <a href="../auth/logout.php" class="tn-settings" title="Sair">
        <i data-lucide="log-out"></i>
    </a>
</nav>

<!-- ================================================================
     SUB-NAVBAR
     ================================================================ -->
<div class="subnav">
    <span class="subnav-link active" id="snav-home" onclick="showSec('home')">Ferramentas</span>
    <div class="subnav-sep"></div>
    <span class="subnav-link" id="snav-notas" onclick="showSec('notas')">Boletim</span>
    <div class="subnav-sep"></div>
    <span class="subnav-link" id="snav-frequencia" onclick="showSec('frequencia')">Frequência</span>
    <div class="subnav-sep"></div>
    <span class="subnav-link" id="snav-publicacoes" onclick="showSec('publicacoes')">Publicações</span>
    <div class="subnav-sep"></div>
    <span class="subnav-link" id="snav-ajuda" onclick="showSec('ajuda')">Ajuda</span>
    <div class="subnav-sep"></div>
    <span class="subnav-link" id="snav-descobrir" onclick="showSec('descobrir')">Descobrir</span>
    <div class="subnav-sep"></div>
    <a href="portal_aluno.php" class="subnav-link subnav-link-portal">Portal do aluno</a>
</div>

<!-- ================================================================
     HERO BANNER
     ================================================================ -->
<div class="hero">
    <img src="../assets/images/ava_hero.png" alt="Campus Sophie Link" loading="eager">
    <div class="hero-overlay">
        <div class="hero-greeting"><?= $isProf ? 'Bem-vindo ao AVA, Prof.' : 'Olá,' ?> <?= strtoupper(htmlspecialchars($primeiroNome)) ?></div>
        <?php if ($isProf): ?>
        <div style="font-size:0.85rem;color:rgba(255,255,255,0.8);margin-top:6px;">Navegue pelas suas turmas e acesse o Portal do Professor para lançar notas e frequência.</div>
        <?php endif; ?>
    </div>
</div>

<!-- ================================================================
     CONTEÚDO PRINCIPAL — HOME
     ================================================================ -->
<div id="sec-home" class="page-section active">
<div class="page-wrap">
    <div class="main-grid">

        <!-- ======================== COLUNA ESQUERDA ======================== -->
        <div>

            <!-- MEUS CURSOS / TURMAS -->
            <div class="panel">
                <div class="panel-head">
                    <div class="panel-title">
                        <i data-lucide="book-open" style="width:15px;height:15px;color:var(--c-brand);"></i>
                        <?= $isProf ? 'Minhas Turmas / Disciplinas' : 'Meus cursos' ?>
                    </div>
                    <span class="panel-title-more"><?= $isProf ? '' : 'Filtrar ▾' ?></span>
                </div>

                <?php if ($isProf): ?>
                    <!-- VISÃO PROFESSOR: lista de turmas -->
                    <div style="padding:1rem;">
                        <?php if (empty($turmasProfAva)): ?>
                            <div style="padding:1rem;color:var(--c-text-muted);font-size:0.85rem;">Nenhuma disciplina atribuída ainda. Aguarde a coordenação.</div>
                        <?php else: ?>
                            <div style="display:flex;flex-wrap:wrap;gap:14px;">
                            <?php foreach ($turmasProfAva as $tp): ?>
                            <div style="width:220px;border:1px solid var(--c-border);border-radius:var(--radius);overflow:hidden;">
                                <div style="height:80px;background:linear-gradient(135deg,var(--c-brand) 0%,#4C1D95 100%);display:flex;align-items:center;justify-content:center;">
                                    <i data-lucide="book-open" style="width:30px;height:30px;color:rgba(255,255,255,0.85);"></i>
                                </div>
                                <div style="padding:10px;">
                                    <div style="font-weight:700;font-size:0.82rem;color:var(--c-brand);"><?= htmlspecialchars($tp['disciplina_nome']) ?></div>
                                    <div style="font-size:0.7rem;color:var(--c-text-muted);margin-top:3px;"><?= htmlspecialchars($tp['turma_nome']) ?></div>
                                    <a href="portal_professor.php" style="display:inline-block;margin-top:8px;font-size:0.7rem;font-weight:700;color:var(--c-brand);">Lançar Notas / Chamada →</a>
                                </div>
                            </div>
                            <?php endforeach; ?>
                            </div>
                        <?php endif; ?>
                    </div>
                    <div class="courses-footer">
                        <a href="portal_professor.php">Acessar Portal do Professor →</a>
                    </div>

                <?php else: ?>
                    <!-- VISÃO ALUNO: cards de disciplinas (dinâmico) -->
                    <?php if (empty($disciplinasAluno)): ?>
                        <div style="padding:2rem;text-align:center;color:var(--c-text-muted);font-size:0.85rem;">
                            <i data-lucide="book-open" style="width:40px;height:40px;margin:0 auto 12px;display:block;opacity:0.25;"></i>
                            Nenhuma disciplina disponível ainda.<br>Aguarde a coordenação vincular você a uma turma.
                        </div>
                    <?php else: ?>
                    <div class="courses-grid">
                        <?php foreach ($disciplinasAluno as $disc):
                            $did      = $disc['id'];
                            $mats     = $materiaisPorDisc[$did] ?? ['apresentacao'=>[],'pdf'=>[],'atividade'=>[],'avaliacao'=>[],'aviso'=>[]];
                            $nItens   = count($mats['pdf']) + count($mats['atividade']) + count($mats['avaliacao']) + count($mats['apresentacao']);
                            $nPend    = count(array_filter($mats['atividade'], fn($a) => !$a['entrega_status']));
                        ?>
                        <a href="#" class="course-card" onclick="openCourse(event, <?= $did ?>)">
                            <div class="cc-thumb cc-thumb-solid">
                                <i data-lucide="book-open" style="width:32px;height:32px;color:rgba(255,255,255,0.85);"></i>
                            </div>
                            <div class="cc-body">
                                <div class="cc-title"><?= htmlspecialchars($disc['nome']) ?></div>
                                <div class="cc-code">Prof. <?= htmlspecialchars($disc['professor_nome'] ?? '—') ?></div>
                                <div class="cc-status">
                                    <div class="cc-dot cc-dot-green"></div>Em Curso
                                    <?php if ($nPend > 0): ?>
                                        &nbsp;·&nbsp;<span style="color:var(--c-amber);font-size:0.68rem;font-weight:700;"><?= $nPend ?> pendente(s)</span>
                                    <?php endif; ?>
                                </div>
                                <div class="cc-footer"><?= $nItens ?> conteúdo(s) disponível(is)</div>
                            </div>
                        </a>
                        <?php endforeach; ?>
                    </div>
                    <div class="courses-footer"><a href="#">Exibir Todas as Disciplinas (<?= count($disciplinasAluno) ?>)</a></div>
                    <?php endif; ?>
                <?php endif; ?>
            </div>

            <!-- ATIVIDADES PENDENTES (real do BD) -->
            <?php if (!$isProf): ?>
            <div class="panel">
                <div class="panel-head">
                    <div class="panel-title">
                        <i data-lucide="clipboard-list" style="width:15px;height:15px;color:var(--c-brand);"></i>
                        Atividades Pendentes
                    </div>
                    <span class="panel-title-more" onclick="showSec('atividades')">Ver todas →</span>
                </div>
                <div class="pending-body">
                    <?php if (empty($atividadesAluno)): ?>
                        <div style="padding:1rem;font-size:0.82rem;color:var(--c-text-muted);">
                            Nenhuma atividade postada ainda. Fique de olho! 📚
                        </div>
                    <?php else: ?>
                        <?php foreach (array_slice($atividadesAluno, 0, 4) as $atv):
                            $atrasado = $atv['data_entrega'] && $atv['data_entrega'] < date('Y-m-d') && !$atv['entrega_status'];
                            $entregue = ($atv['entrega_status'] === 'entregue' || $atv['entrega_status'] === 'corrigida');
                            $iconBg = $atrasado ? 'var(--c-red-lt)' : ($entregue ? 'var(--c-green-lt)' : 'var(--c-brand-lt)');
                            $iconCor = $atrasado ? 'var(--c-red)' : ($entregue ? 'var(--c-green)' : 'var(--c-brand)');
                            $icon    = $atrasado ? 'file-x' : ($entregue ? 'check-circle' : 'file-text');
                        ?>
                        <div class="pending-item">
                            <div class="pending-icon" style="background:<?= $iconBg ?>;color:<?= $iconCor ?>;">
                                <i data-lucide="<?= $icon ?>"></i>
                            </div>
                            <div class="pending-info">
                                <div class="pending-name"><?= htmlspecialchars($atv['titulo']) ?></div>
                                <div class="pending-meta">
                                    <?= $atv['data_entrega'] ? 'Até ' . date('d/m/Y', strtotime($atv['data_entrega'])) . ' &bull; ' : '' ?>
                                    <?= htmlspecialchars($atv['disciplina_nome'] ?? '') ?>
                                    <?php if ($entregue): ?>
                                        &bull; <span style="color:var(--c-green);font-weight:600;">✓ Entregue</span>
                                    <?php elseif ($atrasado): ?>
                                        &bull; <span style="color:var(--c-red);font-weight:600;">⚠ Atrasada</span>
                                    <?php endif; ?>
                                </div>
                            </div>
                        </div>
                        <?php endforeach; ?>
                        <?php if (count($atividadesAluno) > 4): ?>
                        <div style="padding:8px 12px;font-size:0.75rem;color:var(--c-brand);font-weight:600;cursor:pointer;" onclick="showSec('atividades')">
                            +<?= count($atividadesAluno) - 4 ?> atividades — ver todas
                        </div>
                        <?php endif; ?>
                    <?php endif; ?>
                </div>
            </div>
            <?php endif; ?>

            <!-- SIMULADOS DA IA -->
            <?php if (!$isProf && !empty($simuladosAluno)): ?>
            <div class="panel" style="margin-top:20px;">
                <div class="panel-head">
                    <div class="panel-title">
                        <i data-lucide="sparkles" style="width:15px;height:15px;color:#8B5CF6;"></i>
                        Simulados Recomendados (IA)
                    </div>
                </div>
                <div class="pending-body">
                    <?php foreach (array_slice($simuladosAluno, 0, 4) as $sim): ?>
                    <div class="pending-item">
                        <div class="pending-icon" style="background:#EDE9FE;color:#8B5CF6;">
                            <i data-lucide="brain"></i>
                        </div>
                        <div class="pending-info">
                            <div class="pending-name">
                                <a href="responder_simulado.php?id=<?= $sim['id'] ?>" style="color:var(--c-text);text-decoration:none;">
                                    <?= htmlspecialchars($sim['titulo']) ?>
                                </a>
                            </div>
                            <div class="pending-meta">
                                <?= htmlspecialchars($sim['disciplina_nome'] ?? '') ?>
                            </div>
                        </div>
                        <a href="responder_simulado.php?id=<?= $sim['id'] ?>" class="btn-primary" style="background:#8B5CF6; border-color:#8B5CF6; padding:4px 10px; font-size:0.75rem; color:#fff; text-decoration:none; border-radius:4px;">Responder</a>
                    </div>
                    <?php endforeach; ?>
                </div>
            </div>
            <?php endif; ?>

        </div><!-- /col-esquerda -->

        <!-- ======================== COLUNA DIREITA ======================== -->
        <div>

            <!-- AVISOS -->
            <div class="panel">
                <div class="panel-head">
                    <div class="panel-title">
                        <i data-lucide="megaphone" style="width:15px;height:15px;color:var(--c-brand);"></i>
                        Avisos
                    </div>
                </div>
                <div class="avisos-body">
                    <div class="aviso-carousel">
                        <div class="aviso-slide active">
                            <div class="aviso-slide-content">
                                <div class="aviso-slide-title">📋 Folha de Ponto Semanal</div>
                                Lembre de assinar a folha de ponto na empresa todas as semanas. Faltas não justificadas impactam diretamente sua frequência escolar e podem levar ao desligamento do programa.
                            </div>
                        </div>
                        <div class="aviso-slide">
                            <div class="aviso-slide-content">
                                <div class="aviso-slide-title">📅 Reposição de Aula — 03/06</div>
                                A aula do dia 22/05 (Eletromecânica I) foi reagendada para terça-feira, 03/06, das 14h às 17h30, no Laboratório 2. Presença obrigatória.
                            </div>
                        </div>
                        <div class="aviso-slide">
                            <div class="aviso-slide-content">
                                <div class="aviso-slide-title">🎓 Avaliação Bimestral — 14/06</div>
                                A prova bimestral dos módulos 1 e 2 acontecerá no dia 14/06 (segunda-feira), das 08h às 12h, no Auditório Sophie Link. Estudem com antecedência!
                            </div>
                        </div>
                    </div>
                    <div class="aviso-nav">
                        <button class="aviso-btn" onclick="avisoNav(-1)"><i data-lucide="chevron-left"></i></button>
                        <div class="aviso-dots" id="aviso-dots">
                            <div class="aviso-dot active" onclick="avisoGo(0)"></div>
                            <div class="aviso-dot" onclick="avisoGo(1)"></div>
                            <div class="aviso-dot" onclick="avisoGo(2)"></div>
                        </div>
                        <button class="aviso-btn" onclick="avisoNav(1)"><i data-lucide="chevron-right"></i></button>
                    </div>
                </div>
            </div>

            <!-- PROGRESSO DOS MÓDULOS -->
            <div class="panel">
                <div class="panel-head">
                    <div class="panel-title">
                        <i data-lucide="trending-up" style="width:15px;height:15px;color:var(--c-brand);"></i>
                        Progresso dos módulos
                    </div>
                </div>
                <div class="progress-list">
                    <?php if (count($notasDb) > 0): ?>
                        <?php foreach($notasDb as $idx => $nota): 
                            $cores = ['var(--c-brand)', '#8B5CF6', '#22C55E', '#3B82F6'];
                            $cor = $cores[$idx % count($cores)];
                            $perc = min(100, round($nota['valor_nota'] * 10)); // Simula percentual com base na nota
                        ?>
                        <div>
                            <div class="prog-item-name"><?= htmlspecialchars($nota['atividade']) ?> <span><?= $perc ?>%</span></div>
                            <div class="prog-bar"><div class="prog-fill" style="width:<?= $perc ?>%;background:<?= $cor ?>;"></div></div>
                        </div>
                        <?php endforeach; ?>
                    <?php else: ?>
                        <div style="font-size:0.8rem;color:var(--c-text-muted);">Nenhum progresso registrado ainda.</div>
                    <?php endif; ?>
                </div>
            </div>

            <!-- CALENDÁRIO -->
            <div class="panel">
                <div class="panel-head">
                    <div class="panel-title">
                        <i data-lucide="calendar" style="width:15px;height:15px;color:var(--c-brand);"></i>
                        Calendário
                        <i data-lucide="chevron-down" style="width:13px;height:13px;color:var(--c-text-muted);"></i>
                    </div>
                </div>

                <div class="cal-header-row" onclick="toggleCal()">
                    <span class="cal-date-text" id="cal-label">sexta-feira, 29 de maio de 2026</span>
                    <span class="cal-toggle"><i data-lucide="chevron-right" id="cal-chevron"></i></span>
                </div>

                <div id="cal-body" class="cal-body" style="display:none;">
                    <div class="cal-grid">
                        <div class="cal-dh">D</div><div class="cal-dh">S</div><div class="cal-dh">T</div>
                        <div class="cal-dh">Q</div><div class="cal-dh">Q</div><div class="cal-dh">S</div><div class="cal-dh">S</div>
                        <div class="cal-d other">27</div><div class="cal-d other">28</div><div class="cal-d other">29</div>
                        <div class="cal-d other">30</div><div class="cal-d other">1</div>
                        <div class="cal-d">2</div><div class="cal-d">3</div>
                        <div class="cal-d">4</div><div class="cal-d">5</div><div class="cal-d">6</div>
                        <div class="cal-d has-ev">7</div><div class="cal-d">8</div><div class="cal-d">9</div><div class="cal-d">10</div>
                        <div class="cal-d">11</div><div class="cal-d">12</div><div class="cal-d">13</div>
                        <div class="cal-d has-ev">14</div><div class="cal-d">15</div><div class="cal-d">16</div><div class="cal-d">17</div>
                        <div class="cal-d">18</div><div class="cal-d">19</div><div class="cal-d">20</div>
                        <div class="cal-d">21</div><div class="cal-d">22</div><div class="cal-d">23</div><div class="cal-d">24</div>
                        <div class="cal-d">25</div><div class="cal-d">26</div><div class="cal-d">27</div>
                        <div class="cal-d">28</div><div class="cal-d today">29</div><div class="cal-d">30</div><div class="cal-d">31</div>
                    </div>
                </div>

                <!-- PRÓXIMOS EVENTOS -->
                <div class="events-head" onclick="toggleEvents()">
                    <span class="events-title">Próximos eventos</span>
                    <i data-lucide="chevron-down" style="width:14px;height:14px;color:var(--c-text-muted);"></i>
                </div>
                <div id="events-list" class="events-list">
                    <div class="event-row">
                        <div class="event-date-col">
                            <div class="event-month">MAI</div>
                            <div class="event-day">30</div>
                        </div>
                        <div class="event-info">
                            <div class="event-title">Questionário CLT — Vencimento</div>
                            <div class="event-time">23:59</div>
                            <div class="event-course">Manutenção Eletromecânica I</div>
                        </div>
                    </div>
                    <div class="event-row">
                        <div class="event-date-col">
                            <div class="event-month">JUN</div>
                            <div class="event-day">03</div>
                        </div>
                        <div class="event-info">
                            <div class="event-title">Reposição de Aula — Eletromecânica</div>
                            <div class="event-time">14:00</div>
                            <div class="event-course">Laboratório 2 · Presencial</div>
                        </div>
                    </div>
                    <div class="event-row">
                        <div class="event-date-col">
                            <div class="event-month">JUN</div>
                            <div class="event-day">07</div>
                        </div>
                        <div class="event-info">
                            <div class="event-title">Estudo de Caso — Entrega</div>
                            <div class="event-time">23:59</div>
                            <div class="event-course">Gestão da Qualidade · Vencimento</div>
                        </div>
                    </div>
                    <div class="event-row">
                        <div class="event-date-col">
                            <div class="event-month">JUN</div>
                            <div class="event-day">14</div>
                        </div>
                        <div class="event-info">
                            <div class="event-title" style="color:var(--c-accent);">AVALIAÇÃO BIMESTRAL · Presencial</div>
                            <div class="event-time">08:00</div>
                            <div class="event-course">Auditório Sophie Link · Módulos 1 e 2</div>
                        </div>
                    </div>
                </div>

            </div><!-- /calendário panel -->

        </div><!-- /col-direita -->

    </div><!-- /main-grid -->
</div><!-- /page-wrap -->
</div><!-- /sec-home -->


<!-- ================================================================
     SEÇÃO: CONTEÚDO DO CURSO (abre ao clicar no card)
     ================================================================ -->
<div id="sec-curso" class="page-section">
<div class="page-wrap" style="max-width: 960px;">
    <button onclick="closeCourse()" style="display:flex;align-items:center;gap:7px;background:none;border:1px solid var(--c-border);border-radius:var(--radius);padding:7px 14px;cursor:pointer;font-family:var(--f-body);font-size:0.78rem;font-weight:600;color:var(--c-text-muted);margin-bottom:1.25rem;transition:all 0.15s;">
        <i data-lucide="arrow-left" style="width:14px;height:14px;"></i> Voltar aos cursos
    </button>
    <div class="panel" id="curso-content"></div>
</div>
</div>

<!-- ================================================================
     SEÇÃO: MATERIAIS (PDFs e Avisos do professor)
     ================================================================ -->
<div id="sec-materiais" class="page-section">
<div class="page-wrap">
    <button onclick="showSec('home')" style="display:flex;align-items:center;gap:7px;background:none;border:1px solid var(--c-border);border-radius:var(--radius);padding:7px 14px;cursor:pointer;font-family:var(--f-body);font-size:0.78rem;font-weight:600;color:var(--c-text-muted);margin-bottom:1.25rem;">
        <i data-lucide="arrow-left" style="width:14px;height:14px;"></i> Voltar ao início
    </button>
    <div class="panel">
        <div class="panel-head">
            <div class="panel-title"><i data-lucide="file-text" style="width:15px;height:15px;color:var(--c-brand);"></i> Materiais e Apostilas</div>
        </div>
        <?php if (empty($materiaisAluno)): ?>
            <div style="padding:2rem;text-align:center;color:var(--c-text-muted);font-size:0.85rem;">
                <i data-lucide="inbox" style="width:36px;height:36px;margin:0 auto 10px;display:block;opacity:0.3;"></i>
                Nenhum material disponível ainda.<br>Quando o professor postar PDFs ou avisos, eles aparecerão aqui.
            </div>
        <?php else: ?>
            <div style="display:flex;flex-direction:column;gap:0;">
            <?php foreach ($materiaisAluno as $m):
                $icon = $m['tipo'] === 'aviso' ? 'megaphone' : 'file-text';
                $bg   = $m['tipo'] === 'aviso' ? '#F0FDF4' : '#EFF6FF';
                $cor  = $m['tipo'] === 'aviso' ? '#15803D' : '#1D4ED8';
            ?>
            <div style="display:flex;align-items:flex-start;gap:14px;padding:14px 16px;border-bottom:1px solid var(--c-border-lt);transition:background 0.12s;" onmouseover="this.style.background='var(--c-bg)'" onmouseout="this.style.background='transparent'">
                <div style="width:40px;height:40px;border-radius:var(--radius);background:<?= $bg ?>;display:flex;align-items:center;justify-content:center;flex-shrink:0;">
                    <i data-lucide="<?= $icon ?>" style="width:18px;height:18px;color:<?= $cor ?>;"></i>
                </div>
                <div style="flex:1;">
                    <div style="font-size:0.85rem;font-weight:700;color:var(--c-text);margin-bottom:3px;"><?= htmlspecialchars($m['titulo']) ?></div>
                    <?php if ($m['descricao']): ?>
                    <div style="font-size:0.75rem;color:var(--c-text-muted);margin-bottom:5px;line-height:1.5;"><?= nl2br(htmlspecialchars($m['descricao'])) ?></div>
                    <?php endif; ?>
                    <div style="font-size:0.68rem;color:var(--c-text-muted);">
                        <?= htmlspecialchars($m['disciplina_nome'] ?? '') ?>
                        &bull; Prof. <?= htmlspecialchars($m['professor_nome'] ?? '') ?>
                        &bull; <?= date('d/m/Y', strtotime($m['criado_em'])) ?>
                    </div>
                </div>
                <?php if ($m['arquivo_path']): ?>
                <a href="download_material.php?id=<?= $m['id'] ?>" target="_blank"
                   style="display:flex;align-items:center;gap:6px;padding:7px 12px;background:var(--c-brand);color:#fff;border-radius:var(--radius);font-size:0.75rem;font-weight:700;flex-shrink:0;text-decoration:none;">
                    <i data-lucide="download" style="width:13px;height:13px;"></i> Baixar
                </a>
                <?php endif; ?>
            </div>
            <?php endforeach; ?>
            </div>
        <?php endif; ?>
    </div>
</div>
</div>

<!-- ================================================================
     SEÇÃO: ATIVIDADES
     ================================================================ -->
<div id="sec-atividades" class="page-section">
<div class="page-wrap">
    <button onclick="showSec('home')" style="display:flex;align-items:center;gap:7px;background:none;border:1px solid var(--c-border);border-radius:var(--radius);padding:7px 14px;cursor:pointer;font-family:var(--f-body);font-size:0.78rem;font-weight:600;color:var(--c-text-muted);margin-bottom:1.25rem;">
        <i data-lucide="arrow-left" style="width:14px;height:14px;"></i> Voltar ao início
    </button>
    <div class="panel">
        <div class="panel-head">
            <div class="panel-title"><i data-lucide="clipboard-list" style="width:15px;height:15px;color:var(--c-brand);"></i> Atividades</div>
        </div>
        <?php if (empty($atividadesAluno)): ?>
            <div style="padding:2rem;text-align:center;color:var(--c-text-muted);font-size:0.85rem;">
                <i data-lucide="check-circle" style="width:36px;height:36px;margin:0 auto 10px;display:block;opacity:0.3;color:var(--c-green);"></i>
                Nenhuma atividade postada ainda. Tudo em dia! 🎉
            </div>
        <?php else: ?>
            <div style="display:flex;flex-direction:column;gap:0;">
            <?php foreach ($atividadesAluno as $atv):
                $hoje = date('Y-m-d');
                $atrasado = $atv['data_entrega'] && $atv['data_entrega'] < $hoje && !$atv['entrega_status'];
                $entregue = ($atv['entrega_status'] === 'entregue' || $atv['entrega_status'] === 'corrigida');
                $borderCor = $atrasado ? 'var(--c-red)' : ($entregue ? 'var(--c-green)' : 'var(--c-brand)');
            ?>
            <div style="display:flex;align-items:flex-start;gap:14px;padding:14px 16px;border-bottom:1px solid var(--c-border-lt);border-left:3px solid <?= $borderCor ?>;margin-bottom:2px;background:var(--c-surface);">
                <div style="flex:1;">
                    <div style="display:flex;align-items:center;gap:8px;margin-bottom:4px;">
                        <span style="font-size:0.85rem;font-weight:700;color:var(--c-text);"><?= htmlspecialchars($atv['titulo']) ?></span>
                        <?php if ($entregue): ?>
                            <span style="background:var(--c-green-lt);color:var(--c-green);font-size:0.65rem;font-weight:700;padding:2px 7px;border-radius:20px;">✓ Entregue</span>
                        <?php elseif ($atrasado): ?>
                            <span style="background:var(--c-red-lt);color:var(--c-red);font-size:0.65rem;font-weight:700;padding:2px 7px;border-radius:20px;">⚠ Atrasada</span>
                        <?php else: ?>
                            <span style="background:var(--c-brand-lt);color:var(--c-brand);font-size:0.65rem;font-weight:700;padding:2px 7px;border-radius:20px;">Pendente</span>
                        <?php endif; ?>
                    </div>
                    <?php if ($atv['descricao']): ?>
                    <div style="font-size:0.75rem;color:var(--c-text-muted);margin-bottom:6px;line-height:1.5;"><?= nl2br(htmlspecialchars($atv['descricao'])) ?></div>
                    <?php endif; ?>
                    <div style="font-size:0.68rem;color:var(--c-text-muted);">
                        <?= htmlspecialchars($atv['disciplina_nome'] ?? '') ?>
                        &bull; Prof. <?= htmlspecialchars($atv['professor_nome'] ?? '') ?>
                        <?php if ($atv['data_entrega']): ?>
                        &bull; <strong>Prazo: <?= date('d/m/Y', strtotime($atv['data_entrega'])) ?></strong>
                        <?php endif; ?>
                    </div>
                </div>
                <?php if ($atv['arquivo_path']): ?>
                <a href="download_material.php?id=<?= $atv['id'] ?>" target="_blank"
                   style="display:flex;align-items:center;gap:5px;padding:6px 10px;background:var(--c-bg);border:1px solid var(--c-border);color:var(--c-brand);border-radius:var(--radius);font-size:0.72rem;font-weight:700;flex-shrink:0;text-decoration:none;">
                    <i data-lucide="download" style="width:12px;height:12px;"></i> Material
                </a>
                <?php endif; ?>
            </div>
            <?php endforeach; ?>
            </div>
        <?php endif; ?>
    </div>
</div>
</div>

<!-- ================================================================
     SEÇÃO: FREQUÊNCIA
     ================================================================ -->
<div id="sec-frequencia" class="page-section">
<div class="page-wrap">
    <button onclick="showSec('home')" style="display:flex;align-items:center;gap:7px;background:none;border:1px solid var(--c-border);border-radius:var(--radius);padding:7px 14px;cursor:pointer;font-family:var(--f-body);font-size:0.78rem;font-weight:600;color:var(--c-text-muted);margin-bottom:1.25rem;">
        <i data-lucide="arrow-left" style="width:14px;height:14px;"></i> Voltar ao início
    </button>
    <div class="panel">
        <div class="panel-head">
            <div class="panel-title"><i data-lucide="calendar-check" style="width:15px;height:15px;color:var(--c-brand);"></i> Minha Frequência</div>
            <?php if (!empty($frequenciaAluno)): ?>
            <div style="display:flex;align-items:center;gap:8px;">
                <span style="font-size:0.75rem;color:var(--c-text-muted);">Presença geral:</span>
                <span style="font-weight:700;font-size:0.85rem;color:<?= $percPresenca >= 75 ? 'var(--c-green)' : 'var(--c-red)' ?>;"><?= $percPresenca ?>%</span>
                <span style="font-size:0.65rem;color:var(--c-text-muted);"><?= $percPresenca >= 75 ? '✓ Regular' : '⚠ Abaixo do mínimo (75%)' ?></span>
            </div>
            <?php endif; ?>
        </div>
        <?php if (empty($frequenciaAluno)): ?>
            <div style="padding:2rem;text-align:center;color:var(--c-text-muted);font-size:0.85rem;">
                <i data-lucide="calendar" style="width:36px;height:36px;margin:0 auto 10px;display:block;opacity:0.3;"></i>
                Nenhuma frequência registrada ainda.
            </div>
        <?php else: ?>
            <table style="width:100%;border-collapse:collapse;">
                <thead><tr style="border-bottom:1px solid var(--c-border);">
                    <th style="text-align:left;padding:9px 14px;font-size:0.68rem;font-weight:700;text-transform:uppercase;color:var(--c-text-muted);">Data</th>
                    <th style="text-align:left;padding:9px 14px;font-size:0.68rem;font-weight:700;text-transform:uppercase;color:var(--c-text-muted);">Disciplina</th>
                    <th style="text-align:center;padding:9px 14px;font-size:0.68rem;font-weight:700;text-transform:uppercase;color:var(--c-text-muted);">Entrada</th>
                    <th style="text-align:center;padding:9px 14px;font-size:0.68rem;font-weight:700;text-transform:uppercase;color:var(--c-text-muted);">Saída</th>
                    <th style="text-align:center;padding:9px 14px;font-size:0.68rem;font-weight:700;text-transform:uppercase;color:var(--c-text-muted);">Status</th>
                </tr></thead>
                <tbody>
                <?php foreach ($frequenciaAluno as $f):
                    $cor = $f['status'] === 'presente' ? 'green' : ($f['status'] === 'justificada' ? 'amber' : 'red');
                    $label = $f['status'] === 'presente' ? 'Presente' : ($f['status'] === 'justificada' ? 'Justificada' : 'Falta');
                ?>
                <tr style="border-bottom:1px solid var(--c-border-lt);">
                    <td style="padding:10px 14px;font-size:0.82rem;font-weight:600;"><?= date('d/m/Y', strtotime($f['data_registro'])) ?></td>
                    <td style="padding:10px 14px;font-size:0.82rem;color:var(--c-text-muted);"><?= htmlspecialchars($f['disciplina_nome'] ?? '—') ?></td>
                    <td style="padding:10px 14px;font-size:0.82rem;text-align:center;"><?= $f['horario_entrada'] ? substr($f['horario_entrada'],0,5) : '—' ?></td>
                    <td style="padding:10px 14px;font-size:0.82rem;text-align:center;"><?= $f['horario_saida'] ? substr($f['horario_saida'],0,5) : '—' ?></td>
                    <td style="padding:10px 14px;text-align:center;">
                        <span style="display:inline-flex;align-items:center;padding:3px 9px;border-radius:20px;font-size:0.65rem;font-weight:700;background:var(--c-<?= $cor ?>-lt);color:var(--c-<?= $cor ?>);"><?= $label ?></span>
                    </td>
                </tr>
                <?php endforeach; ?>
                </tbody>
            </table>
        <?php endif; ?>
    </div>
</div>
</div>


<!-- ================================================================
     SEÇÃO: NOTAS
     ================================================================ -->
<div id="sec-notas" class="page-section">
<div class="page-wrap">
    <button onclick="showSec('home')" style="display:flex;align-items:center;gap:7px;background:none;border:1px solid var(--c-border);border-radius:var(--radius);padding:7px 14px;cursor:pointer;font-family:var(--f-body);font-size:0.78rem;font-weight:600;color:var(--c-text-muted);margin-bottom:1.25rem;transition:all 0.15s;" onmouseover="this.style.borderColor='var(--c-brand)';this.style.color='var(--c-brand)'" onmouseout="this.style.borderColor='var(--c-border)';this.style.color='var(--c-text-muted)'">
        <i data-lucide="arrow-left" style="width:14px;height:14px;"></i> Voltar ao início
    </button>
    <div class="panel">
        <div class="panel-head"><div class="panel-title"><i data-lucide="bar-chart-2" style="width:15px;height:15px;color:var(--c-brand);"></i> Boletim <?= date('Y') ?>/1 — <?= htmlspecialchars($nomeAluno) ?></div></div>
        <?php if (empty($boletim)): ?>
            <div style="padding:1.5rem;color:var(--c-text-muted);font-size:0.85rem;">Nenhuma nota lançada ainda. As notas aparecerão aqui conforme forem registradas pelo professor.</div>
        <?php else: ?>
        <table style="width:100%;border-collapse:collapse;">
            <thead><tr style="border-bottom:1px solid var(--c-border);">
                <th style="text-align:left;padding:9px 14px;font-size:0.68rem;font-weight:700;text-transform:uppercase;color:var(--c-text-muted);">Disciplina</th>
                <th style="text-align:center;padding:9px 14px;font-size:0.68rem;font-weight:700;text-transform:uppercase;color:var(--c-text-muted);">Nota 1</th>
                <th style="text-align:center;padding:9px 14px;font-size:0.68rem;font-weight:700;text-transform:uppercase;color:var(--c-text-muted);">Nota 2</th>
                <th style="text-align:center;padding:9px 14px;font-size:0.68rem;font-weight:700;text-transform:uppercase;color:var(--c-text-muted);">Média</th>
                <th style="text-align:center;padding:9px 14px;font-size:0.68rem;font-weight:700;text-transform:uppercase;color:var(--c-text-muted);">Faltas</th>
                <th style="text-align:center;padding:9px 14px;font-size:0.68rem;font-weight:700;text-transform:uppercase;color:var(--c-text-muted);">Situação</th>
            </tr></thead>
            <tbody>
                <?php foreach ($boletim as $disc => $b):
                    $notas = $b['notas'];
                    $n1  = isset($notas[0]) ? number_format($notas[0], 1) : '—';
                    $n2  = isset($notas[1]) ? number_format($notas[1], 1) : '—';
                    $media = count($notas) > 0 ? array_sum($notas) / count($notas) : null;
                    $mediaStr = $media !== null ? number_format($media, 1) : '—';
                    $faltas = (int)($b['faltas'] ?? 0);
                    $cor = $media === null ? 'gray' : ($media >= 7.0 ? 'green' : ($media >= 5.0 ? 'amber' : 'red'));
                    $sit = $media === null ? 'Em andamento' : ($media >= 7.0 ? 'Aprovado' : ($media >= 5.0 ? 'Recuperação' : 'Reprovado'));
                ?>
                <tr style="border-bottom:1px solid var(--c-border-lt);transition:background 0.12s;" onmouseover="this.style.background='var(--c-bg)'" onmouseout="this.style.background='transparent'">
                    <td style="padding:11px 14px;font-size:0.82rem;font-weight:600;color:var(--c-text);"><?= htmlspecialchars($disc) ?></td>
                    <td style="padding:11px 14px;font-size:0.82rem;text-align:center;"><?= $n1 ?></td>
                    <td style="padding:11px 14px;font-size:0.82rem;text-align:center;"><?= $n2 ?></td>
                    <td style="padding:11px 14px;font-size:0.82rem;text-align:center;font-weight:700;color:var(--c-<?= $cor == 'gray' ? 'text-muted' : $cor ?>);"><?= $mediaStr ?></td>
                    <td style="padding:11px 14px;font-size:0.82rem;text-align:center;"><?= $faltas ?></td>
                    <td style="padding:11px 14px;text-align:center;">
                        <span style="display:inline-flex;align-items:center;padding:3px 9px;border-radius:20px;font-size:0.65rem;font-weight:700;background:var(--c-<?= $cor ?>-lt);color:var(--c-<?= $cor == 'gray' ? 'text-muted' : $cor ?>);"><?= $sit ?></span>
                    </td>
                </tr>
                <?php endforeach; ?>
            </tbody>
        </table>
        <?php endif; ?>
    </div>
</div>
</div>


<!-- ================================================================
     SEÇÃO: MENSAGENS
     ================================================================ -->
<div id="sec-mensagens" class="page-section">
<div class="page-wrap">
    <button onclick="showSec('home')" style="display:flex;align-items:center;gap:7px;background:none;border:1px solid var(--c-border);border-radius:var(--radius);padding:7px 14px;cursor:pointer;font-family:var(--f-body);font-size:0.78rem;font-weight:600;color:var(--c-text-muted);margin-bottom:1.25rem;transition:all 0.15s;" onmouseover="this.style.borderColor='var(--c-brand)';this.style.color='var(--c-brand)'" onmouseout="this.style.borderColor='var(--c-border)';this.style.color='var(--c-text-muted)'">
        <i data-lucide="arrow-left" style="width:14px;height:14px;"></i> Voltar ao início
    </button>
    <div class="panel">
        <div class="panel-head"><div class="panel-title"><i data-lucide="mail" style="width:15px;height:15px;color:var(--c-brand);"></i> Caixa de Entrada (3 novas)</div></div>
        <?php $msgs = [['Coordenação Sophie Link','Lembrete: avaliação bimestral em 14/06. Presença obrigatória no auditório.','Hoje, 10:30',true],['Prof. Carlos Menezes','Material de apoio para o Módulo 3 disponível no AVA. Acesse a seção Eletromecânica I.','Ontem, 14:00',true],['Programa Partilhar (Vale)','Atualização do relatório mensal de abril disponível para download na secretaria.','26/05',false]];
        foreach ($msgs as $m): ?>
        <div style="display:flex;align-items:flex-start;gap:12px;padding:12px 14px;border-bottom:1px solid var(--c-border-lt);transition:background 0.12s;cursor:pointer;<?= $m[3] ? 'background:var(--c-brand-lt);' : '' ?>" onmouseover="this.style.background='#f0f4f8'" onmouseout="this.style.background='<?= $m[3] ? "var(--c-brand-lt)" : "transparent" ?>'">
            <div style="width:36px;height:36px;border-radius:50%;background:<?= $m[3] ? 'var(--c-brand)' : '#ddd' ?>;display:flex;align-items:center;justify-content:center;font-size:0.75rem;font-weight:700;color:<?= $m[3] ? '#fff' : '#777' ?>;flex-shrink:0;"><?= strtoupper(substr($m[0], 0, 1)) ?></div>
            <div style="flex:1;">
                <div style="display:flex;justify-content:space-between;margin-bottom:3px;">
                    <span style="font-size:0.78rem;font-weight:<?= $m[3] ? '700' : '600' ?>;color:var(--c-text);"><?= $m[0] ?></span>
                    <span style="font-size:0.65rem;color:var(--c-text-muted);"><?= $m[2] ?></span>
                </div>
                <div style="font-size:0.73rem;color:var(--c-text-muted);line-height:1.4;"><?= $m[1] ?></div>
            </div>
            <?php if ($m[3]): ?>
            <div style="width:8px;height:8px;border-radius:50%;background:var(--c-brand);flex-shrink:0;margin-top:6px;"></div>
            <?php endif; ?>
        </div>
        <?php endforeach; ?>
    </div>
</div>
</div>

<!-- ================================================================
     SEÇÃO: CALENDÁRIO COMPLETO
     ================================================================ -->
<div id="sec-calendario" class="page-section">
<div class="page-wrap">
    <button onclick="showSec('home')" style="display:flex;align-items:center;gap:7px;background:none;border:1px solid var(--c-border);border-radius:var(--radius);padding:7px 14px;cursor:pointer;font-family:var(--f-body);font-size:0.78rem;font-weight:600;color:var(--c-text-muted);margin-bottom:1.25rem;">
        <i data-lucide="arrow-left" style="width:14px;height:14px;"></i> Voltar ao início
    </button>
    <div class="panel" style="padding:1.5rem;">
        <div style="font-size:0.95rem;font-weight:700;color:var(--c-brand);margin-bottom:1rem;">Agenda de Prazos — <?= date('Y') ?></div>
        
        <?php if (empty($proximosEventos)): ?>
            <div style="text-align:center;padding:2rem;color:var(--c-text-muted);">
                <i data-lucide="calendar" style="width:36px;height:36px;margin:0 auto 10px;opacity:0.3;"></i>
                Nenhuma atividade com prazo pendente ou futuro.
            </div>
        <?php else: ?>
            <?php foreach ($proximosEventos as $e): ?>
            <div style="display:flex;gap:14px;padding:12px 0;border-bottom:1px solid var(--c-border-lt);">
                <div style="width:44px;text-align:center;flex-shrink:0;">
                    <div style="font-size:0.6rem;font-weight:700;text-transform:uppercase;color:var(--c-text-muted);"><?= htmlspecialchars($e['mes']) ?></div>
                    <div style="font-size:1.4rem;font-weight:800;color:var(--c-accent);line-height:1;"><?= htmlspecialchars($e['dia']) ?></div>
                </div>
                <div style="padding-left:12px;border-left:3px solid <?= $e['cor']==='danger' ? 'var(--c-red)' : ($e['cor']==='warning' ? 'var(--c-amber)' : 'var(--c-brand)') ?>;">
                    <div style="font-size:0.82rem;font-weight:700;color:var(--c-text);margin-bottom:3px;"><?= htmlspecialchars($e['titulo']) ?></div>
                    <div style="font-size:0.72rem;color:var(--c-text-muted);"><?= htmlspecialchars($e['descricao']) ?></div>
                </div>
            </div>
            <?php endforeach; ?>
        <?php endif; ?>
    </div>
</div>
</div>


<!-- ================================================================
     SEÇÃO: PUBLICAÇÕES / FEED
     ================================================================ -->
<div id="sec-publicacoes" class="page-section">
<div class="page-wrap">
    <button onclick="showSec('home')" style="display:flex;align-items:center;gap:7px;background:none;border:1px solid var(--c-border);border-radius:var(--radius);padding:7px 14px;cursor:pointer;font-family:var(--f-body);font-size:0.78rem;font-weight:600;color:var(--c-text-muted);margin-bottom:1.25rem;">
        <i data-lucide="arrow-left" style="width:14px;height:14px;"></i> Voltar ao início
    </button>
    <div class="panel" style="background:#fff;border:1px solid #ccc;padding:20px;border-radius:8px;">
        <div class="panel-head" style="font-size:1.2rem;font-weight:bold;margin-bottom:15px;"><i data-lucide="message-square" style="width:15px;height:15px;color:var(--c-brand);"></i> Publicações da Turma</div>
        <div style="text-align:center;color:#333;">
            <i data-lucide="globe" style="width:36px;height:36px;margin:0 auto 10px;display:block;opacity:0.3;"></i>
            As publicações e fóruns de discussão estarão disponíveis em breve.
        </div>
    </div>
</div>
</div>

<!-- ================================================================
     SEÇÃO: AJUDA
     ================================================================ -->
<div id="sec-ajuda" class="page-section">
<div class="page-wrap">
    <button onclick="showSec('home')" style="display:flex;align-items:center;gap:7px;background:none;border:1px solid var(--c-border);border-radius:var(--radius);padding:7px 14px;cursor:pointer;font-family:var(--f-body);font-size:0.78rem;font-weight:600;color:var(--c-text-muted);margin-bottom:1.25rem;">
        <i data-lucide="arrow-left" style="width:14px;height:14px;"></i> Voltar ao início
    </button>
    <div class="panel" style="background:#fff;border:1px solid #ccc;padding:20px;border-radius:8px;">
        <div class="panel-head" style="font-size:1.2rem;font-weight:bold;margin-bottom:15px;"><i data-lucide="help-circle" style="width:15px;height:15px;color:var(--c-brand);"></i> Central de Ajuda</div>
        <div style="color:#333;">
            <p>Precisa de ajuda com o AVA? Entre em contato com o suporte técnico da Sophie Link ou fale com a coordenação.</p>
            <p style="margin-top:10px;"><strong>E-mail:</strong> suporte@sophielink.com.br</p>
        </div>
    </div>
</div>
</div>

<!-- ================================================================
     SEÇÃO: DESCOBRIR
     ================================================================ -->
<div id="sec-descobrir" class="page-section">
<div class="page-wrap">
    <button onclick="showSec('home')" style="display:flex;align-items:center;gap:7px;background:none;border:1px solid var(--c-border);border-radius:var(--radius);padding:7px 14px;cursor:pointer;font-family:var(--f-body);font-size:0.78rem;font-weight:600;color:var(--c-text-muted);margin-bottom:1.25rem;">
        <i data-lucide="arrow-left" style="width:14px;height:14px;"></i> Voltar ao início
    </button>
    <div class="panel" style="background:#fff;border:1px solid #ccc;padding:20px;border-radius:8px;">
        <div class="panel-head" style="font-size:1.2rem;font-weight:bold;margin-bottom:15px;"><i data-lucide="compass" style="width:15px;height:15px;color:var(--c-brand);"></i> Descobrir Novos Cursos</div>
        <div style="text-align:center;color:#333;">
            <i data-lucide="search" style="width:36px;height:36px;margin:0 auto 10px;display:block;opacity:0.3;"></i>
            Explore nossa vitrine de cursos extracurriculares aqui.
        </div>
    </div>
</div>
</div>

<!-- ================================================================
     MODAL DE ENTREGA DE ATIVIDADE
     ================================================================ -->
<div id="delivery-modal" style="display:none;position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.5);z-index:9999;align-items:center;justify-content:center;">
    <div style="background:var(--c-bg);width:100%;max-width:400px;border-radius:var(--radius);box-shadow:0 10px 25px rgba(0,0,0,0.2);overflow:hidden;">
        <div style="padding:15px 20px;border-bottom:1px solid var(--c-border);display:flex;justify-content:space-between;align-items:center;">
            <div style="font-weight:700;color:var(--c-brand);">Entregar Trabalho</div>
            <button onclick="closeDeliveryModal()" style="background:none;border:none;cursor:pointer;color:var(--c-text-muted);"><i data-lucide="x" style="width:20px;height:20px;"></i></button>
        </div>
        <form action="entregar_atividade.php" method="POST" enctype="multipart/form-data" style="padding:20px;">
            <input type="hidden" name="material_id" id="delivery-material-id" value="">
            <div style="margin-bottom:15px;font-size:0.85rem;color:var(--c-text);">
                Atividade: <strong id="delivery-title"></strong>
            </div>
            <div style="margin-bottom:20px;">
                <label style="display:block;font-size:0.75rem;font-weight:600;color:var(--c-text-muted);margin-bottom:8px;">Anexar Arquivo (PDF, DOCX, ZIP, JPG)</label>
                <input type="file" name="arquivo" required style="width:100%;padding:10px;border:1px dashed var(--c-border);border-radius:var(--radius);background:var(--c-bg-alt);color:var(--c-text);font-size:0.8rem;">
            </div>
            <div style="display:flex;justify-content:flex-end;gap:10px;">
                <button type="button" onclick="closeDeliveryModal()" style="padding:8px 15px;background:var(--c-bg-alt);border:1px solid var(--c-border);border-radius:var(--radius);color:var(--c-text);font-size:0.8rem;cursor:pointer;font-weight:600;">Cancelar</button>
                <button type="submit" style="padding:8px 15px;background:var(--c-brand);border:none;border-radius:var(--radius);color:#fff;font-size:0.8rem;cursor:pointer;font-weight:600;">Enviar Atividade</button>
            </div>
        </form>
    </div>
</div>

<script>
window.cursosAVA = <?= json_encode($cursosAVAData, JSON_UNESCAPED_UNICODE) ?>;
</script>
<script src="../assets/js/ava.js"></script>
</body>
</html>
