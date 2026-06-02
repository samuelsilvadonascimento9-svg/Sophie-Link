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
            linha.style.display = 'flex';
        } else {
            if (linha.getAttribute('data-status') === status) {
                linha.style.display = 'flex';
            } else {
                linha.style.display = 'none';
            }
        }
    });
}

function switchSecretariaTab(tab, el) {
    if (el) {
        document.querySelectorAll('.finance-tab.sec-tab').forEach(btn => btn.classList.remove('active'));
        el.classList.add('active');
    }
    
    document.getElementById('tab-pedidos').style.display = 'none';
    document.getElementById('tab-novo').style.display = 'none';
    
    document.getElementById('tab-' + tab).style.display = 'block';
}

function switchHorarioTab(tab, el) {
    if (el) {
        document.querySelectorAll('#sec-horarios .finance-tab').forEach(btn => btn.classList.remove('active'));
        el.classList.add('active');
    }
    
    document.getElementById('tab-quadro').style.display = 'none';
    document.getElementById('tab-calendario').style.display = 'none';
    
    document.getElementById('tab-' + tab).style.display = 'block';
    
    // Se for o calendário, disparar resize event para forçar o FullCalendar a renderizar corretamente na div oculta
    if (tab === 'calendario') {
        window.dispatchEvent(new Event('resize'));
    }
}

function switchOportunidadesTab(tab, el) {
    if (el) {
        document.querySelectorAll('#sec-oportunidades .op-tab').forEach(btn => btn.classList.remove('active'));
        el.classList.add('active');
    }
    
    document.getElementById('tab-vagas').style.display = 'none';
    // Se existir a tab acompanhamento (atualmente não tem div real com conteúdo, mas deixo pronto)
    const acompanhamento = document.getElementById('tab-acompanhamento');
    if (acompanhamento) acompanhamento.style.display = 'none';
    
    const target = document.getElementById('tab-' + tab);
    if (target) target.style.display = 'block';
}

function emBreve() {
    alert("Esta funcionalidade ainda está em desenvolvimento e será lançada em breve!");
}

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

// ==================== LÓGICA DE NOTAS E FREQUÊNCIA ====================

let chartAvaliacaoInst = null;
let chartEtapaInst = null;

