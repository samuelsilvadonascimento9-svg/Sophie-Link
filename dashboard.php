<?php
// dashboard.php — Painel Dev/Admin (CMS) | Sophie Link
session_start();
if (!isset($_SESSION['usuario_id']) || $_SESSION['usuario_nivel'] !== 'admin') {
    // Apenas admin tem acesso ao CMS agora
    header("Location: login.php");
    exit;
}
$nome       = $_SESSION['usuario_nome'] ?? 'Administrador';
$primeiroNome = explode(' ', $nome)[0];
?>
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Painel Dev/CMS — Sophie Link</title>
    <meta name="robots" content="noindex">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Syne:wght@700;800&display=swap" rel="stylesheet">
    <script src="https://unpkg.com/lucide@latest"></script>
<style>
/* ================================================================
   RESET & TOKENS — CMS
   ================================================================ */
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
:root {
    --c-primary:    #FF6B00;
    --c-primary-d:  #D95A00;
    --c-primary-lt: #FFF0E6;
    --c-bg:         #111827; /* Dark mode for dev panel */
    --c-surface:    #1F2937;
    --c-border:     #374151;
    --c-border-lt:  #4B5563;
    --c-text:       #F9FAFB;
    --c-text-2:     #D1D5DB;
    --c-text-muted: #9CA3AF;
    --c-text-light: #6B7280;
    --c-blue:       #3B82F6;
    --c-green:      #22C55E;
    --c-red:        #EF4444;
    --sidebar-w:    256px;
    --header-h:     64px;
    --radius:       12px;
    --radius-sm:    8px;
    --shadow:       0 4px 12px rgba(0,0,0,0.5);
    --f-body:       'Inter', sans-serif;
    --f-display:    'Syne', sans-serif;
}
html { font-size: 16px; }
body { font-family: var(--f-body); background: var(--c-bg); color: var(--c-text); -webkit-font-smoothing: antialiased; overflow-x: hidden; }
a { text-decoration: none; color: inherit; }

/* LAYOUT */
.app { display: flex; min-height: 100vh; }

/* SIDEBAR */
.sidebar { width: var(--sidebar-w); background: var(--c-surface); border-right: 1px solid var(--c-border); display: flex; flex-direction: column; position: fixed; top: 0; left: 0; bottom: 0; z-index: 200; }
.sb-brand { display: flex; align-items: center; gap: 10px; padding: 18px 18px 14px; border-bottom: 1px solid var(--c-border-lt); flex-shrink: 0; }
.sb-tag { font-size: 0.58rem; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; color: var(--c-primary); margin-top: 1px; }

