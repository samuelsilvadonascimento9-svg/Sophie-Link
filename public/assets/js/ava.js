lucide.createIcons();

/* ----------------------------------------------------------------
   NAVEGAÇÃO ENTRE SEÇÕES
   ---------------------------------------------------------------- */
function showSec(id) {
    document.querySelectorAll('.page-section').forEach(s => s.classList.remove('active'));
    const el = document.getElementById('sec-' + id);
    if (el) el.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Atualiza subnav
    document.querySelectorAll('.subnav-link').forEach(l => l.classList.remove('active'));
}

/* ----------------------------------------------------------------
   ABRIR CURSO
   ---------------------------------------------------------------- */
const cursos = {
    eletro: {
        title: 'Manutenção Eletromecânica I',
        code:  'MEC-101 · Turma A · Prof. Carlos Menezes',
        img:   '../assets/images/ava_eletro.png',
        desc:  'Fundamentos de mecânica industrial, sistemas de lubrificação, rolamentos e manutenção preventiva e corretiva voltados ao setor de mineração.',
        aulas: [
            { n: '01', t: 'Introdução à Mecânica Industrial', d: 'Conceitos básicos, ferramentas e EPI.', ok: true },
            { n: '02', t: 'Sistemas de Lubrificação', d: 'Tipos de lubrificantes, periodicidade e aplicação.', ok: true },
            { n: '03', t: 'Rolamentos e Mancais', d: 'Identificação, montagem e substituição.', ok: false },
            { n: '04', t: 'Manutenção Preditiva', d: 'Vibração, termografia e análise de óleo.', ok: false },
        ]
    },
    qualidade: {
        title: 'Gestão da Qualidade (ISO 9001)',
        code:  'GQ-201 · Turma B · Profa. Ana Ribeiro',
        img:   '../assets/images/ava_qualidade.png',
        desc:  'Normas ISO 9001, ferramentas de controle de qualidade, auditorias internas e melhoria contínua aplicadas ao ambiente industrial.',
        aulas: [
            { n: '01', t: 'Conceitos de Qualidade Total', d: 'Histórico, princípios e evolução da qualidade.', ok: true },
            { n: '02', t: 'Norma ISO 9001:2015', d: 'Estrutura, requisitos e aplicação prática.', ok: true },
            { n: '03', t: 'Ferramentas de Controle', d: 'Diagrama de Ishikawa, 5W2H, Pareto.', ok: false },
            { n: '04', t: 'Estudo de Caso — Sotreq', d: 'Análise de falha em equipamento real.', ok: false },
        ]
    },
    seguranca: {
        title: 'Saúde e Segurança do Trabalho (Mineração)',
        code:  'SST-301 · Turma A · Prof. João Ferreira',
        img:   '../assets/images/ava_seguranca.png',
        desc:  'EPIs obrigatórios, NR-22 (Mineração), ergonomia, prevenção de acidentes e saúde ocupacional no setor de mineração e indústria pesada.',
        aulas: [
            { n: '01', t: 'Introdução à SST', d: 'Legislação, responsabilidades e CIPA.', ok: true },
            { n: '02', t: 'EPIs e EPCs na Mineração', d: 'NR-6, seleção, uso e conservação.', ok: true },
            { n: '03', t: 'NR-22 — Segurança em Mineração', d: 'Requisitos específicos para o setor.', ok: true },
            { n: '04', t: 'Ergonomia e Acidentes', d: 'Análise de riscos e investigação de acidentes.', ok: false },
        ]
    },
    logistica: {
        title: 'Logística Aplicada e Cadeia de Suprimentos',
        code:  'LOG-401 · Turma A · Profa. Maria Costa',
        img:   '../assets/images/ava_logistica.png',
        desc:  'Gestão da cadeia de suprimentos, armazenagem, transporte, controle de estoque e logística reversa aplicada ao setor industrial e de mineração.',
        aulas: [
            { n: '01', t: 'Introdução à Logística', d: 'Conceitos, evolução e importância.', ok: true },
            { n: '02', t: 'Gestão de Estoque', d: 'Métodos de controle, curva ABC e FIFO.', ok: false },
            { n: '03', t: 'Transporte e Distribuição', d: 'Modais, roteirização e custos.', ok: false },
            { n: '04', t: 'Cadeia de Suprimentos', d: 'Integração, fornecedores e demanda.', ok: false },
        ]
    }
};

