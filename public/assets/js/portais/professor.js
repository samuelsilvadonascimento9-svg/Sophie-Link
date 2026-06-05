lucide.createIcons();
function showSec(id, el) {
    document.querySelectorAll('.sec').forEach(s => s.classList.remove('active'));
    document.getElementById('sec-' + id).classList.add('active');
    document.querySelectorAll('.subnav-link').forEach(l => l.classList.remove('active'));
    el.classList.add('active');
}
async function gerarSimulado(e) {
    e.preventDefault();
    
    const btn = document.getElementById('btn-gerar-ia');
    const loading = document.getElementById('ia-loading');
    const discTurma = document.getElementById('ia_disciplina_turma').value;
    const qtd = document.getElementById('ia_qtd').value;
    const tema = document.getElementById('ia_tema').value;

    if (!discTurma || !tema) return;

    const parts = discTurma.split('-');
    
    btn.style.display = 'none';
    loading.style.display = 'block';

    try {
        const res = await fetch('../api/ai/gerar_simulado.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                disciplina_id: parts[0],
                turma_id: parts[1],
                tema: tema,
                qtd_questoes: qtd
            })
        });

        const data = await res.json();
        if (data.success) {
            alert('Simulado gerado com sucesso! (ID: ' + data.simulado_id + ')');
            document.getElementById('form-ia').reset();
        } else {
            alert('Erro ao gerar simulado: ' + (data.error || 'Erro desconhecido.'));
            console.error(data);
        }
    } catch (err) {
        alert('Erro na comunicação com o servidor.');
        console.error(err);
    } finally {
        btn.style.display = 'inline-block';
        loading.style.display = 'none';
    }
}
