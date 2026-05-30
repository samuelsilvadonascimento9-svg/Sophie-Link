// toast.js
const Toast = {
    init() {
        if (!document.getElementById('toast-container')) {
            const container = document.createElement('div');
            container.id = 'toast-container';
            document.body.appendChild(container);
        }
    },

    show(message, type = 'info', duration = 4000) {
        this.init();
        const container = document.getElementById('toast-container');

        const toast = document.createElement('div');
        toast.className = `toast ${type}`;

        // Definir ícone baseado no tipo
        let iconName = 'info';
        if (type === 'success') iconName = 'check-circle';
        if (type === 'error') iconName = 'alert-circle';

        toast.innerHTML = `
            <div class="toast-icon">
                <i data-lucide="${iconName}"></i>
            </div>
            <div class="toast-content">${message}</div>
        `;

        container.appendChild(toast);
        
        // Re-renderizar icones lucide se existir
        if (window.lucide) {
            lucide.createIcons({ root: toast });
        }

        // Animar entrada
        requestAnimationFrame(() => {
            toast.classList.add('show');
        });

        // Remover depois do tempo
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => {
                toast.remove();
            }, 400); // Tempo da transição
        }, duration);
    }
};

// Expor globalmente
window.Toast = Toast;
