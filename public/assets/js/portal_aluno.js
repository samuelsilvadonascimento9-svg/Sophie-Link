lucide.createIcons();

// ==================== NAVEGAÇÃO PRINCIPAL ====================

const sectionTitles = {
    inicio:       'Portal do Aluno',
    notas:        'Notas & Frequência',
    financeiro:   'Financeiro',
    horarios:     'Agenda Acadêmica',
    mural:        'Mural de Avisos',
    oportunidades:'Oportunidades de Carreira',
    historico:    'Histórico Escolar',
    secretaria:   'Secretaria Online',
    perfil:       'Meu Perfil'
};

function showSec(id, el) {
    event && event.preventDefault();
    document.querySelectorAll('.sec').forEach(s => s.classList.remove('active'));
    const sec = document.getElementById('sec-' + id);
    if (sec) sec.classList.add('active');
    document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
    if (el) el.classList.add('active');

    // Atualiza título da topbar
    const tb = document.getElementById('topbar-title');
    if (tb) tb.textContent = sectionTitles[id] || 'Portal do Aluno';

    // Inicializar gráficos ao entrar em Notas
    if (id === 'notas') {
        setTimeout(initChartNotas, 100);
    }

    // Fechar dropdown de configurações se estiver aberto
    const dd = document.getElementById('configDropdown');
    if (dd) dd.style.display = 'none';
}

// ==================== MODO ESCURO ====================

function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    localStorage.setItem('darkMode', isDark ? '1' : '0');

    // Atualizar ícone
    const moonLinks = document.querySelectorAll('#configDropdown [data-lucide="moon"], #configDropdown [data-lucide="sun"]');
    moonLinks.forEach(icon => {
        icon.setAttribute('data-lucide', isDark ? 'sun' : 'moon');
    });
    lucide.createIcons();
}

// Restaurar modo escuro salvo
document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('darkMode') === '1') {
        document.body.classList.add('dark-mode');
    }
});

// ==================== FILTRO DE FATURAS ====================

function filtrarFaturas(status, el) {
    if (el) {
        document.querySelectorAll('.finance-tab').forEach(btn => btn.classList.remove('active'));
        el.classList.add('active');
    }

    const linhas = document.querySelectorAll('.fatura-row');
    linhas.forEach(linha => {
        if (status === 'todas') {
            linha.style.display = 'flex';
        } else {
            linha.style.display = linha.getAttribute('data-status') === status ? 'flex' : 'none';
        }
    });
}

// ==================== TABS: SECRETARIA ====================

function switchSecretariaTab(tab, el) {
    if (el) {
        document.querySelectorAll('.sec-tab').forEach(btn => btn.classList.remove('active'));
        el.classList.add('active');
    }

    const disponiveis = document.getElementById('tab-sec-disponiveis');
    const solicitados  = document.getElementById('tab-sec-solicitados');
    if (disponiveis) disponiveis.style.display = tab === 'disponiveis' ? 'block' : 'none';
    if (solicitados)  solicitados.style.display  = tab === 'solicitados'  ? 'block' : 'none';
}

// ==================== TABS: HORÁRIOS ====================

function switchHorarioTab(tab, el) {
    if (el) {
        document.querySelectorAll('#sec-horarios .finance-tab').forEach(btn => btn.classList.remove('active'));
        el.classList.add('active');
    }

    const quadro    = document.getElementById('tab-quadro');
    const calendar  = document.getElementById('tab-calendario');
    if (quadro)   quadro.style.display   = tab === 'quadro'     ? 'block' : 'none';
    if (calendar) calendar.style.display = tab === 'calendario' ? 'block' : 'none';

    if (tab === 'calendario') {
        setTimeout(() => window.dispatchEvent(new Event('resize')), 50);
    }
}

// ==================== TABS: OPORTUNIDADES ====================

function switchOportunidadesTab(tab, el) {
    if (el) {
        document.querySelectorAll('#sec-oportunidades .op-tab').forEach(btn => btn.classList.remove('active'));
        el.classList.add('active');
    }

    const vagas          = document.getElementById('tab-vagas');
    const acompanhamento = document.getElementById('tab-acompanhamento');
    if (vagas)          vagas.style.display          = tab === 'vagas'          ? 'block' : 'none';
    if (acompanhamento) acompanhamento.style.display = tab === 'acompanhamento' ? 'block' : 'none';
}

