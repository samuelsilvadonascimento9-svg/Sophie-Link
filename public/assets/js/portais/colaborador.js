// portal_colaborador.js — Sophie Link v2.0
try {
    if (typeof lucide !== 'undefined') lucide.createIcons();
} catch (e) {
    console.warn("Lucide icons error:", e);
}

// ===================== NAVEGAÇÃO =====================
function showSec(id, el) {
    document.querySelectorAll('.sec').forEach(s => s.classList.remove('active'));
    document.getElementById('sec-' + id).classList.add('active');
    document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
    if (el) el.classList.add('active');
    if (id === 'calendario') renderCalendar();
}

// ===================== MODAIS =====================
function openModal(id) {
    document.getElementById(id).classList.add('active');
}
function closeModal(id) {
    document.getElementById(id).classList.remove('active');
}
// Fechar modal ao clicar fora
document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', function(e) {
        if (e.target === this) closeModal(this.id);
    });
});

// ===================== TOAST =====================
function showToast(msg, type = 'success') {
    const container = document.getElementById('toast-container');
    const t = document.createElement('div');
    const icons = { success: 'check-circle', error: 'alert-circle', info: 'info' };
    t.className = `toast ${type}`;
    t.innerHTML = `<i data-lucide="${icons[type] || 'info'}" style="width:16px;height:16px;"></i> ${msg}`;
    container.appendChild(t);
    try { if (typeof lucide !== 'undefined') lucide.createIcons(); } catch(e){}
    setTimeout(() => {
        t.style.animation = 'toastOut 0.3s ease forwards';
        setTimeout(() => t.remove(), 300);
    }, 3500);
}

// ===================== BUSCA AO VIVO =====================
const searchInput = document.getElementById('searchInput');
const filterSituacao = document.getElementById('filterSituacao');

function filterTable() {
    const query = (searchInput?.value || '').toLowerCase().trim();
    const sit   = (filterSituacao?.value || '').toLowerCase();
    const rows  = document.querySelectorAll('#alunosTable tbody tr');

    rows.forEach(row => {
        const nome    = row.dataset.nome    || '';
        const empresa = row.dataset.empresa || '';
        const ra      = row.dataset.ra      || '';
        const situacao = row.dataset.situacao || '';

        const matchText = !query || nome.includes(query) || empresa.includes(query) || ra.includes(query);
        const matchSit  = !sit   || situacao === sit;

        row.style.display = (matchText && matchSit) ? '' : 'none';
    });
}

function filterProfessores() {
    const q = document.getElementById('searchProfessores').value.toLowerCase().trim();
    document.querySelectorAll('#professoresTable tbody tr').forEach(row => {
        if (!row.querySelector('td')) return; // ignore empty state row
        const text = row.innerText.toLowerCase();
        row.style.display = text.includes(q) ? '' : 'none';
    });
}

function filterEmpresas() {
    const q = document.getElementById('searchEmpresas').value.toLowerCase().trim();
    document.querySelectorAll('#empresasTable tbody tr').forEach(row => {
        if (!row.querySelector('td')) return;
        const text = row.innerText.toLowerCase();
        row.style.display = text.includes(q) ? '' : 'none';
    });
}

if (searchInput) searchInput.addEventListener('input', filterTable);
if (filterSituacao) filterSituacao.addEventListener('change', filterTable);

// ===================== MÁSCARA CPF =====================
function maskCPF(input) {
    input.addEventListener('input', function(e) {
        let v = e.target.value.replace(/\D/g, '');
        v = v.replace(/(\d{3})(\d)/, '$1.$2');
        v = v.replace(/(\d{3})(\d)/, '$1.$2');
        v = v.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
        e.target.value = v;
    });
}
const cpfInput = document.getElementById('cpf_input');
if (cpfInput) maskCPF(cpfInput);

// ===================== LOADING NOS FORMS =====================
document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', function() {
        if (this.target === '_blank') return;
        const btn = this.querySelector('button[type="submit"]');
        if (btn) {
            btn.innerHTML = `<span class="spinner"></span> Aguarde...`;
            btn.disabled = true;
        }
    });
});

