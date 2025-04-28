const apiKey = '685889aaa8545fe1bf1b4e5003dd45ed';

const filmes = [
  { titulo: "Pride and Prejudice", ano: 2005 },
  { titulo: "Little Women", ano: 2019 },
  { titulo: "Nosferatu", ano: 2024 },
  { titulo: "Bottoms", ano: 2023 },
  { titulo: "The Batman", ano: 2022 }
];

function buscarInformacoesFilme(titulo, ano) {
  const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(titulo)}&year=${ano}&language=pt-BR`;

  return fetch(url)
    .then(response => response.json())
    .then(data => {
      if (data.results && data.results.length > 0) {
        return data.results[0]; 
      } else {
        throw new Error(`Filme não encontrado: ${titulo} (${ano})`);
      }
    });
}

Promise.all(filmes.map(filme => buscarInformacoesFilme(filme.titulo, filme.ano)))
  .then(dadosFilmes => {
    const movieCards = document.querySelectorAll('.movie-card');

    dadosFilmes.forEach((filme, index) => {
      const card = movieCards[index];
      if (!card) return;

      const poster = card.querySelector('.movie-poster');
      const titulo = card.querySelector('.movie-title');
      const ano = card.querySelector('.movie-year');
      const ratingDiv = card.querySelector('.movie-rating');

      if (filme.poster_path) {
        poster.src = `https://image.tmdb.org/t/p/w500${filme.poster_path}`;
      }

      titulo.textContent = filme.title;

      ano.textContent = `Ano: ${filme.release_date.slice(0, 4)}`;

      const nota = filme.vote_average;
      const estrelasCheias = Math.floor(nota / 2);
      const meiaEstrela = nota % 2 >= 1 ? 1 : 0;

      ratingDiv.innerHTML = ''; 

      for (let i = 0; i < estrelasCheias; i++) {
        ratingDiv.innerHTML += '<i class="fas fa-star"></i>';
      }
      if (meiaEstrela) {
        ratingDiv.innerHTML += '<i class="fas fa-star-half-alt"></i>';
      }
      for (let i = estrelasCheias + meiaEstrela; i < 5; i++) {
        ratingDiv.innerHTML += '<i class="far fa-star"></i>';
      }
    });
  })
  .catch(error => {
    console.error('Erro:', error);
  });

const livros = [
    { isbn: "9780141439518" }, 
    { isbn: "9780062662569" }, 
    { isbn: "9788427208391" },
    { isbn: "9780553381689" },
    { isbn: "9780062060617" }
];

const container = document.getElementById('favoritos-container');

livros.forEach(livro => {
    const url = `https://openlibrary.org/api/books?bibkeys=ISBN:${livro.isbn}&format=json&jscmd=data`;
    
    fetch(url)
        .then(response => response.json())
        .then(data => {
            const livroData = data[`ISBN:${livro.isbn}`];
            if (livroData) {
                const card = document.createElement('div');
                card.className = 'card-favorito';
        
                const imagem = document.createElement('img');
                imagem.src = livroData.cover ? livroData.cover.medium : 'https://via.placeholder.com/150';
                imagem.alt = `Capa do livro ${livroData.title}`;
        
                const titulo = document.createElement('p');
                titulo.textContent = livroData.title || 'Título não encontrado';
        
                const detalhes = document.createElement('p');
                detalhes.style.fontSize = "18px";
                const autor = livroData.authors ? livroData.authors.map(a => a.name).join(', ') : 'Autor não encontrado';
                const ano = livroData.publish_date || 'Data não disponível';
                detalhes.innerHTML = `AUTOR(A): ${autor}<br>LANÇAMENTO: ${ano}`;
        
                card.appendChild(imagem);
                card.appendChild(titulo);
                card.appendChild(detalhes);
        
                container.appendChild(card);
            }
        })
        .catch(error => {
            console.error('Erro ao buscar o livro:', error);
        });
});

function obterDadosLivros(isbns) {
  const url = `https://openlibrary.org/api/books?bibkeys=ISBN:${isbns.join(',')}&format=json&jscmd=data`;

  fetch(url)
      .then(response => response.json())
      .then(data => {
          console.log(data);

          const capasElementos = document.querySelectorAll('.resenha-capa'); 

          isbns.forEach((isbn, index) => {
              const livro = data[`ISBN:${isbn}`];

              const capa = livro && livro.cover ? livro.cover.medium : 'https://via.placeholder.com/150';

              const capaElemento = capasElementos[index]; 
              if (capaElemento) {
                  capaElemento.src = capa;
              }
          });
      })
      .catch(error => {
          console.error('Erro ao buscar os livros:', error);
      });
}

const isbns = ['9781250095282', '9788501071545', '9788937461187'];
obterDadosLivros(isbns);