// ==================== FILTRO DE OPORTUNIDADES ====================

function filtrarOportunidades(tipo) {
    const vagas = document.querySelectorAll('.vaga-card');
    vagas.forEach(vaga => {
        const inscrito = vaga.getAttribute('data-inscrito') === 'true';
        if (tipo === 'todas') {
            vaga.style.display = 'flex';
        } else if (tipo === 'disponiveis') {
            vaga.style.display = inscrito ? 'none' : 'flex';
        } else if (tipo === 'inscritas') {
            vaga.style.display = inscrito ? 'flex' : 'none';
        }
    });
}

// ==================== PLACEHOLDER ====================

function emBreve() {
    alert('Esta funcionalidade estará disponível em breve!');
}

// ==================== NOTAS: GRÁFICOS ====================

let chartAvaliacaoInst = null;
let chartEtapaInst     = null;

function initChartNotas() {
    const ctxAv = document.getElementById('chartNotasAvaliacao');
    const ctxEt = document.getElementById('chartNotasEtapa');
    if (!ctxAv || !ctxEt) return;

    if (chartAvaliacaoInst) chartAvaliacaoInst.destroy();
    if (chartEtapaInst)     chartEtapaInst.destroy();

    const colorAluno  = '#0EA5E9';
    const colorMedia  = '#FF6B00';
    const radiusCustom = 6;

    // Lê dados reais injetados pelo PHP (fallback para mock)
    const labelsAv = window.notasLabels  || ['AVALIAÇÃO GERAL', 'CERTIFICADO', 'TRABALHOS', 'TRABALHO FINAL'];
    const valuesAv = window.notasValues  || [2.48, 2.00, 0.80, 3.00];
    const mediaAv  = window.mediaTurmaAv || [1.71, 1.85, 1.45, 2.78];

    chartAvaliacaoInst = new Chart(ctxAv, {
        type: 'bar',
        data: {
            labels: labelsAv,
            datasets: [
                { label: 'Aluno',           data: valuesAv, backgroundColor: colorAluno, borderRadius: radiusCustom, maxBarThickness: 40 },
                { label: 'Média da turma',  data: mediaAv,  backgroundColor: colorMedia, borderRadius: radiusCustom, maxBarThickness: 40 }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { position: 'bottom', labels: { usePointStyle: true, pointStyle: 'circle', boxWidth: 10, padding: 20, font: { family: "'Inter', sans-serif", size: 12 } } }
            },
            scales: {
                y: { beginAtZero: true, grid: { borderDash: [5, 5], color: '#E2E8F0' } },
                x: { grid: { display: false }, ticks: { font: { family: "'Inter', sans-serif", size: 10, weight: '500' } } }
            }
        }
    });

    chartEtapaInst = new Chart(ctxEt, {
        type: 'bar',
        data: {
            labels: ['Média', 'Recuperação', 'Média Final'],
            datasets: [
                { label: 'Média da turma', data: [7.89, 7.89, 7.89], backgroundColor: colorMedia, borderRadius: radiusCustom, maxBarThickness: 40 },
                { label: 'Aluno',          data: [8.50, 8.50, 8.50], backgroundColor: colorAluno, borderRadius: radiusCustom, maxBarThickness: 40 }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { position: 'bottom', labels: { usePointStyle: true, pointStyle: 'circle', boxWidth: 10, padding: 20, font: { family: "'Inter', sans-serif", size: 12 } } }
            },
            scales: {
                y: { beginAtZero: true, max: 12, grid: { borderDash: [5, 5], color: '#E2E8F0' } },
                x: { grid: { display: false }, ticks: { font: { family: "'Inter', sans-serif", size: 11, weight: '500' } } }
            }
        }
    });
}

// ==================== NOTAS: TABS (ETAPAS / AVALIAÇÕES) ====================

function switchNotasTab(tab, el) {
    if (el) {
        document.querySelectorAll('.notas-tab').forEach(btn => btn.classList.remove('active'));
        el.classList.add('active');
    }
    document.querySelectorAll('.notas-tab-content').forEach(c => c.style.display = 'none');
    const target = document.getElementById('tab-notas-' + tab);
    if (target) target.style.display = 'block';
}