// ===================== EDITAR ALUNO (AJAX) =====================
function abrirEdicao(id) {
    openModal('modalEdicao');
    document.getElementById('editModalLoading').style.display = 'block';
    document.getElementById('editModalContent').style.display = 'none';

    fetch(`../api/alunos/get_aluno.php?id=${id}`)
        .then(r => r.json())
        .then(data => {
            if (!data.success) { showToast(data.error || 'Erro ao carregar aluno.', 'error'); closeModal('modalEdicao'); return; }

            const a = data.aluno;
            const ra = String(a.id).padStart(6, '0');
            document.getElementById('editModalTitle').textContent = a.nome;
            document.getElementById('editModalRA').textContent = 'RA: ' + ra;
            document.getElementById('edit_id').value = a.id;
            document.getElementById('edit_nome').value = a.nome || '';
            document.getElementById('edit_cpf').value = a.cpf || '';
            document.getElementById('edit_rg').value = a.rg || '';
            document.getElementById('edit_email').value = a.email || '';
            document.getElementById('edit_telefone').value = a.telefone || '';
            document.getElementById('edit_observacoes').value = a.observacoes || '';
            document.getElementById('edit_situacao').value = a.situacao_aluno || 'cursando';

            // Popular turmas
            const sel = document.getElementById('edit_turma_id');
            sel.innerHTML = '<option value="">Sem turma</option>';
            (data.turmas || []).forEach(t => {
                const opt = document.createElement('option');
                opt.value = t.id;
                opt.textContent = `${t.curso_nome} — ${t.nome}`;
                if (t.id == a.turma_id) opt.selected = true;
                sel.appendChild(opt);
            });

            document.getElementById('editModalLoading').style.display = 'none';
            document.getElementById('editModalContent').style.display = 'block';
            try { if (typeof lucide !== 'undefined') lucide.createIcons(); } catch(e){}
        })
        .catch(() => {
            showToast('Falha de comunicação.', 'error');
            closeModal('modalEdicao');
        });
}

function salvarEdicao() {
    const btn = document.getElementById('btnSalvarEdicao');
    const csrf = document.getElementById('csrfToken').value;

    const payload = {
        csrf_token:   csrf,
        id:           document.getElementById('edit_id').value,
        nome:         document.getElementById('edit_nome').value,
        cpf:          document.getElementById('edit_cpf').value,
        rg:           document.getElementById('edit_rg').value,
        email:        document.getElementById('edit_email').value,
        telefone:     document.getElementById('edit_telefone').value,
        situacao:     document.getElementById('edit_situacao').value,
        turma_id:     document.getElementById('edit_turma_id').value,
        observacoes:  document.getElementById('edit_observacoes').value,
    };

    if (!payload.nome || !payload.cpf) { showToast('Nome e CPF são obrigatórios.', 'error'); return; }

    btn.innerHTML = '<span class="spinner"></span> Salvando...';
    btn.disabled = true;

    fetch('../api/alunos/update_aluno.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    })
    .then(r => r.json())
    .then(data => {
        if (data.success) {
            showToast(data.message || 'Dados salvos com sucesso!', 'success');
            closeModal('modalEdicao');
            // Atualiza o nome na tabela sem recarregar
            const row = document.querySelector(`tr[data-nome]`);
            // Recarrega suavemente após 1s
            setTimeout(() => location.reload(), 1200);
        } else {
            showToast(data.error || 'Erro ao salvar.', 'error');
            btn.innerHTML = '<i data-lucide="save"></i> Salvar Alterações';
            btn.disabled = false;
            try { if (typeof lucide !== 'undefined') lucide.createIcons(); } catch(e){}
        }
    })
    .catch(() => {
        showToast('Erro de comunicação.', 'error');
        btn.innerHTML = '<i data-lucide="save"></i> Salvar Alterações';
        btn.disabled = false;
        try { if (typeof lucide !== 'undefined') lucide.createIcons(); } catch(e){}
    });
}

// ===================== JUSTIFICAR FALTA (AJAX) =====================
function justificarFalta(id, btn) {
    const csrf = document.getElementById('csrfToken').value;
    const oldHtml = btn.innerHTML;
    btn.innerHTML = '<span class="spinner"></span>';
    btn.disabled = true;

    fetch('../api/alunos/justificar_falta.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ csrf_token: csrf, frequencia_id: id })
    })
    .then(r => r.json())
    .then(data => {
        if (data.success) {
            showToast('Falta justificada com sucesso!', 'success');
            const row = document.getElementById('falta-row-' + id);
            if (row) {
                row.style.transition = 'opacity 0.3s';
                row.style.opacity = '0';
                setTimeout(() => row.remove(), 300);
            }
            // Atualizar badge do menu lateral
            const badge = document.querySelector('#nav-faltas .nav-badge');
            if (badge) {
                const count = parseInt(badge.textContent) - 1;
                if (count <= 0) badge.remove();
                else badge.textContent = count;
            }
        } else {
            showToast(data.error || 'Erro ao justificar.', 'error');
            btn.innerHTML = oldHtml;
            btn.disabled = false;
            try { if (typeof lucide !== 'undefined') lucide.createIcons(); } catch(e){}
        }
    })
    .catch(() => {
        showToast('Erro de comunicação.', 'error');
        btn.innerHTML = oldHtml;
        btn.disabled = false;
        try { if (typeof lucide !== 'undefined') lucide.createIcons(); } catch(e){}
    });
}

