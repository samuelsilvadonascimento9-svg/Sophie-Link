lucide.createIcons();

        function showSec(id, el) {
            document.querySelectorAll('.sec').forEach(s => s.classList.remove('active'));
            document.getElementById('sec-' + id).classList.add('active');
            document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
            if(el) el.classList.add('active');
        }

        // Modal Logic
        function openModal(id) {
            document.getElementById(id).classList.add('active');
        }
        function closeModal(id) {
            document.getElementById(id).classList.remove('active');
        }

        // Mask para CPF
        const cpfInput = document.getElementById('cpf_input');
        if(cpfInput) {
            cpfInput.addEventListener('input', function(e) {
                let v = e.target.value.replace(/\D/g, '');
                v = v.replace(/(\d{3})(\d)/, '$1.$2');
                v = v.replace(/(\d{3})(\d)/, '$1.$2');
                v = v.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
                e.target.value = v;
            });
        }

        // Loading Spinners for all forms
        document.querySelectorAll('form').forEach(form => {
            form.addEventListener('submit', function(e) {
                // Ignorar formulários que abrem em nova aba (Gerador de PDF)
                if(this.target === '_blank') return;
                
                const btn = this.querySelector('button[type="submit"]');
                if(btn) {
                    const originalWidth = btn.offsetWidth;
                    btn.style.width = originalWidth + 'px';
                    btn.innerHTML = '<i data-lucide="loader-2" style="animation: spin 1s linear infinite; width:16px;"></i> Aguarde...';
                    btn.style.opacity = '0.8';
                    btn.style.pointerEvents = 'none';
                    lucide.createIcons();
                }
            });
        });

