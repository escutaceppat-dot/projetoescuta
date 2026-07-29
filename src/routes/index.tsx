import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
// Vite raw imports — bundla o conteúdo como string
import mundoCss from "@/mundoxp/styles.css?raw";
import mundoHtml from "@/mundoxp/body.html?raw";
import mundoJs from "@/mundoxp/script.js?raw";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "MundoXP — Curiosidades e Diversão" },
      { name: "description", content: "Portal com layouts profissionais por tema." },
    ],
  }),
  component: Index,
});

function Index() {
  const ref = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const iframe = ref.current;
    if (!iframe) return;
    const doc = iframe.contentDocument;
    if (!doc) return;
    doc.open();
    doc.write(`<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Playfair+Display:ital,wght@0,400;0,700;0,800;0,900;1,700&family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Lora:ital,wght@0,400;0,600;1,400&family=Source+Sans+3:wght@400;600;700&display=swap" rel="stylesheet">
<style>${mundoCss}</style>
</head>
<body>
${mundoHtml}
<script>${mundoJs}<\/script>
</body>
</html>`);
    doc.close();
  }, []);

  return (
    <iframe
      ref={ref}
      title="MundoXP"
      style={{
        position: "fixed",
        inset: 0,
        width: "100%",
        height: "100%",
        border: "none",
      }}
    />
  );
}
