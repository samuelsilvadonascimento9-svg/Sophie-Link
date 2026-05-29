        </div><!-- /content-scroll -->
    </div><!-- /main-content -->
</div><!-- /app-layout -->

<script>
// Preloader
window.addEventListener('load', () => {
    setTimeout(() => document.getElementById('preloader').classList.add('hide'), 600);
});

// Modal helpers
function openModal(id)  { const m = document.getElementById(id); if(m) m.classList.add('open'); }
function closeModal(id) { const m = document.getElementById(id); if(m) m.classList.remove('open'); }
document.addEventListener('click', e => {
    if (e.target.classList.contains('modal-overlay')) e.target.classList.remove('open');
});

// Toast
function showToast(msg, type = 'success') {
    const toast = document.getElementById('toast');
    const item = document.createElement('div');
    item.className = `toast-item ${type}`;
    item.innerHTML = `
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="${type==='success'?'#22C55E':'#EF4444'}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            ${type==='success'
                ? '<polyline points="20 6 9 17 4 12"/>'
                : '<circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/>'}
        </svg>
        ${msg}`;
    toast.appendChild(item);
    setTimeout(() => item.remove(), 3500);
}

// Modal helpers
function openModal(id) { document.getElementById(id).classList.add('open'); }
function closeModal(id) { document.getElementById(id).classList.remove('open'); }
document.querySelectorAll('.modal-overlay').forEach(m => {
    m.addEventListener('click', e => { if (e.target === m) m.classList.remove('open'); });
});
</script>
</body>
</html>
