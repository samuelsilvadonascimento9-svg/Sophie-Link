// Aguarda o DOM estar 100% pronto antes de qualquer coisa
document.addEventListener('DOMContentLoaded', function() {
    lucide.createIcons();

    // Garante que apenas a seção 'active' apareça (inline style = máxima especificidade)
    document.querySelectorAll('.page-section').forEach(function(s) {
        if (s.classList.contains('active')) {
            s.style.display = 'block';
        } else {
            s.style.display = 'none';
        }
    });
});

/* ----------------------------------------------------------------
   NAVEGAÇÃO ENTRE SEÇÕES
   ---------------------------------------------------------------- */
function showSec(id) {
    // Esconde todas as seções com inline style (maior especificidade que qualquer CSS)
    document.querySelectorAll('.page-section').forEach(s => {
        s.style.display = 'none';
        s.classList.remove('active');
    });
    // Mostra a seção solicitada
    const el = document.getElementById('sec-' + id);
    if (el) {
        el.style.display = 'block';
        el.classList.add('active');
    }
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
        { key: 'simulados',    label: 'SIMULADOS',    icon: 'sparkles',        items: c.simulados    },
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
            <i data-lucide="${cat.icon}" style="width:40px;height:40px;color:rgba(255,255,255,0.9);z-index:2;margin-bottom:4px;"></i>
            <span class="cat-card-label">${cat.label}</span>
        </div>
        <div class="cat-card-body">
            <div class="cat-card-title">${labelTitle}</div>
            <div class="cat-progress-bar"><div class="cat-progress-fill" style="width:${pct}%;"></div></div>
            <div class="cat-card-meta">${n}/${n} Tópicos concluídos</div>
            <div class="cat-check">${n > 0 ? '✓' : ''}</div>
        </div>
    </div>`;
}

/* ----------------------------------------------------------------
   ABRIR CATEGORIA — lista os materiais da categoria
   ---------------------------------------------------------------- */
function openCategory(catKey, discId) {
    if (catKey === 'simulados') {
        const items = window.materiais.filter(m => m.disciplina_id == discId && m.tipo === 'simulado');
        if (items.length > 0) {
            window.location.href = `responder_simulado.php?id=${items[0].id}`;
        } else {
            alert('Não há simulados disponíveis no momento.');
        }
        return;
    }

    // Para todas as outras categorias, vai direto para o visualizador (comportamento Brightspace)
    window.location.href = `visualizador.php?disc=${discId}&cat=${catKey}`;
}

function renderMatItem(item, catKey, isLast = false) {
    const hoje     = new Date().toISOString().slice(0, 10);
    const entregue = item.entrega_status === 'entregue' || item.entrega_status === 'corrigida';
    const atrasado = catKey === 'atividades' && item.data_entrega && item.data_entrega < hoje && !entregue;

    let badgeHtml = '';
    if (catKey === 'atividades') {
        if (entregue)      badgeHtml = `<span style="background:#def7ec;color:#03543f;font-size:0.7rem;font-weight:600;padding:2px 10px;border-radius:12px;">✓ Entregue</span>`;
        else if (atrasado) badgeHtml = `<span style="background:#fde8e8;color:#9b1c1c;font-size:0.7rem;font-weight:600;padding:2px 10px;border-radius:12px;">Atrasada</span>`;
        else               badgeHtml = `<span style="background:#e8f0fe;color:#1967d2;font-size:0.7rem;font-weight:600;padding:2px 10px;border-radius:12px;">Pendente</span>`;
    }

    const icons = { apresentacao: 'presentation', pdf: 'file-text', atividade: 'edit-3', avaliacao: 'clipboard-check', aviso: 'megaphone', simulados: 'sparkles' };
    const icon  = icons[item.tipo] || icons[catKey] || 'file-text';
    
    const borderBottom = isLast ? 'none' : '1px solid #eaeaea';

    return `
    <div style="display: flex; align-items: center; justify-content: space-between; padding: 20px 10px; border-bottom: ${borderBottom}; transition: background 0.2s; border-radius: 6px;" onmouseover="this.style.background='#f8f9fa'" onmouseout="this.style.background='transparent'">
        <div style="display: flex; align-items: center; gap: 18px;">
            <div style="width: 44px; height: 44px; background: #e8f0fe; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: #1967d2; flex-shrink: 0;">
                <i data-lucide="${icon}" style="width:20px;height:20px;"></i>
            </div>
            <div>
                <div style="display:flex;align-items:center;gap:12px;margin-bottom:4px;">
                    <span style="font-size:1.05rem;font-weight:600;color:#222;">${escHtml(item.titulo)}</span>
                    ${badgeHtml}
                </div>
                <div style="font-size:0.85rem;color:#666;">
                    Prof. ${escHtml(item.professor_nome || '')}
                    ${item.data_entrega ? ` &bull; <strong style="color:#444;">Prazo: ${formatDate(item.data_entrega)}</strong>` : ''}
                </div>
            </div>
        </div>
        <div style="display:flex;gap:12px;">
            <a href="${catKey === 'simulados' ? 'responder_simulado.php?id=' + item.id : 'visualizador.php?id=' + item.id}" style="display:flex;align-items:center;gap:6px;padding:8px 18px;background:#e8f0fe;color:#1967d2;border-radius:24px;font-size:0.85rem;font-weight:600;text-decoration:none;transition:all 0.2s;" onmouseover="this.style.background='#d2e3fc'" onmouseout="this.style.background='#e8f0fe'">
                <i data-lucide="${catKey === 'simulados' ? 'play' : 'eye'}" style="width:16px;height:16px;"></i> ${catKey === 'simulados' ? 'Responder' : 'Visualizar'}
            </a>
            ${item.arquivo_path ? `
            <a href="download_material.php?id=${item.id}" target="_blank" style="display:flex;align-items:center;gap:6px;padding:8px 18px;background:#f1f3f4;color:#444;border-radius:24px;font-size:0.85rem;font-weight:600;text-decoration:none;transition:all 0.2s;" onmouseover="this.style.background='#e8eaed'" onmouseout="this.style.background='#f1f3f4'">
                <i data-lucide="download" style="width:16px;height:16px;"></i> Baixar
            </a>` : ''}
            ${(catKey === 'atividades' && !entregue) ? `
            <button onclick="openDeliveryModal(${item.id}, '${escHtml(item.titulo)}')" style="display:flex;align-items:center;gap:6px;padding:8px 18px;background:#1967d2;color:#fff;border:none;border-radius:24px;font-size:0.85rem;font-weight:600;cursor:pointer;transition:all 0.2s;box-shadow:0 2px 4px rgba(25,103,210,0.3);" onmouseover="this.style.background='#1557b0';this.style.transform='translateY(-1px)'" onmouseout="this.style.background='#1967d2';this.style.transform='translateY(0)'">
                <i data-lucide="upload" style="width:16px;height:16px;"></i> Entregar
            </button>` : ''}
        </div>
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

function openDeliveryModal(materialId, materialTitle) {
    const modal = document.getElementById('delivery-modal');
    if (!modal) return;
    document.getElementById('delivery-material-id').value = materialId;
    document.getElementById('delivery-title').textContent = materialTitle;
    modal.style.display = 'flex';
}

function closeDeliveryModal() {
    const modal = document.getElementById('delivery-modal');
    if (modal) modal.style.display = 'none';
}

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
