// Controle do painel secreto
const openBtn = document.getElementById('openFormBtn');
const formPanel = document.getElementById('formPanel');
const closeBtn = document.getElementById('btnClose');
const form = document.getElementById('escutaForm');
const statusEl = document.getElementById('status');

openBtn.addEventListener('click', () => {
  formPanel.classList.toggle('hidden');
});

closeBtn.addEventListener('click', () => {
  formPanel.classList.add('hidden');
  statusEl.textContent = '';
});

// Envio do formulário
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  statusEl.textContent = 'Enviando...';
  const data = Object.fromEntries(new FormData(form));

  try {
    const res = await fetch('http://localhost:4000/api/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });

    if (res.ok) {
      statusEl.textContent = 'Mensagem enviada!';
      statusEl.className = 'success';
      form.reset();
    } else {
      statusEl.textContent = 'Erro ao enviar.';
      statusEl.className = 'error';
    }
  } catch {
    statusEl.textContent = 'Falha de conexão.';
    statusEl.className = 'error';
  }
});
fetch("/api/send-email", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    nome,
    relato
  }),
})
.then(res => res.json())
.then(data => {
  alert(data.message);
})
.catch(() => alert("Erro ao enviar o relato."));