function initChartNotas() {
    const ctxAv = document.getElementById('chartNotasAvaliacao');
    const ctxEt = document.getElementById('chartNotasEtapa');
    
    if (!ctxAv || !ctxEt) return;

    if (chartAvaliacaoInst) chartAvaliacaoInst.destroy();
    if (chartEtapaInst) chartEtapaInst.destroy();

    // Paleta exclusiva Sophie Link
    const colorAluno = '#0EA5E9'; // Sky Blue
    const colorMedia = '#FF6B00'; // Brand Orange
    const radiusCustom = 6;

    // Chart 1: Notas por avaliação
    chartAvaliacaoInst = new Chart(ctxAv, {
        type: 'bar',
        data: {
            labels: ['AVALIACAO GERAL', 'CERTIFICADO DE PYTHON', 'TRABALHOS EM SALA', 'TRABALHO FINAL'],
            datasets: [
                {
                    label: 'Aluno',
                    data: [2.48, 2.00, 0.80, 3.00],
                    backgroundColor: colorAluno,
                    borderRadius: radiusCustom,
                    maxBarThickness: 40
                },
                {
                    label: 'Média da turma',
                    data: [1.71, 1.85, 1.45, 2.78],
                    backgroundColor: colorMedia,
                    borderRadius: radiusCustom,
                    maxBarThickness: 40
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { position: 'bottom', labels: { usePointStyle: true, pointStyle: 'circle', boxWidth: 10, padding: 20, font: { family: "'Inter', sans-serif", size: 12 } } }
            },
            scales: {
                y: { beginAtZero: true, max: 3.5, grid: { borderDash: [5, 5], color: '#E2E8F0' } },
                x: { grid: { display: false }, ticks: { font: { family: "'Inter', sans-serif", size: 10, weight: '500' } } }
            }
        }
    });

    // Chart 2: Notas por etapa
    chartEtapaInst = new Chart(ctxEt, {
        type: 'bar',
        data: {
            labels: ['Média', 'Recuperação', 'Média Final'],
            datasets: [
                {
                    label: 'Média da turma',
                    data: [7.89, 7.89, 7.89],
                    backgroundColor: colorMedia,
                    borderRadius: radiusCustom,
                    maxBarThickness: 40
                },
                {
                    label: 'Aluno',
                    data: [8.5, 8.5, 8.5],
                    backgroundColor: colorAluno,
                    borderRadius: radiusCustom,
                    maxBarThickness: 40
                }
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

function switchNotasTab(tab, el) {
    if (el) {
        document.querySelectorAll('.notas-tab').forEach(btn => btn.classList.remove('active'));
        el.classList.add('active');
    }
    
    document.querySelectorAll('.notas-tab-content').forEach(c => c.style.display = 'none');
    const target = document.getElementById('tab-notas-' + tab);
    if (target) target.style.display = 'block';
}

function abrirModalNotas(disciplinaNome, media) {
    const modal = document.getElementById('modalNotas');
    if (!modal) return;
    
    document.getElementById('modalNotasTitle').textContent = disciplinaNome + ': Projeto integrador';
    
    const tbody = document.getElementById('modalNotasBody');
    tbody.innerHTML = '';
    
    const dadosMocks = [
        { etapa: 'Média', dataAvaliacao: '28/04/2026', avaliacao: 'AVALIACAO GERAL', valor: '3,00', nota: '2,48', dataDevolucao: '' },
        { etapa: 'Média', dataAvaliacao: '', avaliacao: 'CERTIFICADO DE PYTHON', valor: '2,00', nota: '2,00', dataDevolucao: '' },
        { etapa: 'Média', dataAvaliacao: '', avaliacao: 'TRABALHOS EM SALA', valor: '2,00', nota: '0,80', notaBaixa: true, dataDevolucao: '' },
        { etapa: 'Média', dataAvaliacao: '', avaliacao: 'TRABALHO FINAL', valor: '3,00', nota: '3,00', dataDevolucao: '' }
    ];
    
    dadosMocks.forEach(d => {
        const isNotaBaixa = d.notaBaixa;
        const bgRow = '#FFFFFF';
        
        let notaBadge = '';
        if (isNotaBaixa) {
            notaBadge = `<span style="background: #FEF2F2; color: #DC2626; padding: 4px 10px; border-radius: 6px; font-weight: 700; border: 1px solid #FECACA;">${d.nota}</span>`;
        } else {
            notaBadge = `<span style="background: #F0FDF4; color: #16A34A; padding: 4px 10px; border-radius: 6px; font-weight: 700; border: 1px solid #BBF7D0;">${d.nota}</span>`;
        }

        const tr = document.createElement('tr');
        tr.style.cssText = `background: ${bgRow}; border-bottom: 1px solid #E2E8F0; transition: background 0.2s;`;
        tr.onmouseover = () => tr.style.background = '#F8FAFC';
        tr.onmouseout = () => tr.style.background = bgRow;
        
        tr.innerHTML = `
            <td style="padding: 16px 20px; font-weight: 600; color: #475569;">${d.etapa}</td>
            <td style="padding: 16px 20px; text-align: center; color: #64748B; font-weight: 500;">${d.dataAvaliacao || '-'}</td>
            <td style="padding: 16px 20px; color: #1E293B; font-weight: 600;">${d.avaliacao}</td>
            <td style="padding: 16px 20px; text-align: center; color: #64748B; font-weight: 600;">${d.valor} pts</td>
            <td style="padding: 16px 20px; text-align: center;">${notaBadge}</td>
            <td style="padding: 16px 20px; text-align: center; color: #64748B;">${d.dataDevolucao || '-'}</td>
        `;
        tbody.appendChild(tr);
    });

    modal.classList.add('active');
}

function fecharModalNotas() {
    const modal = document.getElementById('modalNotas');
    if (modal) modal.classList.remove('active');
}

const originalShowSec = showSec;
showSec = function(id, el) {
    originalShowSec(id, el);
    if (id === 'notas') {
        setTimeout(initChartNotas, 100);
    }
};

document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('sec-notas') && document.getElementById('sec-notas').classList.contains('active')) {
        setTimeout(initChartNotas, 100);
    }
});
