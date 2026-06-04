// public/assets/js/chatbot.js
document.addEventListener("DOMContentLoaded", () => {
    let conversationId = Number(localStorage.getItem("sophie_conversation_id") || 0);

    const chatBox = document.getElementById("chatbot-messages");
    const chatForm = document.getElementById("chat-form");
    const messageInput = document.getElementById("message");
    const closeBtn = document.getElementById("chatbot-close");
    const toggleBtn = document.getElementById("chatbot-toggle");
    const container = document.getElementById("chatbot-container");
    
    const menuBtn = document.getElementById("chatbot-menu-btn");
    const dropdown = document.getElementById("chatbot-dropdown");
    const restartMenuBtn = document.getElementById("chatbot-restart-menu");
    const confirmModal = document.getElementById("custom-confirm");
    const confirmYes = document.getElementById("confirm-yes");
    const confirmCancel = document.getElementById("confirm-cancel");

    // 1. Abre e fecha o menu de 3 pontinhos
    if (menuBtn && dropdown) {
        menuBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            dropdown.classList.toggle("hidden");
        });

        document.addEventListener("click", (e) => {
            if (!dropdown.contains(e.target) && e.target !== menuBtn) {
                dropdown.classList.add("hidden");
            }
        });
    }

    if (restartMenuBtn && confirmModal) {
        restartMenuBtn.addEventListener("click", () => {
            dropdown.classList.add("hidden");
            confirmModal.classList.remove("hidden");
        });

        confirmCancel.addEventListener("click", () => {
            confirmModal.classList.add("hidden");
        });

        confirmYes.addEventListener("click", () => {
            localStorage.removeItem("sophie_conversation_id");
            conversationId = 0;
            chatBox.innerHTML = "";
            addMessage("bot", "Histórico apagado! 👋 Como posso te ajudar hoje com o seu futuro profissional?");
            confirmModal.classList.add("hidden");
        });
    }

    if (!container || !chatBox || !chatForm || !messageInput) return;

    function addMessage(sender, text) {
        const div = document.createElement("div");
        div.className = `message ${sender === "user" ? "user" : "bot"}`;
        const html = text
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>')
            .replace(/\n/g, "<br>");
        div.innerHTML = html;
        chatBox.appendChild(div);
        chatBox.scrollTop = chatBox.scrollHeight;
    }

    async function loadHistory() {
        if (!conversationId) return;

        try {
            const response = await fetch(`api/chatbot/get_messages.php?conversation_id=${conversationId}`);
            const data = await response.json();

            if (data.messages && data.messages.length > 0) {
                chatBox.innerHTML = "";
                data.messages.forEach((msg) => addMessage(msg.sender, msg.message));
            }
        } catch (error) {
            console.error("Erro ao carregar histórico", error);
        }
    }

    chatForm.addEventListener("submit", async (event) => {
        event.preventDefault();
        const message = messageInput.value.trim();
        if (!message) return;

        addMessage("user", message);
        messageInput.value = "";

        const typingId = "typing-" + Date.now();
        const typingDiv = document.createElement("div");
        typingDiv.id = typingId;
        typingDiv.className = "typing-indicator-container";
        typingDiv.innerHTML = `
            <div class="typing-bubble">
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
            </div>
        `;
        chatBox.appendChild(typingDiv);
        chatBox.scrollTop = chatBox.scrollHeight;

        const modeSelect = document.getElementById("mode");
        const visitorName = document.getElementById("visitor_name");
        const visitorPhone = document.getElementById("visitor_phone");
        const visitorEmail = document.getElementById("visitor_email");

        const payload = {
            message,
            mode: modeSelect ? modeSelect.value : "ai",
            conversation_id: conversationId,
            visitor_name: visitorName ? visitorName.value : "Visitante",
            visitor_phone: visitorPhone ? visitorPhone.value : "",
            visitor_email: visitorEmail ? visitorEmail.value : "",
        };

        try {
            const response = await fetch("api/chatbot/chatbot_response.php", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            const data = await response.json();

            document.getElementById(typingId)?.remove();

            if (data.error) {
                addMessage("bot", data.error);
                return;
            }
            
            conversationId = data.conversation_id;
            localStorage.setItem("sophie_conversation_id", String(conversationId));
            addMessage("bot", data.reply);
        } catch (error) {
            document.getElementById(typingId)?.remove();
            addMessage("bot", "Erro de conexão. Tente novamente.");
        }
    });

    closeBtn.addEventListener("click", async () => {
        container.classList.add("hidden");
        toggleBtn.style.display = "";

        if (!conversationId) return;
        try {
            await fetch("api/chatbot/close_conversation.php", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ conversation_id: conversationId }),
            });
            localStorage.removeItem("sophie_conversation_id");
            conversationId = 0;
            chatBox.innerHTML = '<div class="message bot">Sessão encerrada. Quando quiser, mande um "Oi" para recomeçar.</div>';
        } catch (error) {}
    });

    toggleBtn.addEventListener("click", () => {
        container.classList.remove("hidden");
        toggleBtn.style.display = "none";
        setTimeout(() => messageInput.focus(), 300);
    });

    loadHistory();
});
