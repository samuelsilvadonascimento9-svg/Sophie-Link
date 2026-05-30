<?php
session_start();
if (!isset($_SESSION['usuario_id'])) { header("Location: ../index.php'); exit; }
$pageTitle = 'Empresas';
$activeNav = 'empresas';
require_once '../components/layout_header.php';
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

<?php require_once '../components/layout_footer.php'; ?>

<script src="../assets/js/empresas.js"></script>
