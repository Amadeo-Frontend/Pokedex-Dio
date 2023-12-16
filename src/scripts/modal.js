function closeModal() {
  $('#pokemonModal').modal('hide');
}

// Função para exibir detalhes do Pokémon no modal
function showPokemonDetailsModal(pokemon) {
  const modalName = document.getElementById('modalPokemonName');
  const modalDetails = document.getElementById('modalPokemonDetails');

  // Limpar conteúdo anterior do modal
  modalName.textContent = '';
  modalDetails.innerHTML = '';

  // Adicionar nome do Pokémon ao modal
  modalName.textContent =
    pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);

  // Adicionar detalhes do Pokémon ao modal
  const tipos = document.createElement('div');
  tipos.classList.add('types');

  pokemon.types.forEach((tipo) => {
    const tipoElement = document.createElement('span');
    tipoElement.textContent =
      tipo.type.name.charAt(0).toUpperCase() + tipo.type.name.slice(1);
    tipoElement.classList.add('badge', 'badge-light'); // Adicionar classes do Bootstrap
    tipoElement.style.backgroundColor = getPokemonTypeColor(tipo.type.name);
    tipos.appendChild(tipoElement);
  });

  const imagem = document.createElement('img');
  imagem.src = pokemon.sprites.other['dream_world'].front_default;
  imagem.alt = pokemon.name.toLowerCase();

  modalDetails.appendChild(tipos);
  modalDetails.appendChild(imagem);

  // Exibir o modal usando Bootstrap
  $('#pokemonModal').modal('show');
}
