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


function filtrarFaturas(status, el) {
    if (el) {
        document.querySelectorAll('.finance-tab').forEach(btn => btn.classList.remove('active'));
        el.classList.add('active');
    }

    const linhas = document.querySelectorAll('.fatura-row');
    linhas.forEach(linha => {
        if (status === 'todas') {
            linha.style.display = '';
        } else {
            if (linha.getAttribute('data-status') === status) {
                linha.style.display = '';
            } else {
                linha.style.display = 'none';
            }
        }
    });
}
