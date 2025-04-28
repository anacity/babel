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
            console.log(data); // Verifique a resposta da API para garantir que as URLs das capas estão corretas

            // Iterar sobre os ISBNs e adicionar as capas
            isbns.forEach((isbn, index) => {
                const livro = data[`ISBN:${isbn}`];
                
                // Verificar se a capa existe e pegar a URL
                const capa = livro && livro.cover ? livro.cover.medium : 'https://via.placeholder.com/150';
                
                // Seleciona o elemento de imagem correspondente usando o índice
                const capaElemento = document.querySelectorAll('.resenha-capa')[index];
                if (capaElemento) {
                    capaElemento.src = capa;  // Atribui a URL da capa
                }
            });
        })
        .catch(error => {
            console.error('Erro ao buscar os livros:', error);
        });
}

const isbns = ['9781250095282', '9788501071545', '9788937461187']; // 3 ISBNs
obterDadosLivros(isbns);
