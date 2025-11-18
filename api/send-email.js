import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Método não permitido" });
  }

  const { nome, relato } = req.body;

  if (!nome || !relato) {
    return res.status(400).json({ message: "Dados incompletos" });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS
      }
    });

    await transporter.sendMail({
      from: "MundoXP <escutaceppat@gmail.com>",
      to: "escutaceppat@gmail.com",
      subject: `Novo relato recebido`,
      text: `
Nome: ${nome}
Relato: ${relato}
      `,
    });

    return res.status(200).json({ message: "Relato enviado com sucesso!" });

  } catch (error) {
    console.error("Erro:", error);
    return res.status(500).json({ message: "Erro ao enviar o e-mail" });
  }
}
