import express from "express";
import nodemailer from "nodemailer";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const app = express();

// Permitir acesso do site (frontend)
app.use(cors());
app.use(express.json());

app.post("/api/submit", async (req, res) => {
  const { nome, email, relato, consent } = req.body;

  if (!relato) {
    return res.status(400).json({ error: "Mensagem obrigatória" });
  }

  const mensagem = `
📩 NOVO RELATO RECEBIDO

🧑 Nome: ${nome || "Anônimo"}
📧 E-mail: ${email || "Não informado"}
🔒 Consentimento: ${consent ? "Sim" : "Não"}
────────────────────────────
📝 Mensagem:
${relato}
  `;

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"MundoXP - Sistema Escuta" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject: "📨 Novo relato recebido - MundoXP",
      text: mensagem,
    });

    console.log("✅ E-mail enviado com sucesso!");
    res.status(200).json({ success: true });
  } catch (error) {
    console.error("❌ Erro ao enviar:", error);
    res.status(500).json({ error: "Falha no envio do e-mail" });
  }
});

// Teste simples
app.get("/", (req, res) => res.send("Servidor MundoXP ativo 🚀"));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`🌐 Servidor rodando na porta ${PORT}`));
