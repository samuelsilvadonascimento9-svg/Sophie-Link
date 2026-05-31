        </div><!-- /content-scroll -->
    </main><!-- /main-content -->
</div><!-- /app-layout -->

<script>
// Inicializar os ícones do Lucide
if (typeof lucide !== 'undefined') {
    lucide.createIcons();
}

// Preloader
window.addEventListener('load', () => {
    setTimeout(() => {
        const preloader = document.getElementById('preloader');
        if(preloader) preloader.classList.add('hide');
    }, 400);
});

// Toast Notifications
function showToast(msg, type = 'success') {
    const toast = document.getElementById('toast');
    const item = document.createElement('div');
    item.className = `toast-item ${type}`;
    item.innerHTML = `
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="${type==='success'?'#4ADE80':'#EF4444'}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0;">
            ${type==='success'
                ? '<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>'
                : '<circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/>'}
        </svg>
        <div>${msg}</div>`;
    toast.appendChild(item);
    setTimeout(() => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(20px)';
        item.style.transition = 'all 0.3s ease';
        setTimeout(() => item.remove(), 300);
    }, 3500);
}

// Modal Helpers
function openModal(id) { 
    const modal = document.getElementById(id);
    if(modal) modal.classList.add('open'); 
}
function closeModal(id) { 
    const modal = document.getElementById(id);
    if(modal) modal.classList.remove('open'); 
}

// Click outside to close modal
document.querySelectorAll('.modal-overlay').forEach(m => {
    m.addEventListener('click', e => { 
        if (e.target === m) m.classList.remove('open'); 
    });
});
</script>
</body>
</html>
