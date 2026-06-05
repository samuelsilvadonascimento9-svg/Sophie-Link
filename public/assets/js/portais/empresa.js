/* empresa.js — Portal Corporativo Sophie Link */
'use strict';

// ══════════════════════════════════════════════════════════════════════════════
// NAVEGAÇÃO POR SEÇÕES
// ══════════════════════════════════════════════════════════════════════════════
const sectionTitles = {
    inicio:     'Dashboard',
    aprendizes: 'Aprendizes',
    frequencia: 'Frequência',
    financeiro: 'Financeiro'
};

function showSec(id, el) {
    document.querySelectorAll('.sec').forEach(s => s.classList.remove('active'));
    const sec = document.getElementById('sec-' + id);
    if (sec) sec.classList.add('active');

    document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
    if (el) el.classList.add('active');

    const tb = document.getElementById('topbar-title');
    if (tb) tb.textContent = sectionTitles[id] || 'Portal';
}

// ══════════════════════════════════════════════════════════════════════════════
// BUSCA EM TEMPO REAL
// Filtra linhas visíveis da tabela pelo texto do input
// Também atualiza o contador de registros visíveis
// ══════════════════════════════════════════════════════════════════════════════
function initSearch(inputId, tableId, counterId) {
    const input = document.getElementById(inputId);
    const table = document.getElementById(tableId);
    if (!input || !table) return;

    input.addEventListener('input', function () {
        const q = this.value.toLowerCase().trim();
        const rows = table.querySelectorAll('tbody tr');
        let visible = 0;

        rows.forEach(row => {
            const match = !q || row.textContent.toLowerCase().includes(q);
            row.classList.toggle('hidden', !match);
            if (match) visible++;
        });

        if (counterId) {
            const counter = document.getElementById(counterId);
            if (counter) {
                counter.textContent = `${visible} registro${visible !== 1 ? 's' : ''} encontrado${visible !== 1 ? 's' : ''}`;
            }
        }
    });
}

// ══════════════════════════════════════════════════════════════════════════════
// ORDENAÇÃO DE COLUNAS
// Suporta: texto, datas (yyyy-mm-dd em data-value), números e percentuais
// Usa data-value nas células para comparação precisa sem parsear strings formatadas
// ══════════════════════════════════════════════════════════════════════════════
function initSortableTable(tableId) {
    const table = document.getElementById(tableId);
    if (!table) return;

    const headers = table.querySelectorAll('th.sortable');
    let currentCol = null;
    let currentDir = 'asc';

    headers.forEach(th => {
        th.addEventListener('click', function () {
            const colIdx = parseInt(this.dataset.sort, 10);

            // Determinar direção
            if (currentCol === colIdx) {
                currentDir = currentDir === 'asc' ? 'desc' : 'asc';
            } else {
                currentCol = colIdx;
                currentDir = 'asc';
            }

            // Atualizar indicadores visuais
            headers.forEach(h => {
                h.classList.remove('sort-asc', 'sort-desc');
                const icon = h.querySelector('.sort-icon');
                if (icon) icon.textContent = '↕';
            });
            this.classList.add(currentDir === 'asc' ? 'sort-asc' : 'sort-desc');
            const icon = this.querySelector('.sort-icon');
            if (icon) icon.textContent = currentDir === 'asc' ? '↑' : '↓';

            // Ordenar linhas (respeita linhas hidden da busca)
            const tbody = table.querySelector('tbody');
            const rows  = Array.from(tbody.querySelectorAll('tr'));

            rows.sort((a, b) => {
                const cellA = a.cells[colIdx];
                const cellB = b.cells[colIdx];
                if (!cellA || !cellB) return 0;

                // Preferir data-value quando disponível (datas, números brutos)
                const rawA = cellA.dataset.value !== undefined ? cellA.dataset.value : cellA.textContent.trim();
                const rawB = cellB.dataset.value !== undefined ? cellB.dataset.value : cellB.textContent.trim();

                // Tentar comparação numérica
                const numA = parseFloat(rawA);
                const numB = parseFloat(rawB);
                if (!isNaN(numA) && !isNaN(numB)) {
                    return currentDir === 'asc' ? numA - numB : numB - numA;
                }

                // Comparação de string (com suporte a português)
                return currentDir === 'asc'
                    ? rawA.localeCompare(rawB, 'pt-BR', { sensitivity: 'base' })
                    : rawB.localeCompare(rawA, 'pt-BR', { sensitivity: 'base' });
            });

            rows.forEach(row => tbody.appendChild(row));
        });
    });
}