function openCourse(evt, id) {
    evt.preventDefault();
    const c = cursos[id];
    if (!c) return;
    const content = document.getElementById('curso-content');
    content.innerHTML = `
        <div style="position:relative;height:180px;overflow:hidden;">
            <img src="${c.img}" alt="${c.title}" style="width:100%;height:100%;object-fit:cover;object-position:center;">
            <div style="position:absolute;inset:0;background:linear-gradient(to right,rgba(0,0,0,0.6),rgba(0,0,0,0.1));display:flex;align-items:flex-end;padding:1.5rem;">
                <div>
                    <div style="font-size:1.1rem;font-weight:700;color:#fff;margin-bottom:4px;">${c.title}</div>
                    <div style="font-size:0.72rem;color:rgba(255,255,255,0.75);">${c.code}</div>
                </div>
            </div>
        </div>
        <div style="padding:1.25rem 1.5rem;">
            <p style="font-size:0.82rem;color:var(--c-text-muted);line-height:1.7;margin-bottom:1.25rem;">${c.desc}</p>
            <div style="font-size:0.78rem;font-weight:700;color:var(--c-text);margin-bottom:0.75rem;display:flex;align-items:center;gap:6px;">
                <i data-lucide="list" style="width:14px;height:14px;color:var(--c-brand);"></i> Módulos do Curso
            </div>
            ${c.aulas.map((a, i) => `
            <div style="display:flex;align-items:center;gap:12px;padding:10px 12px;border:1px solid var(--c-border-lt);border-radius:var(--radius);margin-bottom:6px;background:${a.ok ? 'var(--c-green-lt)' : 'var(--c-surface)'};cursor:pointer;transition:all 0.15s;" onmouseover="this.style.borderColor='var(--c-brand)'" onmouseout="this.style.borderColor='var(--c-border-lt)'">
                <div style="width:30px;height:30px;border-radius:50%;background:${a.ok ? 'var(--c-green)' : 'var(--c-brand-lt)'};color:${a.ok ? '#fff' : 'var(--c-brand)'};display:flex;align-items:center;justify-content:center;font-size:0.7rem;font-weight:700;flex-shrink:0;">${a.ok ? '✓' : String(i+1).padStart(2,'0')}</div>
                <div style="flex:1;">
                    <div style="font-size:0.8rem;font-weight:600;color:var(--c-text);margin-bottom:1px;">${a.t}</div>
                    <div style="font-size:0.68rem;color:var(--c-text-muted);">${a.d}</div>
                </div>
                <i data-lucide="${a.ok ? 'check-circle' : 'play-circle'}" style="width:17px;height:17px;color:${a.ok ? 'var(--c-green)' : 'var(--c-brand)'};"></i>
            </div>`).join('')}
        </div>
    `;
    lucide.createIcons();
    showSec('curso');
}

function closeCourse() { showSec('home'); }

/* ----------------------------------------------------------------
   AVISOS CAROUSEL
   ---------------------------------------------------------------- */
let avisoIndex = 0;
const avisoSlides = document.querySelectorAll('.aviso-slide');
const avisoDots   = document.querySelectorAll('.aviso-dot');

function avisoGo(i) {
    avisoSlides[avisoIndex].classList.remove('active');
    avisoDots[avisoIndex].classList.remove('active');
    avisoIndex = (i + avisoSlides.length) % avisoSlides.length;
    avisoSlides[avisoIndex].classList.add('active');
    avisoDots[avisoIndex].classList.add('active');
}
function avisoNav(dir) { avisoGo(avisoIndex + dir); }

// Auto-advance
setInterval(() => avisoNav(1), 5000);

/* ----------------------------------------------------------------
   CALENDÁRIO TOGGLE
   ---------------------------------------------------------------- */
let calOpen = false;
function toggleCal() {
    calOpen = !calOpen;
    document.getElementById('cal-body').style.display = calOpen ? 'block' : 'none';
    const ch = document.getElementById('cal-chevron');
    ch.setAttribute('data-lucide', calOpen ? 'chevron-down' : 'chevron-right');
    lucide.createIcons();
}
let eventsOpen = true;
function toggleEvents() {
    eventsOpen = !eventsOpen;
    document.getElementById('events-list').style.display = eventsOpen ? 'block' : 'none';
}

/* ----------------------------------------------------------------
   BARRA DE PROGRESSO — animação
   ---------------------------------------------------------------- */
window.addEventListener('load', () => {
    document.querySelectorAll('.prog-fill').forEach(bar => {
        const w = bar.style.width;
        bar.style.width = '0';
        setTimeout(() => { bar.style.width = w; }, 300);
    });
});

