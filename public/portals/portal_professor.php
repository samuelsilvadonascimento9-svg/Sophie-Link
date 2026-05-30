<?php
// portal_professor.php — Portal do Professor | Sophie Link (Estilo AVA/Brightspace)
session_start();
if (!isset($_SESSION['usuario_id']) || $_SESSION['usuario_nivel'] !== 'professor') {
    header("Location: ../login.php?tipo=professor");
    exit;
}
$nome = $_SESSION['usuario_nome'] ?? 'Professor';
$primeiroNome = explode(' ', str_replace(['Prof. ','Dr. '], '', $nome))[0];

require_once '../../includes/db.php';
$sucesso = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_POST['acao']) && $_POST['acao'] === 'lancar_frequencia') {
        $data_registro = $_POST['data_registro'];
        foreach($_POST as $key => $val) {
            if (strpos($key, 'freq_') === 0) {
                $aluno_id = str_replace('freq_', '', $key);
                $status = ($val === 'P') ? 'presente' : 'falta';
                $stmt = $pdo->prepare("INSERT INTO frequencia (aprendiz_id, data_registro, status, registrado_por) VALUES (?, ?, ?, ?)");
                $stmt->execute([$aluno_id, $data_registro, $status, $_SESSION['usuario_id']]);
            }
        }
        $sucesso = 'Frequência lançada com sucesso!';
    }
    
    if (isset($_POST['acao']) && $_POST['acao'] === 'lancar_notas') {
        $atividade = $_POST['atividade'];
        $data_registro = date('Y-m-d');
        foreach($_POST as $key => $val) {
            if (strpos($key, 'nota_') === 0 && $val !== '') {
                $aluno_id = str_replace('nota_', '', $key);
                $stmt = $pdo->prepare("INSERT INTO notas (aprendiz_id, atividade, valor_nota, data_registro, registrado_por) VALUES (?, ?, ?, ?, ?)");
                $stmt->execute([$aluno_id, $atividade, (float)$val, $data_registro, $_SESSION['usuario_id']]);
            }
        }
        $sucesso = 'Notas lançadas com sucesso!';
    }
}

// Buscar alunos para as tabelas
$stmtAlunos = $pdo->query("SELECT id, cpf, nome, curso FROM aprendizes ORDER BY nome ASC");
$alunosDb = $stmtAlunos->fetchAll();
?>
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Portal do Professor — AVA Sophie Link</title>
    <meta name="robots" content="noindex">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&display=swap" rel="stylesheet">
    <script src="https://unpkg.com/lucide@latest"></script>
<link rel="stylesheet" href="../assets/css/portal_professor.css">

    <link rel="stylesheet" href="../assets/css/premium.css">
</head>
<body>

<!-- TOP NAVBAR -->
<nav class="topnav">
    <a href="#" class="tn-logo">
        <div class="tn-logo-mark">SL</div>
        <div class="tn-logo-text">
            <div class="tn-logo-name">SOPHIE LINK</div>
            <div class="tn-logo-sub">Ambiente Virtual</div>
        </div>
    </a>
    <div class="tn-site-name">Portal do Professor</div>
    <div class="tn-spacer"></div>
    <div class="tn-icons">
        <button class="tn-icon-btn"><i data-lucide="mail"></i></button>
        <button class="tn-icon-btn"><i data-lucide="bell"></i><span class="tn-badge">3</span></button>
    </div>
    <div class="tn-user">
        <div class="tn-avatar"><?= strtoupper(substr($primeiroNome, 0, 1)) ?></div>
        <div class="tn-user-name">Prof. <?= htmlspecialchars($primeiroNome) ?></div>
    </div>
    <div class="tn-divider"></div>
    <a href="../logout.php" class="tn-settings" title="Sair"><i data-lucide="log-out"></i></a>
</nav>

<!-- SUB NAVBAR -->
<div class="subnav">
    <div class="subnav-link active" onclick="showSec('inicio', this)"><i data-lucide="home"></i> Início</div>
    <div class="subnav-sep"></div>
    <div class="subnav-link" onclick="showSec('diario', this)"><i data-lucide="book-open"></i> Lançar Notas</div>
    <div class="subnav-sep"></div>
    <div class="subnav-link" onclick="showSec('frequencia', this)"><i data-lucide="calendar-check"></i> Lançar Frequência</div>
    <div class="subnav-sep"></div>
    <a href="ava.php" class="subnav-link" style="color: var(--c-brand); font-weight: 700; text-decoration: none;"><i data-lucide="monitor-play"></i> Acessar AVA</a>
</div>

<!-- HERO -->
<div class="hero">
    <i data-lucide="graduation-cap" class="hero-icon"></i>
    <div class="hero-title">Bem-vindo de volta, <strong><?= htmlspecialchars($primeiroNome) ?></strong></div>
</div>

