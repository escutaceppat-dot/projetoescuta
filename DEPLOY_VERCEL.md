# Deploy na Vercel

Este projeto usa **TanStack Start + Nitro** e está pronto para deploy serverless na Vercel.

## Passo a passo

### 1. Conectar o projeto ao GitHub
No Lovable, abra o menu **+** (canto inferior esquerdo) → **GitHub** → **Connect project** e crie o repositório.

### 2. Importar na Vercel
1. Acesse [vercel.com/new](https://vercel.com/new)
2. Selecione o repositório que o Lovable criou
3. Em **Framework Preset** deixe **Other** (o `vercel.json` já configura tudo)
4. Clique em **Deploy**

A Vercel detecta o `vercel.json` automaticamente. Não é necessário ajustar Build Command, Install Command nem Output Directory.

### 3. Variáveis de ambiente
Se o projeto usa Lovable Cloud / Supabase, copie estas variáveis para **Project Settings → Environment Variables** na Vercel:

```
VITE_SUPABASE_URL
VITE_SUPABASE_PUBLISHABLE_KEY
VITE_SUPABASE_PROJECT_ID
SUPABASE_URL
SUPABASE_PUBLISHABLE_KEY
SUPABASE_SERVICE_ROLE_KEY
```

(Use os mesmos valores do arquivo `.env` do projeto.)

### 4. Domínio customizado (opcional)
Em **Settings → Domains** na Vercel, adicione seu domínio e siga as instruções de DNS.

## Como funciona

- `vercel.json` define `NITRO_PRESET=vercel` no build, então o Nitro (usado pelo TanStack Start) gera a saída no formato `.vercel/output` esperado pela Vercel (Edge / Serverless Functions + assets estáticos).
- Não é necessário alterar `vite.config.ts`.
- O build local com `bun run build` continua funcionando normalmente para a publicação dentro do Lovable.
