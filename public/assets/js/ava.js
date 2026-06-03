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
    const navItem = document.getElementById('snav-' + id);
    if (navItem) navItem.classList.add('active');
}

/* ----------------------------------------------------------------
   ABRIR DISCIPLINA — renderiza os 4 cards de categoria
   ---------------------------------------------------------------- */
function openCourse(evt, discId) {
    if (evt && evt.preventDefault) evt.preventDefault();
    const cursos = window.cursosAVA || [];
    const c = cursos.find(d => d.id === discId);
    if (!c) return;

    const cats = [
        { key: 'apresentacao', label: 'APRESENTAÇÃO', icon: 'presentation',    items: c.apresentacao },
        { key: 'pdfs',         label: 'ARQUIVOS',     icon: 'folder-open',     items: c.pdfs         },
        { key: 'avaliacoes',   label: 'AVALIAÇÕES',   icon: 'clipboard-check', items: c.avaliacoes   },
        { key: 'atividades',   label: 'ATIVIDADES',   icon: 'edit-3',          items: c.atividades   },
    ];

    const content = document.getElementById('curso-content');
    content.innerHTML = `
        <div style="padding:1.5rem 1.5rem 1rem;">
            <div style="font-size:1rem;font-weight:800;color:var(--c-brand);margin-bottom:4px;">${escHtml(c.nome)}</div>
            <div style="font-size:0.78rem;color:var(--c-text-muted);">
                Prof. ${escHtml(c.professor)} &bull; ${c.carga_horaria}h
            </div>
        </div>
        <div style="padding:0 1.25rem 1.5rem;">
            <div style="font-size:0.72rem;font-weight:700;text-transform:uppercase;color:var(--c-text-muted);letter-spacing:0.08em;margin-bottom:14px;">Conteúdos</div>
            <div class="cat-grid">
                ${cats.map(cat => renderCatCard(cat, discId)).join('')}
            </div>
        </div>
    `;
    lucide.createIcons();
    showSec('curso');
}

function renderCatCard(cat, discId) {
    const n   = cat.items.length;
    const pct = n > 0 ? 100 : 0;
    const labelTitle = cat.label.charAt(0) + cat.label.slice(1).toLowerCase();
    return `
    <div class="cat-card" onclick="openCategory('${cat.key}', ${discId})">
        <div class="cat-card-thumb">
            <i data-lucide="${cat.icon}" style="width:36px;height:36px;color:rgba(255,255,255,0.9);"></i>
            <span class="cat-card-label">${cat.label}</span>
        </div>
        <div class="cat-card-body">
            <div class="cat-card-title">${labelTitle}</div>
            <div class="cat-progress-bar"><div class="cat-progress-fill" style="width:${pct}%;"></div></div>
            <div class="cat-card-meta">${n}/${n} Tópico(s) disponível(is)</div>
            <div class="cat-check">${n > 0 ? '✓' : ''}</div>
        </div>
    </div>`;
}

/* ----------------------------------------------------------------
   ABRIR CATEGORIA — lista os materiais da categoria
   ---------------------------------------------------------------- */
function openCategory(catKey, discId) {
    const cursos = window.cursosAVA || [];
    const c = cursos.find(d => d.id === discId);
    if (!c) return;

    const items = c[catKey] || [];
    const labels = {
        apresentacao: 'Apresentação',
        pdfs:         'Arquivos',
        avaliacoes:   'Avaliações',
        atividades:   'Atividades',
    };

    const content = document.getElementById('curso-content');
    content.innerHTML = `
        <div style="padding:1.25rem 1.5rem 0.75rem;display:flex;align-items:center;gap:12px;border-bottom:1px solid var(--c-border-lt);">
            <button onclick="openCourse({preventDefault:()=>{}}, ${discId})"
                style="display:flex;align-items:center;gap:6px;background:none;border:1px solid var(--c-border);
                       border-radius:var(--radius);padding:5px 12px;cursor:pointer;font-family:var(--f-body);
                       font-size:0.75rem;font-weight:600;color:var(--c-text-muted);transition:all 0.15s;"
                onmouseover="this.style.borderColor='var(--c-brand)';this.style.color='var(--c-brand)'"
                onmouseout="this.style.borderColor='var(--c-border)';this.style.color='var(--c-text-muted)'">
                <i data-lucide="arrow-left" style="width:13px;height:13px;"></i> Voltar
            </button>
            <div>
                <div style="font-size:0.88rem;font-weight:700;color:var(--c-text);">${labels[catKey]}</div>
                <div style="font-size:0.7rem;color:var(--c-text-muted);">${escHtml(c.nome)}</div>
            </div>
        </div>
        <div style="padding:1rem 1.5rem 1.5rem;">
            ${items.length === 0
                ? `<div style="text-align:center;padding:2.5rem;color:var(--c-text-muted);font-size:0.85rem;">
                       <i data-lucide="inbox" style="width:36px;height:36px;margin:0 auto 10px;display:block;opacity:0.25;"></i>
                       Nenhum conteúdo postado ainda nesta categoria.
                   </div>`
                : items.map(item => renderMatItem(item, catKey)).join('')
            }
        </div>
    `;
    lucide.createIcons();
}

