import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método não permitido" });
  }

  try {
    const { nome, email, relato } = req.body;

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: "Novo relato",
      text: `Nome: ${nome}\nEmail: ${email}\nRelato:\n${relato}`,
    });

    return res.status(200).json({ ok: true });

  } catch (error) {
    console.error("ERRO SMTP:", error);
    return res.status(500).json({ ok: false, error: error.toString() });
  }
}
