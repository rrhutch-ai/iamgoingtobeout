'use strict';

const CONFIG = {
  name: 'Ryan R. Hutchinson',
  title: 'Executive Vice President',
  institution: 'Southeastern Baptist Theological Seminary',
  avatarSrc: 'assets/images/avatar.jpg',
  avatarFallback: 'RRH',
  botName: 'HutchBot',
  response: "I am sorry, I don't know the answer to your question, but Happy April Fool's Day!"
};

document.addEventListener('DOMContentLoaded', () => {
  const chatWindow = document.getElementById('chat-window');
  const chatForm = document.getElementById('chat-form');
  const chatInput = document.getElementById('chat-input');
  const avatarImg = document.getElementById('avatar-img');
  const avatarFallback = document.getElementById('avatar-fallback');

  // Avatar fallback: draw initials on canvas if image fails to load
  avatarImg.addEventListener('error', () => {
    avatarImg.style.display = 'none';
    avatarFallback.style.display = 'block';
    const ctx = avatarFallback.getContext('2d');
    const size = avatarFallback.width;
    ctx.fillStyle = '#002F7A';
    ctx.beginPath();
    ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#FFFFFF';
    ctx.font = `bold ${Math.floor(size * 0.35)}px Georgia, serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(CONFIG.avatarFallback, size / 2, size / 2 + 1);
  });

  function scrollToBottom() {
    chatWindow.scrollTop = chatWindow.scrollHeight;
  }

  function appendMessage(text, type) {
    const div = document.createElement('div');
    div.classList.add('message', type === 'user' ? 'user-message' : 'bot-message');
    const p = document.createElement('p');
    p.textContent = text;
    div.appendChild(p);
    chatWindow.appendChild(div);
    scrollToBottom();
    return div;
  }

  function showTypingIndicator() {
    const indicator = document.createElement('div');
    indicator.classList.add('typing-indicator');
    indicator.id = 'typing-indicator';
    indicator.setAttribute('aria-label', 'SEBTSBot is typing');
    for (let i = 0; i < 3; i++) {
      const dot = document.createElement('span');
      dot.classList.add('typing-dot');
      indicator.appendChild(dot);
    }
    chatWindow.appendChild(indicator);
    scrollToBottom();
    return indicator;
  }

  function removeTypingIndicator() {
    const indicator = document.getElementById('typing-indicator');
    if (indicator) indicator.remove();
  }

  chatForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = chatInput.value.trim();
    if (!text) return;

    appendMessage(text, 'user');
    chatInput.value = '';

    const typingEl = showTypingIndicator();

    const delay = 1500 + Math.random() * 1000;
    setTimeout(() => {
      removeTypingIndicator();
      appendMessage(CONFIG.response, 'bot');
    }, delay);
  });

  // Register service worker
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('/iamgoingtobeout/sw.js')
        .catch(() => {});
    });
  }
});
