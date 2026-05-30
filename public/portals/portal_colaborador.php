<?php
// portal_colaborador.php — Portal da Secretaria / Colaborador | Sophie Link
session_start();
if (!isset($_SESSION['usuario_id']) || $_SESSION['usuario_nivel'] !== 'colaborador') {
    header("Location: ../login.php");
    exit;
}
require_once '../../includes/db.php';

$nome = $_SESSION['usuario_nome'] ?? 'Secretaria';
$primeiroNome = explode(' ', $nome)[0];

// Se for um pedido de exportação
if (isset($_GET['export']) && $_GET['export'] === 'csv') {
    header('Content-Type: text/csv; charset=utf-8');
    header('Content-Disposition: attachment; filename=alunos_sophielink.csv');
    $output = fopen('php://output', 'w');
    // Adiciona o BOM para o Excel ler acentos corretamente
    fprintf($output, chr(0xEF).chr(0xBB).chr(0xBF));
    fputcsv($output, ['ID', 'Nome', 'CPF', 'RG', 'Curso', 'Situação', 'Criado Em'], ';');
    
    $stmt = $pdo->query("SELECT id, nome, cpf, rg, curso, situacao_aluno, criado_em FROM aprendizes WHERE deleted_at IS NULL ORDER BY nome ASC");
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        fputcsv($output, $row, ';');
    }
    fclose($output);
    exit;
}

$erro = '';
$sucesso = '';

// Lógica de CRUD: Matricular novo aluno
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['acao']) && $_POST['acao'] === 'matricular') {
    $novo_nome = trim($_POST['nome']);
    $novo_cpf = trim($_POST['cpf']);
    $novo_rg = trim($_POST['rg']);
    $novo_curso = trim($_POST['curso']);

    if (empty($novo_nome) || empty($novo_cpf) || empty($novo_rg) || empty($novo_curso)) {
        $erro = "Todos os campos são obrigatórios.";
    } else {
        try {
            $stmt = $pdo->prepare("INSERT INTO aprendizes (nome, cpf, rg, curso, situacao_aluno) VALUES (?, ?, ?, ?, 'cursando')");
            $stmt->execute([$novo_nome, $novo_cpf, $novo_rg, $novo_curso]);
            $sucesso = "Aluno matriculado com sucesso!";
        } catch (PDOException $e) {
            $erro = "Erro ao cadastrar aluno no banco de dados. " . $e->getMessage();
        }
    }
}

