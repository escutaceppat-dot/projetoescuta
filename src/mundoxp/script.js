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
{bodyClass:'theme-games',title:'Game Arena',subtitle:'Portal Gamer · Esports · Reviews · Lançamentos',badge:'LIVE NOW',kicker:'TRENDING NA ARENA',heroTitle:'GTA VI: tudo sobre o lançamento mais esperado da década',heroText:'Análise completa do novo trailer, mapa de Vice City expandido, modo online revolucionário e data oficial de lançamento confirmada pela Rockstar Games.',
tags:['FPS','RPG','Esports','PC Gaming','Console','Indie','Mobile'],
html:`<section class="card heroimg"><img src="https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1200&q=80" alt="GTA VI"><span class="game-tag">EXCLUSIVO</span><h2>GTA VI quebra recordes de pré-venda antes mesmo do lançamento</h2><p>Rockstar confirma 40 milhões de unidades reservadas em apenas 72 horas. Veja gameplay inédito e os novos recursos de mundo aberto.</p></section>
<section class="card"><img src="https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&q=80" alt="Valorant"><span class="game-tag">ESPORTS</span><h2>Valorant Champions 2026: LOUD enfrenta Sentinels na grande final</h2><p>Equipe brasileira chega invicta à decisão em Los Angeles. Confira análise tática e horários das transmissões oficiais.</p></section>
<section class="card"><img src="https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=800&q=80" alt="Setup gamer"><span class="game-tag">HARDWARE</span><h2>Setup definitivo 2026: RTX 5090 + monitor OLED 480Hz em teste</h2><p>Testamos a nova geração de placas Nvidia com os monitores mais rápidos do mercado. Vale o investimento? Veja benchmarks completos.</p></section>
<section class="card"><img src="https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=800&q=80" alt="Console PS5"><span class="game-tag">REVIEW</span><h2>PlayStation 5 Pro: análise após 6 meses de uso intensivo</h2><p>Ray tracing aprimorado, SSD mais rápido e upscaling por IA. Mostramos se a versão Pro justifica a troca do console base.</p></section>
<section class="card"><img src="https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=800&q=80" alt="Cyberpunk"><span class="game-tag">RPG</span><h2>Cyberpunk 2077: Phantom Liberty ganha nova expansão em 2026</h2><p>CD Projekt Red anuncia continuação da saga de Night City com novo distrito, classes inéditas e mais de 50 horas de campanha.</p></section>
<section class="card"><img src="https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=800&q=80" alt="CS2"><span class="game-tag">FPS</span><h2>Counter-Strike 2: Major de Copenhague tem premiação recorde</h2><p>US$ 2 milhões em disputa, 24 equipes confirmadas e novo mapa competitivo. FURIA representa o Brasil no torneio.</p></section>`},

  {bodyClass:'theme-beauty',title:'Lumière Beauty',subtitle:'Skincare · Maquiagem · Bem-estar',badge:'BLACK WEEK',kicker:'BELEZA PREMIUM',heroTitle:'Cuidados que transformam sua rotina',heroText:'Fórmulas premiadas, resultados visíveis e preços que cabem no seu bolso. Entrega rápida e amostras grátis em todas as compras.',
  tags:['Skincare','Make','Perfumes','Cabelos','Corpo'],
  html:`<section class="card product heroimg"><img src="https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?w=800&q=80" alt="Kit skincare"><h2>Ritual Glow | Kit Anti-Sinais</h2><p>Sérum vitamina C + retinol + hidratante. Reduz linhas finas em 21 dias.</p><p class="review">⭐⭐⭐⭐⭐ 4,9 · 1.247 avaliações</p><p><del>R$ 349,90</del> <strong>R$ 199,90</strong></p><button>Adicionar à Sacola</button></section>
  <section class="card product"><img src="https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800&q=80" alt="Perfume"><h2>Essence de Rose</h2><p>Eau de parfum floral amadeirado. Fixação de até 10 horas. 100 ml.</p><p class="review">⭐⭐⭐⭐⭐ 4,8 · 856 avaliações</p><p><del>R$ 399,90</del> <strong>R$ 249,90</strong></p><button>Adicionar à Sacola</button></section>
  <section class="card product"><img src="https://images.unsplash.com/photo-1596704017254-9b121068fb31?w=800&q=80" alt="Base"><h2>Base Luminous Skin</h2><p>Cobertura média, acabamento natural. Hidratação por 24 horas. 12 tons.</p><p class="review">⭐⭐⭐⭐ 4,7 · 2.103 avaliações</p><p><del>R$ 189,90</del> <strong>R$ 119,90</strong></p><button>Adicionar à Sacola</button></section>
  <section class="card product"><img src="https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=800&q=80" alt="Máscara de cílios"><h2>Máscara Lash Infinity</h2><p>Volume alongado, sem borrões. Fórmula à prova d'água com óleo de castor.</p><p class="review">⭐⭐⭐⭐⭐ 4,9 · 3.401 avaliações</p><p><del>R$ 129,90</del> <strong>R$ 79,90</strong></p><button>Adicionar à Sacola</button></section>
  <section class="card product"><img src="https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=800&q=80" alt="Hidratante corporal"><h2>Body Butter Cacau & Karité</h2><p>Hidratação intensa para peles ressecadas. Textura cremosa, 300 g.</p><p class="review">⭐⭐⭐⭐⭐ 4,8 · 942 avaliações</p><p><del>R$ 159,90</del> <strong>R$ 89,90</strong></p><button>Adicionar à Sacola</button></section>
  <section class="card product"><img src="https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?w=800&q=80" alt="Shampoo"><h2>Kit Reparação Capilar</h2><p>Shampoo + condicionador + máscara. Força para fios danificados.</p><p class="review">⭐⭐⭐⭐ 4,6 · 1.558 avaliações</p><p><del>R$ 279,90</del> <strong>R$ 169,90</strong></p><button>Adicionar à Sacola</button></section>`},
{bodyClass:'theme-food',title:'Receitas da Casa',subtitle:'Cozinha brasileira · Do simples ao especial',badge:'COZINHA DO DIA',kicker:'RECEITAS TESTADAS',heroTitle:'Sabor de casa em cada receita',heroText:'Descubra pratos práticos, bolos fofinhos, clássicos brasileiros e sobremesas irresistíveis com ingredientes fáceis e passo a passo completo.',
tags:['Brasileira','Massas','Bolos','Doces','Rápidas','Especiais'],
html:`<section class="card recipe heroimg"><img src="https://images.unsplash.com/photo-1619895092538-128f4d2fa0a1?w=1200&q=80" alt="Lasanha à bolonhesa"><div class="recipe-meta"><span>1h 30min</span><span>Fácil</span><span>6 porções</span></div><h2>Lasanha à Bolonhesa Clássica</h2><p>Camadas de massa fresca, molho bolonhesa caseiro e queijo derretido. A douradinha no forno é o toque especial de qualquer domingo em família.</p></section>
<section class="card recipe"><img src="https://images.unsplash.com/photo-1673421012931-3b445d6b1893?w=800&q=80" alt="Strogonoff de frango"><div class="recipe-meta"><span>40min</span><span>Fácil</span><span>4 porções</span></div><h2>Strogonoff de Frango Cremoso</h2><p>Peito de frango em cubos, molho de cogumelos e champanhe com creme de leite. Sirva com arroz branco e batata palha crocante.</p></section>
<section class="card recipe"><img src="https://images.unsplash.com/photo-1637361872791-3edbb1cf95c8?w=800&q=80" alt="Feijoada brasileira"><div class="recipe-meta"><span>2h</span><span>Médio</span><span>8 porções</span></div><h2>Feijoada Completa de Sábado</h2><p>O clássico brasileiro com carnes defumadas, feijão preto bem temperado e acompanhamentos: arroz, couve, laranja e farofa.</p></section>
<section class="card recipe"><img src="https://images.unsplash.com/photo-1598142982901-df6cd8402a37?w=800&q=80" alt="Pão de queijo"><div class="recipe-meta"><span>50min</span><span>Fácil</span><span>30 unidades</span></div><h2>Pão de Queijo Mineiro</h2><p>Crocante por fora e macio por dentro. Feito com polvilho azedo e queijo meia cura — perfeito para o café da manhã ou lanche da tarde.</p></section>
<section class="card recipe"><img src="https://images.unsplash.com/photo-1621303837174-89787a7d4729?w=800&q=80" alt="Bolo de cenoura com chocolate"><div class="recipe-meta"><span>1h</span><span>Fácil</span><span>12 fatias</span></div><h2>Bolo de Cenoura com Cobertura de Chocolate</h2><p>Massa fofinha, sabor natural de cenoura e aquela cobertura de brigadeiro que craquela na hora de cortar. Sucesso garantido.</p></section>
<section class="card recipe"><img src="https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=800&q=80" alt="Brigadeiro gourmet"><div class="recipe-meta"><span>30min</span><span>Fácil</span><span>20 unidades</span></div><h2>Brigadeiro Gourmet Tradicional</h2><p>O ponto certo de enrolar, com leite condensado, manteiga e chocolate em pó 50% cacau. Granulado belga para finalizar com estilo.</p></section>`},
{bodyClass:'theme-news',title:'Diário Global',subtitle:'Jornalismo independente · Edição digital',badge:'ÚLTIMA HORA',kicker:'EDIÇÃO DE HOJE',heroTitle:'Cúpula internacional define novo acordo climático após semanas de negociação',heroText:'Líderes de 47 países assinam compromisso histórico de redução de emissões até 2035. Mercados reagem com alta nas ações de energia limpa.',
tags:['Mundo','Política','Tech','Economia','Cultura'],
html:`<section class="card"><img src="https://images.unsplash.com/photo-1532375810709-75b1da00537c?w=800&q=80" alt="Parlamento"><h2>Reforma tributária avança no Congresso após acordo entre partidos</h2><p>Texto aprovado em primeiro turno prevê simplificação de impostos e impacto direto na carga de pequenos negócios a partir de 2027.</p></section>
<section class="card"><img src="https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80" alt="Tecnologia"><h2>Inteligência artificial transforma diagnósticos em hospitais públicos</h2><p>Projeto-piloto em três capitais usa modelos de visão computacional para acelerar exames de imagem e reduzir filas de espera.</p></section>
<section class="card"><img src="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&q=80" alt="Economia"><h2>Bolsa fecha em alta com expectativa de corte na taxa de juros</h2><p>Índice avança 1,8% puxado por bancos e commodities. Analistas projetam novo ciclo de afrouxamento monetário no próximo trimestre.</p></section>
<section class="card"><img src="https://images.unsplash.com/photo-1569163139394-de4798aa62b6?w=800&q=80" alt="Mundo"><h2>Eleições europeias redesenham mapa político do continente</h2><p>Partidos de centro perdem espaço enquanto novas coalizões emergem com agenda focada em segurança energética e migração.</p></section>
<section class="card"><img src="https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&q=80" alt="Startups"><h2>Startup brasileira capta US$ 80 milhões em rodada série C</h2><p>Empresa de logística verde planeja expansão para América Latina e contratação de mais 400 engenheiros nos próximos doze meses.</p></section>
<section class="card"><img src="https://images.unsplash.com/photo-1488972685288-c3fd157d7c7a?w=800&q=80" alt="Cultura"><h2>Museu reabre acervo modernista após restauro de dois anos</h2><p>Mais de 1.200 obras voltam ao público com nova curadoria e ala dedicada a artistas contemporâneos do Sul Global.</p></section>`}
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

/* Temas desejados: Games, Culinária, Beleza e Notícias com layouts independentes */
