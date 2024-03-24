
function carregarDadosCSV() {
    fetch('../data/dados_csv/tabela5.csv')
        .then(response => response.text())
        .then(data => codigoComSituacao(data))
        
}



function codigoComSituacao(csvData) {
    const linhas = csvData.trim().split('\n');
    const codigosComObservacoes = {};
    
    const cabecalhos = linhas[0].split(',');
    let observacaoIndex = -1; 

   
    for (let i = 0; i < cabecalhos.length; i++) {
        if (cabecalhos[i].trim() === 'Observações') {
            observacaoIndex = i;
            break;
        }
    }

    if (observacaoIndex === -1) {
        console.error('Erro: coluna "Observações" não encontrada.');
        console.error('Cabecalhos:', cabecalhos);
        return;
    }

    for (let i = 1; i < linhas.length; i++) {
        const colunas = linhas[i].split(',');
        
        if (colunas.length < cabecalhos.length) {
            console.error('Erro: número incorreto de colunas na linha', i);
            continue;
        }

        const codigo = colunas[0].trim();
        const observacao = colunas[observacaoIndex].replace('\r', '').trim();

        if (codigo in codigosComObservacoes) {
            codigosComObservacoes[codigo] += `\n${observacao}`;
        } else {
            codigosComObservacoes[codigo] = observacao;
        }
    }

    criarCarousel(codigosComObservacoes);
}


function criarCarousel(data) {

    const carouselDiv = document.getElementById('carousel'); 

    let carouselItemsHTML = ''; 

    const codigosArray = Object.entries(data);

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
    const eventoPronto = new Event('atividadesProntas');
    document.dispatchEvent(eventoPronto);
}

if (document.getElementById("carousel")) {
    document.addEventListener('atividadesProntas', () => {
        const scriptCarrosel = document.createElement('script');
        scriptCarrosel.src = '../static/javascript/carrosel.js'; 

        
        scriptCarrosel.onload = function() {
           
           
            iniciarCarrosel();
        };

      
        document.body.appendChild(scriptCarrosel);
    });

    
    carregarDadosCSV(); 
}