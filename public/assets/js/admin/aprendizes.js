let apParaExcluir = null;

// Máscaras
document.getElementById('ap_cpf').addEventListener('input', function() {
    let v = this.value.replace(/\D/g,'').substring(0,11);
    v = v.replace(/(\d{3})(\d)/,'$1.$2');
    v = v.replace(/(\d{3})(\d)/,'$1.$2');
    v = v.replace(/(\d{3})(\d{1,2})$/,'$1-$2');
    this.value = v;
});

function esc(str) {
    const d = document.createElement('div');
    d.textContent = str || '';
    return d.innerHTML;
}

function fmtData(str) {
    if (!str) return '—';
    const [y,m,d] = str.split('-');
    return `${d}/${m}/${y}`;
}

function badgeSituacao(s) {
    const map = {
        cursando: 'badge-orange',
        formado:  'badge-green',
        evadido:  'badge-red'
    };
    const label = {cursando:'Cursando', formado:'Formado', evadido:'Evadido'};
    return `<span class="badge ${map[s]||'badge-gray'}">${label[s]||s}</span>`;
}

function badgeContrato(s) {
    const map = {ativo:'badge-blue', encerrado:'badge-gray', pendente:'badge-red'};
    const label = {ativo:'Ativo', encerrado:'Encerrado', pendente:'Pendente'};
    return `<span class="badge ${map[s]||'badge-gray'}">${label[s]||s}</span>`;
}

// Carrega lista de empresas para os selects
async function carregarEmpresasSelect() {
    const res  = await fetch('backend/api/aprendizes/index.php?action=empresas');
    const json = await res.json();
    if (!json.success) return;

    const selForm   = document.getElementById('ap_empresa_id');
    const selFiltro = document.getElementById('filtroEmpresa');

    json.data.forEach(e => {
        selForm.innerHTML   += `<option value="${e.id}">${esc(e.nome)}</option>`;
        selFiltro.innerHTML += `<option value="${e.id}">${esc(e.nome)}</option>`;
    });
}

async function carregarAprendizes() {
    const busca    = document.getElementById('busca').value;
    const empresa  = document.getElementById('filtroEmpresa').value;
    const situacao = document.getElementById('filtroSituacao').value;
    const tbody    = document.getElementById('tbodyAprendizes');
    tbody.innerHTML = '<tr><td colspan="9" class="table-empty">Carregando...</td></tr>';

    try {
        const url  = `backend/api/aprendizes/index.php?action=listar&busca=${encodeURIComponent(busca)}&empresa_id=${empresa}&situacao=${situacao}`;
        const res  = await fetch(url);
        const json = await res.json();

        if (!json.success || !json.data.length) {
            tbody.innerHTML = '<tr><td colspan="9" class="table-empty">Nenhum aprendiz encontrado.</td></tr>';
            document.getElementById('tableFooter').textContent = '';
            return;
        }

        tbody.innerHTML = json.data.map((a,i) => `
            <tr>
                <td style="color:var(--muted);font-size:0.78rem">${i+1}</td>
                <td class="td-name">${esc(a.nome)}</td>
                <td style="font-size:0.82rem">${esc(a.cpf)||'—'}</td>
                <td>
                    ${a.empresa_nome
                        ? `<span class="badge badge-blue">${esc(a.empresa_nome)}</span>`
                        : '<span style="color:var(--muted)">—</span>'}
                </td>
                <td>${fmtData(a.data_entrada)}</td>
                <td>${fmtData(a.data_termino)}</td>
                <td>${badgeSituacao(a.situacao_aluno)}</td>
                <td>${badgeContrato(a.status_contrato)}</td>
                <td>
                    <div style="display:flex;gap:6px">
                        <button class="btn btn-ghost btn-sm btn-icon" title="Editar" onclick="editarAprendiz(${a.id})">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                        </button>
                        <button class="btn btn-danger btn-sm btn-icon" title="Excluir" onclick="pedirExclusao(${a.id},'${esc(a.nome).replace(/'/g,"\\'")}')">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/></svg>
                        </button>
                    </div>
                </td>
            </tr>
        `).join('');
        document.getElementById('tableFooter').textContent = `${json.data.length} aprendiz(es) encontrado(s)`;
    } catch(err) {
        tbody.innerHTML = '<tr><td colspan="9" class="table-empty" style="color:#ef4444">Erro ao carregar. Verifique a conexão com o banco de dados.</td></tr>';
    }
}

