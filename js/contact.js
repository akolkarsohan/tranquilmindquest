// ===== CONTACT PAGE JAVASCRIPT =====

/*
 * AWS LAMBDA FUNCTION SETUP GUIDE
 * This will be connected later to AWS Lex
 *
 * Function: tranquilquest-chatbot-handler
 * Runtime: Node.js 18.x
 *
 * Required AWS Services:
 * 1. Amazon Lex v2 (Bot configuration)
 * 2. AWS Lambda (Message processing)
 * 3. API Gateway (REST API endpoint)
 * 4. DynamoDB (Optional: conversation history)
 *
 * Estimated Cost: $0-5/month for <10,000 messages
 *
 * Step-by-step connection instructions in README.md
 */

// Chatbot Configuration
const CHATBOT_CONFIG = {
    name: 'TranquilBot',
    welcomeMessage: "Hi! I'm TranquilBot. I'm here to help you explore mental wellness. What would you like to know?",
    apiEndpoint: 'https://api.tranquilmindquest.com/chatbot', // Replace with AWS API Gateway endpoint
    maxMessages: 50,
    typingDelay: 1500, // milliseconds
    soundEnabled: true
};

// Chatbot State
let chatbotState = {
    isOpen: false,
    isMinimized: false,
    messages: [],
    isTyping: false,
    soundEnabled: true,
    conversationId: generateConversationId()
};

// DOM Elements
const chatbotSection = document.getElementById('chatbot-section');
const chatbotContainer = document.querySelector('.chatbot-container');
const chatbotBody = document.getElementById('chatbot-body');
const chatMessages = document.getElementById('chat-messages');
const chatInput = document.getElementById('chat-input');
const chatSend = document.getElementById('chat-send');
const chatbotMinimize = document.getElementById('chatbot-minimize');
const chatbotSound = document.getElementById('chatbot-sound');
const suggestedQuestions = document.getElementById('suggested-questions');
const mobileChatButton = document.getElementById('mobile-chat-button');
const chatToggleMobile = document.querySelector('.chat-toggle-mobile');

// Contact Form Elements
const contactForm = document.getElementById('contact-form-element');
const formSuccess = document.getElementById('form-success');
const newsletterForm = document.getElementById('newsletter-form');

// FAQ Elements
const faqQuestions = document.querySelectorAll('.faq-question');

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    initializeChatbot();
    initializeContactForm();
    initializeFAQ();
    initializeNewsletter();
    initializeMobileChat();
    loadChatHistory();
});

// ===== CHATBOT FUNCTIONALITY =====

function initializeChatbot() {
    // Add welcome message
    addBotMessage(CHATBOT_CONFIG.welcomeMessage);
    
    // Event listeners
    chatSend.addEventListener('click', sendMessage);
    chatInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    });
    
    chatbotMinimize.addEventListener('click', toggleMinimize);
    chatbotSound.addEventListener('click', toggleSound);
    
    // Suggested questions
    document.querySelectorAll('.question-pill').forEach(pill => {
        pill.addEventListener('click', function() {
            const question = this.dataset.question;
            chatInput.value = question;
            sendMessage();
        });
    });
    
    // Chatbot actions
    document.getElementById('new-conversation').addEventListener('click', startNewConversation);
    document.getElementById('email-transcript').addEventListener('click', emailTranscript);
    
    // Hero buttons
    document.getElementById('chat-toggle').addEventListener('click', function() {
        // On mobile, toggle the chatbot column
        if (window.innerWidth <= 1024) {
            const chatbotColumn = document.querySelector('.contact-right-column');
            if (chatbotColumn) {
                chatbotColumn.classList.toggle('mobile-open');
            }
        } else {
            // On desktop, just mark as open (already visible)
            chatbotState.isOpen = true;
        }
    });
}

