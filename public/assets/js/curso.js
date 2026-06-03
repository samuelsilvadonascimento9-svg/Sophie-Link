/* ================================================================
   CURSO.JS — JavaScript Compartilhado (Sophie Link)
   ================================================================ */

document.addEventListener('DOMContentLoaded', () => {

    /* ── Lucide Icons ── */
    if (typeof lucide !== 'undefined') lucide.createIcons();

    /* ── Scroll Reveal ── */
    const revealEls = document.querySelectorAll('.reveal');
    if (revealEls.length) {
        const io = new IntersectionObserver((entries) => {
            entries.forEach(e => {
                if (e.isIntersecting) { e.target.classList.add('active'); io.unobserve(e.target); }
            });
        }, { threshold: 0.12 });
        revealEls.forEach(el => io.observe(el));
    }

    /* ── Accordion Grade Curricular ── */
    document.querySelectorAll('.modulo-header').forEach(hdr => {
        hdr.addEventListener('click', () => {
            const isOpen = hdr.classList.contains('open');
            // Fecha todos
            document.querySelectorAll('.modulo-header').forEach(h => h.classList.remove('open'));
            document.querySelectorAll('.modulo-body').forEach(b => b.classList.remove('open'));
            // Abre o clicado (toggle)
            if (!isOpen) {
                hdr.classList.add('open');
                hdr.nextElementSibling.classList.add('open');
            }
        });
    });

    /* ── Nav scroll effect ── */
    const nav = document.querySelector('.nav');
    if (nav) {
        const onScroll = () => nav.classList.toggle('nav-scrolled', window.scrollY > 50);
        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll();
    }

    /* ── Animação: Terminal Digitando (Informática) ── */
    const terminal = document.getElementById('terminalOutput');
    if (terminal) {
        const lines = [
            '$ npm install sophie-link',
            '✔ Pacotes instalados com sucesso',
            '$ node index.js',
            '🚀 Servidor rodando na porta 3000',
            '$ ping 192.168.1.1',
            'Resposta de 192.168.1.1: bytes=32 tempo=1ms',
            '$ ipconfig',
            'IPv4: 192.168.1.100',
            '$ git commit -m "Aprendendo com Sophie Link"',
            '[main] 1 file changed, 42 insertions(+)',
        ];
        let li = 0, ci = 0;
        function typeChar() {
            if (li >= lines.length) { li = 0; terminal.innerHTML = ''; }
            const line = lines[li];
            if (ci === 0) {
                const span = document.createElement('div');
                span.className = 'term-line';
                terminal.appendChild(span);
                if (terminal.children.length > 8) terminal.children[0].remove();
            }
            const cur = terminal.lastChild;
            cur.textContent = line.slice(0, ci + 1);
            ci++;
            if (ci >= line.length) { ci = 0; li++; setTimeout(typeChar, 600); }
            else { setTimeout(typeChar, 45); }
        }
        setTimeout(typeChar, 800);
    }

    /* ── Animação: EPI Checklist (Segurança do Trabalho) ── */
    document.querySelectorAll('.epi-item').forEach(item => {
        item.addEventListener('click', () => {
            item.classList.toggle('checked');
            const icon = item.querySelector('.epi-check');
            if (icon) icon.setAttribute('data-lucide', item.classList.contains('checked') ? 'check-circle-2' : 'circle');
            if (typeof lucide !== 'undefined') lucide.createIcons();
        });
    });

    /* ── Animação: Gauge Qualidade ── */
    const gauge = document.getElementById('gaugeNeedle');
    if (gauge) {
        let angle = -90;
        let dir = 1;
        setInterval(() => {
            angle += dir * 1.5;
            if (angle >= 60) dir = -1;
            if (angle <= -90) dir = 1;
            gauge.style.transform = `rotate(${angle}deg)`;
        }, 30);
    }

    /* ── Animação: Planilha Excel ── */
    const cells = document.querySelectorAll('.xls-cell');
    if (cells.length) {
        let idx = 0;
        setInterval(() => {
            cells.forEach(c => c.classList.remove('active-cell'));
            cells[idx % cells.length].classList.add('active-cell');
            idx++;
        }, 400);
    }

    /* ── Contadores de Estatísticas no Hero ── */
    const counters = document.querySelectorAll('[data-count]');
    counters.forEach(el => {
        const target = parseInt(el.dataset.count);
        const suffix = el.dataset.suffix || '';
        let current = 0;
        const step = Math.max(1, Math.floor(target / 60));
        const timer = setInterval(() => {
            current = Math.min(current + step, target);
            el.textContent = current + suffix;
            if (current >= target) clearInterval(timer);
        }, 25);
    });

});
