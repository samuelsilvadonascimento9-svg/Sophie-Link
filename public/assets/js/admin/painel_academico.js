lucide.createIcons();
function showSec(id, el) {
    event && event.preventDefault();
    document.querySelectorAll('.sec').forEach(s => s.classList.remove('active'));
    const sec = document.getElementById('sec-' + id);
    if (sec) sec.classList.add('active');
    document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
    if (el) el.classList.add('active');
    const titles = { dashboard:'Dashboard', aprendizes:'Aprendizes', 'empresas-list':'Empresas Parceiras', financeiro:'Financeiro' };
    document.getElementById('topbar-title').textContent = titles[id] || 'Gestão';
}

// Chart.js - Dashboard Visual
const ctx = document.getElementById('chartFinanceiro').getContext('2d');
new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai'],
        datasets: [{
            label: 'Receitas (R$)',
            data: [3400, 3400, 3400, 3400, window.receitaMes || 3400],
            backgroundColor: '#FF6B00',
            borderRadius: 4
        }]
    },
    options: {
        responsive: true,
        plugins: { legend: { display: false } },
        scales: { y: { beginAtZero: true } }
    }
});

