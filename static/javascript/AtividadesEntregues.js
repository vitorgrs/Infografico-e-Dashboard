
function carregarDadosCSV() {
    fetch('../data/dados_csv/tabela5.csv')
        .then(response => response.text())
        .then(data => codigoComSituacao(data));
}



function codigoComSituacao(csvData) {
    const linhas = csvData.trim().split('\n');
    const codigosComObservacoes = {};


    for (let i = 1; i < linhas.length; i++) {
        const colunas = linhas[i].split(',');
        const codigo = colunas[0]; 
        const observacao = colunas[colunas.length - 1].replace(/"/g, ''); 

        
        if (codigo in codigosComObservacoes) {
            
            codigosComObservacoes[codigo] += `\n${observacao}`;
        } else {
           
            codigosComObservacoes[codigo] = observacao;
        }
    }
    console.log(codigosComObservacoes)
    criarCarousel(codigosComObservacoes);
}

function criarCarousel(data) {
    const codigosComObservacoes = data; 

    const carouselDiv = document.getElementById('carousel'); 

    let carouselItemsHTML = ''; 

    const codigosArray = Object.entries(codigosComObservacoes);

    for (let i = 0; i < codigosArray.length; i += 3) {
        const grupoCodigos = codigosArray.slice(i, i + 3); 

        const divsRetangulo = grupoCodigos.map(([codigo, observacao], index) => {
            return `
                <div class="retangulo-informacao" id="ret${i + index + 1}">
                    <img class="icon-tarefa" src="../static/images/icon-tarefa.svg" alt="Anterior">
                    <h3>${codigo}</h3>
                    <p>${observacao}</p>
                </div>
            `;
        });

        const divCarouselItem = `
            <div class="carousel-item ${i === 0 ? 'active' : ''}">
                ${divsRetangulo.join('')}
            </div>
        `;
        carouselItemsHTML += divCarouselItem;
    }

   
    carouselDiv.innerHTML = carouselItemsHTML;
}


if (document.getElementById("carousel")) {
    carregarDadosCSV();
    const scriptCarrosel = document.createElement('script');
    scriptCarrosel.src = '../static/javascript/carrosel.js'; 
    document.body.appendChild(scriptCarrosel);
}