function abrirNovo() {
    document.getElementById('formAprendiz').reset();
    document.getElementById('aprendizId').value = '';
    document.getElementById('modalAprendizTitulo').textContent = 'Novo Aprendiz';
    openModal('modalAprendiz');
}

async function editarAprendiz(id) {
    try {
        const res  = await fetch(`backend/api/aprendizes/index.php?action=buscar&id=${id}`);
        const json = await res.json();
        if (!json.success) { showToast('Erro ao carregar aprendiz.','error'); return; }
        const a = json.data;
        document.getElementById('aprendizId').value           = a.id;
        document.getElementById('ap_nome').value              = a.nome;
        document.getElementById('ap_cpf').value               = a.cpf;
        document.getElementById('ap_rg').value                = a.rg;
        document.getElementById('ap_data_nascimento').value   = a.data_nascimento || '';
        document.getElementById('ap_telefone').value          = a.telefone;
        document.getElementById('ap_email').value             = a.email;
        document.getElementById('ap_endereco').value          = a.endereco;
        document.getElementById('ap_nome_mae').value          = a.nome_mae;
        document.getElementById('ap_nome_pai').value          = a.nome_pai;
        document.getElementById('ap_empresa_id').value        = a.empresa_id;
        document.getElementById('ap_curso').value             = a.curso;
        document.getElementById('ap_status_contrato').value   = a.status_contrato;
        document.getElementById('ap_data_entrada').value      = a.data_entrada || '';
        document.getElementById('ap_data_termino').value      = a.data_termino || '';
        document.getElementById('ap_situacao_aluno').value    = a.situacao_aluno;
        document.getElementById('ap_observacoes').value       = a.observacoes;
        document.getElementById('modalAprendizTitulo').textContent = 'Editar Aprendiz';
        openModal('modalAprendiz');
    } catch { showToast('Erro de conexão.','error'); }
}

async function salvarAprendiz(e) {
    e.preventDefault();
    const id = document.getElementById('aprendizId').value;
    const dados = {
        nome:            document.getElementById('ap_nome').value,
        cpf:             document.getElementById('ap_cpf').value,
        rg:              document.getElementById('ap_rg').value,
        data_nascimento: document.getElementById('ap_data_nascimento').value,
        telefone:        document.getElementById('ap_telefone').value,
        email:           document.getElementById('ap_email').value,
        endereco:        document.getElementById('ap_endereco').value,
        nome_mae:        document.getElementById('ap_nome_mae').value,
        nome_pai:        document.getElementById('ap_nome_pai').value,
        empresa_id:      document.getElementById('ap_empresa_id').value,
        curso:           document.getElementById('ap_curso').value,
        status_contrato: document.getElementById('ap_status_contrato').value,
        data_entrada:    document.getElementById('ap_data_entrada').value,
        data_termino:    document.getElementById('ap_data_termino').value,
        situacao_aluno:  document.getElementById('ap_situacao_aluno').value,
        observacoes:     document.getElementById('ap_observacoes').value,
    };
    const action = id ? `atualizar&id=${id}` : 'criar';
    try {
        const res  = await fetch(`backend/api/aprendizes/index.php?action=${action}`, {
            method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify(dados)
        });
        const json = await res.json();
        if (json.success) {
            showToast(json.message,'success');
            closeModal('modalAprendiz');
            carregarAprendizes();
        } else {
            showToast(json.message || 'Erro ao salvar.','error');
        }
    } catch { showToast('Erro de conexão.','error'); }
}

function pedirExclusao(id, nome) {
    apParaExcluir = id;
    document.getElementById('excluirNomeAp').textContent = nome;
    openModal('modalExcluirAp');
}

async function confirmarExclusaoAp() {
    if (!apParaExcluir) return;
    try {
        const res  = await fetch(`backend/api/aprendizes/index.php?action=excluir&id=${apParaExcluir}`, { method:'POST' });
        const json = await res.json();
        if (json.success) {
            showToast(json.message,'success');
            closeModal('modalExcluirAp');
            carregarAprendizes();
        } else {
            showToast(json.message || 'Erro ao excluir.','error');
        }
    } catch { showToast('Erro de conexão.','error'); }
    apParaExcluir = null;
}

// Inicializar
carregarEmpresasSelect().then(() => carregarAprendizes());

