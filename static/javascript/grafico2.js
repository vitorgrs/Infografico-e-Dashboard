function carregarDadosEExibirGraficos() {
    var caminhoCSV = '../data/dados_csv/tabela2.csv';
    carregarDadosCSV(caminhoCSV, function(dados) {
  
        Object.keys(dados).forEach(function(perfil) {

            if (perfil.trim() !== '') { 
                
                criarConteinerEExibirGrafico(perfil, dados[perfil]);
            }
        });
    });
}


function verificarMaiorPorcentagem(nomePerfil ,perfilDados) {
    

    var maiorPorcentagem = -1;
    var status = "";
    
    for (var chave in perfilDados) {
        if (typeof perfilDados[chave] === 'number' && perfilDados[chave] > maiorPorcentagem) {
            maiorPorcentagem = perfilDados[chave];
            status = chave;
        }
    }
    
    return { porcentagem: maiorPorcentagem, status: status };
}

function criarConteinerEExibirGrafico(perfil, dados) {

    var maiorStatusDeEntrega = verificarMaiorPorcentagem(perfil, dados);

    var containerGrafico2Id = perfil.toLowerCase().replace(/\s+/g, '-');

    var containerGrafico2 = document.createElement('div');
    containerGrafico2.classList.add('containerGrafico2');

    containerGrafico2.id = containerGrafico2Id;
    document.getElementById('divGrafico2').appendChild(containerGrafico2);


    var divNomePerfilGrafico2 =document.createElement('div');
    divNomePerfilGrafico2.classList.add('divNomePerfilGrafico2');
    var imagemdoperfil = document.createElement('img');
    imagemdoperfil.src = '../static/images/imagemperfil.svg';  
    imagemdoperfil.alt = 'imagem de Perfil'; 
    imagemdoperfil.classList.add('imagemPerfil');

    var nomeDoPerfilGrafico2 = document.createElement('p');
    nomeDoPerfilGrafico2.classList.add('nomeDoPerfilGrafico2');
    var texto = document.createTextNode(perfil);
    nomeDoPerfilGrafico2.appendChild(texto);

    divNomePerfilGrafico2.appendChild(imagemdoperfil);
    divNomePerfilGrafico2.appendChild(nomeDoPerfilGrafico2);

    

    var divContainerGrafico2 =document.createElement('div');
    divContainerGrafico2.classList.add('divContainerGrafico2');

    var canvasGrafico2 = document.createElement('canvas');
    canvasGrafico2.classList.add('Grafico2');


    var divDescricaoGrafico2 = document.createElement('p');
    divDescricaoGrafico2.classList.add('divDescricaoGrafico2');

    divDescricaoGrafico2.textContent = maiorStatusDeEntrega.porcentagem + "% das atividades foram " + maiorStatusDeEntrega.status;


    
    divContainerGrafico2.appendChild(divDescricaoGrafico2);
    divContainerGrafico2.appendChild(canvasGrafico2);
    containerGrafico2.appendChild(divNomePerfilGrafico2);
    containerGrafico2.appendChild(divContainerGrafico2);


    var context = canvasGrafico2.getContext('2d');
    var meuGrafico2 = new Chart(context, {
        type: 'doughnut',
        data: {
            datasets: [{
                data: Object.values(dados),
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
                text: 'Gráfico de Pizza - ' + perfil,
            },
        },
    });
}

function carregarDadosCSV(caminho, callback) {
    fetch(caminho)
        .then(response => response.text())
        .then(data => {
            data = data.replace(/(\d+),(\d+%)/g, '$1.$2');
         
            var linhas = data.split('\n');
         
            var cabecalho = linhas[1].split(',');

            var dados = {};
            for (var i = 2; i < linhas.length; i++) {
                var valores = linhas[i].split(',');
                var perfil = valores[0];

                dados[perfil] = {};
                for (var j = 1; j < valores.length; j++) {
                    dados[perfil][cabecalho[j]] = parseFloat(valores[j].replace('%', '').replace('"', ''));
                }
            }

            callback(dados);
        })
        .catch(error => console.error('Erro ao carregar dados do CSV:', error));
}
if (document.getElementById("divGrafico2")) {
    carregarDadosEExibirGraficos();
}

