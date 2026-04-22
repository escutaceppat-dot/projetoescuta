const openBtn = document.getElementById('openFormBtn');
const formPanel = document.getElementById('formPanel');
const closeBtn = document.getElementById('btnClose');
const hideBtn = document.getElementById('btnHide');
const form = document.getElementById('escutaForm');
const statusEl = document.getElementById('status');

const siteTitle = document.getElementById('siteTitle');
const siteSubtitle = document.getElementById('siteSubtitle');
const siteBadge = document.getElementById('siteBadge');
const heroKicker = document.getElementById('heroKicker');
const heroTitle = document.getElementById('heroTitle');
const heroText = document.getElementById('heroText');
const heroTags = document.getElementById('heroTags');
const footerText = document.getElementById('footerText');

autoTheme();
setupPanel();
setupForm();

function autoTheme() {
  const themes = [
    {
      bodyClass: 'theme-neon',
      title: 'MundoXP',
      subtitle: 'Curiosidades, diversão e conhecimento em um só lugar!',
      badge: 'TOP LISTA',
      kicker: 'NOVO DE HOJE',
      heroTitle: 'Top curiosidades gamer, cultura pop e descobertas legais',
      heroText: 'Toda vez que você entra, encontra uma seleção diferente de conteúdos leves, rápidos e divertidos.',
      tags: ['games', 'filmes', 'animes', 'listas'],
      footer: '© 2026 MundoXP — Diversão e Conhecimento'
    },
    {
      bodyClass: 'theme-arcade',
      title: 'PlayGrid',
      subtitle: 'Missões rápidas, rankings e curiosidades para explorar.',
      badge: 'RANKING',
      kicker: 'FASE ESPECIAL',
      heroTitle: 'Guias rápidos, top personagens e fatos do universo gamer',
      heroText: 'Um visual novo aparece automaticamente para deixar a navegação sempre diferente.',
      tags: ['rankings', 'bosses', 'retro', 'arcade'],
      footer: '© 2026 PlayGrid — Portal de Conteúdo Pop'
    },
    {
      bodyClass: 'theme-soft',
      title: 'PixelBox',
      subtitle: 'Um cantinho leve para descobrir fatos curiosos e tendências pop.',
      badge: 'EM ALTA',
      kicker: 'SELEÇÃO DO DIA',
      heroTitle: 'Curiosidades de séries, animes, cinema e internet',
      heroText: 'Cards suaves, leitura rápida e um visual mais limpo a cada nova visita.',
      tags: ['séries', 'cinema', 'internet', 'fun facts'],
      footer: '© 2026 PixelBox — Conteúdo Rápido e Criativo'
    },
    {
      bodyClass: 'theme-dark',
      title: 'QuestZone',
      subtitle: 'Desafios, cultura nerd e descobertas em um portal dinâmico.',
      badge: 'QUEST DO DIA',
      kicker: 'MODO EXPLORAR',
      heroTitle: 'Listas rápidas e curiosidades para quem gosta de cultura geek',
      heroText: 'Tema escuro, atmosfera tecnológica e uma aparência diferente em cada carregamento.',
      tags: ['geek', 'explorar', 'top 10', 'desafios'],
      footer: '© 2026 QuestZone — Explorando Cultura Pop'
    }
  ];

  const selected = themes[Math.floor(Math.random() * themes.length)];
  document.body.classList.add(selected.bodyClass);
  document.title = `${selected.title} — Curiosidades e Diversão`;
  siteTitle.textContent = selected.title;
  siteSubtitle.textContent = selected.subtitle;
  siteBadge.textContent = selected.badge;
  heroKicker.textContent = selected.kicker;
  heroTitle.textContent = selected.heroTitle;
  heroText.textContent = selected.heroText;
  footerText.textContent = selected.footer;

  heroTags.innerHTML = '';
  selected.tags.forEach((tag) => {
    const span = document.createElement('span');
    span.textContent = tag;
    heroTags.appendChild(span);
  });
}

function setupPanel() {
  const hidePanel = () => {
    formPanel.classList.add('hidden');
    formPanel.setAttribute('aria-hidden', 'true');
    statusEl.textContent = '';
    statusEl.className = '';
  };

  const showPanel = () => {
    formPanel.classList.remove('hidden');
    formPanel.setAttribute('aria-hidden', 'false');
  };

  openBtn.addEventListener('click', () => {
    if (formPanel.classList.contains('hidden')) {
      showPanel();
    } else {
      hidePanel();
    }
  });

  closeBtn.addEventListener('click', hidePanel);
  hideBtn.addEventListener('click', hidePanel);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      hidePanel();
    }
  });

  document.addEventListener('click', (e) => {
    const clickedOutside = !formPanel.contains(e.target) && !openBtn.contains(e.target);
    if (clickedOutside && !formPanel.classList.contains('hidden')) {
      hidePanel();
    }
  });
}

function setupForm() {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

    if (!data.escola || !data.relato?.trim()) {
      statusEl.textContent = 'Preencha escola e mensagem.';
      statusEl.className = 'error';
      return;
    }

    statusEl.textContent = 'Enviando...';
    statusEl.className = '';

    try {
      const res = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      if (res.ok) {
        statusEl.textContent = 'Mensagem enviada com sucesso.';
        statusEl.className = 'success';
        form.reset();
        setTimeout(() => {
          formPanel.classList.add('hidden');
          formPanel.setAttribute('aria-hidden', 'true');
          statusEl.textContent = '';
          statusEl.className = '';
        }, 1600);
      } else {
        statusEl.textContent = 'Não foi possível enviar agora.';
        statusEl.className = 'error';
      }
    } catch (error) {
      statusEl.textContent = 'Falha de conexão com o envio.';
      statusEl.className = 'error';
      console.error(error);
    }
  });
}
