
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
    var containerGrafico1= document.getElementById('divGrafico1');
    containerGrafico1.classList.add('containerGrafico1');

    var nomeDivGrafico1 = document.createElement('p');
    nomeDivGrafico1.classList.add('nomeDivGrafico1');
    nomeDivGrafico1.textContent = 'Conclusão atividades do produto - Valores Percentuais';
    containerGrafico1.appendChild(nomeDivGrafico1);

    var divContainerGrafico1= document.createElement('div');
    divContainerGrafico1.classList.add('divContainerGrafico1');

    var canvasGrafico1 = document.createElement('canvas');
    canvasGrafico1.classList.add('Grafico1');
    divContainerGrafico1.appendChild(canvasGrafico1);

    divpercentual =document.createElement('div');
    divpercentual.classList.add('divPercentual');
    
    var percentualDeConclusao = document.createElement('p');
    percentualDeConclusao.classList.add('percentualDeConclusao');
    percentualDeConclusao.textContent = percentualConclusao + '%';

    var textoPercentualDeConclusao = document.createElement('p');
    textoPercentualDeConclusao.classList.add('textoPercentualDeConclusao');
    textoPercentualDeConclusao.textContent = 'das atividades do produto concluídas';

    var percentualDeNaoConclusao = document.createElement('p');
    percentualDeNaoConclusao.classList.add('percentualDeNaoConclusao');
    percentualDeNaoConclusao.textContent = percentualNaoConclusao + '%';

    var textoPercentualDeNaoConclusao = document.createElement('p');
    textoPercentualDeNaoConclusao.classList.add('textoPercentualDeNaoConclusao');
    textoPercentualDeNaoConclusao.textContent = 'das atividades do produto não foram concluídas';

    divpercentual.appendChild(percentualDeConclusao);
    divpercentual.appendChild(textoPercentualDeConclusao);
    divpercentual.appendChild(percentualDeNaoConclusao);
    divpercentual.appendChild(textoPercentualDeNaoConclusao);

    divContainerGrafico1.appendChild(divpercentual);
    containerGrafico1.appendChild(divContainerGrafico1);

    var ctx = canvasGrafico1.getContext('2d');
    var meuGrafico = new Chart(ctx, {
        type: 'pie',
        data: {
            datasets: [{
                data: [percentualConclusao, percentualNaoConclusao],
                backgroundColor: [
                    '#2FF057',
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

    if (percentualConclusao == 0 || percentualNaoConclusao == 0){

        if (percentualConclusao == 0) {
            divpercentual.innerHTML = '';
            divpercentual.appendChild(percentualDeNaoConclusao);
            divpercentual.appendChild(textoPercentualDeNaoConclusao);

        }

        if (percentualNaoConclusao == 0) {
            divpercentual.innerHTML = '';
            divpercentual.appendChild(percentualDeConclusao);
            divpercentual.appendChild(textoPercentualDeConclusao);


        }
    }

    

}

if (document.getElementById("divGrafico1")) {
    carregarDadosCSV();
}


