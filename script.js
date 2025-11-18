document.getElementById("form").addEventListener("submit", async (e)=>{
 e.preventDefault();
 const data={
  nome: document.getElementById("nome").value,
  email: document.getElementById("email").value,
  relato: document.getElementById("relato").value
 };
 const res = await fetch("/api/send-email",{
  method:"POST",
  headers:{"Content-Type":"application/json"},
  body:JSON.stringify(data)
 });
 const out = await res.json();
 alert(out.ok ? "Enviado!" : "Erro:"+out.error);
});