// ==================== MODAL DE NOTAS DETALHADO ====================

function abrirModalNotas(disciplinaNome, media) {
    const modal = document.getElementById('modalNotas');
    if (!modal) return;

    document.getElementById('modalNotasTitle').textContent = disciplinaNome + ': Detalhes';

    const tbody = document.getElementById('modalNotasBody');
    tbody.innerHTML = '';

    const dadosMocks = [
        { etapa: 'Média', dataAvaliacao: '28/04/2026', avaliacao: 'AVALIAÇÃO GERAL', valor: '3,00', nota: '2,48', notaBaixa: false, dataDevolucao: '' },
        { etapa: 'Média', dataAvaliacao: '',            avaliacao: 'CERTIFICADO',     valor: '2,00', nota: '2,00', notaBaixa: false, dataDevolucao: '' },
        { etapa: 'Média', dataAvaliacao: '',            avaliacao: 'TRABALHOS',        valor: '2,00', nota: '0,80', notaBaixa: true,  dataDevolucao: '' },
        { etapa: 'Média', dataAvaliacao: '',            avaliacao: 'TRABALHO FINAL',   valor: '3,00', nota: '3,00', notaBaixa: false, dataDevolucao: '' }
    ];

    dadosMocks.forEach(d => {
        const notaBadge = d.notaBaixa
            ? `<span style="background:#FEF2F2;color:#DC2626;padding:4px 10px;border-radius:6px;font-weight:700;border:1px solid #FECACA;">${d.nota}</span>`
            : `<span style="background:#F0FDF4;color:#16A34A;padding:4px 10px;border-radius:6px;font-weight:700;border:1px solid #BBF7D0;">${d.nota}</span>`;

        const tr = document.createElement('tr');
        tr.style.cssText = 'background:#FFFFFF;border-bottom:1px solid #E2E8F0;transition:background 0.2s;';
        tr.onmouseover = () => tr.style.background = '#F8FAFC';
        tr.onmouseout  = () => tr.style.background = '#FFFFFF';
        tr.innerHTML = `
            <td style="padding:16px 20px;font-weight:600;color:#475569;">${d.etapa}</td>
            <td style="padding:16px 20px;text-align:center;color:#64748B;font-weight:500;">${d.dataAvaliacao || '-'}</td>
            <td style="padding:16px 20px;color:#1E293B;font-weight:600;">${d.avaliacao}</td>
            <td style="padding:16px 20px;text-align:center;color:#64748B;font-weight:600;">${d.valor} pts</td>
            <td style="padding:16px 20px;text-align:center;">${notaBadge}</td>
            <td style="padding:16px 20px;text-align:center;color:#64748B;">${d.dataDevolucao || '-'}</td>
        `;
        tbody.appendChild(tr);
    });

    modal.classList.add('active');
}

function fecharModalNotas() {
    const modal = document.getElementById('modalNotas');
    if (modal) modal.classList.remove('active');
}

// Fechar modal clicando fora
document.addEventListener('DOMContentLoaded', () => {
    const modalNotas = document.getElementById('modalNotas');
    if (modalNotas) {
        modalNotas.addEventListener('click', function(e) {
            if (e.target === this) fecharModalNotas();
        });
    }

    // Gerenciar clique no botão de configuração (engrenagem)
    const btnConfig = document.getElementById('btnConfig');
    if (btnConfig) {
        btnConfig.addEventListener('click', function(e) {
            e.stopPropagation(); // Evita que feche imediatamente pelo event listener abaixo
            const dd = document.getElementById('configDropdown');
            if (dd) {
                dd.style.display = dd.style.display === 'block' ? 'none' : 'block';
                setTimeout(() => lucide.createIcons(), 50);
            }
        });
    }

    // Fechar dropdown de config ao clicar fora
    document.addEventListener('click', function(e) {
        const dd = document.getElementById('configDropdown');
        if (dd && !dd.contains(e.target) && !e.target.closest('#btnConfig')) {
            dd.style.display = 'none';
        }
    });

    // Inicializar gráficos se a seção de notas já estiver ativa
    if (document.getElementById('sec-notas') && document.getElementById('sec-notas').classList.contains('active')) {
        setTimeout(initChartNotas, 100);
    }
});
