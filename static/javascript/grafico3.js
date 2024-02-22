
function carregarDados() {
    fetch('../data/dados_csv/tabela3.csv')
        .then(response => response.text())
        .then(data => processarDados(data));
}

function processarDados(Datatabela3) {
    dadostabela3 = Datatabela3.replace(/(\d+),(\d+%)/g, '$1.$2');
    const linhastabela = dadostabela3.split('\n');
    const cabecalho = linhastabela[1].split(',');
    const dadostabela = {};

    let maiorPorcentagem = 0;
    let statusMaiorPorcentagem = '';

    for (let i = 2; i < cabecalho.length; i++) {
        const status = cabecalho[i] ? cabecalho[i].trim() : '';
        const valorString = linhastabela[3].split(',')[i];
        const porcentagem = valorString ? parseFloat(valorString.replace('%', '').replace('"', '').replace('"', '')) : 0;

        dadostabela[status] = porcentagem;

        if (porcentagem > maiorPorcentagem) {
            maiorPorcentagem = porcentagem;
            statusMaiorPorcentagem = status;
        }
    }

    if (Object.keys(dadostabela).length > 0){
        const maiorStatusDeEntrega = { status: statusMaiorPorcentagem, porcentagem: maiorPorcentagem };
        criarGrafico3(dadostabela, maiorStatusDeEntrega);
    }
}



function criarGrafico3(data,maiorStatusDeEntrega) {

    var containerGrafico3 = document.createElement('div');
    containerGrafico3.classList.add('containerGrafico3');
    document.getElementById('divGrafico3').appendChild(containerGrafico3);

    var nomeDivGrafico3 = document.createElement('p');
    nomeDivGrafico3.classList.add('nomeDivGrafico3');
    nomeDivGrafico3.textContent = 'Situação das Atividades';
    containerGrafico3.appendChild(nomeDivGrafico3);

    var divContainerGrafico3 = document.createElement('div');
    divContainerGrafico3.classList.add('divContainerGrafico3');

    var canvasGrafico3 = document.createElement('canvas');
    canvasGrafico3.classList.add('Grafico3');
    divContainerGrafico3.appendChild(canvasGrafico3);




    
    var divDescricaoGrafico3 = document.createElement('div');
    divDescricaoGrafico3.classList.add('divDescricaoGrafico3');
    var divPorcentageGrafico3 = document.createElement('p');
    divPorcentageGrafico3.classList.add('divPorcentageGrafico3');

    divPorcentageGrafico3.textContent = maiorStatusDeEntrega.porcentagem+'%'

    var divStatusGrafico3=  document.createElement('p');
    divStatusGrafico3.classList.add('divStatusGrafico3');


    var textoCompleto = 'das atividades foram <span class="maiorStatusDeEntrega">' + maiorStatusDeEntrega.status + '</span>';
    divStatusGrafico3.innerHTML = textoCompleto;

    

    divDescricaoGrafico3.appendChild(divPorcentageGrafico3);
    divDescricaoGrafico3.appendChild(divStatusGrafico3);
    divContainerGrafico3.appendChild(divDescricaoGrafico3);
    containerGrafico3.appendChild(divContainerGrafico3);

    var contexto = canvasGrafico3.getContext('2d');
    var meuGrafico3 = new Chart(contexto, {
        type: 'pie',
        data: {
            //labels: Object.keys(data),
            datasets: [{
                data: Object.values(data),
                backgroundColor: [
                    'rgba(75, 192, 192, 0.7)',
                    'rgba(255, 99, 132, 0.7)',
                    'rgba(255, 205, 86, 0.7)',
                    'rgba(54, 162, 235, 0.7)',
                    'rgba(255, 159, 64, 0.7)',
                    'rgba(153, 102, 255, 0.7)',
                ],
            }],
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            title: {
                display: true,
                text: 'grafico 3',
            },
        },
    });
   

}


if (document.getElementById("divGrafico3")) {
    carregarDados();
}



