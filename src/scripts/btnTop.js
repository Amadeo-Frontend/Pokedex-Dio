function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Evento de carregamento da página web
window.addEventListener('load', () => {
  // Obter o botão "To Top" existente e adicionar o evento de clique
  const btnToTop = document.querySelector('.btn-top');
  btnToTop.addEventListener('click', scrollToTop);
});