// ===================== CALENDÁRIO LETIVO =====================
const meses = ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'];
let calDate = new Date();

// Feriados nacionais fixos (dia-mês) + alguns recessos de exemplo
const feriados = {
    '01-01': 'Confraternização Universal',
    '21-04': 'Tiradentes',
    '01-05': 'Dia do Trabalho',
    '07-09': 'Independência do Brasil',
    '12-10': 'Nossa Senhora Aparecida',
    '02-11': 'Finados',
    '15-11': 'Proclamação da República',
    '25-12': 'Natal',
};
const recessos = ['14-07','15-07','16-07','17-07','18-07']; // Recesso de julho (exemplo)

function renderCalendar() {
    const year  = calDate.getFullYear();
    const month = calDate.getMonth();
    const today = new Date();
    const todayKey = `${String(today.getDate()).padStart(2,'0')}-${String(today.getMonth()+1).padStart(2,'0')}`;

    document.getElementById('calMonthTitle').textContent = `${meses[month]} ${year}`;

    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const daysInPrev = new Date(year, month, 0).getDate();

    const container = document.getElementById('calDays');
    container.innerHTML = '';

    // Dias do mês anterior
    for (let i = firstDay - 1; i >= 0; i--) {
        const d = document.createElement('div');
        d.className = 'cal-day fora';
        d.textContent = daysInPrev - i;
        container.appendChild(d);
    }

    // Dias do mês atual
    for (let d = 1; d <= daysInMonth; d++) {
        const dayEl = document.createElement('div');
        const key = `${String(d).padStart(2,'0')}-${String(month+1).padStart(2,'0')}`;
        const isToday = (d === today.getDate() && month === today.getMonth() && year === today.getFullYear());
        const dow = new Date(year, month, d).getDay(); // 0=dom, 6=sáb
        
        let classes = 'cal-day';
        let title = '';

        if (isToday) classes += ' today';
        else if (feriados[key]) { classes += ' feriado'; title = feriados[key]; }
        else if (recessos.includes(key)) { classes += ' recesso'; title = 'Recesso escolar'; }
        else if (dow > 0 && dow < 6) classes += ' aula'; // seg-sex = aula

        dayEl.className = classes;
        dayEl.textContent = d;
        if (title) dayEl.title = title;
        container.appendChild(dayEl);
    }

    // Completar grid com dias do próximo mês
    const total = firstDay + daysInMonth;
    const remaining = total % 7 === 0 ? 0 : 7 - (total % 7);
    for (let d = 1; d <= remaining; d++) {
        const el = document.createElement('div');
        el.className = 'cal-day fora';
        el.textContent = d;
        container.appendChild(el);
    }
}

function calNav(dir) {
    calDate.setMonth(calDate.getMonth() + dir);
    renderCalendar();
}
function calGoToday() {
    calDate = new Date();
    renderCalendar();
}

// ===================== DOC OPTIONS STYLE =====================
document.querySelectorAll('.doc-option input[type=radio]').forEach(radio => {
    radio.addEventListener('change', function() {
        document.querySelectorAll('.doc-option').forEach(l => l.style.borderColor = 'var(--border)');
        this.closest('.doc-option').style.borderColor = 'var(--brand)';
    });
});
