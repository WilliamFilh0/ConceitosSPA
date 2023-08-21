export class Router {
  routes = {}

  add(routeName, page){
    this.routes[routeName] = page
  }

  // Função chamada quando um link é clicado
  route(event) {
    event = event || window.event;
    // Impede o comportamento padrão do link de carregar uma nova página
    event.preventDefault();

    // Atualiza a URL no histórico de navegação sem recarregar a página
    window.history.pushState({}, "", event.target.href);

    // Chama a função de manipulação para atualizar a exibição
    this.handle();
  }

  handle() {
    // Obtém o caminho da URL atual
    const { pathname } = window.location
    // Obtém o caminho do arquivo HTML correspondente à rota atual ou à 404
    const route = this.routes[pathname] || this.routes[404]
    // Realiza uma requisição para o arquivo HTML da rota atual
    fetch(route)
      .then(data => data.text()) // Converte os dados em texto
      .then(html => {
        document.querySelector('.app').innerHTML = html
      })
  }
}


