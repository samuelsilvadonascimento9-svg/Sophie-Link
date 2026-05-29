<?php
session_start();
if (!isset($_SESSION['usuario_id'])) { header('Location: index.php'); exit; }
$pageTitle = 'Empresas';
$activeNav = 'empresas';
require_once 'includes/layout_header.php';
?>

<!-- ===== MÓDULO EMPRESAS ===== -->

<!-- Modal: Cadastrar/Editar Empresa -->
<div class="modal-overlay" id="modalEmpresa">
    <div class="modal" style="max-width:700px">
        <div class="modal-header">
            <span class="modal-title" id="modalEmpresaTitulo">Nova Empresa</span>
            <button class="modal-close" onclick="closeModal('modalEmpresa')">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
        </div>
        <form id="formEmpresa" onsubmit="salvarEmpresa(event)">
            <input type="hidden" id="empresaId">
            <div class="modal-body">
                <div class="form-grid">
                    <div class="form-section-title">Dados da Empresa</div>

                    <div class="form-group full">
                        <label class="form-label">Nome da Empresa <span class="req">*</span></label>
                        <input type="text" id="emp_nome" class="form-input" placeholder="Razão social ou nome fantasia" required>
                    </div>
                    <div class="form-group">
                        <label class="form-label">CNPJ</label>
                        <input type="text" id="emp_cnpj" class="form-input" placeholder="00.000.000/0000-00" maxlength="18">
                    </div>
                    <div class="form-group">
                        <label class="form-label">Status</label>
                        <select id="emp_status" class="form-select">
                            <option value="ativa">Ativa</option>
                            <option value="inativa">Inativa</option>
                        </select>
                    </div>

                    <div class="form-section-title">Contato</div>

                    <div class="form-group">
                        <label class="form-label">Responsável</label>
                        <input type="text" id="emp_responsavel" class="form-input" placeholder="Nome do responsável">
                    </div>
                    <div class="form-group">
                        <label class="form-label">Telefone</label>
                        <input type="text" id="emp_telefone" class="form-input" placeholder="(00) 00000-0000">
                    </div>
                    <div class="form-group full">
                        <label class="form-label">E-mail</label>
                        <input type="email" id="emp_email" class="form-input" placeholder="contato@empresa.com.br">
                    </div>
                    <div class="form-group full">
                        <label class="form-label">Endereço</label>
                        <input type="text" id="emp_endereco" class="form-input" placeholder="Rua, número, bairro, cidade - UF">
                    </div>
                    <div class="form-group full">
                        <label class="form-label">Observações</label>
                        <textarea id="emp_observacoes" class="form-textarea" placeholder="Anotações internas sobre a empresa..."></textarea>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-ghost" onclick="closeModal('modalEmpresa')">Cancelar</button>
                <button type="submit" class="btn btn-primary">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                    Salvar Empresa
                </button>
            </div>
        </form>
    </div>
</div>

<!-- Modal: Confirmar Exclusão -->
<div class="modal-overlay" id="modalExcluir">
    <div class="modal" style="max-width:420px">
        <div class="modal-header">
            <span class="modal-title" style="color:#ef4444">Excluir Empresa</span>
            <button class="modal-close" onclick="closeModal('modalExcluir')">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
        </div>
        <div class="modal-body">
            <p style="color:var(--muted-light);font-size:0.9rem;line-height:1.6">
                Tem certeza que deseja excluir a empresa <strong id="excluirNomeEmpresa" style="color:var(--white)"></strong>?
                <br><br>
                <span style="color:#ef4444;font-size:0.82rem">⚠ Atenção: todos os aprendizes vinculados perderão o vínculo.</span>
            </p>
        </div>
        <div class="modal-footer">
            <button class="btn btn-ghost" onclick="closeModal('modalExcluir')">Cancelar</button>
            <button class="btn btn-danger" onclick="confirmarExclusao()">Excluir</button>
        </div>
    </div>
</div>

<!-- Tabela Principal -->
<div class="table-card">
    <div class="table-card-header">
        <span class="table-card-title">Empresas Parceiras</span>
        <div class="table-filters">
            <div class="search-input-wrap">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                <input type="text" id="busca" class="search-input" placeholder="Buscar empresa..." oninput="carregarEmpresas()">
            </div>
            <select id="filtroStatus" class="filter-select" onchange="carregarEmpresas()">
                <option value="">Todos os status</option>
                <option value="ativa">Ativas</option>
                <option value="inativa">Inativas</option>
            </select>
            <button class="btn btn-primary" onclick="abrirNova()">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                Nova Empresa
            </button>
        </div>
    </div>

    <div style="overflow-x:auto">
        <table>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Empresa</th>
                    <th>CNPJ</th>
                    <th>Responsável</th>
                    <th>Telefone</th>
                    <th>Aprendizes</th>
                    <th>Status</th>
                    <th>Ações</th>
                </tr>
            </thead>
            <tbody id="tbodyEmpresas">
                <tr><td colspan="8" class="table-empty">Carregando...</td></tr>
            </tbody>
        </table>
    </div>

    <div id="tableFooter" style="padding:1rem 1.5rem;font-size:0.78rem;color:var(--muted);border-top:1px solid var(--border)"></div>
</div>

<?php require_once 'includes/layout_footer.php'; ?>

<script>
let empresaParaExcluir = null;

// Máscara de CNPJ
document.getElementById('emp_cnpj').addEventListener('input', function() {
    let v = this.value.replace(/\D/g,'').substring(0,14);
    v = v.replace(/^(\d{2})(\d)/,'$1.$2');
    v = v.replace(/^(\d{2})\.(\d{3})(\d)/,'$1.$2.$3');
    v = v.replace(/\.(\d{3})(\d)/,'.$1/$2');
    v = v.replace(/(\d{4})(\d)/,'$1-$2');
    this.value = v;
});

