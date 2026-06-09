<?php
session_start();
if (!isset($_SESSION['usuario_id'])) { header('Location: ../index.php'); exit; }
$pageTitle = 'Aprendizes';
$activeNav = 'aprendizes';
require_once '../../includes/components/layout/header.php';
?>

<!-- ===== MÓDULO APRENDIZES ===== -->

<!-- Modal Cadastrar/Editar -->
<div class="modal-overlay" id="modalAprendiz">
    <div class="modal" style="max-width:780px">
        <div class="modal-header">
            <span class="modal-title" id="modalAprendizTitulo">Novo Aprendiz</span>
            <button class="modal-close" onclick="closeModal('modalAprendiz')">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
        </div>
        <form id="formAprendiz" onsubmit="salvarAprendiz(event)">
            <input type="hidden" id="aprendizId">
            <div class="modal-body">
                <div class="form-grid">

                    <!-- DADOS PESSOAIS -->
                    <div class="form-section-title">Dados Pessoais</div>
                    <div class="form-group full">
                        <label class="form-label">Nome Completo <span class="req">*</span></label>
                        <input type="text" id="ap_nome" class="form-input" placeholder="Nome completo do aprendiz" required>
                    </div>
                    <div class="form-group">
                        <label class="form-label">CPF</label>
                        <input type="text" id="ap_cpf" class="form-input" placeholder="000.000.000-00" maxlength="14">
                    </div>
                    <div class="form-group">
                        <label class="form-label">RG</label>
                        <input type="text" id="ap_rg" class="form-input" placeholder="0000000">
                    </div>
                    <div class="form-group">
                        <label class="form-label">Data de Nascimento</label>
                        <input type="date" id="ap_data_nascimento" class="form-input">
                    </div>
                    <div class="form-group">
                        <label class="form-label">Telefone</label>
                        <input type="text" id="ap_telefone" class="form-input" placeholder="(00) 00000-0000">
                    </div>
                    <div class="form-group full">
                        <label class="form-label">E-mail</label>
                        <input type="email" id="ap_email" class="form-input" placeholder="aprendiz@email.com">
                    </div>
                    <div class="form-group full">
                        <label class="form-label">Endereço</label>
                        <input type="text" id="ap_endereco" class="form-input" placeholder="Rua, número, bairro, cidade - UF">
                    </div>
                    <div class="form-group">
                        <label class="form-label">Nome da Mãe</label>
                        <input type="text" id="ap_nome_mae" class="form-input" placeholder="Nome completo da mãe">
                    </div>
                    <div class="form-group">
                        <label class="form-label">Nome do Pai</label>
                        <input type="text" id="ap_nome_pai" class="form-input" placeholder="Nome completo do pai">
                    </div>

                    <!-- VÍNCULO EMPRESARIAL -->
                    <div class="form-section-title">Vínculo e Contrato</div>
                    <div class="form-group full">
                        <label class="form-label">Empresa Parceira <span class="req">*</span></label>
                        <select id="ap_empresa_id" class="form-select" required>
                            <option value="">Selecione a empresa...</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Curso / Turma</label>
                        <input type="text" id="ap_curso" class="form-input" placeholder="Ex: Aprendizagem Comercial">
                    </div>
                    <div class="form-group">
                        <label class="form-label">Status do Contrato</label>
                        <select id="ap_status_contrato" class="form-select">
                            <option value="ativo">Ativo</option>
                            <option value="encerrado">Encerrado</option>
                            <option value="pendente">Pendente</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Data de Entrada <span class="req">*</span></label>
                        <input type="date" id="ap_data_entrada" class="form-input" required>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Data de Término <span class="req">*</span></label>
                        <input type="date" id="ap_data_termino" class="form-input" required>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Situação do Aluno</label>
                        <select id="ap_situacao_aluno" class="form-select">
                            <option value="cursando">Cursando</option>
                            <option value="formado">Formado</option>
                            <option value="evadido">Evadido</option>
                        </select>
                    </div>
                    <div class="form-group full">
                        <label class="form-label">Observações</label>
                        <textarea id="ap_observacoes" class="form-textarea" placeholder="Anotações relevantes sobre o aprendiz..."></textarea>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-ghost" onclick="closeModal('modalAprendiz')">Cancelar</button>
                <button type="submit" class="btn btn-primary">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                    Salvar Aprendiz
                </button>
            </div>
        </form>
    </div>
</div>

<!-- Modal Excluir -->
<div class="modal-overlay" id="modalExcluirAp">
    <div class="modal" style="max-width:420px">
        <div class="modal-header">
            <span class="modal-title" style="color:#ef4444">Excluir Aprendiz</span>
            <button class="modal-close" onclick="closeModal('modalExcluirAp')">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
        </div>
        <div class="modal-body">
            <p style="color:var(--muted-light);font-size:0.9rem;line-height:1.6">
                Tem certeza que deseja excluir o aprendiz <strong id="excluirNomeAp" style="color:var(--white)"></strong>?<br><br>
                <span style="color:#ef4444;font-size:0.82rem">⚠ Esta ação não pode ser desfeita.</span>
            </p>
        </div>
        <div class="modal-footer">
            <button class="btn btn-ghost" onclick="closeModal('modalExcluirAp')">Cancelar</button>
            <button class="btn btn-danger" onclick="confirmarExclusaoAp()">Excluir</button>
        </div>
    </div>
</div>

<!-- Tabela Principal -->
<div class="table-card">
    <div class="table-card-header">
        <span class="table-card-title">Lista de Aprendizes</span>
        <div class="table-filters">
            <div class="search-input-wrap">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                <input type="text" id="busca" class="search-input" placeholder="Buscar aprendiz..." oninput="carregarAprendizes()">
            </div>
            <select id="filtroEmpresa" class="filter-select" onchange="carregarAprendizes()">
                <option value="">Todas as empresas</option>
            </select>
            <select id="filtroSituacao" class="filter-select" onchange="carregarAprendizes()">
                <option value="">Todas as situações</option>
                <option value="cursando">Cursando</option>
                <option value="formado">Formado</option>
                <option value="evadido">Evadido</option>
            </select>
            <button class="btn btn-primary" onclick="abrirNovo()">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                Novo Aprendiz
            </button>
        </div>
    </div>

    <div style="overflow-x:auto">
        <table>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Nome</th>
                    <th>CPF</th>
                    <th>Empresa</th>
                    <th>Entrada</th>
                    <th>Término</th>
                    <th>Situação</th>
                    <th>Contrato</th>
                    <th>Ações</th>
                </tr>
            </thead>
            <tbody id="tbodyAprendizes">
                <tr><td colspan="9" class="table-empty">Carregando...</td></tr>
            </tbody>
        </table>
    </div>
    <div id="tableFooter" style="padding:1rem 1.5rem;font-size:0.78rem;color:var(--muted);border-top:1px solid var(--border)"></div>
</div>

<?php require_once '../../includes/components/layout/footer.php'; ?>

<script src="../assets/js/admin/aprendizes.js"></script>
