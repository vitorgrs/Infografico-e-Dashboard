function carregarDadosCSV() {
    fetch('../data/dados_csv/tabela2.csv')
        .then(response => response.text())
        .then(data => criarConteinerGrafico5(data));
}


function criarConteinerGrafico5(datagrafico5) {
    var dadosgrafico5 =datagrafico5.replace(/(\d+),(\d+%)/g, '$1.$2');
    

    const linhas = dadosgrafico5.trim().split('\n');
    

    const cabecalho = linhas[1].split(',');
   
    
    const porcentagensPorPerfil = {};

    
    for (var i = 2; i < linhas.length; i++) {
     
        const valores = linhas[i].split(',');
    
       
        const perfil = valores[0];
        
        
        for (var j = 1; j < valores.length; j++) {
           
            const statusEntrega = cabecalho[j];
           
            
            var porcentagem= valores[j] ? parseFloat(valores[j].replace('%', '').replace('"', '').replace('"', '')) : 0;
           
           
            if (!porcentagensPorPerfil[perfil]) {
                porcentagensPorPerfil[perfil] = {};
            }

            porcentagensPorPerfil[perfil][statusEntrega] = porcentagem;
            
        }
        
    }

    const porcentagensPorStatus = {};

    for (const perfil in porcentagensPorPerfil) {

        for (const status in porcentagensPorPerfil[perfil]) {
            const valorporcentagem = porcentagensPorPerfil[perfil][status];
            
           
            if (!porcentagensPorStatus[status] || valorporcentagem > porcentagensPorStatus[status].porcentagem) {

                porcentagensPorStatus[status] = { perfil, porcentagem: valorporcentagem };
            }
        }
    }
    /*for (const status in porcentagensPorStatus) {
        const { perfil, porcentagem } = porcentagensPorStatus[status];

        console.log(`O perfil com maior ${status} é o: ${perfil} com ${porcentagem}%`);
    }*/

  
        
    

  
  

    var containerGrafico5 = document.createElement('div');
    containerGrafico5.classList.add('containerGrafico5');
    document.getElementById('divGrafico5').appendChild(containerGrafico5);

    var imagemgrafico5 = document.createElement('img');
    imagemgrafico5.src = '../static/images/perfilmaiortaxa.svg';  
    imagemgrafico5.alt = 'imagem'; 
    imagemgrafico5.classList.add('imagemgrafico5')

    containerGrafico5.appendChild(imagemgrafico5);

    var divDescricaoGrafico5 = document.createElement('p');
    divDescricaoGrafico5.classList.add('divDescricaoGrafico5');
    divDescricaoGrafico5.textContent = 'O perfil com maior taxa de entrega no prazo é o: ';



    const statusExibido = "ENTREGUE (NO PRAZO)";
    let maiorTaxa = 0;
    let perfilComMaiorTaxa = "";

    for (const perfil in porcentagensPorPerfil) {
        const taxa = porcentagensPorPerfil[perfil][statusExibido];
        if (taxa > maiorTaxa) {
            maiorTaxa = taxa;
            perfilComMaiorTaxa = perfil;
        }
    }


    var nomeDoPerfilGrafico5 = document.createElement('p');
    nomeDoPerfilGrafico5.classList.add('nomeDoPerfilGrafico5');
    nomeDoPerfilGrafico5.textContent = perfilComMaiorTaxa;

    var divDescricaodetalhadaGrafico5 = document.createElement('p');
    divDescricaodetalhadaGrafico5.classList.add('divDescricaodetalhadaGrafico5');
    divDescricaodetalhadaGrafico5.textContent = `com ${maiorTaxa}% de entregas no prazo feitas.`;

    containerGrafico5.appendChild(divDescricaoGrafico5);
    containerGrafico5.appendChild(nomeDoPerfilGrafico5);
    containerGrafico5.appendChild(divDescricaodetalhadaGrafico5);
}
if (document.getElementById("divGrafico5")) {
    carregarDadosCSV();
}