function formatBotMessage(text) {
    // Preserve existing HTML links by temporarily replacing them
    const linkPlaceholders = [];
    let placeholderIndex = 0;
    let processedText = text;
    
    // Replace HTML links with placeholders
    processedText = processedText.replace(/<a[\s\S]*?<\/a>/gi, (match) => {
        const placeholder = `__LINK_${placeholderIndex}__`;
        linkPlaceholders[placeholderIndex] = match;
        placeholderIndex++;
        return placeholder;
    });
    
    // Split text by lines to preserve structure
    const lines = processedText.split('\n');
    const formattedLines = [];
    
    for (let i = 0; i < lines.length; i++) {
        let line = lines[i].trim();
        
        // Skip empty lines but preserve them for spacing
        if (line === '') {
            if (i > 0 && i < lines.length - 1 && formattedLines.length > 0) {
                formattedLines.push('<br>');
            }
            continue;
        }
        
        // Handle bullet points
        if (line.startsWith('•')) {
            // Remove bullet and trim
            let bulletContent = line.substring(1).trim();
            
            // Handle bold text in bullet points
            bulletContent = bulletContent.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
            
            // Wrap in div for proper spacing
            formattedLines.push(`<div style="margin-bottom: var(--space-sm); padding-left: var(--space-sm);">• ${bulletContent}</div>`);
        } else {
            // Handle bold text
            line = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
            
            // Escape HTML characters (but preserve link placeholders)
            // Split by placeholders to escape only text parts
            const parts = line.split(/(__LINK_\d+__)/);
            line = parts.map(part => {
                if (part.match(/^__LINK_\d+__$/)) {
                    // It's a placeholder, keep as is
                    return part;
                } else {
                    // Escape HTML in text
                    return part
                        .replace(/&/g, '&amp;')
                        .replace(/</g, '&lt;')
                        .replace(/>/g, '&gt;');
                }
            }).join('');
            
            // Add line break at end (unless it's the last line or next line is empty)
            if (i < lines.length - 1 && lines[i + 1].trim() !== '') {
                formattedLines.push(`${line}<br>`);
            } else {
                formattedLines.push(line);
            }
        }
    }
    
    // Restore link placeholders at the end
    let result = formattedLines.join('');
    result = result.replace(/__LINK_(\d+)__/g, (match, index) => {
        return linkPlaceholders[parseInt(index)] || match;
    });
    
    return result;
}

function addBotMessage(text, isTyping = false) {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'chat-message bot';
    
    const avatarDiv = document.createElement('div');
    avatarDiv.className = 'message-avatar bot';
    avatarDiv.textContent = '🤖';
    
    const bubbleDiv = document.createElement('div');
    bubbleDiv.className = 'message-bubble bot';
    
    if (isTyping) {
        messageDiv.setAttribute('data-typing-indicator', 'true');
        bubbleDiv.innerHTML = `
            <div class="typing-indicator">
                <div class="typing-dots">
                    <div class="typing-dot"></div>
                    <div class="typing-dot"></div>
                    <div class="typing-dot"></div>
                </div>
                <span>TranquilBot is typing...</span>
            </div>
        `;
    } else {
        const formattedText = formatBotMessage(text);
        bubbleDiv.innerHTML = `
            <div class="message-content">${formattedText}</div>
            <div class="message-time">${getCurrentTime()}</div>
        `;
    }
    
    messageDiv.appendChild(avatarDiv);
    messageDiv.appendChild(bubbleDiv);
    chatMessages.appendChild(messageDiv);
    
    // Save to state
    if (!isTyping) {
        chatbotState.messages.push({
            type: 'bot',
            content: text,
            timestamp: new Date().toISOString()
        });
    }
    
    scrollToBottom();
    
    if (!isTyping) {
        playNotificationSound();
    }
    
    return messageDiv;
}

function addUserMessage(text) {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'chat-message user';
    
    const avatarDiv = document.createElement('div');
    avatarDiv.className = 'message-avatar user';
    avatarDiv.textContent = '👤';
    
    const bubbleDiv = document.createElement('div');
    bubbleDiv.className = 'message-bubble user';
    bubbleDiv.innerHTML = `
        <div class="message-content">${text}</div>
        <div class="message-time">${getCurrentTime()}</div>
    `;
    
    messageDiv.appendChild(avatarDiv);
    messageDiv.appendChild(bubbleDiv);
    chatMessages.appendChild(messageDiv);
    
    // Save to state
    chatbotState.messages.push({
        type: 'user',
        content: text,
        timestamp: new Date().toISOString()
    });
    
    scrollToBottom();
}

function sendMessage() {
    const message = chatInput.value.trim();
    if (!message) return;
    
    // Add user message
    addUserMessage(message);
    
    // Clear input
    chatInput.value = '';
    
    // Hide suggested questions after first message
    if (suggestedQuestions.style.display !== 'none') {
        suggestedQuestions.style.display = 'none';
    }
    
    // Show typing indicator
    chatbotState.isTyping = true;
    const typingIndicator = addBotMessage('', true);
    
    // Simulate bot response
    setTimeout(() => {
        chatbotState.isTyping = false;
        
        // Remove typing indicator before adding response
        if (typingIndicator && typingIndicator.parentNode) {
            typingIndicator.remove();
        }
        
        const response = generateBotResponse(message);
        addBotMessage(response);
    }, CHATBOT_CONFIG.typingDelay);
}

