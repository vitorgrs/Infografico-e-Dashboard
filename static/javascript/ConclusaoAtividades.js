
var percentualConclusao;
var percentualNaoConclusao;

function carregarDadosCSV() {
    fetch('../data/dados_csv/tabela1.csv')
        .then(response => response.text())
        .then(data => processarDadosCSV(data));
}

function processarDadosCSV(Datatabela1) {
    var linhas = Datatabela1.split('\n');
    var dados = [];

    for (var i = 1; i < linhas.length; i++) {
        var colunas = linhas[i].split(',');
        
        if (colunas.length >= 2) {
            var codigo = colunas[0].trim();
            var percentual = (colunas[1].trim().replace(',', '.').replace('%', '').replace('"', ''));
            
            dados.push({ codigo: codigo, percentual: percentual });
                
            
        }
    }
  
    if (dados.length > 0) {
        percentualConclusao  = dados.length > 0 ? dados[dados.length - 1].percentual : '0';
    
       
        dados.pop();
        var percentualNaoConclusao = (100.00 - percentualConclusao);
        criarGrafico1(percentualConclusao, percentualNaoConclusao);
        
    }
}



function criarGrafico1(percentualConclusao, percentualNaoConclusao) {
    var divGrafico= document.getElementById('divGrafico');
    var canvasGrafico = document.createElement('canvas');
    canvasGrafico.classList.add('GraficoConclusao');
    divGrafico.appendChild(canvasGrafico);


    
    var divPercentualConcluido = document.getElementById('descricaoConcluida');
    var percentualDeConclusao = document.createElement('h1');
    percentualDeConclusao.classList.add('percentualDeConclusao');
    percentualDeConclusao.textContent = percentualConclusao + '%';

    


    var textoPercentualDeConclusao = document.createElement('p');
    textoPercentualDeConclusao.classList.add('textoPercentualDeConclusao');
    textoPercentualDeConclusao.textContent = 'das atividades do produto concluídas';
    divPercentualConcluido.appendChild(percentualDeConclusao)
    divPercentualConcluido.appendChild(textoPercentualDeConclusao)

    var divPercentualNaoConcluido = document.getElementById('descricaoNaoConcluida');
    var percentualDeNaoConclusao = document.createElement('h1');
    percentualDeNaoConclusao.classList.add('percentualDeNaoConclusao');
    percentualDeNaoConclusao.textContent = percentualNaoConclusao + '%';

    
    var textoPercentualDeNaoConclusao = document.createElement('p');
    textoPercentualDeNaoConclusao.classList.add('textoPercentualDeNaoConclusao');
    textoPercentualDeNaoConclusao.textContent = 'das atividades do produto não foram concluídas';
    divPercentualNaoConcluido.appendChild(percentualDeNaoConclusao)
    divPercentualNaoConcluido.appendChild(textoPercentualDeNaoConclusao)

    var ctx = canvasGrafico.getContext('2d');
    var meuGrafico = new Chart(ctx, {
        type: 'pie',
        data: {
            datasets: [{
                data: [percentualConclusao, percentualNaoConclusao],
                backgroundColor: [
                    '#0AC330',
                    '#E7110F',
                ],
            }],
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            title: {
                display: true,
                text: 'Porcentagem de Conclusão do Produto',
            },
            tooltips: {
                enabled: true, 
                mode: 'index', 
            },

        },
        
    
    });



    

}

if (document.getElementById("pagina2")) {
    carregarDadosCSV();
}


