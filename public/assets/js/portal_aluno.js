lucide.createIcons();

function showSec(id, el) {
    event && event.preventDefault();
    document.querySelectorAll('.sec').forEach(s => s.classList.remove('active'));
    const sec = document.getElementById('sec-' + id);
    if (sec) sec.classList.add('active');
    document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
    if (el) el.classList.add('active');
    const titles = { inicio: 'Portal do Aluno', notas: 'Notas & Frequência', financeiro: 'Financeiro' };
    const tb = document.getElementById('topbar-title');
    if (tb) tb.textContent = titles[id] || 'Portal do Aluno';
}