function generateBotResponse(userMessage) {
    const message = userMessage.toLowerCase();
    
    // Keyword-based responses (placeholder until AWS Lex integration)
    if (message.includes('anxiety') || message.includes('anxious')) {
        return `I understand anxiety can be overwhelming. Here are some techniques that can help:

• **Deep Breathing**: Try the 4-7-8 technique - inhale for 4, hold for 7, exhale for 8
• **Grounding**: Use the 5-4-3-2-1 technique - name 5 things you see, 4 you can touch, etc.
• **Progressive Muscle Relaxation**: Tense and release each muscle group

Would you like me to guide you through any of these techniques? For more detailed help, check out our <a href="breathing.html" style="color: var(--accent-primary);">breathing exercises</a> page.`;
    }
    
    if (message.includes('meditation') || message.includes('meditate')) {
        return `Meditation is a wonderful practice! Here's what you should know:

• **Start Small**: Even 5 minutes daily can make a difference
• **Focus on Breath**: Use your breath as an anchor when your mind wanders
• **Be Patient**: It's normal for thoughts to arise - gently return to your focus
• **Consistency**: Regular practice is more important than duration

I recommend starting with our <a href="meditation.html" style="color: var(--accent-primary);">meditation guide</a> for beginners. Would you like to learn about specific meditation techniques?`;
    }
    
    if (message.includes('stress') || message.includes('stressed')) {
        return `I'm sorry you're feeling stressed. Here are some immediate strategies:

• **Box Breathing**: Inhale 4, hold 4, exhale 4, hold 4 - repeat
• **Quick Walk**: Even 5 minutes of movement can help
• **Cold Water**: Splash your face or hold ice cubes
• **Music**: Listen to calming sounds or your favorite songs

For ongoing stress management, consider our <a href="mindfulness.html" style="color: var(--accent-primary);">mindfulness practices</a>. Remember, it's okay to take breaks and prioritize your well-being.`;
    }
    
    if (message.includes('breathing') || message.includes('breathe')) {
        return `Breathing exercises are powerful tools for calming your nervous system:

• **4-7-8 Breathing**: Great for anxiety and sleep
• **Box Breathing**: Excellent for stress and focus
• **Diaphragmatic Breathing**: Helps with overall relaxation
• **Alternate Nostril**: Balances your nervous system

Try our <a href="breathing.html" style="color: var(--accent-primary);">interactive breathing guide</a> for step-by-step instructions. Which breathing technique interests you most?`;
    }
    
    if (message.includes('help') || message.includes('crisis') || message.includes('emergency')) {
        return `If you're experiencing a mental health crisis, please reach out immediately:

🚨 **Crisis Resources:**
• Call 988 (Suicide & Crisis Lifeline)
• Text HOME to 741741 (Crisis Text Line)
• Call 1-800-273-8255 (National Suicide Prevention)

For non-crisis support, I'm here to help with general wellness questions. Our <a href="about.html" style="color: var(--accent-primary);">mental health resources</a> page has more information.`;
    }
    
    if (message.includes('sleep') || message.includes('insomnia')) {
        return `Sleep issues can significantly impact mental health. Here are some strategies:

• **Sleep Hygiene**: Consistent bedtime, cool room, no screens 1 hour before bed
• **Relaxation Techniques**: Progressive muscle relaxation or guided imagery
• **Limit Caffeine**: Avoid caffeine after 2 PM
• **Weighted Blankets**: Can provide comfort and reduce anxiety

Check out our <a href="products.html" style="color: var(--accent-primary);">sleep aids</a> for helpful tools. What specific sleep challenges are you facing?`;
    }
    
    // Default response
    return `That's a great question! While I can provide general wellness information, I want to make sure you get the best support possible.

For personalized guidance, I recommend:
• Exploring our <a href="about.html" style="color: var(--accent-primary);">mental health resources</a>
• Checking out our <a href="blog.html" style="color: var(--accent-primary);">wellness blog</a> for detailed articles
• Speaking with a mental health professional for personalized care

Is there a specific wellness topic you'd like to learn more about?`;
}

function toggleMinimize() {
    chatbotState.isMinimized = !chatbotState.isMinimized;
    chatbotContainer.classList.toggle('minimized', chatbotState.isMinimized);
    
    chatbotMinimize.innerHTML = chatbotState.isMinimized ? 
        '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6,9 12,15 18,9"></polyline></svg>' :
        '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"></line></svg>';
}

function toggleSound() {
    chatbotState.soundEnabled = !chatbotState.soundEnabled;
    chatbotSound.classList.toggle('muted', !chatbotState.soundEnabled);
}