// Buscar todos os aprendizes para a lista (CRM Style)
$stmt = $pdo->query("
    SELECT a.*, e.nome AS empresa_nome 
    FROM aprendizes a 
    LEFT JOIN contratos c ON a.id = c.aprendiz_id 
    LEFT JOIN empresas e ON c.empresa_id = e.id
    ORDER BY a.nome ASC
");
$aprendizes = $stmt->fetchAll(PDO::FETCH_ASSOC);

// Métricas Rápidas
$totalAlunos = count($aprendizes);
$ativos = 0;
foreach ($aprendizes as $a) {
    if ($a['situacao_aluno'] === 'cursando') $ativos++;
}
?>
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Atendimento (Colaborador) — Sophie Link</title>
    <meta name="robots" content="noindex">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
    <script src="https://unpkg.com/lucide@latest"></script>
    <style>
        /* ================================================================
           RESET & TOKENS (CRM / Helpdesk Theme - Emerald)
           ================================================================ */
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        :root {
            --c-brand: #0D9488;
            --c-brand-d: #0F766E;
            --c-brand-lt: #F0FDFA;
            --c-bg: #F3F4F6;
            --c-surface: #FFFFFF;
            --c-border: #E5E7EB;
            --c-text: #111827;
            --c-text-2: #374151;
            --c-text-muted: #6B7280;
            --c-warning: #F59E0B;
            --c-warning-lt: #FEF3C7;
            --sidebar-w: 240px;
            --header-h: 60px;
            --radius: 6px;
            --f-body: 'Inter', sans-serif;
        }
        html { font-size: 14px; }
        body { font-family: var(--f-body); background: var(--c-bg); color: var(--c-text); -webkit-font-smoothing: antialiased; }
        a { text-decoration: none; color: inherit; }

        .app { display: flex; height: 100vh; overflow: hidden; }

        /* SIDEBAR */
        .sidebar { width: var(--sidebar-w); background: var(--c-surface); border-right: 1px solid var(--c-border); display: flex; flex-direction: column; z-index: 100; }
        .sb-header { height: var(--header-h); border-bottom: 1px solid var(--c-border); display: flex; align-items: center; gap: 10px; padding: 0 20px; }
        .sb-logo { width: 32px; height: 32px; background: var(--c-brand); color: #fff; border-radius: 4px; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 16px; }
        .sb-title { font-weight: 600; font-size: 14px; color: var(--c-text); letter-spacing: -0.3px; }
        .sb-menu { flex: 1; padding: 20px 12px; overflow-y: auto; }
        .sb-lbl { font-size: 11px; font-weight: 600; color: var(--c-text-muted); text-transform: uppercase; letter-spacing: 1px; margin: 0 8px 10px; }
        .nav-link { display: flex; align-items: center; gap: 10px; padding: 8px 12px; border-radius: var(--radius); color: var(--c-text-2); font-weight: 500; cursor: pointer; transition: 0.15s; margin-bottom: 4px; }
        .nav-link:hover { background: var(--c-bg); color: var(--c-text); }
        .nav-link.active { background: var(--c-brand-lt); color: var(--c-brand-d); font-weight: 600; }
        .nav-link i { width: 18px; height: 18px; }
        .sb-user { padding: 16px 20px; border-top: 1px solid var(--c-border); display: flex; align-items: center; gap: 10px; }
        .sb-avatar { width: 32px; height: 32px; border-radius: 50%; background: var(--c-brand-d); color: #fff; display: flex; align-items: center; justify-content: center; font-weight: 600; }
        .sb-uname { font-weight: 600; font-size: 13px; color: var(--c-text); }
        .sb-urole { font-size: 12px; color: var(--c-text-muted); }

        /* WORKSPACE */
        .workspace { flex: 1; display: flex; flex-direction: column; overflow: hidden; }
        .topbar { height: var(--header-h); background: var(--c-surface); border-bottom: 1px solid var(--c-border); display: flex; align-items: center; justify-content: space-between; padding: 0 24px; }
        .search-bar { display: flex; align-items: center; gap: 8px; background: var(--c-bg); border-radius: 20px; padding: 6px 16px; width: 300px; border: 1px solid transparent; transition: 0.2s; }
        .search-bar:focus-within { border-color: var(--c-brand); background: #fff; }
        .search-bar i { width: 16px; height: 16px; color: var(--c-text-muted); }
        .search-bar input { border: none; background: transparent; outline: none; width: 100%; font-size: 13px; color: var(--c-text); }
        .tb-actions { display: flex; align-items: center; gap: 12px; }

        .btn { display: inline-flex; align-items: center; gap: 6px; padding: 8px 16px; border-radius: var(--radius); font-size: 13px; font-weight: 500; cursor: pointer; border: 1px solid transparent; transition: 0.2s; }
        .btn-primary { background: var(--c-brand); color: #fff; }
        .btn-primary:hover { background: var(--c-brand-d); }
        .btn-outline { border-color: var(--c-border); color: var(--c-text-2); background: #fff; }
        .btn-outline:hover { border-color: var(--c-text-muted); }

        /* CONTENT */
        .content { flex: 1; padding: 24px; overflow-y: auto; }
        .page-title { font-size: 20px; font-weight: 600; letter-spacing: -0.5px; margin-bottom: 4px; }
        .page-desc { color: var(--c-text-muted); margin-bottom: 24px; }

        /* METRICS */
        .metrics { display: flex; gap: 16px; margin-bottom: 24px; }
        .metric-card { flex: 1; background: var(--c-surface); border: 1px solid var(--c-border); border-radius: var(--radius); padding: 16px; display: flex; align-items: center; gap: 16px; }
        .mc-icon { width: 44px; height: 44px; border-radius: 50%; background: var(--c-brand-lt); color: var(--c-brand-d); display: flex; align-items: center; justify-content: center; }
        .mc-val { font-size: 24px; font-weight: 700; line-height: 1; margin-bottom: 4px; }
        .mc-lbl { font-size: 12px; font-weight: 500; color: var(--c-text-muted); text-transform: uppercase; }

        /* PANELS & TABLES */
        .panel { background: var(--c-surface); border: 1px solid var(--c-border); border-radius: var(--radius); }
        .panel-head { padding: 16px 20px; border-bottom: 1px solid var(--c-border); display: flex; align-items: center; justify-content: space-between; }
        .panel-title { font-weight: 600; font-size: 15px; }
        .table-wrap { overflow-x: auto; }
        .data-table { width: 100%; border-collapse: collapse; }
        .data-table th { text-align: left; padding: 12px 20px; font-size: 12px; font-weight: 600; color: var(--c-text-muted); text-transform: uppercase; border-bottom: 1px solid var(--c-border); background: #FAFAFA; }
        .data-table td { padding: 14px 20px; font-size: 13px; color: var(--c-text-2); border-bottom: 1px solid var(--c-border); }
        .data-table tr:hover { background: var(--c-bg); }
        .data-table tr:last-child td { border-bottom: none; }

        .badge { padding: 4px 8px; border-radius: 20px; font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; }
        .badge-green { background: #D1FAE5; color: #065F46; }
        .badge-yellow { background: var(--c-warning-lt); color: #B45309; }

        .sec { display: none; }
        .sec.active { display: block; }
        .qa-btn { background: none; border: none; color: var(--c-brand); cursor: pointer; margin-right: 8px; }
        .qa-btn:hover { color: var(--c-brand-d); text-decoration: underline; }

        /* ALERTS */
        .alert { padding: 12px 16px; border-radius: var(--radius); margin-bottom: 20px; display: flex; align-items: center; gap: 8px; font-size: 13px; font-weight: 500; }
        .alert-success { background: #D1FAE5; color: #065F46; border: 1px solid #A7F3D0; }
        .alert-error { background: #FEE2E2; color: #B91C1C; border: 1px solid #FECACA; }

        /* MODALS */
        .modal-overlay { position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.5); z-index: 1000; display: none; align-items: center; justify-content: center; }
        .modal-overlay.active { display: flex; }
        .modal-box { background: var(--c-surface); border-radius: var(--radius); width: 100%; max-width: 500px; box-shadow: 0 10px 25px rgba(0,0,0,0.1); animation: modalIn 0.2s ease-out; }
        @keyframes modalIn { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        .modal-header { padding: 16px 24px; border-bottom: 1px solid var(--c-border); display: flex; align-items: center; justify-content: space-between; }
        .modal-title { font-size: 16px; font-weight: 600; }
        .modal-close { background: none; border: none; color: var(--c-text-muted); cursor: pointer; }
        .modal-close:hover { color: var(--c-text); }
        .modal-body { padding: 24px; }
        .modal-footer { padding: 16px 24px; border-top: 1px solid var(--c-border); display: flex; justify-content: flex-end; gap: 12px; background: #FAFAFA; border-bottom-left-radius: var(--radius); border-bottom-right-radius: var(--radius); }
        
        .form-group { margin-bottom: 16px; }
        .form-label { display: block; font-size: 13px; font-weight: 500; margin-bottom: 6px; color: var(--c-text-2); }
        .form-control { width: 100%; padding: 10px 12px; border: 1px solid var(--c-border); border-radius: var(--radius); outline: none; font-size: 13px; }
        .form-control:focus { border-color: var(--c-brand); box-shadow: 0 0 0 3px var(--c-brand-lt); }
        @keyframes spin { 100% { transform: rotate(360deg); } }
    </style>
</head>

<body>
    <div class="app">
        <!-- SIDEBAR -->
        <aside class="sidebar">
            <div class="sb-header">
                <div class="sb-logo">SL</div>
                <div class="sb-title">Secretaria (Op)</div>
            </div>
            <div class="sb-menu">
                <div class="sb-lbl">Gestão</div>
                <div class="nav-link active" onclick="showSec('alunos', this)"><i data-lucide="users"></i> Buscar Alunos</div>
                <div class="nav-link" onclick="showSec('documentos', this)"><i data-lucide="file-check"></i> Emitir Declaração</div>

                <div class="sb-lbl" style="margin-top: 20px;">Agenda</div>
                <div class="nav-link" onclick="showSec('calendario', this)"><i data-lucide="calendar"></i> Calendário Letivo</div>
            </div>
            <div class="sb-user">
                <div class="sb-avatar"><?= strtoupper(substr($primeiroNome, 0, 1)) ?></div>
                <div>
                    <div class="sb-uname"><?= htmlspecialchars($primeiroNome) ?></div>
                    <div class="sb-urole">Apoio Administrativo</div>
                </div>
                <a href="../logout.php" style="margin-left:auto; color:var(--c-text-muted);"><i data-lucide="log-out" style="width:18px;"></i></a>
            </div>
        </aside>

        <!-- WORKSPACE -->
        <div class="workspace">
            <header class="topbar">
                <div class="search-bar">
                    <i data-lucide="search"></i>
                    <input type="text" placeholder="Buscar aluno por nome ou RA...">
                </div>
                <div class="tb-actions">
                    <button class="btn btn-outline"><i data-lucide="bell"></i> Avisos</button>
                    <!-- BOTÃO QUE ABRE O MODAL -->
                    <div style="display:flex; gap:10px;">
                        <a href="?export=csv" class="btn btn-outline"><i data-lucide="download" style="width:16px;"></i> CSV</a>
                        <button class="btn btn-primary" onclick="openModal('modalMatricula')"><i data-lucide="user-plus" style="width:16px;"></i> Matricular</button>
                    </div>
                </div>
            </header>

            <main class="content">
                <?php if ($sucesso): ?>
                    <div class="alert alert-success"><i data-lucide="check-circle"></i> <?= htmlspecialchars($sucesso) ?></div>
                <?php endif; ?>
                <?php if ($erro): ?>
                    <div class="alert alert-error"><i data-lucide="alert-circle"></i> <?= htmlspecialchars($erro) ?></div>
                <?php endif; ?>

                <!-- SEC: ALUNOS -->
                <div id="sec-alunos" class="sec active">
                    <h1 class="page-title">Fichas de Alunos</h1>
                    <p class="page-desc">Central de atendimento e atualização cadastral rápida.</p>

                    <div class="metrics">
                        <div class="metric-card">
                            <div class="mc-icon"><i data-lucide="users"></i></div>
                            <div>
                                <div class="mc-val"><?= $totalAlunos ?></div>
                                <div class="mc-lbl">Total Cadastrados</div>
                            </div>
                        </div>
                        <div class="metric-card">
                            <div class="mc-icon" style="background:#D1FAE5; color:#059669;"><i data-lucide="check-circle"></i></div>
                            <div>
                                <div class="mc-val"><?= $ativos ?></div>
                                <div class="mc-lbl">Ativos Cursando</div>
                            </div>
                        </div>
                    </div>

                    <div class="panel">
                        <div class="panel-head">
                            <div class="panel-title">Alunos Recentes</div>
                            <button class="btn btn-outline" style="font-size:12px;">Ver Todos</button>
                        </div>
                        <div class="table-wrap">
                            <table class="data-table">
                                <thead>
                                    <tr>
                                        <th>RA</th>
                                        <th>Nome do Aluno</th>
                                        <th>CPF</th>
                                        <th>Empresa Vinculada</th>
                                        <th>Status</th>
                                        <th>Ações</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <?php foreach ($aprendizes as $a):
                                        $ra = str_pad($a['id'], 6, '0', STR_PAD_LEFT);
                                        $isAtivo = $a['situacao_aluno'] === 'cursando';
                                    ?>
                                        <tr>
                                            <td style="font-family:monospace; color:var(--c-text-muted);"><?= $ra ?></td>
                                            <td style="font-weight:600; color:var(--c-text);"><?= htmlspecialchars($a['nome']) ?></td>
                                            <td><?= htmlspecialchars($a['cpf']) ?></td>
                                            <td><?= htmlspecialchars($a['empresa_nome'] ?? 'Sem Empresa') ?></td>
                                            <td>
                                                <span class="badge <?= $isAtivo ? 'badge-green' : 'badge-yellow' ?>">
                                                    <?= htmlspecialchars($a['situacao_aluno']) ?>
                                                </span>
                                            </td>
                                            <td>
                                                <button class="qa-btn">Editar</button>
                                                <button class="qa-btn">Atestado</button>
                                            </td>
                                        </tr>
                                    <?php endforeach; ?>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <!-- SEC: DOCUMENTOS -->
                <div id="sec-documentos" class="sec">
                    <h1 class="page-title">Emissão de Documentos</h1>
                    <p class="page-desc">Gere declarações em PDF para assinatura da direção.</p>

                    <div class="panel" style="max-width: 600px;">
                        <div class="panel-head">
                            <div class="panel-title">Nova Declaração</div>
                        </div>
                        <form action="declaracao_print.php" method="GET" target="_blank" style="padding: 24px; display: flex; flex-direction: column; gap: 16px;">
                            <div>
                                <label style="font-size:13px; font-weight:500; display:block; margin-bottom:6px;">Selecionar Aluno</label>
                                <select name="aluno_id" class="form-control" required>
                                    <option value="">-- Selecione o Aluno --</option>
                                    <?php foreach ($aprendizes as $a): ?>
                                        <option value="<?= $a['id'] ?>"><?= htmlspecialchars($a['nome']) ?> (CPF: <?= htmlspecialchars($a['cpf']) ?>)</option>
                                    <?php endforeach; ?>
                                </select>
                            </div>
                            <div>
                                <label style="font-size:13px; font-weight:500; display:block; margin-bottom:6px;">Tipo de Documento</label>
                                <select name="tipo" class="form-control" required>
                                    <option value="matricula">Declaração de Matrícula</option>
                                    <option value="frequencia">Atestado de Frequência</option>
                                    <option value="historico">Histórico Parcial</option>
                                </select>
                            </div>
                            <button type="submit" class="btn btn-primary" style="margin-top: 10px; width:100%; justify-content:center;"><i data-lucide="printer"></i> Gerar Documento Oficial (PDF)</button>
                        </form>
                    </div>
                </div>
            </main>
        </div>
    </div>

    <!-- MODAL DE MATRÍCULA -->
    <div id="modalMatricula" class="modal-overlay">
        <div class="modal-box">
            <div class="modal-header">
                <div class="modal-title">Matricular Novo Aluno</div>
                <button class="modal-close" onclick="closeModal('modalMatricula')"><i data-lucide="x"></i></button>
            </div>
            <form method="POST">
                <div class="modal-body">
                    <input type="hidden" name="acao" value="matricular">
                    
                    <div class="form-group">
                        <label class="form-label">Nome Completo</label>
                        <input type="text" name="nome" class="form-control" required placeholder="Ex: João Silva da Costa">
                    </div>
                    
                    <div style="display:flex; gap:16px;">
                        <div class="form-group" style="flex:1;">
                            <label class="form-label">CPF</label>
                            <input type="text" id="cpf_input" name="cpf" class="form-control" maxlength="14" required placeholder="000.000.000-00">
                        </div>
                        <div class="form-group" style="flex:1;">
                            <label class="form-label">RG</label>
                            <input type="text" name="rg" class="form-control" required>
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label">Curso Inicial</label>
                        <select name="curso" class="form-control" required>
                            <option value="">Selecione um curso...</option>
                            <option value="Eletromecânica">Eletromecânica</option>
                            <option value="Logística">Logística</option>
                            <option value="Administração">Administração</option>
                            <option value="Segurança do Trabalho">Segurança do Trabalho</option>
                        </select>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-outline" onclick="closeModal('modalMatricula')">Cancelar</button>
                    <button type="submit" class="btn btn-primary">Concluir Matrícula</button>
                </div>
            </form>
        </div>
    </div>

    <script>
        lucide.createIcons();

        function showSec(id, el) {
            document.querySelectorAll('.sec').forEach(s => s.classList.remove('active'));
            document.getElementById('sec-' + id).classList.add('active');
            document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
            if(el) el.classList.add('active');
        }

        // Modal Logic
        function openModal(id) {
            document.getElementById(id).classList.add('active');
        }
        function closeModal(id) {
            document.getElementById(id).classList.remove('active');
        }

        // Mask para CPF
        const cpfInput = document.getElementById('cpf_input');
        if(cpfInput) {
            cpfInput.addEventListener('input', function(e) {
                let v = e.target.value.replace(/\D/g, '');
                v = v.replace(/(\d{3})(\d)/, '$1.$2');
                v = v.replace(/(\d{3})(\d)/, '$1.$2');
                v = v.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
                e.target.value = v;
            });
        }

        // Loading Spinners for all forms
        document.querySelectorAll('form').forEach(form => {
            form.addEventListener('submit', function(e) {
                // Ignorar formulários que abrem em nova aba (Gerador de PDF)
                if(this.target === '_blank') return;
                
                const btn = this.querySelector('button[type="submit"]');
                if(btn) {
                    const originalWidth = btn.offsetWidth;
                    btn.style.width = originalWidth + 'px';
                    btn.innerHTML = '<i data-lucide="loader-2" style="animation: spin 1s linear infinite; width:16px;"></i> Aguarde...';
                    btn.style.opacity = '0.8';
                    btn.style.pointerEvents = 'none';
                    lucide.createIcons();
                }
            });
        });
    </script>
</body>
</html>