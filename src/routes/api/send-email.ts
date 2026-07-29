import { createFileRoute } from "@tanstack/react-router";
import nodemailer from "nodemailer";

const TO_EMAIL = "escutaceppat@gmail.com";

export const Route = createFileRoute("/api/send-email")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const body = (await request.json()) as {
            nome?: string;
            email?: string;
            escola?: string;
            urgencia?: string;
            relato?: string;
            consent?: boolean | string;
          };

          const { nome, email, escola, urgencia, relato, consent } = body;

          if (!relato || typeof relato !== "string" || relato.trim().length < 5) {
            return Response.json(
              { ok: false, msg: "Relato muito curto ou ausente." },
              { status: 400 },
            );
          }
          if (!escola) {
            return Response.json(
              { ok: false, msg: "Escola é obrigatória." },
              { status: 400 },
            );
          }

          const user = process.env.EMAIL_USER;
          const pass = process.env.EMAIL_PASS;
          if (!user || !pass) {
            console.error("EMAIL_USER / EMAIL_PASS não configurados");
            return Response.json(
              { ok: false, msg: "Servidor de email não configurado." },
              { status: 500 },
            );
          }

          const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: { user, pass },
          });

          const esc = (v: unknown) =>
            String(v ?? "")
              .replace(/&/g, "&amp;")
              .replace(/</g, "&lt;")
              .replace(/>/g, "&gt;");

          const html = `
            <div style="font-family:Arial,sans-serif;color:#111">
              <h2>🚨 NOVO RELATO RECEBIDO</h2>
              <p><strong>🏫 Escola:</strong> ${esc(escola)}</p>
              <p><strong>👤 Nome:</strong> ${esc(nome) || "Anônimo"}</p>
              <p><strong>📧 Email:</strong> ${esc(email) || "Não informado"}</p>
              <p><strong>⚠️ Urgência:</strong> ${esc(urgencia) || "Não classificada"}</p>
              <p><strong>✔ Consentimento:</strong> ${consent ? "Sim" : "Não"}</p>
              <h3>📝 Mensagem:</h3>
              <pre style="white-space:pre-wrap;background:#f4f4f4;padding:10px;border-radius:6px">${esc(relato)}</pre>
            </div>`;

          await transporter.sendMail({
            from: `"MundoXP Escuta" <${user}>`,
            to: TO_EMAIL,
            replyTo: email || undefined,
            subject: "🚨 Novo relato recebido — MundoXP",
            html,
          });

          return Response.json({ ok: true, msg: "Enviado com sucesso." });
        } catch (error) {
          console.error("Erro ao enviar email:", error);
          return Response.json(
            { ok: false, msg: "Erro ao enviar email." },
            { status: 500 },
          );
        }
      },
    },
  },
});