function startNewConversation() {
    chatbotState.messages = [];
    chatbotState.conversationId = generateConversationId();
    chatMessages.innerHTML = '';
    suggestedQuestions.style.display = 'block';
    addBotMessage(CHATBOT_CONFIG.welcomeMessage);
}

function emailTranscript() {
    const transcript = generateTranscript();
    const subject = encodeURIComponent('Chat Transcript from TranquilBot');
    const body = encodeURIComponent(transcript);
    window.open(`mailto:?subject=${subject}&body=${body}`);
}


function generateTranscript() {
    let transcript = `TranquilBot Conversation Transcript\n`;
    transcript += `Conversation ID: ${chatbotState.conversationId}\n`;
    transcript += `Date: ${new Date().toLocaleString()}\n\n`;
    
    chatbotState.messages.forEach(message => {
        const sender = message.type === 'user' ? 'You' : 'TranquilBot';
        const time = new Date(message.timestamp).toLocaleTimeString();
        transcript += `[${time}] ${sender}: ${message.content}\n\n`;
    });
    
    return transcript;
}

function scrollToBottom() {
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function getCurrentTime() {
    return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

function generateConversationId() {
    return 'conv_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
}

function playNotificationSound() {
    if (!chatbotState.soundEnabled) return;
    
    // Simple notification sound using Web Audio API
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
        oscillator.frequency.setValueAtTime(600, audioContext.currentTime + 0.1);
        
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.2);
    } catch (e) {
        // Fallback for browsers that don't support Web Audio API
        console.log('Notification sound not available');
    }
}

function loadChatHistory() {
    const savedHistory = localStorage.getItem('tranquilbot_history');
    if (savedHistory) {
        try {
            const history = JSON.parse(savedHistory);
            if (history.conversationId === chatbotState.conversationId) {
                chatbotState.messages = history.messages;
                // Restore messages to UI
                history.messages.forEach(message => {
                    if (message.type === 'user') {
                        addUserMessage(message.content);
                    } else {
                        addBotMessage(message.content);
                    }
                });
            }
        } catch (e) {
            console.log('Could not load chat history');
        }
    }
}

function saveChatHistory() {
    const history = {
        conversationId: chatbotState.conversationId,
        messages: chatbotState.messages,
        timestamp: new Date().toISOString()
    };
    localStorage.setItem('tranquilbot_history', JSON.stringify(history));
}

// Save chat history periodically
setInterval(saveChatHistory, 30000); // Every 30 seconds

// ===== CONTACT FORM FUNCTIONALITY =====

function initializeContactForm() {
    contactForm.addEventListener('submit', handleFormSubmit);
    
    // Real-time validation
    const inputs = contactForm.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', validateField);
        input.addEventListener('input', clearError);
    });
}

function handleFormSubmit(e) {
    e.preventDefault();
    
    if (validateForm()) {
        // Simulate form submission
        showFormSuccess();
        contactForm.reset();
    }
}

function validateForm() {
    let isValid = true;
    const fields = [
        { id: 'contact-name', required: true, type: 'text' },
        { id: 'contact-email', required: true, type: 'email' },
        { id: 'contact-subject', required: true, type: 'select' },
        { id: 'contact-message', required: true, type: 'textarea' }
    ];
    
    fields.forEach(field => {
        if (!validateField({ target: document.getElementById(field.id) })) {
            isValid = false;
        }
    });
    
    return isValid;
}

function validateField(e) {
    const field = e.target;
    const value = field.value.trim();
    const fieldGroup = field.closest('.form-group');
    const errorElement = fieldGroup.querySelector('.error-message');
    
    // Clear previous errors
    fieldGroup.classList.remove('error');
    
    // Required field validation
    if (field.hasAttribute('required') && !value) {
        showFieldError(fieldGroup, errorElement, 'This field is required');
        return false;
    }
    
    // Email validation
    if (field.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            showFieldError(fieldGroup, errorElement, 'Please enter a valid email address');
            return false;
        }
    }
    
    // Message length validation
    if (field.id === 'contact-message' && value && value.length < 10) {
        showFieldError(fieldGroup, errorElement, 'Message must be at least 10 characters long');
        return false;
    }
    
    return true;
}

function showFieldError(fieldGroup, errorElement, message) {
    fieldGroup.classList.add('error');
    errorElement.textContent = message;
}

function clearError(e) {
    const fieldGroup = e.target.closest('.form-group');
    fieldGroup.classList.remove('error');
}