function renderMatItem(item, catKey) {
    const hoje     = new Date().toISOString().slice(0, 10);
    const entregue = item.entrega_status === 'entregue' || item.entrega_status === 'corrigida';
    const atrasado = catKey === 'atividades' && item.data_entrega && item.data_entrega < hoje && !entregue;

    let badgeHtml = '';
    if (catKey === 'atividades') {
        if (entregue)      badgeHtml = `<span style="background:var(--c-green-lt);color:var(--c-green);font-size:0.65rem;font-weight:700;padding:2px 8px;border-radius:20px;">✓ Entregue</span>`;
        else if (atrasado) badgeHtml = `<span style="background:var(--c-red-lt);color:var(--c-red);font-size:0.65rem;font-weight:700;padding:2px 8px;border-radius:20px;">⚠ Atrasada</span>`;
        else               badgeHtml = `<span style="background:var(--c-brand-lt);color:var(--c-brand);font-size:0.65rem;font-weight:700;padding:2px 8px;border-radius:20px;">Pendente</span>`;
    }

    const icons = { apresentacao: 'presentation', pdf: 'file-text', atividade: 'edit-3', avaliacao: 'clipboard-check', aviso: 'megaphone' };
    const icon  = icons[item.tipo] || 'file-text';

    return `
    <div class="mat-item">
        <div class="mat-item-icon">
            <i data-lucide="${icon}" style="width:16px;height:16px;"></i>
        </div>
        <div class="mat-item-body">
            <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;margin-bottom:3px;">
                <span style="font-size:0.85rem;font-weight:700;color:var(--c-text);">${escHtml(item.titulo)}</span>
                ${badgeHtml}
            </div>
            ${item.descricao ? `<div style="font-size:0.72rem;color:var(--c-text-muted);line-height:1.5;margin-bottom:4px;">${escHtml(item.descricao)}</div>` : ''}
            <div style="font-size:0.68rem;color:var(--c-text-muted);">
                Prof. ${escHtml(item.professor_nome || '')}
                ${item.data_entrega ? ` &bull; <strong>Prazo: ${formatDate(item.data_entrega)}</strong>` : ''}
            </div>
        </div>
        ${item.arquivo_path ? `
        <a href="download_material.php?id=${item.id}" target="_blank" class="mat-item-btn">
            <i data-lucide="download" style="width:13px;height:13px;"></i> Baixar
        </a>` : ''}
    </div>`;
}

function escHtml(str) {
    if (!str) return '';
    return String(str).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

function formatDate(d) {
    if (!d) return '';
    const parts = d.slice(0, 10).split('-');
    return `${parts[2]}/${parts[1]}/${parts[0]}`;
}

function closeCourse() { showSec('home'); }

/* ----------------------------------------------------------------
   AVISOS CAROUSEL
   ---------------------------------------------------------------- */
let avisoIndex = 0;
const avisoSlides = document.querySelectorAll('.aviso-slide');
const avisoDots   = document.querySelectorAll('.aviso-dot');

function avisoGo(i) {
    if (!avisoSlides.length) return;
    avisoSlides[avisoIndex].classList.remove('active');
    avisoDots[avisoIndex]?.classList.remove('active');
    avisoIndex = (i + avisoSlides.length) % avisoSlides.length;
    avisoSlides[avisoIndex].classList.add('active');
    avisoDots[avisoIndex]?.classList.add('active');
}
function avisoNav(dir) { avisoGo(avisoIndex + dir); }

// Auto-advance
if (avisoSlides.length > 1) setInterval(() => avisoNav(1), 5000);

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
