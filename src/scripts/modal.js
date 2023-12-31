// Função para fechar o modal
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
    tipoElement.classList.add('badge', 'badge-light');
    tipoElement.style.backgroundColor = getPokemonTypeColor(tipo.type.name);
    tipos.appendChild(tipoElement);
  });

  const status = document.createElement('div');
  status.classList.add('status');

  const statusLabels = [
    'HP',
    'Attack',
    'Defense',
    'Sp. Atk',
    'Sp. Def',
    'Speed',
  ];

  const baseStats = pokemon.stats.map((stat) => stat.base_stat);

  // Variável para armazenar o total dos stats
  let totalStats = 0;

  for (let i = 0; i < statusLabels.length; i++) {
    const statusElement = document.createElement('div');
    statusElement.classList.add('status-element');
    statusElement.setAttribute('data-label', statusLabels[i]);

    // Adicionar rótulo ao statusElement
    const label = document.createElement('span');
    label.textContent = `${statusLabels[i]}:`;
    statusElement.appendChild(label);

    // Criar a barra horizontal
    const barra = document.createElement('div');
    barra.classList.add('barra');
    barra.style.width = `${(baseStats[i] / 255) * 100}%`;
    barra.textContent = baseStats[i];

    // Adicionar a barra ao elemento de status
    statusElement.appendChild(barra);

    // Adicionar o elemento de status ao contêiner de status
    status.appendChild(statusElement);

    // Adicionar ao totalStats
    totalStats += baseStats[i];
  }

  const totalElement = document.createElement('div');
  totalElement.textContent = `Total: ${totalStats}`;
  totalElement.classList.add('total');

  const imagem = document.createElement('img');
  imagem.src = pokemon.sprites.other['dream_world'].front_default;
  imagem.alt = pokemon.name.toLowerCase();

  modalDetails.appendChild(tipos);
  modalDetails.appendChild(imagem);
  modalDetails.appendChild(status);
  modalDetails.appendChild(totalElement);

  // Exibir o modal usando Bootstrap
  $('#pokemonModal').modal('show');
}