// ══════════════════════════════════════════════════════════════════════════════
// GRÁFICO DE FREQUÊNCIA
// ══════════════════════════════════════════════════════════════════════════════
function initFreqChart() {
    const ctx = document.getElementById('freqChart');
    if (!ctx) return;

    const labels = window._chartFreqLabels || [];
    const dados  = window._chartFreqDados  || [];
    if (!labels.length) return;

    const cores = dados.map(v => v < 75 ? '#DC2626' : '#1E3A8A');
    // barThickness dinâmico: evita barras minúsculas com muitos aprendizes
    const barThickness = Math.max(14, Math.min(44, Math.floor(560 / Math.max(labels.length, 1))));

    new Chart(ctx.getContext('2d'), {
        type: 'bar',
        data: {
            labels,
            datasets: [{
                label: 'Frequência (%)',
                data: dados,
                backgroundColor: cores,
                borderRadius: 6,
                barThickness,
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { display: false },
                tooltip: { callbacks: { label: c => ` ${c.parsed.y}%` } },
            },
            scales: {
                y: {
                    beginAtZero: true, max: 100,
                    grid: { color: '#F1F5F9' },
                    ticks: { callback: v => v + '%' }
                },
                x: { grid: { display: false } }
            }
        },
        plugins: [{
            id: 'linha75',
            afterDraw(chart) {
                const { ctx: c, chartArea: { left, right }, scales: { y } } = chart;
                const y75 = y.getPixelForValue(75);
                c.save();
                c.beginPath();
                c.setLineDash([6, 4]);
                c.strokeStyle = '#DC2626';
                c.lineWidth = 2;
                c.moveTo(left, y75);
                c.lineTo(right, y75);
                c.stroke();
                c.setLineDash([]);
                c.fillStyle = '#DC2626';
                c.font = '600 11px Inter, sans-serif';
                c.fillText('Mínimo legal (75%)', right - 130, y75 - 5);
                c.restore();
            }
        }]
    });
}

// ══════════════════════════════════════════════════════════════════════════════
// GRÁFICO DE ROI (RETORNO SOBRE INVESTIMENTO)
// ══════════════════════════════════════════════════════════════════════════════
function initRoiChart() {
    const ctx = document.getElementById('roiChart');
    if (!ctx) return;

    const labels = window._chartFreqLabels || [];
    const dados  = window._chartRoiDados   || [];
    const notas  = window._chartNotasDados || [];
    if (!labels.length) return;

    const cores = dados.map(v => v >= 80 ? '#10B981' : (v >= 60 ? '#F59E0B' : '#EF4444'));

    new Chart(ctx.getContext('2d'), {
        type: 'bar',
        data: {
            labels,
            datasets: [{
                label: 'ROI (%)',
                data: dados,
                backgroundColor: cores,
                borderRadius: 4,
                barThickness: Math.max(14, Math.min(44, Math.floor(560 / Math.max(labels.length, 1)))),
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { display: false },
                tooltip: { 
                    callbacks: { 
                        label: function(c) {
                            let idx = c.dataIndex;
                            return [
                                ` ROI: ${c.parsed.y}%`,
                                ` Frequência: ${window._chartFreqDados[idx]}%`,
                                ` Média Notas: ${notas[idx] > 0 ? notas[idx] : 'N/A'}`
                            ];
                        } 
                    } 
                },
            },
            scales: {
                y: {
                    beginAtZero: true, max: 100,
                    grid: { color: '#F1F5F9' },
                    ticks: { callback: v => v + '%' }
                },
                x: { grid: { display: false } }
            }
        }
    });
}

// ══════════════════════════════════════════════════════════════════════════════
// GRÁFICO DE EVOLUÇÃO FINANCEIRA
// ══════════════════════════════════════════════════════════════════════════════
function initEvolChart() {
    const ctx = document.getElementById('evolChart');
    if (!ctx) return;

    const labels  = window._chartEvolLabels || [];
    const pago    = window._chartEvolPago   || [];
    const pendente = window._chartEvolPend  || [];
    if (!labels.length) return;

    new Chart(ctx.getContext('2d'), {
        type: 'bar',
        data: {
            labels,
            datasets: [
                {
                    label: 'Pago',
                    data: pago,
                    backgroundColor: '#22C55E',
                    borderRadius: 6,
                    barThickness: 28,
                },
                {
                    label: 'Pendente / Atrasado',
                    data: pendente,
                    backgroundColor: '#F97316',
                    borderRadius: 6,
                    barThickness: 28,
                }
            ]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { position: 'top', align: 'end', labels: { font: { family: 'Inter', size: 11 }, boxWidth: 12, padding: 16 } },
                tooltip: { callbacks: { label: c => ` R$ ${c.parsed.y.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}` } },
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: { color: '#F1F5F9' },
                    ticks: { callback: v => 'R$ ' + v.toLocaleString('pt-BR') }
                },
                x: { grid: { display: false } }
            }
        }
    });
}

