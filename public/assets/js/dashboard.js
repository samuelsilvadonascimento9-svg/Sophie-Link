lucide.createIcons();

// Chart.js init
const ctx = document.getElementById('roleChart');
if(ctx) {
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: window.chartLabelsData,
            datasets: [{
                data: window.chartValuesData,
                backgroundColor: ['#FF6B00', '#111827', '#6B7280', '#E5E7EB', '#374151'],
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { position: 'bottom', labels: { boxWidth: 12, font: { family: "'Inter', sans-serif" } } }
            }
        }
    });
}

function showSec(id, el) {
    document.querySelectorAll('.sec').forEach(s => s.classList.remove('active'));
    document.getElementById('sec-' + id).classList.add('active');
    document.querySelectorAll('.tab').forEach(l => l.classList.remove('active'));
    if (el) el.classList.add('active');
}
function openModal(id) {
    document.getElementById(id).classList.add('active');
}
function closeModal(id) {
    document.getElementById(id).classList.remove('active');
}

