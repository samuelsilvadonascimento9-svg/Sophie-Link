// a11y.js - Gerenciador de Acessibilidade Absoluta
document.addEventListener('DOMContentLoaded', () => {
    const html = document.documentElement;
    const btnContrast = document.getElementById('a11y-contrast');
    const btnFontInc = document.getElementById('a11y-font-inc');
    const btnFontDec = document.getElementById('a11y-font-dec');

    // Carrega preferências salvas
    const contrastSaved = localStorage.getItem('sophie_a11y_contrast') === 'true';
    let fontSizeLevel = parseInt(localStorage.getItem('sophie_a11y_font')) || 0;

    // Aplica preferências
    if (contrastSaved) {
        html.classList.add('high-contrast');
    }
    applyFontSize(fontSizeLevel);

    // Event Listeners
    if (btnContrast) {
        btnContrast.addEventListener('click', () => {
            const isContrast = html.classList.toggle('high-contrast');
            localStorage.setItem('sophie_a11y_contrast', isContrast);
        });
    }

    if (btnFontInc) {
        btnFontInc.addEventListener('click', () => {
            if (fontSizeLevel < 3) {
                fontSizeLevel++;
                applyFontSize(fontSizeLevel);
                localStorage.setItem('sophie_a11y_font', fontSizeLevel);
            }
        });
    }

    if (btnFontDec) {
        btnFontDec.addEventListener('click', () => {
            if (fontSizeLevel > -1) {
                fontSizeLevel--;
                applyFontSize(fontSizeLevel);
                localStorage.setItem('sophie_a11y_font', fontSizeLevel);
            }
        });
    }

    function applyFontSize(level) {
        // level = -1 (menor), 0 (normal), 1 (grande), 2 (muito grande), 3 (gigante)
        const sizes = {
            '-1': '14px',
            '0': '15px',
            '1': '17px',
            '2': '19px',
            '3': '21px'
        };
        html.style.fontSize = sizes[level] || '15px';
    }
});
