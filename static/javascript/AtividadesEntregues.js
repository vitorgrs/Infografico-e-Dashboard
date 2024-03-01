function carregarDadosCSV() {
    fetch('../data/dados_csv/tabela4.csv')
        .then(response => response.text())
        .then(data => criarConteinerGrafico6(data));
}




function criarConteinerGrafico6(dataGrafico6){
    var dadosGrafico6 =dataGrafico6.replace(/(\d+),(\d+%)/g, '$1.$2');

    const linhas = dadosGrafico6.split('\n').map(linha => linha.trim());
    
  
    const cabecalho = linhas.shift().split(',');

    let atividadesEntregues = 0;


    const statusPorCodigo = {};


    linhas.forEach(linha => {
        
        const colunas = linha.split(',');

        const codigo = colunas[0];

        
        if (!statusPorCodigo[codigo]) {
            statusPorCodigo[codigo] = {
                entregues: 0
            };
        }

        
        statusPorCodigo[codigo].total++;

       
        if (colunas[1] === 'X') {
            
            statusPorCodigo[codigo].entregues++;
           
            atividadesEntregues++;
        }
    });

    
    criarGrafico6(atividadesEntregues);
}
function criarGrafico6(atividadesEntregues){

   var atividadesEntregue =document.getElementById("atividadesEntregue")
   
   var atividadesEmAndamento =document.getElementById("atividadesEmAndamento")

   var atividadesNaoEntregue =document.getElementById("atividadesNaoEntregue")



   


    var quantidadeAtividadesEntreges = document.createElement('td');
    quantidadeAtividadesEntreges.classList.add('quantidadeAtividadesEntreges');
    quantidadeAtividadesEntreges.textContent = codigo;

    var quantidadeAtividadesEmAndamento = document.createElement('td');
    quantidadeAtividadesEmAndamento.classList.add('quantidadeAtividadesEmAndamento');
    quantidadeAtividadesEmAndamento.textContent = codigo;

    var quantidadeAtividadesNaoEntreges = document.createElement('td');
    quantidadeAtividadesNaoEntreges.classList.add('quantidadeAtividadesNaoEntreges');
    quantidadeAtividadesNaoEntreges.textContent = codigo;

   
}

if (document.getElementById("analiseAtividades")) {
    carregarDadosCSV();
}
