<?php
session_start();
require_once '../../includes/auth.php';
protect_page(['aluno', 'professor', 'admin']);
require_once '../../includes/db.php';
/** @var PDO $pdo */

$id = $_GET['id'] ?? 0;
$discId = $_GET['disc'] ?? 0;
$catKey = $_GET['cat'] ?? '';

$material = null;

if ($id) {
    // Fetch the specific material
    $stmt = $pdo->prepare("
        SELECT m.*, d.nome AS disciplina_nome, d.id AS disciplina_id 
        FROM ava_materiais m
        JOIN disciplinas d ON m.disciplina_id = d.id
        WHERE m.id = ?
    ");
    $stmt->execute([$id]);
    $material = $stmt->fetch();
} else if ($discId && $catKey) {
    // Fetch the first material of this category
    $tipo = $catKey;
    if ($catKey === 'arquivos') $tipo = 'pdf';
    if ($catKey === 'avaliacoes') $tipo = 'avaliacao';
    if ($catKey === 'atividades') $tipo = 'atividade';
    
    $stmt = $pdo->prepare("
        SELECT m.*, d.nome AS disciplina_nome, d.id AS disciplina_id 
        FROM ava_materiais m
        JOIN disciplinas d ON m.disciplina_id = d.id
        WHERE m.disciplina_id = ? AND m.tipo = ?
        ORDER BY m.id ASC LIMIT 1
    ");
    $stmt->execute([$discId, $tipo]);
    $material = $stmt->fetch();
    
    if (!$material) {
        // Mock a material so the viewer can still load the category cover
        $stmtD = $pdo->prepare("SELECT nome FROM disciplinas WHERE id = ?");
        $stmtD->execute([$discId]);
        $dName = $stmtD->fetchColumn() ?: 'Disciplina';
        
        $material = [
            'id' => 0,
            'disciplina_id' => $discId,
            'disciplina_nome' => $dName,
            'tipo' => $tipo,
            'titulo' => ucfirst($catKey),
            'descricao' => '',
            'arquivo_path' => '',
            'data_entrega' => null
        ];
        $id = 0;
    } else {
        $id = $material['id'];
    }
}

if (!$material) {
    die("Material não encontrado.");
}

$disciplina_id = $material['disciplina_id'];
$tipo = $material['tipo'];

// Fetch all materials of the same type for this discipline to build the sidebar
$stmtAll = $pdo->prepare("
    SELECT id, titulo, arquivo_path 
    FROM ava_materiais 
    WHERE disciplina_id = ? AND tipo = ?
    ORDER BY id ASC
");
$stmtAll->execute([$disciplina_id, $tipo]);
$materiais = $stmtAll->fetchAll();

$currentIndex = 0;
foreach ($materiais as $index => $mat) {
    if ($mat['id'] == $id) {
        $currentIndex = $index;
        break;
    }
}

$prevId = $currentIndex > 0 ? $materiais[$currentIndex - 1]['id'] : null;
$nextId = $currentIndex < count($materiais) - 1 ? $materiais[$currentIndex + 1]['id'] : null;

$catLabel = "Arquivos";
if ($tipo == 'apresentacao') $catLabel = "Apresentação";
if ($tipo == 'atividade') $catLabel = "Atividades";
if ($tipo == 'avaliacao') $catLabel = "Avaliações";

// Make sure we have a valid path for the iframe
// In a real scenario, this would be the actual file path. 
// If it's empty, we'll just show a placeholder.
$fileUrl = $material['arquivo_path'] ? '../' . $material['arquivo_path'] : ''; 
?>
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Visualizador - Sophie Link</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
    <script src="https://unpkg.com/lucide@latest"></script>
    <style>
        :root {
            --bg-body: #f8f9fa;
            --sidebar-w: 320px;
            --c-brand: #1a2a5c; /* Dark blue from screenshot */
            --c-sel: #e8f0fe;
            --c-border: #dadce0;
        }
        * { box-sizing: border-box; margin: 0; padding: 0; font-family: 'Inter', sans-serif; }
        body { display: flex; height: 100vh; overflow: hidden; background: var(--bg-body); }
        
        /* SIDEBAR */
        .sidebar {
            width: var(--sidebar-w);
            background: #fff;
            border-right: 1px solid var(--c-border);
            display: flex;
            flex-direction: column;
            z-index: 10;
        }
        .sb-top {
            padding: 10px 15px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            border-bottom: 1px solid var(--c-border);
        }
        .btn-back {
            display: flex; align-items: center; gap: 5px; color: #333; text-decoration: none; font-size: 0.85rem; font-weight: 600;
        }
        .btn-close {
            color: #555; background: none; border: none; cursor: pointer; display: flex; align-items: center;
        }
        
        .sb-header {
            background: var(--c-brand);
            color: #fff;
            padding: 20px 15px;
        }
        .sb-course { font-size: 0.75rem; opacity: 0.9; margin-bottom: 8px; }
        .sb-cat-row { display: flex; justify-content: space-between; align-items: center; }
        .sb-cat-title { font-size: 1.2rem; font-weight: 700; }
        .sb-progress { 
            width: 32px; height: 32px; border: 2px solid rgba(255,255,255,0.3); border-radius: 50%;
            display: flex; align-items: center; justify-content: center; font-size: 0.75rem; font-weight: 600;
        }

        .sb-list {
            flex: 1;
            overflow-y: auto;
            padding: 15px 10px;
        }
        .sb-item {
            display: flex; align-items: center; justify-content: space-between;
            padding: 12px 15px;
            margin-bottom: 8px;
            border-radius: 6px;
            text-decoration: none;
            color: #333;
            font-size: 0.8rem;
            font-weight: 600;
            border: 1px solid transparent;
        }
        .sb-item:hover { background: #f1f3f4; }
        .sb-item.active {
            background: var(--c-sel);
            border-color: #1967d2;
            color: #1967d2;
        }
        .sb-item-left { display: flex; flex-direction: column; gap: 4px; flex: 1; }
        .sb-item-title { display: flex; align-items: center; gap: 8px; text-transform: uppercase; font-size: 0.8rem; }
        .sb-item-meta { font-size: 0.65rem; color: #777; font-weight: 400; text-transform: none; }
        
        .sb-footer {
            padding: 15px;
            border-top: 1px solid var(--c-border);
        }
        .sb-end-link {
            color: #1967d2; text-decoration: none; font-weight: 600; font-size: 0.85rem; display: block; text-align: center;
        }

        /* MAIN VIEWER */
        .main {
            flex: 1;
            display: flex;
            flex-direction: column;
            background: #fff;
        }
        .topbar {
            height: 60px;
            border-bottom: 1px solid var(--c-border);
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0 20px;
        }
        .tb-title { font-size: 1rem; font-weight: 700; color: #333; text-transform: uppercase; }
        .tb-nav { display: flex; align-items: center; gap: 15px; }
        .nav-btn {
            width: 36px; height: 36px; border-radius: 50%; border: 1px solid var(--c-border);
            display: flex; align-items: center; justify-content: center; background: #fff; color: #555; cursor: pointer;
            text-decoration: none;
        }
        .nav-btn:hover { background: #f1f3f4; }
        .nav-btn.disabled { opacity: 0.4; pointer-events: none; }
        
        .tb-actions { display: flex; gap: 15px; }
        .action-btn { display: flex; align-items: center; gap: 6px; color: #1967d2; font-weight: 600; font-size: 0.85rem; text-decoration: none; }
        
        .viewer-container {
            flex: 1;
            background: #525659;
            padding: 20px;
            display: flex;
            flex-direction: column;
        }
        .pdf-toolbar {
            background: #323639; color: #fff; padding: 10px 15px; display: flex; justify-content: space-between;
            font-size: 0.8rem; border-top-left-radius: 4px; border-top-right-radius: 4px;
        }
        .iframe-wrap {
            flex: 1;
            background: #fff;
            width: 100%;
            max-width: 900px;
            margin: 0 auto;
            box-shadow: 0 4px 12px rgba(0,0,0,0.2);
            overflow: hidden;
        }
        iframe { width: 100%; height: 100%; border: none; }
    </style>
</head>
<body>

    <!-- SIDEBAR -->
    <div class="sidebar">
        <div class="sb-top">
            <a href="ava.php?curso=<?= $disciplina_id ?>" class="btn-back"><i data-lucide="chevron-left" style="width:16px;"></i> Voltar</a>
            <button class="btn-close" onclick="window.location.href='ava.php?curso=<?= $disciplina_id ?>'"><i data-lucide="x" style="width:18px;"></i></button>
        </div>
        
        <div class="sb-header">
            <div class="sb-course"><?= htmlspecialchars($material['disciplina_nome']) ?> &bull; Unidade 2 de 4</div>
            <div class="sb-cat-row">
                <div class="sb-cat-title"><?= $catLabel ?></div>
                <div class="sb-progress"><?= count($materiais) ?>/<?= count($materiais) ?></div>
            </div>
        </div>

        <div class="sb-list">
            <?php foreach ($materiais as $mat): ?>
                <a href="?id=<?= $mat['id'] ?>" class="sb-item <?= $mat['id'] == $id ? 'active' : '' ?>">
                    <div class="sb-item-left">
                        <div class="sb-item-title">
                            <i data-lucide="file-text" style="width:16px; color: <?= $mat['id'] == $id ? '#1967d2' : '#555' ?>;"></i>
                            <?= htmlspecialchars($mat['titulo']) ?>
                        </div>
                        <?php if (in_array($tipo, ['atividade', 'avaliacao'])): ?>
                            <div class="sb-item-meta">
                                <?= $mat['data_entrega'] ? 'Prazo ' . date('d \d\e M \d\e Y 23:59', strtotime($mat['data_entrega'])) : 'Sem prazo' ?>
                            </div>
                        <?php endif; ?>
                    </div>
                    <i data-lucide="check" style="width:16px; color:#333;"></i>
                </a>
            <?php endforeach; ?>
        </div>
        
        <div class="sb-footer">
            <a href="ava.php?curso=<?= $disciplina_id ?>" class="sb-end-link">Fim da unidade</a>
        </div>
    </div>

    <!-- MAIN -->
    <div class="main">
        <div class="topbar">
            <div class="tb-title"><?= htmlspecialchars($material['titulo']) ?></div>
            <div class="tb-actions">
                <a href="#" class="action-btn" onclick="window.print(); return false;"><i data-lucide="printer" style="width:16px;"></i> Imprimir</a>
                <?php if ($fileUrl): ?>
                    <a href="download_material.php?id=<?= $id ?>" target="_blank" class="action-btn" download><i data-lucide="download" style="width:16px;"></i> Baixar</a>
                <?php else: ?>
                    <a href="#" class="action-btn" onclick="alert('Este é um material de teste e não possui um PDF real associado.'); return false;"><i data-lucide="download" style="width:16px;"></i> Baixar</a>
                <?php endif; ?>
            </div>
            <div class="tb-nav">
                <a href="<?= $prevId ? "?id=$prevId" : "#" ?>" class="nav-btn <?= !$prevId ? 'disabled' : '' ?>"><i data-lucide="chevron-left" style="width:18px;"></i></a>
                <a href="<?= $nextId ? "?id=$nextId" : "#" ?>" class="nav-btn <?= !$nextId ? 'disabled' : '' ?>"><i data-lucide="chevron-right" style="width:18px;"></i></a>
            </div>
        </div>
        
        <?php if ($tipo === 'avaliacao'): ?>
            <!-- AVALIACAO LAYOUT (Quiz Summary) -->
            <div style="flex: 1; background: #fff; overflow-y: auto; padding: 40px;">
                <div style="max-width: 900px; margin: 0 auto;">
                    <h1 style="font-size: 2.2rem; font-weight: 400; color: #222; margin-bottom: 40px;">Resumo</h1>
                    
                    <h2 style="font-size: 1.4rem; font-weight: 400; color: #333; margin-bottom: 5px;">Período do questionário decorrido</h2>
                    <h2 style="font-size: 1.4rem; font-weight: 400; color: #333; margin-bottom: 30px;">Detalhes do questionário</h2>
                    
                    <div style="margin-bottom: 25px;">
                        <div style="font-size: 0.8rem; font-weight: 700; color: #111; margin-bottom: 5px;">Usuário atual</div>
                        <div style="font-size: 0.95rem; color: #333;"><?= htmlspecialchars($_SESSION['usuario_nome']) ?> (nome de usuário: <?= str_pad($_SESSION['usuario_id'], 6, '0', STR_PAD_LEFT) ?>)</div>
                    </div>
                    
                    <div style="margin-bottom: 25px;">
                        <div style="font-size: 0.8rem; font-weight: 700; color: #111; margin-bottom: 5px;">Limite de Tempo</div>
                        <div style="font-size: 0.95rem; color: #333;">120 minutos</div>
                    </div>
                    
                    <div style="margin-bottom: 25px;">
                        <div style="font-size: 0.8rem; font-weight: 700; color: #111; margin-bottom: 5px;">Disponibilidade</div>
                        <div style="font-size: 0.95rem; color: #333; line-height: 1.5;">
                            <?= $material['data_entrega'] ? 'Vencimento em ' . date('d \d\e M \d\e Y 21:30', strtotime($material['data_entrega'])) : 'Sem data de vencimento' ?><br>
                            <?= $material['data_entrega'] ? 'Disponível em ' . date('d \d\e M \d\e Y 19:00', strtotime($material['data_entrega'])) . ' até ' . date('d \d\e M \d\e Y 21:30', strtotime($material['data_entrega'])) : 'Sempre disponível' ?>
                        </div>
                    </div>
                    
                    <div style="margin-bottom: 25px;">
                        <div style="font-size: 0.8rem; font-weight: 700; color: #111; margin-bottom: 5px;">Tentativas</div>
                        <div style="font-size: 0.95rem; color: #333;">Permitido - 1, Concluído - 1</div>
                    </div>
                </div>
            </div>
            
        <?php elseif ($tipo === 'apresentacao'): ?>
            <!-- APRESENTACAO LAYOUT -->
            <div style="flex: 1; background: #fff; overflow-y: auto; padding: 50px;">
                <div style="max-width: 900px; margin: 0 auto;">
                    <h1 style="font-size: 2rem; font-weight: 400; color: #222; margin-bottom: 40px; border-bottom: 1px solid #eee; padding-bottom: 20px;">
                        <?= htmlspecialchars($material['titulo']) ?>
                    </h1>
                    
                    <?php if ($fileUrl): ?>
                        <!-- Se tiver PDF, mostra num iframe limpo -->
                        <div style="height: 600px; border: 1px solid #ddd; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
                            <iframe src="<?= $fileUrl ?>" style="width:100%; height:100%; border:none;"></iframe>
                        </div>
                    <?php else: ?>
                        <!-- Mockup visual igual ao da screenshot -->
                        <div style="background: #3f54ab; height: 200px; position: relative; overflow: hidden; display: flex; align-items: center; justify-content: center; margin-top: 20px; box-shadow: 0 4px 15px rgba(0,0,0,0.1);">
                            
                            <!-- Efeito de papel rasgado nas laterais (simulado com divs brancas giradas) -->
                            <div style="position: absolute; right: -20px; top: -10%; width: 50px; height: 120%; background: #fff; transform: rotate(3deg);"></div>
                            <div style="position: absolute; right: -30px; top: -10%; width: 40px; height: 120%; background: #f8f9fa; transform: rotate(-2deg);"></div>
                            
                            <!-- Ícones decorativos esquerdo -->
                            <div style="position: absolute; left: 40px; display: flex; align-items: center;">
                                <div style="background: rgba(255,255,255,0.1); padding: 15px; border-radius: 8px;">
                                    <i data-lucide="presentation" style="width: 50px; height: 50px; color: #fff;"></i>
                                </div>
                            </div>

                            <!-- Label tracejada -->
                            <div style="color: #fff; font-size: 2.2rem; font-weight: 800; letter-spacing: 2px; text-transform: uppercase; border: 3px dashed rgba(255,255,255,0.9); border-radius: 12px; padding: 15px 35px; z-index: 2;">
                                APRESENTAÇÃO
                            </div>
                        </div>
                    <?php endif; ?>
                </div>
            </div>
            
        <?php elseif ($tipo === 'atividade'): ?>
            <!-- ACTIVITY LAYOUT (File Upload) -->
            <div style="flex: 1; background: #fff; overflow-y: auto; padding: 40px;">
                <div style="max-width: 900px; margin: 0 auto;">
                    <div style="background: #f8f9fa; padding: 20px 25px; border-bottom: 1px solid #ddd; margin-bottom: 30px;">
                        <h1 style="font-size: 1.5rem; font-weight: 400; color: #222; text-transform: uppercase;">
                            <?= htmlspecialchars($material['titulo']) ?>
                        </h1>
                    </div>
                    
                    <h3 style="font-size: 1.05rem; color: #333; margin-bottom: 12px; font-weight: 700;">Envios de pasta</h3>
                    
                    <!-- MOCK UPLOADED FILE -->
                    <div style="border: 1px solid #ddd; padding: 20px; margin-bottom: 30px;">
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
                            <div style="display: flex; align-items: center; gap: 8px; color: #1967d2; font-size: 0.9rem;">
                                <i data-lucide="file-text" style="width:16px; color:#555;"></i>
                                Certificado.pdf <span style="color:#888; font-size:0.75rem;">(1,56 MB)</span>
                            </div>
                            <div style="color: #444; font-size: 0.85rem;">
                                <?= date('d \d\e M \d\e Y 15:40') ?>
                            </div>
                        </div>
                    </div>
                    
                    <!-- UPLOAD AREA -->
                    <div style="border: 1px dashed #b9c1cc; padding: 25px; margin-bottom: 30px; text-align: center; background: #fdfdfd;">
                        <div style="font-size: 0.95rem; color: #333; margin-bottom: 15px; text-align: left;">
                            Deposite arquivos aqui ou clique abaixo!
                        </div>
                        <div style="display: flex; gap: 10px; margin-bottom: 15px;">
                            <button style="display:flex;align-items:center;gap:6px;background:#eef1f5;border:none;padding:8px 20px;border-radius:4px;font-size:0.85rem;font-weight:600;color:#333;cursor:pointer;">
                                <i data-lucide="cloud-upload" style="width:16px;"></i> Carregar
                            </button>
                            <button style="display:flex;align-items:center;gap:6px;background:#eef1f5;border:none;padding:8px 20px;border-radius:4px;font-size:0.85rem;font-weight:600;color:#333;cursor:pointer;">
                                Gravar <i data-lucide="chevron-down" style="width:14px;"></i>
                            </button>
                            <button style="background:#eef1f5;border:none;padding:8px 20px;border-radius:4px;font-size:0.85rem;font-weight:600;color:#333;cursor:pointer;">
                                Selecione Existente
                            </button>
                        </div>
                        <div style="font-size: 0.85rem; color: #555; text-align: left;">
                            Você pode carregar arquivos de até um máximo de 2 GB.
                        </div>
                    </div>
                    
                    <!-- RICH TEXT EDITOR MOCKUP -->
                    <h3 style="font-size: 1.05rem; color: #333; margin-bottom: 12px; font-weight: 700;">Comentários</h3>
                    <div style="border: 1px solid #ccc; border-radius: 2px;">
                        <div style="background: #f8f9fa; border-bottom: 1px solid #ccc; padding: 8px 12px; display: flex; gap: 15px; flex-wrap: wrap; align-items: center; color: #444;">
                            <div style="display:flex;align-items:center;gap:4px;cursor:pointer;font-size:0.85rem;">Parágrafo <i data-lucide="chevron-down" style="width:14px;"></i></div>
                            <div style="width:1px;height:20px;background:#ccc;"></div>
                            <div style="display:flex;gap:12px;">
                                <i data-lucide="bold" style="width:16px;cursor:pointer;"></i>
                                <i data-lucide="italic" style="width:16px;cursor:pointer;"></i>
                                <i data-lucide="underline" style="width:16px;cursor:pointer;"></i>
                            </div>
                            <div style="width:1px;height:20px;background:#ccc;"></div>
                            <div style="display:flex;align-items:center;gap:4px;cursor:pointer;"><i data-lucide="align-left" style="width:16px;"></i> <i data-lucide="chevron-down" style="width:14px;"></i></div>
                            <div style="width:1px;height:20px;background:#ccc;"></div>
                            <div style="display:flex;align-items:center;gap:4px;cursor:pointer;"><i data-lucide="list" style="width:16px;"></i> <i data-lucide="chevron-down" style="width:14px;"></i></div>
                            <div style="width:1px;height:20px;background:#ccc;"></div>
                            <i data-lucide="link" style="width:16px;cursor:pointer;"></i>
                            <i data-lucide="image" style="width:16px;cursor:pointer;"></i>
                        </div>
                        <textarea style="width: 100%; min-height: 150px; border: none; padding: 15px; resize: vertical; outline: none; font-family: inherit; font-size: 0.95rem;"></textarea>
                    </div>
                </div>
            </div>
        <?php else: ?>
            <!-- PDF VIEWER LAYOUT -->
            <div class="viewer-container">
                <div class="pdf-toolbar">
                    <div><?= htmlspecialchars($material['titulo']) ?></div>
                    <div style="display:flex; gap:15px; align-items:center;">
                        <i data-lucide="zoom-out" style="width:14px; cursor:pointer;"></i>
                        <span>1 de 5</span>
                        <i data-lucide="zoom-in" style="width:14px; cursor:pointer;"></i>
                        <i data-lucide="maximize" style="width:14px; cursor:pointer; margin-left:10px;"></i>
                    </div>
                </div>
                <div class="iframe-wrap">
                    <?php if($fileUrl): ?>
                        <iframe src="<?= $fileUrl ?>"></iframe>
                    <?php else: ?>
                        <div style="padding: 40px; text-align: center; color: #333;">
                            <h1 style="color:#2a504b; font-size:2rem; margin-bottom:10px;">SIMULADO: FUNDAMENTOS DE REDES E CABEAMENTO</h1>
                            <h3 style="color:#d32f2f; margin-bottom:30px;">BLOCO 1: COMPONENTES E CONCEITOS BÁSICOS</h3>
                            <div style="text-align: left; max-width: 600px; margin: 0 auto; line-height: 1.8;">
                                <p><strong>1. Qual componente de hardware é responsável por fornecer um endereço físico (MAC Address) ao host?</strong></p>
                                <p>a) Roteador<br>b) NIC (Placa de Rede)<br>c) Hub<br>d) Protocolo</p>
                                <br>
                                <p><strong>2. Um smartphone conectado ao Wi-Fi de uma biblioteca é considerado um:</strong></p>
                                <p>a) Meio de transmissão<br>b) Protocolo de aplicação<br>c) Host (Anfitrião)<br>d) Serviço de rede</p>
                            </div>
                        </div>
                    <?php endif; ?>
                </div>
            </div>
        <?php endif; ?>
    </div>

    <script>
        lucide.createIcons();
    </script>
</body>
</html>