function showFormSuccess() {
    contactForm.style.display = 'none';
    formSuccess.style.display = 'block';
    
    // Scroll to success message
    formSuccess.scrollIntoView({ behavior: 'smooth' });
    
    // Reset after 5 seconds
    setTimeout(() => {
        formSuccess.style.display = 'none';
        contactForm.style.display = 'block';
    }, 5000);
}

// ===== FAQ FUNCTIONALITY =====

function initializeFAQ() {
    faqQuestions.forEach(question => {
        question.addEventListener('click', toggleFAQ);
    });
}

function toggleFAQ(e) {
    const question = e.currentTarget;
    const answer = question.nextElementSibling;
    const isExpanded = question.getAttribute('aria-expanded') === 'true';
    
    // Close all other FAQs
    faqQuestions.forEach(q => {
        if (q !== question) {
            q.setAttribute('aria-expanded', 'false');
            q.nextElementSibling.classList.remove('show');
        }
    });
    
    // Toggle current FAQ
    question.setAttribute('aria-expanded', !isExpanded);
    answer.classList.toggle('show', !isExpanded);
}

// ===== NEWSLETTER FUNCTIONALITY =====

function initializeNewsletter() {
    newsletterForm.addEventListener('submit', handleNewsletterSubmit);
}

function handleNewsletterSubmit(e) {
    e.preventDefault();
    
    const email = newsletterForm.querySelector('.newsletter-input').value;
    if (validateEmail(email)) {
        // Simulate newsletter subscription
        const button = newsletterForm.querySelector('.newsletter-btn');
        const originalText = button.textContent;
        
        button.textContent = 'Subscribed!';
        button.style.background = 'var(--success-green)';
        
        setTimeout(() => {
            button.textContent = originalText;
            button.style.background = '';
            newsletterForm.reset();
        }, 2000);
    }
}

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// ===== MOBILE CHAT FUNCTIONALITY =====

function initializeMobileChat() {
    if (chatToggleMobile) {
        chatToggleMobile.addEventListener('click', toggleMobileChat);
    }
}

function toggleMobileChat() {
    const chatbotColumn = document.querySelector('.contact-right-column');
    if (chatbotColumn) {
        chatbotColumn.classList.toggle('mobile-open');
        
        if (chatbotColumn.classList.contains('mobile-open')) {
            // Focus on input when opened
            setTimeout(() => {
                chatInput.focus();
            }, 300);
        }
    }
}

// ===== UTILITY FUNCTIONS =====

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Keyboard navigation for chatbot
document.addEventListener('keydown', function(e) {
    // Escape key to close mobile chat
    const chatbotColumn = document.querySelector('.contact-right-column');
    if (e.key === 'Escape' && chatbotColumn && chatbotColumn.classList.contains('mobile-open')) {
        chatbotColumn.classList.remove('mobile-open');
    }
    
    // Ctrl/Cmd + K to focus chat input
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        chatInput.focus();
    }
});

// Handle window resize
window.addEventListener('resize', function() {
    const chatbotColumn = document.querySelector('.contact-right-column');
    if (window.innerWidth > 1024 && chatbotColumn) {
        chatbotColumn.classList.remove('mobile-open');
    }
});

// API Integration Placeholder
/*
 * FUTURE AWS LEX INTEGRATION
 * 
 * Replace the generateBotResponse function with this:
 * 
 * async function generateBotResponse(userMessage) {
 *     try {
 *         const response = await fetch(CHATBOT_CONFIG.apiEndpoint, {
 *             method: 'POST',
 *             headers: {
 *                 'Content-Type': 'application/json',
 *             },
 *             body: JSON.stringify({
 *                 message: userMessage,
 *                 conversationId: chatbotState.conversationId,
 *                 userId: getUserId() // Implement user identification
 *             })
 *         });
 *         
 *         const data = await response.json();
 *         return data.message;
 *     } catch (error) {
 *         console.error('Chatbot API error:', error);
 *         return "I'm having trouble connecting right now. Please try again in a moment.";
 *     }
 * }
 * 
 * AWS Lambda Function Structure:
 * exports.handler = async (event) => {
 *     const { message, conversationId, userId } = JSON.parse(event.body);
 *     
 *     // Process with Amazon Lex
 *     const lexResponse = await lexClient.recognizeText({
 *         botId: 'TranquilBot',
 *         botAliasId: 'TALIASID',
 *         localeId: 'en_US',
 *         sessionId: conversationId,
 *         text: message
 *     });
 *     
 *     return {
 *         statusCode: 200,
 *         body: JSON.stringify({
 *             message: lexResponse.messages[0].content,
 *             sessionId: conversationId
 *         })
 *     };
 * };
 */



