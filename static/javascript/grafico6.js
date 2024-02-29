function carregarDadosCSV() {
    fetch('../data/dados_csv/tabela4.csv')
        .then(response => response.text())
        .then(data => criarConteinerGrafico6(data));
}




function criarConteinerGrafico6(dataGrafico6){
    var dadosGrafico6 =dataGrafico6.replace(/(\d+),(\d+%)/g, '$1.$2');

    const linhas = dadosGrafico6.split('\n').map(linha => linha.trim());
    
  
    const cabecalho = linhas.shift().split(',');

  
    let totalAtividades = 0;
    let atividadesEntregues = 0;


    const statusPorCodigo = {};


    linhas.forEach(linha => {
        
        const colunas = linha.split(',');

        const codigo = colunas[0];

        
        if (!statusPorCodigo[codigo]) {
            statusPorCodigo[codigo] = {
                total: 0,
                entregues: 0
            };
        }

        
        statusPorCodigo[codigo].total++;

       
        if (colunas[1] === 'X') {
            
            statusPorCodigo[codigo].entregues++;
           
            atividadesEntregues++;
        }
    });

    totalAtividades = linhas.length - 1;
    
    criarGrafico6(totalAtividades, atividadesEntregues);
}
function criarGrafico6(totalAtividades, atividadesEntregues){

    var tituloGrafico6 = document.createElement('p');
    tituloGrafico6.classList.add('tituloGrafico6');
    tituloGrafico6.textContent = 'Conclusão atividades do produto - Valores Absolutos';
    

    var containerGrafico6 =     document.getElementById('divGrafico6')
    containerGrafico6.classList.add('containerGrafico6');


    var imagemgrafico6 = document.createElement('img');
    imagemgrafico6.src = '../static/images/quantidadedeatividade.svg';  
    imagemgrafico6.alt = 'imagem'; 
    imagemgrafico6.classList.add('imagemgrafico6')


    containerGrafico6.appendChild(tituloGrafico6);

    var containerMenorGrafico6 = document.createElement('div');
    containerMenorGrafico6.classList.add('containerMenorGrafico6');
    containerMenorGrafico6.appendChild(imagemgrafico6)

    var containerAtividades = document.createElement('div');
    containerAtividades.classList.add('containerAtividades');


    var divQuantidadeAtividades  = document.createElement('div');
    divQuantidadeAtividades.classList.add('divQuantidadeAtividades');


    var divQuantidadeAtividadesEntreges  = document.createElement('div');
    divQuantidadeAtividadesEntreges.classList.add('divQuantidadeAtividadesEntreges');



    var divDescricaoGrafico6 = document.createElement('p');
    divDescricaoGrafico6.classList.add('divDescricaoGrafico6');
    divDescricaoGrafico6.textContent = 'Quantidade total de Atividades do Produto';

    var quantidadeAtividades = document.createElement('p');
    quantidadeAtividades.classList.add('quantidadeAtividades');
    quantidadeAtividades.textContent = totalAtividades;


    divQuantidadeAtividades.appendChild(divDescricaoGrafico6);
    divQuantidadeAtividades.appendChild(quantidadeAtividades);

    var divDescricaodetalhadaGrafico6 = document.createElement('p');
    divDescricaodetalhadaGrafico6.classList.add('divDescricaodetalhadaGrafico6');
    divDescricaodetalhadaGrafico6.textContent = 'Quantidade de Atividades Concluídas';

    var quantidadeAtividadesEntreges = document.createElement('p');
    quantidadeAtividadesEntreges.classList.add('quantidadeAtividadesEntreges');
    quantidadeAtividadesEntreges.textContent = atividadesEntregues;

    divQuantidadeAtividadesEntreges.appendChild(divDescricaodetalhadaGrafico6);
    divQuantidadeAtividadesEntreges.appendChild(quantidadeAtividadesEntreges);

    containerAtividades.appendChild(divQuantidadeAtividades);
    containerAtividades.appendChild(divQuantidadeAtividadesEntreges);
    containerMenorGrafico6.appendChild(containerAtividades);
    containerGrafico6.appendChild(containerMenorGrafico6)
}

if (document.getElementById("divGrafico6")) {
    carregarDadosCSV();
}
