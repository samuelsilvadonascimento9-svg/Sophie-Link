lucide.createIcons();
function showSec(id, el) {
    document.querySelectorAll('.sec').forEach(s => s.classList.remove('active'));
    document.getElementById('sec-' + id).classList.add('active');
    document.querySelectorAll('.subnav-link').forEach(l => l.classList.remove('active'));
    el.classList.add('active');
}

