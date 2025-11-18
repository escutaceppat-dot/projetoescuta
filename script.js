fetch("/api/send-email", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    nome: document.getElementById("nome").value,
    email: document.getElementById("email").value,
    telefone: document.getElementById("telefone").value,
    mensagem: document.getElementById("mensagem").value
  })
})
  .then(res => res.json())
  .then(data => {
    if (data.ok) alert("Email enviado!");
    else alert("Erro ao enviar email.");
  });
