document.addEventListener('DOMContentLoaded', () => {
    const chatContainer = document.querySelector('main > div');
    const inputField = document.querySelector('input[placeholder="Type a message..."]');
    const sendButton = document.querySelector('button[aria-label="Send message"]');
    const mainElement = document.querySelector('main');
    const newChatButton = document.querySelector('header button');
    
    // Save the initial welcome state so we can restore it on "New Chat"
    const welcomeStateHTML = `
        <!-- Welcome State -->
        <div class="flex flex-col items-center justify-center py-8 text-center welcome-state">
            <span class="material-symbols-outlined text-user-bubble text-4xl mb-2 drop-shadow-md">bolt</span>
            <p class="text-ink-light max-w-md text-sm font-medium">Ask questions about grid telemetry, energy consumption, or policy manuals.</p>
        </div>
    `;

    function createUserMessage(text) {
        // Sanitize input roughly
        const safeText = text.replace(/</g, "&lt;").replace(/>/g, "&gt;");
        return `
        <!-- User Message -->
        <div class="flex w-full justify-end message-bubble">
            <div class="user-message-card bg-user-bubble text-ink-dark px-5 py-3 rounded-xl rounded-tr-sm max-w-[80%]">
                <p class="text-[15px]">${safeText}</p>
            </div>
        </div>
        `;
    }

    function createBotMessage(text) {
        const safeText = text.replace(/</g, "&lt;").replace(/>/g, "&gt;");
        return `
        <!-- Bot Message -->
        <div class="flex w-full justify-start message-bubble">
            <div class="flex gap-4 w-full">
                <div class="ai-message-card bg-ai-bubble text-ink-dark rounded-xl rounded-tl-sm p-6 w-full max-w-[90%]">
                    <div class="flex items-center gap-2 mb-4 text-[10px] tracking-[0.2em] text-ink-light font-bold uppercase">
                        <span>S Y S T E M</span>
                        <span>·</span>
                        <span>A N A L Y S I S</span>
                    </div>
                    <p class="text-[14px] whitespace-pre-wrap">${safeText}</p>
                </div>
            </div>
        </div>
        `;
    }

    function scrollToBottom() {
        mainElement.scrollTo({
            top: mainElement.scrollHeight,
            behavior: 'smooth'
        });
    }

    function handleSend() {
        const text = inputField.value.trim();
        if (!text) return;
        
        // Remove welcome state if it exists
        const welcomeState = chatContainer.querySelector('.welcome-state');
        if (welcomeState) {
            welcomeState.remove();
        }

        // Append user message
        chatContainer.insertAdjacentHTML('beforeend', createUserMessage(text));
        inputField.value = '';
        scrollToBottom();
        
        // Simulate bot reply
        setTimeout(() => {
            chatContainer.insertAdjacentHTML('beforeend', createBotMessage(`I have received your query: "${text}". \n\nAnalyzing the latest grid telemetry data... Please stand by for a detailed report.`));
            scrollToBottom();
        }, 800);
    }

    // Event Listeners
    sendButton.addEventListener('click', handleSend);
    
    inputField.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleSend();
        }
    });

    newChatButton.addEventListener('click', () => {
        chatContainer.innerHTML = welcomeStateHTML;
        inputField.value = '';
    });
});