async function carregarEmpresas() {
    const busca  = document.getElementById('busca').value;
    const status = document.getElementById('filtroStatus').value;
    const tbody  = document.getElementById('tbodyEmpresas');
    tbody.innerHTML = '<tr><td colspan="8" class="table-empty">Carregando...</td></tr>';

    try {
        const res  = await fetch(`backend/api/empresas/index.php?action=listar&busca=${encodeURIComponent(busca)}&status=${status}`);
        const json = await res.json();
        if (!json.success || !json.data.length) {
            tbody.innerHTML = '<tr><td colspan="8" class="table-empty">Nenhuma empresa encontrada.</td></tr>';
            document.getElementById('tableFooter').textContent = '';
            return;
        }
        tbody.innerHTML = json.data.map((e,i) => `
            <tr>
                <td style="color:var(--muted);font-size:0.78rem">${i+1}</td>
                <td class="td-name">${esc(e.nome)}</td>
                <td>${esc(e.cnpj) || '—'}</td>
                <td>${esc(e.responsavel) || '—'}</td>
                <td>${esc(e.telefone) || '—'}</td>
                <td>
                    <span class="badge badge-orange">${e.total_aprendizes} aprendiz${e.total_aprendizes!='1'?'es':''}</span>
                </td>
                <td>
                    <span class="badge ${e.status==='ativa'?'badge-green':'badge-red'}">
                        ${e.status==='ativa'?'Ativa':'Inativa'}
                    </span>
                </td>
                <td>
                    <div style="display:flex;gap:6px">
                        <button class="btn btn-ghost btn-sm btn-icon" title="Editar" onclick="editarEmpresa(${e.id})">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                        </button>
                        <button class="btn btn-danger btn-sm btn-icon" title="Excluir" onclick="pedirExclusao(${e.id},'${esc(e.nome).replace(/'/g,"\\'")}')">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/></svg>
                        </button>
                    </div>
                </td>
            </tr>
        `).join('');
        document.getElementById('tableFooter').textContent = `${json.data.length} empresa(s) encontrada(s)`;
    } catch {
        tbody.innerHTML = '<tr><td colspan="8" class="table-empty" style="color:#ef4444">Erro ao carregar dados. Verifique a conexão com o banco.</td></tr>';
    }
}

function abrirNova() {
    document.getElementById('formEmpresa').reset();
    document.getElementById('empresaId').value = '';
    document.getElementById('modalEmpresaTitulo').textContent = 'Nova Empresa';
    openModal('modalEmpresa');
}

async function editarEmpresa(id) {
    try {
        const res  = await fetch(`backend/api/empresas/index.php?action=buscar&id=${id}`);
        const json = await res.json();
        if (!json.success) { showToast('Erro ao carregar empresa.','error'); return; }
        const e = json.data;
        document.getElementById('empresaId').value       = e.id;
        document.getElementById('emp_nome').value        = e.nome;
        document.getElementById('emp_cnpj').value        = e.cnpj;
        document.getElementById('emp_status').value      = e.status;
        document.getElementById('emp_responsavel').value = e.responsavel;
        document.getElementById('emp_telefone').value    = e.telefone;
        document.getElementById('emp_email').value       = e.email;
        document.getElementById('emp_endereco').value    = e.endereco;
        document.getElementById('emp_observacoes').value = e.observacoes;
        document.getElementById('modalEmpresaTitulo').textContent = 'Editar Empresa';
        openModal('modalEmpresa');
    } catch { showToast('Erro de conexão.','error'); }
}

async function salvarEmpresa(e) {
    e.preventDefault();
    const id   = document.getElementById('empresaId').value;
    const dados = {
        nome:        document.getElementById('emp_nome').value,
        cnpj:        document.getElementById('emp_cnpj').value,
        status:      document.getElementById('emp_status').value,
        responsavel: document.getElementById('emp_responsavel').value,
        telefone:    document.getElementById('emp_telefone').value,
        email:       document.getElementById('emp_email').value,
        endereco:    document.getElementById('emp_endereco').value,
        observacoes: document.getElementById('emp_observacoes').value,
    };
    const action = id ? `atualizar&id=${id}` : 'criar';
    try {
        const res  = await fetch(`backend/api/empresas/index.php?action=${action}`, {
            method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify(dados)
        });
        const json = await res.json();
        if (json.success) {
            showToast(json.message, 'success');
            closeModal('modalEmpresa');
            carregarEmpresas();
        } else {
            showToast(json.message || 'Erro ao salvar.', 'error');
        }
    } catch { showToast('Erro de conexão.', 'error'); }
}

function pedirExclusao(id, nome) {
    empresaParaExcluir = id;
    document.getElementById('excluirNomeEmpresa').textContent = nome;
    openModal('modalExcluir');
}

async function confirmarExclusao() {
    if (!empresaParaExcluir) return;
    try {
        const res  = await fetch(`backend/api/empresas/index.php?action=excluir&id=${empresaParaExcluir}`, { method:'POST' });
        const json = await res.json();
        if (json.success) {
            showToast(json.message, 'success');
            closeModal('modalExcluir');
            carregarEmpresas();
        } else {
            showToast(json.message || 'Erro ao excluir.', 'error');
        }
    } catch { showToast('Erro de conexão.','error'); }
    empresaParaExcluir = null;
}

function esc(str) {
    const d = document.createElement('div');
    d.textContent = str || '';
    return d.innerHTML;
}

// Carrega ao iniciar
carregarEmpresas();
</script>
