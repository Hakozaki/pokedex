function buscarPokemon() {
    let nome = document.getElementById('pokemon').value.toLowerCase();
    const url = `https://pokeapi.co/api/v2/pokemon/${nome}`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Pokémon não encontrado');
            }
            return response.json();
        })
        .then(data => {
            const resultado = document.getElementById('resultado');
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