// script.js - Mantém interface original e envia relato para /api/send-email

// elementos
const openBtn = document.getElementById('openFormBtn');
const formPanel = document.getElementById('formPanel');
const closeBtn = document.getElementById('btnClose');
const escutaForm = document.getElementById('escutaForm');
const statusEl = document.getElementById('status');
const btnSend = escutaForm ? escutaForm.querySelector('button[type="submit"]') : null;

// abrir/fechar painel
openBtn.addEventListener('click', () => {
  formPanel.classList.toggle('hidden');
  formPanel.setAttribute('aria-hidden', formPanel.classList.contains('hidden') ? 'true' : 'false');
  if (!formPanel.classList.contains('hidden')) {
    setTimeout(()=>{
      const ta = escutaForm.querySelector('textarea[name="relato"]');
      if (ta) ta.focus();
    }, 120);
  }
});

closeBtn.addEventListener('click', () => {
  formPanel.classList.add('hidden');
  formPanel.setAttribute('aria-hidden', 'true');
  statusEl.textContent = '';
  statusEl.className = '';
});

// limpar status ao editar
escutaForm.addEventListener('input', () => {
  statusEl.textContent = '';
  statusEl.className = '';
});

// envio do formulário
escutaForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  statusEl.textContent = 'Enviando...';
  statusEl.className = '';
  if (btnSend) btnSend.disabled = true;

  const nome = (escutaForm.querySelector('[name="nome"]').value || '').trim();
  const email = (escutaForm.querySelector('[name="email"]').value || '').trim();
  const relato = (escutaForm.querySelector('[name="relato"]').value || '').trim();
  const consent = !!escutaForm.querySelector('[name="consent"]').checked;

  if (!relato || relato.length < 10) {
    statusEl.textContent = 'Escreva uma mensagem com pelo menos 10 caracteres.';
    statusEl.className = 'error';
    if (btnSend) btnSend.disabled = false;
    return;
  }

  try {
    const res = await fetch('/api/send-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nome, email, relato, consent })
    });

    const data = await res.json().catch(()=>({ok:false}));

    if (data.ok) {
      statusEl.textContent = 'Mensagem enviada. Obrigado.';
      statusEl.className = 'success';
      escutaForm.reset();
      setTimeout(()=>{
        formPanel.classList.add('hidden');
        formPanel.setAttribute('aria-hidden','true');
        statusEl.textContent = '';
        statusEl.className = '';
      }, 1400);
    } else {
      statusEl.textContent = data.msg || 'Erro ao enviar. Tente novamente.';
      statusEl.className = 'error';
    }
  } catch (err) {
    console.error('Fetch error:', err);
    statusEl.textContent = 'Erro de conexão. Verifique a internet.';
    statusEl.className = 'error';
  } finally {
    if (btnSend) btnSend.disabled = false;
  }
});