// ══════════════════════════════════════════════════════════════════════════════
// PAGAMENTO — Mercado Pago
// Mesma lógica do portal do aluno, adaptada para empresa
// ══════════════════════════════════════════════════════════════════════════════
function iniciarPagamento(faturaId, btn) {
    if (!faturaId) {
        alert('ID da fatura inválido.');
        return;
    }

    const oldHtml = btn.innerHTML;
    btn.innerHTML = '<i data-lucide="loader-2" style="width:15px;height:15px;animation:spin 1s linear infinite;"></i> Processando...';
    btn.disabled = true;
    if (window.lucide) lucide.createIcons();

    // Adicionar estilo de spin se ainda não existir
    if (!document.getElementById('spin-style')) {
        const s = document.createElement('style');
        s.id = 'spin-style';
        s.textContent = '@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }';
        document.head.appendChild(s);
    }

    fetch('../api/pagamentos/checkout_mp.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: faturaId })
    })
    .then(res => res.json())
    .then(data => {
        if (data.success && data.init_point) {
            // Abre o checkout do Mercado Pago em nova aba
            window.open(data.init_point, '_blank');
            btn.innerHTML = oldHtml;
            btn.disabled = false;
            if (window.lucide) lucide.createIcons();
        } else {
            alert('Erro ao gerar pagamento: ' + (data.error || 'Falha desconhecida.'));
            btn.innerHTML = oldHtml;
            btn.disabled = false;
            if (window.lucide) lucide.createIcons();
        }
    })
    .catch(err => {
        console.error(err);
        alert('Erro de comunicação com o servidor. Tente novamente.');
        btn.innerHTML = oldHtml;
        btn.disabled = false;
        if (window.lucide) lucide.createIcons();
    });
}


document.addEventListener('DOMContentLoaded', function () {
    lucide.createIcons();

    // Navegar para a aba correta (mantém contexto após redirect por filtro)
    const tab = window._activeTab || 'inicio';
    const navEl = document.getElementById('nav-' + tab);
    showSec(tab, navEl || document.getElementById('nav-inicio'));

    // Inicializar busca em tempo real
    initSearch('search-aprendizes', 'table-aprendizes', 'aprendizes-count');
    initSearch('search-frequencia', 'table-frequencia', 'frequencia-count');

    // Inicializar ordenação de colunas
    initSortableTable('table-aprendizes');
    initSortableTable('table-frequencia');
    initSortableTable('table-financeiro');

    // Inicializar gráficos
    initFreqChart();
    initRoiChart();
    initEvolChart();
});
