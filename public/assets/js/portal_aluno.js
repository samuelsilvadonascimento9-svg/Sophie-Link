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
