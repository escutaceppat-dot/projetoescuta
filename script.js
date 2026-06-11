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
const contentGrid=document.getElementById('contentGrid');

autoTheme();
setupPanel();
setupForm();



function autoTheme() {
const themes=[
{bodyClass:'theme-games',title:'Game Arena',subtitle:'Portal Gamer',badge:'GAMES',kicker:'TRENDING',heroTitle:'O universo gamer em destaque',heroText:'Reviews, esports e lançamentos.',
tags:['FPS','RPG','Esports','PC'],
html:`<section class="card heroimg"><img src="https://images.unsplash.com/photo-1542751371-adc38448a05e"><h2>GTA VI domina expectativas</h2></section>
<section class="card"><img src="https://images.unsplash.com/photo-1511512578047-dfb367046420"><h2>Guia Valorant</h2><p>Dicas avançadas de posicionamento.</p></section>
<section class="card"><img src="https://images.unsplash.com/photo-1493711662062-fa541adb3fc8"><h2>Setup Gamer</h2><p>Equipamentos recomendados.</p></section>`},
{bodyClass:'theme-beauty',title:'Beauty Store',subtitle:'Loja Premium',badge:'OFERTAS',kicker:'ATÉ 70% OFF',heroTitle:'Cosméticos e Skincare',heroText:'Visual de e-commerce profissional.',
tags:['Make','Perfumes','Skincare','Promoções'],
html:`<section class="card product"><img src="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9"><h2>Batom Velvet</h2><p>⭐⭐⭐⭐⭐</p><p><del>R$59,90</del> <strong>R$29,90</strong></p><button>Comprar Agora</button></section>
<section class="card product"><img src="https://images.unsplash.com/photo-1620916566398-39f1143ab7be"><h2>Sérum Glow</h2><p><del>R$149,90</del> <strong>R$89,90</strong></p><button>Comprar Agora</button></section>
<section class="card product"><img src="https://images.unsplash.com/photo-1596462502278-27bfdc403348"><h2>Perfume Blossom</h2><p><del>R$299,90</del> <strong>R$199,90</strong></p><button>Comprar Agora</button></section>`},
{bodyClass:'theme-food',title:'Receitas da Casa',subtitle:'Blog de Receitas',badge:'RECEITAS',kicker:'CHEF',heroTitle:'Receitas completas',heroText:'Ingredientes e modo de preparo.',
tags:['Massas','Bolos','Doces'],
html:`<section class="card"><img src="https://images.unsplash.com/photo-1504674900247-0877df9cc836"><h2>Lasanha Especial</h2><p>Ingredientes completos e preparo.</p></section>
<section class="card"><img src="https://images.unsplash.com/photo-1578985545062-69928b1d9587"><h2>Bolo de Cenoura</h2><p>Receita detalhada.</p></section>
<section class="card"><img src="https://images.unsplash.com/photo-1551024601-bec78aea704b"><h2>Brigadeiro Gourmet</h2><p>Passo a passo.</p></section>`},
{bodyClass:'theme-news',title:'Portal Notícias',subtitle:'Jornal Digital',badge:'URGENTE',kicker:'MUNDO',heroTitle:'Últimas notícias',heroText:'Portal moderno.',
tags:['Mundo','Tech','Economia'],
html:`<section class="card"><img src="https://images.unsplash.com/photo-1495020689067-958852a7765e"><h2>Destaque Mundial</h2></section>
<section class="card"><img src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d"><h2>Tecnologia</h2></section>
<section class="card"><img src="https://images.unsplash.com/photo-1520607162513-77705c0f0d4a"><h2>Economia</h2></section>`}
];
const selected=themes[Math.floor(Math.random()*themes.length)];
document.body.className=selected.bodyClass;
document.title=selected.title;
siteTitle.textContent=selected.title;siteSubtitle.textContent=selected.subtitle;siteBadge.textContent=selected.badge;
heroKicker.textContent=selected.kicker;heroTitle.textContent=selected.heroTitle;heroText.textContent=selected.heroText;
heroTags.innerHTML=selected.tags.map(t=>`<span>${t}</span>`).join('');
contentGrid.innerHTML=selected.html;
footerText.textContent=selected.title;
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
      const res = await fetch('/api/send-email', {
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
