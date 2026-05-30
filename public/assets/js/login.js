lucide.createIcons();

const senhaInput = document.getElementById('senha');
const toggleEye  = document.getElementById('toggle-eye');
toggleEye.addEventListener('click', () => {
    const visible = senhaInput.type === 'text';
    senhaInput.type = visible ? 'password' : 'text';
    toggleEye.innerHTML = visible
        ? '<i data-lucide="eye"></i>'
        : '<i data-lucide="eye-off"></i>';
    lucide.createIcons();
});

document.getElementById('login-form').addEventListener('submit', () => {
    const btn = document.getElementById('login-btn');
    btn.innerHTML = '<i data-lucide="loader-circle"></i> Verificando...';
    btn.style.opacity = '0.8';
    btn.disabled = true;
    lucide.createIcons();
});