.sb-user { display: flex; align-items: center; gap: 10px; padding: 12px 16px; background: var(--c-bg); margin: 10px; border-radius: var(--radius); }
.sb-avatar { width: 36px; height: 36px; background: var(--c-primary); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 0.85rem; color: #fff; flex-shrink: 0; }
.sb-uname { font-size: 0.8rem; font-weight: 600; color: var(--c-text); }
.sb-urole { font-size: 0.68rem; color: var(--c-text-muted); }

.sb-sec { padding: 10px 18px 4px; font-size: 0.6rem; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; color: var(--c-text-light); }
.nav-link { display: flex; align-items: center; gap: 10px; padding: 9px 14px 9px 18px; font-size: 0.82rem; font-weight: 500; color: var(--c-text-muted); transition: all 0.15s; position: relative; cursor: pointer; }
.nav-link i { width: 16px; height: 16px; flex-shrink: 0; }
.nav-link:hover, .nav-link.active { color: var(--c-primary); background: rgba(255,107,0,0.1); }
.nav-link.active { font-weight: 600; }
.nav-link.active::before { content: ''; position: absolute; left: 0; top: 4px; bottom: 4px; width: 3px; background: var(--c-primary); border-radius: 0 3px 3px 0; }

.sb-footer { margin-top: auto; padding: 14px 18px; border-top: 1px solid var(--c-border-lt); }
.sb-footer a { display: flex; align-items: center; gap: 8px; font-size: 0.77rem; font-weight: 500; color: var(--c-text-muted); transition: color 0.15s; }
.sb-footer a:hover { color: var(--c-primary); }

/* WORKSPACE */
.workspace { margin-left: var(--sidebar-w); flex: 1; display: flex; flex-direction: column; }
.topbar { height: var(--header-h); background: var(--c-surface); border-bottom: 1px solid var(--c-border); display: flex; align-items: center; justify-content: space-between; padding: 0 2rem; position: sticky; top: 0; z-index: 100; }
.tb-title { font-size: 1rem; font-weight: 700; color: var(--c-text); }
.content { padding: 2rem; flex: 1; }

.page-hdr { margin-bottom: 2rem; }
.ph-title { font-family: var(--f-display); font-size: 1.8rem; font-weight: 800; color: var(--c-text); margin-bottom: 6px; }
.ph-sub { font-size: 0.88rem; color: var(--c-text-muted); max-width: 600px; }

.card { background: var(--c-surface); border: 1px solid var(--c-border); border-radius: var(--radius); box-shadow: var(--shadow); margin-bottom: 1.5rem; padding: 1.5rem; }

/* SEÇÕES */
.sec { display: none; }
.sec.active { display: block; }

.btn { background: var(--c-primary); color: #fff; border: none; border-radius: var(--radius-sm); padding: 10px 20px; font-family: var(--f-body); font-weight: 700; font-size: 0.85rem; cursor: pointer; transition: background 0.2s; }
.btn:hover { background: var(--c-primary-d); }

.input-group { margin-bottom: 1rem; }
.input-label { font-size: 0.75rem; font-weight: 700; color: var(--c-text-muted); display: block; margin-bottom: 5px; }
.input-field { width: 100%; padding: 10px 14px; border: 1px solid var(--c-border); border-radius: var(--radius-sm); background: var(--c-bg); color: var(--c-text); font-family: var(--f-body); font-size: 0.85rem; outline: none; transition: border-color 0.2s; }
.input-field:focus { border-color: var(--c-primary); }

.pill { padding: 3px 8px; border-radius: 20px; font-size: 0.65rem; font-weight: 700; background: rgba(34,197,94,0.1); color: var(--c-green); }
.pill.red { background: rgba(239,68,68,0.1); color: var(--c-red); }
</style>
</head>
<body>
<div class="app">

    <aside class="sidebar">
        <div class="sb-brand" style="flex-direction: column; align-items: flex-start; gap: 4px;">
            <img src="assets/images/image-removebg-preview (1).png" alt="Sophie Link" style="height: 32px; object-fit: contain;">
            <div class="sb-tag">Painel CMS (Dev/Admin)</div>
        </div>

        <div class="sb-user">
            <div class="sb-avatar"><?= strtoupper(substr($nome, 0, 1)) ?></div>
            <div>
                <div class="sb-uname"><?= htmlspecialchars($primeiroNome) ?></div>
                <div class="sb-urole">Webmaster</div>
            </div>
        </div>

        <div class="sb-sec">Site & Conteúdo</div>
        <a href="#" class="nav-link active" onclick="showSec('configuracoes',this)"><i data-lucide="layout"></i> Layout da Home</a>
        <a href="#" class="nav-link" onclick="showSec('imagens',this)"><i data-lucide="image"></i> Gerir Imagens</a>
        
        <div class="sb-sec">Segurança</div>
        <a href="#" class="nav-link" onclick="showSec('usuarios',this)"><i data-lucide="shield-check"></i> Usuários do Sistema</a>

        <div class="sb-sec">Outros Portais</div>
        <a href="painel_academico.php" class="nav-link"><i data-lucide="external-link"></i> Painel Acadêmico</a>
        <a href="portal_professor.php" class="nav-link"><i data-lucide="external-link"></i> Portal Professor</a>

        <div class="sb-footer">
            <a href="login.php"><i data-lucide="log-out"></i> Sair do Painel CMS</a>
        </div>
    </aside>

    <div class="workspace">
        <header class="topbar">
            <div class="tb-title" id="topbar-title">Layout da Home</div>
        </header>

        <main class="content">

            <!-- =========== CONFIGURAÇÕES DO SITE (LAYOUT) =========== -->
            <div id="sec-configuracoes" class="sec active">
                <div class="page-hdr">
                    <div class="ph-title">Configurações do Layout</div>
                    <div class="ph-sub">Controle as seções que aparecem na página principal do site (index.php).</div>
                </div>

                <div style="display:grid;grid-template-columns:1fr 1fr;gap:1.5rem;">
                    <div class="card">
                        <div style="font-size:1rem;font-weight:700;margin-bottom:1rem;display:flex;align-items:center;gap:8px;"><i data-lucide="globe" style="color:var(--c-primary);"></i> SEO & Textos Básicos</div>
                        <div class="input-group">
                            <label class="input-label">Nome da Instituição (Title Tag)</label>
                            <input type="text" class="input-field" value="Centro Técnico Profissionalizante Sophie Link">
                        </div>
                        <div class="input-group">
                            <label class="input-label">Telefone Rodapé</label>
                            <input type="text" class="input-field" value="(94) 3346-0000">
                        </div>
                        <div class="input-group">
                            <label class="input-label">Link do WhatsApp</label>
                            <input type="text" class="input-field" value="https://wa.me/5594991234567">
                        </div>
                        <button class="btn" style="margin-top:10px;">Salvar Textos</button>
                    </div>

                    <div class="card">
                        <div style="font-size:1rem;font-weight:700;margin-bottom:1rem;display:flex;align-items:center;gap:8px;"><i data-lucide="layers" style="color:var(--c-primary);"></i> Visibilidade de Seções</div>
                        <div style="display:flex;flex-direction:column;gap:10px;">
                            <?php $secoes = ['Hero (Banner Principal)' => true, 'Seção Nossos Cursos' => true, 'Depoimentos (Egressos)' => false, 'Rodapé de Contato' => true]; foreach ($secoes as $sec => $ativo): ?>
                            <div style="display:flex;align-items:center;justify-content:space-between;padding:12px 14px;background:var(--c-bg);border:1px solid var(--c-border);border-radius:var(--radius-sm);">
                                <span style="font-size:0.85rem;font-weight:600;color:var(--c-text-2);"><?= $sec ?></span>
                                <label style="display:flex;align-items:center;gap:8px;cursor:pointer;">
                                    <input type="checkbox" <?= $ativo ? 'checked' : '' ?> style="accent-color:var(--c-primary);width:16px;height:16px;">
                                    <span style="font-size:0.75rem;color:var(--c-text-muted);"><?= $ativo ? 'Visível' : 'Oculto' ?></span>
                                </label>
                            </div>
                            <?php endforeach; ?>
                            <button class="btn" style="margin-top:10px;">Atualizar Layout</button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- =========== GERIR IMAGENS =========== -->
            <div id="sec-imagens" class="sec">
                <div class="page-hdr">
                    <div class="ph-title">Gestão de Mídia</div>
                    <div class="ph-sub">Altere os banners e logotipos que aparecem no frontend do portal.</div>
                </div>
                <div class="card">
                    <p style="font-size:0.85rem; color:var(--c-text-muted); margin-bottom: 20px;">Interface de upload de imagens (WIP). O envio processará imagens para WebP automaticamente.</p>
                    <div style="border: 2px dashed var(--c-border); border-radius: var(--radius); padding: 40px; text-align: center; color: var(--c-text-muted); cursor: pointer;" onmouseover="this.style.borderColor='var(--c-primary)'" onmouseout="this.style.borderColor='var(--c-border)'">
                        <i data-lucide="upload-cloud" style="width: 40px; height: 40px; margin-bottom: 10px; color: var(--c-primary);"></i>
                        <p>Arraste arquivos ou clique para fazer upload.</p>
                    </div>
                </div>
            </div>

            <!-- =========== USUÁRIOS DO SISTEMA =========== -->
            <div id="sec-usuarios" class="sec">
                <div class="page-hdr">
                    <div class="ph-title">Usuários & Acessos</div>
                    <div class="ph-sub">Gestão de credenciais para as plataformas (CMS, Acadêmico, Professor).</div>
                </div>
                <div style="display:flex;justify-content:flex-end;margin-bottom:1rem;">
                    <button class="btn"><i data-lucide="user-plus" style="width:15px;height:15px;vertical-align:middle;"></i> Novo Usuário</button>
                </div>
                <div class="card" style="padding:0; overflow:hidden;">
                    <table style="width: 100%; border-collapse: collapse;">
                        <thead>
                            <tr style="background:var(--c-bg); border-bottom:1px solid var(--c-border);">
                                <th style="text-align:left; padding:12px 20px; font-size:0.75rem; color:var(--c-text-muted);">Usuário</th>
                                <th style="text-align:left; padding:12px 20px; font-size:0.75rem; color:var(--c-text-muted);">E-mail</th>
                                <th style="text-align:left; padding:12px 20px; font-size:0.75rem; color:var(--c-text-muted);">Acesso à Plataforma</th>
                                <th style="text-align:left; padding:12px 20px; font-size:0.75rem; color:var(--c-text-muted);">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr style="border-bottom:1px solid var(--c-border);">
                                <td style="padding:15px 20px; font-size:0.85rem; font-weight:600;">Admin Master</td>
                                <td style="padding:15px 20px; font-size:0.85rem; color:var(--c-text-2);">admin@sophielink.com.br</td>
                                <td style="padding:15px 20px;"><span class="pill red">Painel CMS / Tudo</span></td>
                                <td style="padding:15px 20px;"><span class="pill">Ativo</span></td>
                            </tr>
                            <tr style="border-bottom:1px solid var(--c-border);">
                                <td style="padding:15px 20px; font-size:0.85rem; font-weight:600;">Coordenação</td>
                                <td style="padding:15px 20px; font-size:0.85rem; color:var(--c-text-2);">coord@sophielink.com.br</td>
                                <td style="padding:15px 20px;"><span class="pill" style="background:rgba(59,130,246,0.1);color:var(--c-blue);">Painel Acadêmico</span></td>
                                <td style="padding:15px 20px;"><span class="pill">Ativo</span></td>
                            </tr>
                            <tr>
                                <td style="padding:15px 20px; font-size:0.85rem; font-weight:600;">Prof. Carlos Menezes</td>
                                <td style="padding:15px 20px; font-size:0.85rem; color:var(--c-text-2);">carlos@sophielink.com.br</td>
                                <td style="padding:15px 20px;"><span class="pill" style="background:rgba(255,107,0,0.1);color:var(--c-primary);">Portal do Professor</span></td>
                                <td style="padding:15px 20px;"><span class="pill">Ativo</span></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

        </main>
    </div>
</div>

<script>
lucide.createIcons();
function showSec(id, el) {
    event && event.preventDefault();
    document.querySelectorAll('.sec').forEach(s => s.classList.remove('active'));
    const sec = document.getElementById('sec-' + id);
    if (sec) sec.classList.add('active');
    document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
    if (el) el.classList.add('active');
    const titles = { configuracoes:'Layout da Home', imagens:'Gestão de Imagens', usuarios:'Usuários & Acessos' };
    document.getElementById('topbar-title').textContent = titles[id] || 'CMS';
}
</script>
</body>
</html>
