import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método não permitido" });
  }

  try {
    const { nome, email, relato, consent } = req.body;

    if (!relato || typeof relato !== 'string' || relato.trim().length < 5) {
      return res.status(400).json({ ok: false, msg: 'Relato muito curto ou ausente.' });
    }

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    const html = `
      <div style="font-family:Arial,sans-serif;color:#111">
        <h2>🚨 NOVO RELATO RECEBIDO</h2>
        <p><strong>👤 Nome:</strong> ${nome || 'Anônimo'}</p>
        <p><strong>📧 Email:</strong> ${email || 'Não informado'}</p>
        <p><strong>✔ Consentimento:</strong> ${consent ? 'Sim' : 'Não'}</p>
        <h3>📝 Mensagem:</h3>
        <pre style="white-space:pre-wrap;background:#f4f4f4;padding:10px;border-radius:6px">${relato}</pre>
      </div>`;

    await transporter.sendMail({
      from: `"MundoXP Escuta" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject: "🚨 Novo relato recebido — MundoXP",
      html
    });

    return res.status(200).json({ ok: true, msg: 'Enviado com sucesso.' });
  } catch (error) {
    console.error('Erro ao enviar email:', error);
    return res.status(500).json({ ok: false, msg: 'Erro ao enviar email.' });
  }
}