<div class="container">
    <!-- COLUNA PRINCIPAL -->
    <div class="col-main">
        <?php if($sucesso): ?>
            <div class="alert-success"><i data-lucide="check-circle"></i> <?= $sucesso ?></div>
        <?php endif; ?>

        <!-- SEC: INICIO -->
        <div id="sec-inicio" class="sec active">
            <div class="widget">
                <div class="w-head">
                    <div class="w-title"><i data-lucide="book-open"></i> Minhas Turmas</div>
                </div>
                <div class="w-body" style="display:flex; gap: 15px; flex-wrap: wrap;">
                    <div style="width:200px; border:1px solid var(--c-border); border-radius:var(--radius); overflow:hidden;">
                        <div style="height:100px; background:linear-gradient(135deg, var(--c-brand) 0%, #4C1D95 100%);"></div>
                        <div style="padding:10px;">
                            <div style="font-weight:700; font-size:0.85rem; color:var(--c-text-link);">Turma Eletromecânica 2026</div>
                            <div style="font-size:0.7rem; color:var(--c-text-muted); margin-top:4px;">34 Alunos</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- SEC: NOTAS -->
        <div id="sec-diario" class="sec">
            <div class="widget">
                <div class="w-head">
                    <div class="w-title"><i data-lucide="pen-tool"></i> Lançamento de Notas</div>
                </div>
                <div class="w-body">
                    <form method="POST">
                        <input type="hidden" name="acao" value="lancar_notas">
                        <div style="margin-bottom: 15px;">
                            <label style="font-size:0.8rem; font-weight:600; display:block; margin-bottom:5px;">Nome da Atividade/Prova</label>
                            <input type="text" name="atividade" class="input-field" placeholder="Ex: Prova Bimestral 1" required>
                        </div>
                        <table class="data-table">
                            <thead><tr><th>RA</th><th>Aluno</th><th>Nota (0-10)</th></tr></thead>
                            <tbody>
                                <?php foreach($alunosDb as $a): ?>
                                <tr>
                                    <td><?= str_pad($a['id'], 6, '0', STR_PAD_LEFT) ?></td>
                                    <td style="font-weight:600;"><?= htmlspecialchars($a['nome']) ?></td>
                                    <td><input type="number" step="0.1" name="nota_<?= $a['id'] ?>" class="input-field" style="width:100px;" placeholder="Ex: 8.5"></td>
                                </tr>
                                <?php endforeach; ?>
                            </tbody>
                        </table>
                        <div style="margin-top: 15px; text-align:right;">
                            <button type="submit" class="btn-primary">Salvar Notas</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

        <!-- SEC: FREQUENCIA -->
        <div id="sec-frequencia" class="sec">
            <div class="widget">
                <div class="w-head">
                    <div class="w-title"><i data-lucide="calendar-check"></i> Chamada Eletrônica</div>
                </div>
                <div class="w-body">
                    <form method="POST">
                        <input type="hidden" name="acao" value="lancar_frequencia">
                        <div style="margin-bottom: 15px;">
                            <label style="font-size:0.8rem; font-weight:600; display:block; margin-bottom:5px;">Data da Aula</label>
                            <input type="date" name="data_registro" class="input-field" value="<?= date('Y-m-d') ?>" style="width:200px;" required>
                        </div>
                        <table class="data-table">
                            <thead><tr><th>RA</th><th>Aluno</th><th>Presença</th></tr></thead>
                            <tbody>
                                <?php foreach($alunosDb as $a): ?>
                                <tr>
                                    <td><?= str_pad($a['id'], 6, '0', STR_PAD_LEFT) ?></td>
                                    <td style="font-weight:600;"><?= htmlspecialchars($a['nome']) ?></td>
                                    <td>
                                        <select name="freq_<?= $a['id'] ?>" class="input-field" style="width:120px;">
                                            <option value="P">Presente (P)</option>
                                            <option value="F">Falta (F)</option>
                                        </select>
                                    </td>
                                </tr>
                                <?php endforeach; ?>
                            </tbody>
                        </table>
                        <div style="margin-top: 15px; text-align:right;">
                            <button type="submit" class="btn-primary">Salvar Frequência</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>

    <!-- COLUNA LATERAL -->
    <div class="col-side">
        <div class="widget">
            <div class="w-head">
                <div class="w-title"><i data-lucide="bell"></i> Avisos da Coordenação</div>
            </div>
            <div class="w-body" style="font-size: 0.85rem; color: var(--c-text-2);">
                <div style="margin-bottom: 10px; border-bottom:1px solid var(--c-border-lt); padding-bottom:10px;">
                    <div style="font-weight:600; color:var(--c-text); margin-bottom:3px;">Prazo de Notas</div>
                    O prazo para lançamento das notas bimestrais encerra nesta sexta-feira.
                </div>
                <div>
                    <div style="font-weight:600; color:var(--c-text); margin-bottom:3px;">Reunião Pedagógica</div>
                    Reunião agendada para o dia 15/06 às 14h.
                </div>
            </div>
        </div>
    </div>
</div>

<script src="../assets/js/portal_professor.js"></script>
</body>
</html>
