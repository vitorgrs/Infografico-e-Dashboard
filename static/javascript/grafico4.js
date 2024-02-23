function carregarDadosEExibirGraficos() {
    var caminhoCSV = '../data/dados_csv/tabela2.csv';
    carregarDadosCSV(caminhoCSV, function(dados) {
  
        Object.keys(dados).forEach(function(perfil) {

           
            criarConteinerGrafico5(perfil, dados[perfil]);
        });
    });
}


function  criarGrafico4(){

    var containerGrafico4 = document.createElement('div');
    containerGrafico4.classList.add('containerGrafico4');
    document.getElementById('divGrafico4').appendChild(containerGrafico4);

    var divmMaiorGrafico4 = document.createElement('div');
    divmMaiorGrafico4.classList.add('divmMaiorGrafico4');


    var imagemgrafico4 = document.createElement('img');
    imagemgrafico4.src = '../static/images/imagemgrafico4.svg';  
    imagemgrafico4.alt = 'imagem'; 
    imagemgrafico4.classList.add('imagemgrafico4')

    var tituloGrafico4 = document.createElement('p');
    tituloGrafico4.classList.add('tituloGrafico4');
    tituloGrafico4.textContent = 'Entrega de Atividade Mais Eficiente';

    divmMaiorGrafico4.appendChild(imagemgrafico4)
    divmMaiorGrafico4.appendChild(tituloGrafico4)
    containerGrafico4.appendChild(divmMaiorGrafico4)
    

    var divDescricaoGrafico4 = document.createElement('p');
    divDescricaoGrafico4.classList.add('divDescricaoGrafico4');
    divDescricaoGrafico4.textContent = 'A atividade que teve o maior aproveitamento de tempo foi a atividade:';

    var atividadeMaiorAproveitamento = document.createElement('p');
    atividadeMaiorAproveitamento.classList.add('atividadeMaiorAproveitamento');
    atividadeMaiorAproveitamento.textContent = ' AM_1_6 ';


    var divDescricaodetalhadaGrafico4 = document.createElement('p');
    divDescricaodetalhadaGrafico4.classList.add('divDescricaodetalhadaGrafico4');
    divDescricaodetalhadaGrafico4.textContent = 'Entregou 25 dias antes do fim do prazo';

    containerGrafico4.appendChild(atividadeMaiorAproveitamento);
    containerGrafico4.appendChild(divDescricaoGrafico4);
    containerGrafico4.appendChild(divDescricaodetalhadaGrafico4);
}
if (document.getElementById("divGrafico4")) {
    criarGrafico4();
}
