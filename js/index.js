// Mapeamento das rotas para os arquivos HTML correspondentes
const routes = {
  "/about": "/pages/about.html",
  "/": "/pages/home.html",
  "/contact": "/pages/contact.html",
  404: "/pages/404.html",
}

// Função chamada quando um link é clicado
function route(event) {
  event = event || window.event;
  // Impede o comportamento padrão do link de carregar uma nova página
  event.preventDefault();

  // Atualiza a URL no histórico de navegação sem recarregar a página
  window.history.pushState({}, "", event.target.href);

  // Chama a função de manipulação para atualizar a exibição
  handle();
}


function handle() {
  // Obtém o caminho da URL atual
  const {pathname } = window.location
  // Obtém o caminho do arquivo HTML correspondente à rota atual ou à 404
  const route = routes[pathname] || routes[404]
  // Realiza uma requisição para o arquivo HTML da rota atual
  fetch(route)
  .then(data => data.text()) // Converte os dados em texto
  .then(html => {
    document.querySelector('.app').innerHTML = html
  })
}

handle()

window.onpopstate = () => handle()
window.route= () => route()