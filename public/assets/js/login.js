lucide.createIcons();

const senhaInput = document.getElementById('senha');
if (senhaInput) {
    let toggleEye = document.getElementById('toggle-eye');
    
    // Inject the toggle button dynamically if it doesn't exist in the HTML
    if (!toggleEye) {
        const parent = senhaInput.parentElement;
        parent.style.position = 'relative';
        
        toggleEye = document.createElement('button');
        toggleEye.type = 'button';
        toggleEye.id = 'toggle-eye';
        toggleEye.style.position = 'absolute';
        toggleEye.style.right = '12px';
        toggleEye.style.top = '50%';
        toggleEye.style.transform = 'translateY(-50%)';
        toggleEye.style.background = 'transparent';
        toggleEye.style.border = 'none';
        toggleEye.style.cursor = 'pointer';
        toggleEye.style.color = 'var(--c-text-muted, #94A3B8)';
        toggleEye.style.display = 'flex';
        toggleEye.style.alignItems = 'center';
        toggleEye.style.justifyContent = 'center';
        toggleEye.style.padding = '0';
        toggleEye.innerHTML = '<i data-lucide="eye" style="width:18px;height:18px;"></i>';
        
        senhaInput.style.paddingRight = '40px'; // Prevent text from hiding behind the icon
        parent.appendChild(toggleEye);
        if (window.lucide) window.lucide.createIcons();
    }

    toggleEye.addEventListener('click', () => {
        const visible = senhaInput.type === 'text';
        senhaInput.type = visible ? 'password' : 'text';
        toggleEye.innerHTML = visible
            ? '<i data-lucide="eye" style="width:18px;height:18px;"></i>'
            : '<i data-lucide="eye-off" style="width:18px;height:18px;"></i>';
        if (window.lucide) window.lucide.createIcons();
    });
}

document.getElementById('login-form').addEventListener('submit', () => {
    const btn = document.getElementById('login-btn');
    btn.innerHTML = '<i data-lucide="loader-circle"></i> Verificando...';
    btn.style.opacity = '0.8';
    btn.disabled = true;
    lucide.createIcons();
});

