/**
 * Busca um pokemon na api
 */
function buscarPokemon() {
    //captura o valor selecionado no campo <select id="pokemon">.
    //converte o nome para letras minúsculas com .toLowerCase(), pois a PokéAPI exige isso na URL (ex: "Bulbasaur" deve ser "bulbasaur").
    const nome = document.getElementById('pokemon').value.toLowerCase();
    //monta a URL da PokéAPI para buscar dados detalhados do Pokémon com o nome capturado. ex: `https://pokeapi.co/api/v2/pokemon/pikachu`
    const url = `https://pokeapi.co/api/v2/pokemon/${nome}`;
    //inicia a requisição para a URL da PokéAPI.
    fetch(url)
        .then(response => {
            //verifica se a resposta foi bem-sucedida (response.ok).
            if (!response.ok) {
                //se não for (ex: 404 Not Found), lança um erro personalizado com a mensagem "Pokémon não encontrado".
                throw new Error('Pokémon não encontrado');
            }
            //caso a resposta esteja ok, converte o JSON em objeto JavaScript com response.json().
            return response.json();
        })
        //recebe os dados do Pokémon já convertidos em objeto (data).
        .then(data => {
            //seleciona a <div id="resultado"> no HTML onde os dados do Pokémon serão exibidos.
            const resultado = document.getElementById('resultado');
            //preenche a div resultado com:
            //1- nome do Pokémon em caixa alta.
            //2- uma imagem frontal (sprites.front_default).
            //3- a altura (height) e o peso (weight) do Pokémon.
            //4- os tipos (como “fire”, “water” etc.), onde cada tipo é envolvido por um <span> com classes que podem ser usadas para aplicar cores/estilos (tag tipo-fire, tag tipo-grass...).
            resultado.innerHTML = `
            <h2>${data.name.toUpperCase()}</h2>
            <img src="${data.sprites.front_default}" alt="${data.name}">
            <p><strong>Altura:</strong> ${data.height}</p>
            <p><strong>Peso:</strong> ${data.weight}</p>
            <p><strong>Tipos:</strong> ${data.types
                    .map(t => `<span class="tag tipo-${t.type.name}">${t.type.name}</span>`)
                    .join(' ')
                }</p>
          `;
        })
        .catch(error => {
            document.getElementById(
                'resultado'
            ).innerHTML = `<p style="color:red;">${error.message}</p>`;
        });
}

/**
 * Carrega os pokémons da national dex na lista.
 */
function carregarPokemons() {
    const url = `https://pokeapi.co/api/v2/pokedex/1/`;
    //função que faz uma requisição HTTP para a URL fornecida.
    fetch(url)
        //extrai e converte o corpo da resposta (geralmente em texto) para um objeto JavaScript (porque o conteúdo está em formato JSON).
        .then(response => response.json())
        //recebe o objeto JavaScript convertido (o data) da resposta.
        //dentro deste bloco, você pode acessar os dados retornados pela API.
        .then(data => {
            //seleciona o elemento <select id="pokemon"> no HTML.
            const select = document.getElementById('pokemon');
            //itera sobre cada Pokémon da lista. 'entry'
            data.pokemon_entries.forEach(entry => {
                //cria um elemento <option>
                const option = document.createElement('option');
                //define o valor (value) da opção como o nome do Pokémon (ex: bulbasaur).
                option.value = entry.pokemon_species.name;
                //define o texto que aparecerá na lista como algo como "1 - bulbasaur".
                option.textContent = entry.entry_number + " - " + entry.pokemon_species.name;
                //adiciona a <option> como filha do <select> (a lista de Pokémon será preenchida dinamicamente).
                select.appendChild(option);
            });

        }).catch(error => {
            document.getElementById(
                'resultado'
            ).innerHTML = `<p style="color:red;">${error.message}</p>`;
        });

}

carregarPokemons()