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
<style>
/* ================================================================
   RESET & TOKENS (ESTILO AVA BRIGHTSPACE)
   ================================================================ */
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
:root {
    --c-brand:      #8B5CF6; /* Roxo Acadêmico para o Professor */
    --c-brand-d:    #7C3AED;
    --c-brand-lt:   #F5F3FF;
    --c-accent:     #111827;
    --c-accent-lt:  #F5F6FA;
    --c-teal:       #0D9488;
    --c-bg:         #f8f9fb;
    --c-surface:    #FFFFFF;
    --c-border:     #d9d9d9;
    --c-border-lt:  #efefef;
    --c-text:       #1d1d1b;
    --c-text-2:     #444444;
    --c-text-muted: #767676;
    --c-text-link:  #006DAE;
    --c-green:      #2E8540;
    --c-green-lt:   #EDF7EF;
    --c-red:        #CC0000;
    --c-red-lt:     #fff0f0;
    --c-amber:      #E0A000;
    --c-amber-lt:   #FFFBEB;
    --nav-h:        54px;
    --subnav-h:     44px;
    --radius:       4px;
    --radius-lg:    6px;
    --shadow-sm:    0 1px 3px rgba(0,0,0,0.1);
    --shadow:       0 2px 8px rgba(0,0,0,0.12);
    --f-body:       'Inter', sans-serif;
}
html { font-size: 15px; scroll-behavior: smooth; }
body { font-family: var(--f-body); background: var(--c-bg); color: var(--c-text); -webkit-font-smoothing: antialiased; overflow-x: hidden; }
a { text-decoration: none; color: inherit; }
::-webkit-scrollbar { width: 5px; height: 5px; } ::-webkit-scrollbar-thumb { background: #ccc; border-radius: 10px; }
img { display: block; max-width: 100%; }

/* ================================================================
   TOP NAVBAR (estilo Brightspace)
   ================================================================ */
.topnav {
    height: var(--nav-h); background: var(--c-surface); border-bottom: 1px solid var(--c-border);
    display: flex; align-items: center; padding: 0 1.5rem; position: sticky; top: 0; z-index: 500; box-shadow: var(--shadow-sm); gap: 0;
}
.tn-logo { display: flex; align-items: center; gap: 12px; padding-right: 1.25rem; border-right: 1px solid var(--c-border); flex-shrink: 0; text-decoration: none; }
.tn-logo-mark {
    width: 34px; height: 34px; background: #FF6B00; border-radius: 4px; display: flex; align-items: center; justify-content: center;
    font-size: 0.9rem; font-weight: 700; color: #fff; letter-spacing: -0.5px; flex-shrink: 0;
}
.tn-logo-text { line-height: 1.1; }
.tn-logo-name { font-size: 0.85rem; font-weight: 700; color: #FF6B00; letter-spacing: 0.3px; }
.tn-logo-sub  { font-size: 0.6rem; color: var(--c-text-muted); }
.tn-divider { width: 1px; background: var(--c-border); align-self: stretch; margin: 0 1rem; }
.tn-site-name { font-size: 0.88rem; font-weight: 600; color: var(--c-text); padding-left: 0.25rem; }
.tn-spacer { flex: 1; }
.tn-icons { display: flex; align-items: center; gap: 2px; }
.tn-icon-btn {
    width: 38px; height: 38px; border-radius: 50%; background: none; border: none; cursor: pointer; display: flex; align-items: center; justify-content: center;
    color: var(--c-text-muted); position: relative; transition: background 0.15s;
}
.tn-icon-btn:hover { background: var(--c-brand-lt); color: var(--c-brand); }
.tn-icon-btn i { width: 19px; height: 19px; }
.tn-badge { position: absolute; top: 4px; right: 4px; width: 16px; height: 16px; background: var(--c-red); color: #fff; border-radius: 50%; font-size: 0.55rem; font-weight: 700; display: flex; align-items: center; justify-content: center; border: 2px solid #fff; }
.tn-user { display: flex; align-items: center; gap: 8px; padding: 6px 10px; border-radius: var(--radius); cursor: pointer; transition: background 0.15s; margin-left: 4px; }
.tn-user:hover { background: var(--c-bg); }
.tn-avatar { width: 34px; height: 34px; border-radius: 50%; background: var(--c-brand); display: flex; align-items: center; justify-content: center; font-size: 0.75rem; font-weight: 700; color: #fff; flex-shrink: 0; letter-spacing: 0.5px; }
.tn-user-name { font-size: 0.72rem; font-weight: 600; color: var(--c-text); text-transform: uppercase; letter-spacing: 0.3px; max-width: 140px; line-height: 1.2; }
.tn-settings { color: var(--c-text-muted); width: 38px; height: 38px; display: flex; align-items: center; justify-content: center; border-radius: 50%; cursor: pointer; transition: background 0.15s; }
.tn-settings:hover { background: var(--c-brand-lt); color: var(--c-brand); }
.tn-settings i { width: 19px; height: 19px; }

/* ================================================================
   SUB-NAVBAR (dark mode)
   ================================================================ */
.subnav { height: var(--subnav-h); background: var(--c-accent); display: flex; align-items: center; padding: 0 1.5rem; gap: 0; position: sticky; top: var(--nav-h); z-index: 400; }
.subnav-link { display: flex; align-items: center; gap: 6px; height: var(--subnav-h); padding: 0 14px; font-size: 0.8rem; font-weight: 500; color: rgba(255,255,255,0.82); border-bottom: 3px solid transparent; transition: all 0.15s; white-space: nowrap; cursor: pointer; }
.subnav-link:hover { color: #fff; background: rgba(255,255,255,0.08); }
.subnav-link.active { color: #fff; border-bottom-color: var(--c-brand); font-weight: 600; }
.subnav-link i { width: 14px; height: 14px; opacity: 0.7; }
.subnav-sep { width: 1px; background: rgba(255,255,255,0.15); height: 20px; margin: 0 4px; }

/* ================================================================
   HERO BANNER
   ================================================================ */
.hero { position: relative; height: 150px; overflow: hidden; background: linear-gradient(135deg, var(--c-brand) 0%, #4C1D95 100%); display: flex; flex-direction: column; justify-content: center; padding: 0 3rem; color: #fff; }
.hero-icon { position: absolute; right: 5%; top: -20px; width: 180px; height: 180px; opacity: 0.1; transform: rotate(-15deg); }
.hero-title { font-size: 1.8rem; font-weight: 300; letter-spacing: -0.5px; }
.hero-title strong { font-weight: 700; }

/* ================================================================
   MAIN LAYOUT (2 COLUMNS)
   ================================================================ */
.container { max-width: 1400px; margin: 0 auto; padding: 1.5rem 2rem; display: flex; gap: 1.5rem; }
.col-main { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 1.5rem; }
.col-side { width: 340px; flex-shrink: 0; display: flex; flex-direction: column; gap: 1.5rem; }

@media (max-width: 992px) {
    .container { flex-direction: column; padding: 1rem; }
    .col-side { width: 100%; }
}

/* ================================================================
   WIDGETS (CARDS)
   ================================================================ */
.widget { background: var(--c-surface); border: 1px solid var(--c-border); border-radius: var(--radius-lg); box-shadow: var(--shadow-sm); overflow: hidden; }
.w-head { padding: 12px 16px; border-bottom: 1px solid var(--c-border-lt); display: flex; align-items: center; justify-content: space-between; background: #fff; }
.w-title { font-size: 0.95rem; font-weight: 600; color: var(--c-text); display: flex; align-items: center; gap: 8px; }
.w-title i { color: var(--c-text-muted); width: 18px; height: 18px; }
.w-action { font-size: 0.75rem; font-weight: 600; color: var(--c-brand); cursor: pointer; }
.w-action:hover { text-decoration: underline; }
.w-body { padding: 1rem; }

/* Form Elements */
.input-field { width: 100%; padding: 8px 12px; border: 1px solid var(--c-border); border-radius: var(--radius); font-size: 0.85rem; outline: none; }
.input-field:focus { border-color: var(--c-brand); }
.btn-primary { background: var(--c-brand); color: #fff; border: none; padding: 8px 16px; border-radius: var(--radius); font-weight: 600; font-size: 0.85rem; cursor: pointer; transition: 0.2s; }
.btn-primary:hover { background: var(--c-brand-d); }

/* Table */
.data-table { width: 100%; border-collapse: collapse; }
.data-table th { text-align: left; padding: 8px 12px; font-size: 0.75rem; color: var(--c-text-muted); border-bottom: 2px solid var(--c-border-lt); }
.data-table td { padding: 10px 12px; font-size: 0.85rem; border-bottom: 1px solid var(--c-border-lt); }

.sec { display: none; }
.sec.active { display: block; }

/* Alerts */
.alert-success { background: var(--c-green-lt); color: var(--c-green); padding: 10px 15px; border-radius: var(--radius); font-size: 0.85rem; font-weight: 600; margin-bottom: 15px; display: flex; align-items: center; gap: 8px; border: 1px solid rgba(46,133,64,0.2); }
</style>
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

<script>
lucide.createIcons();
function showSec(id, el) {
    document.querySelectorAll('.sec').forEach(s => s.classList.remove('active'));
    document.getElementById('sec-' + id).classList.add('active');
    document.querySelectorAll('.subnav-link').forEach(l => l.classList.remove('active'));
    el.classList.add('active');
}
</script>
</body>
</html>
