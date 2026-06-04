lucide.createIcons();

// Mask para Telefone
const phoneInput = document.getElementById('telefone');
if(phoneInput) {
    phoneInput.addEventListener('input', function(e) {
        let x = e.target.value.replace(/\D/g, '').match(/(\d{0,2})(\d{0,5})(\d{0,4})/);
        e.target.value = !x[2] ? x[1] : '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : '');
    });
}

// Side menu
const sideMenu = document.getElementById('sideMenu');
const sideOverlay = document.getElementById('sideOverlay');
function toggleMenu() {
    sideMenu.classList.toggle('active');
    sideOverlay.classList.toggle('active');
}
document.getElementById('menuOpen').addEventListener('click', toggleMenu);
document.getElementById('smClose').addEventListener('click', toggleMenu);
sideOverlay.addEventListener('click', toggleMenu);

// Accordion
function toggleAcc(btn) {
    const body = btn.nextElementSibling;
    const isOpen = body.classList.contains('open');
    // fecha todos
    document.querySelectorAll('.sm-acc-body.open').forEach(b => b.classList.remove('open'));
    document.querySelectorAll('.sm-acc-btn.open').forEach(b => b.classList.remove('open'));
    if (!isOpen) {
        body.classList.add('open');
        btn.classList.add('open');
    }
}


// Scroll Reveal
document.addEventListener('DOMContentLoaded', () => {
    const reveals = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
    reveals.forEach(el => observer.observe(el));
});

// Stats Counter Animation
document.addEventListener('DOMContentLoaded', () => {
    const statNums = document.querySelectorAll('.stat-num');
    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const target = parseInt(el.getAttribute('data-target'));
                const prefix = el.getAttribute('data-prefix') || '';
                const suffix = el.getAttribute('data-suffix') || '';
                const duration = 2000;
                const stepTime = Math.abs(Math.floor(duration / target));
                
                let current = 0;
                const timer = setInterval(() => {
                    current += Math.ceil(target / 50);
                    if (current >= target) {
                        current = target;
                        clearInterval(timer);
                    }
                    el.innerText = prefix + current + suffix;
                }, stepTime);
                
                obs.unobserve(el);
            }
        });
    }, { threshold: 0.5 });
    
    statNums.forEach(num => observer.observe(num));
});

// Course Filters
document.addEventListener('DOMContentLoaded', () => {
    const chips = document.querySelectorAll('.cf-chip');
    const cards = document.querySelectorAll('.course-card-v2');

    chips.forEach(chip => {
        chip.addEventListener('click', () => {
            // Remove active from all chips
            chips.forEach(c => c.classList.remove('cf-active'));
            chip.classList.add('cf-active');

            const filter = chip.getAttribute('data-filter');

            cards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-cat').includes(filter)) {
                    card.classList.remove('hidden');
                    // Reset inline styles used by absolute positioning hack in CSS
                    card.style.position = 'relative';
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });
});

