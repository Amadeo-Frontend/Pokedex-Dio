// Função para buscar dados da API dos Pokémons
async function fetchPokemonData(offset, limit) {
  try {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`,
    );
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error('Erro ao buscar dados dos Pokémons:', error);
  }
}

// Função para buscar detalhes do Pokémon usando uma URL fornecida
async function fetchPokemonDetails(url) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Erro ao buscar detalhes do Pokémon:', error);
  }
}

// Função para obter a cor com base no tipo do Pokémon
function getPokemonTypeColor(type) {
  switch (type) {
    case 'grass':
      return '#49d0b0';
    case 'normal':
      return '#a6a877';
    case 'fire':
      return '#ee7f30';
    case 'water':
      return '#678fee';
    case 'bug':
      return '#a8b720';
    case 'electric':
      return '#F7CF2E';
    case 'ice':
      return '#98d5d7';
    case 'ground':
      return '#dfbf69';
    case 'rock':
      return '#b8a137';
    case 'ghost':
      return '#6e5896';
    case 'steel':
      return '#b9b7cf';
    case 'fairy':
      return '#f9aec7';
    case 'flying':
      return '#a98ff0';
    case 'poison':
      return '#a98fcc';
    default:
      return 'lightgray';
  }
}

function renderPokemonDetails(pokemon) {
  const listaPokemons = document.querySelector('.pokemons');

  const itemPokemon = document.createElement('li');
  itemPokemon.classList.add('pokemon');

  // Criar uma span para o número do Pokémon com 3 dígitos
  const numero = document.createElement('span');
  numero.classList.add('number');
  numero.textContent = `#${pokemon.id.toString().padStart(3, '0')}`;

  // Criar uma span para o nome do Pokémon
  const nome = document.createElement('span');
  nome.classList.add('name');
  nome.textContent =
    pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);

  // Criar uma lista ordenada para os tipos de Pokémon
  const tipos = document.createElement('ol');
  tipos.classList.add('types');

  // Iterar sobre os tipos de Pokémon e criar itens de lista
  pokemon.types.forEach((tipo) => {
    const itemTipo = document.createElement('li');
    itemTipo.classList.add('type');
    // Colocar a primeira letra do tipo em maiúscula
    itemTipo.textContent =
      tipo.type.name.charAt(0).toUpperCase() + tipo.type.name.slice(1);

    // Definir a cor de fundo com base no tipo do Pokémon
    const corTipo = getPokemonTypeColor(tipo.type.name);
    itemTipo.style.backgroundColor = corTipo;

    // Adicionar o item de tipo à lista de tipos
    tipos.appendChild(itemTipo);
  });

  // Criar um elemento de imagem para o sprite do Pokémon
  const imagem = document.createElement('img');
  imagem.src = pokemon.sprites.other['dream_world'].front_default;
  imagem.alt = pokemon.name.toLowerCase(); // Alt dinâmico com o nome do Pokémon

  // Criar um botão de informações
  const botaoInfo = document.createElement('button');
  botaoInfo.classList.add('info-button');
  botaoInfo.textContent = 'Info';

  // Adicionar evento de clique ao botão de informações
  botaoInfo.addEventListener('click', function () {
    showPokemonDetailsModal(pokemon);
  });

  // Adicionar elementos ao item de lista do Pokémon
  itemPokemon.appendChild(numero);
  itemPokemon.appendChild(nome);

  // Criar uma div para os detalhes do Pokémon
  const detalhe = document.createElement('div');
  detalhe.classList.add('detail');
  detalhe.appendChild(tipos);
  detalhe.appendChild(imagem);
  detalhe.appendChild(botaoInfo);

  // Adicionar detalhes do Pokémon ao item de lista
  itemPokemon.appendChild(detalhe);

  // Obter o tipo principal do Pokémon e definir a cor de fundo
  const tipoPrincipal = pokemon.types[0].type.name;
  const corTipoPrincipal = getPokemonTypeColor(tipoPrincipal);
  itemPokemon.style.backgroundColor = corTipoPrincipal;

  // Adicionar evento de clique ao item de lista do Pokémon
  itemPokemon.addEventListener('click', function () {
    showPokemonDetailsModal(pokemon);
  });

  // Adicionar item de lista do Pokémon à lista de Pokémon
  listaPokemons.appendChild(itemPokemon);
}

// Função para carregar mais itens ao clicar no botão
async function loadMorePokemons() {
  // Definir o offset e o limite com base nos itens já carregados
  const offset = document.querySelectorAll('.pokemon').length;
  const limit = 10;

  // Buscar dados adicionais dos Pokémon
  const listaPokemons = await fetchPokemonData(offset, limit);

  // Iterar sobre a lista e buscar detalhes de cada Pokémon
  for (const pokemon of listaPokemons) {
    const dadosPokemon = await fetchPokemonDetails(pokemon.url);
    renderPokemonDetails(dadosPokemon);
  }

  // Verificar se atingiu o limite de 30 pokémons e esconder o botão se verdadeiro
  if (document.querySelectorAll('.pokemon').length >= 151) {
    const btnCarregarMais = document.getElementById('btnCarregarMais');
    btnCarregarMais.style.display = 'none';
  }
}

// Evento de carregamento da página web
window.addEventListener('load', async () => {
  // Buscar dados iniciais dos Pokémon
  const listaPokemons = await fetchPokemonData(0, 10);

  // Iterar sobre a lista e buscar detalhes de cada Pokémon
  for (const pokemon of listaPokemons) {
    const dadosPokemon = await fetchPokemonDetails(pokemon.url);
    renderPokemonDetails(dadosPokemon);
  }

  // Adicionar evento de clique ao botão de carregar mais
  const btnCarregarMais = document.getElementById('btnCarregarMais');
  btnCarregarMais.addEventListener('click', loadMorePokemons);
});
