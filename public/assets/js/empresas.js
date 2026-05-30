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

