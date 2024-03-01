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
function verificarCordoStatus(status) {
    let codhex;
    switch(status) {
        case 'ENTREGUE (NO PRAZO)':
            codhex = '#2FF057';
            break;
        case 'ENTREGUE (ANTES DO PRAZO DE INICIAR A ATIVIDADE)':
            codhex = '#2765C1';
            break;
        case 'ENTREGUE (COM ATRASO)':
            codhex = '#FAFE3F';
            break;
        case 'NÃO ENTREGUE (PRAZO DA ATIVIDADE NÃO INICIOU)':
            codhex = '#124A73';
            break;
        case 'NÃO ENTREGUE (ATIVIDADE AINDA NO PRAZO)':
            codhex = '#EF7070';
            break;
        case 'NÃO ENTREGUE (ATIVIDADE EM ATRASO)':
            codhex = '#E7110F';
            break;
        default:
            codhex = '#000000'; 
            break;
    }
    
    return codhex;
}
function criarConteinerEExibirGrafico(perfil, dados) {

    console.log(dados)
    var maiorStatusDeEntrega = verificarMaiorPorcentagem(perfil, dados);

    var divUsuarioId = perfil.toLowerCase().replace(/\s+/g, '-');

    var divUsuario = document.createElement('div');
    divUsuario.classList.add('divUsuario');

    divUsuario.id = divUsuarioId;
    document.getElementById('AnaliseUsuarios').appendChild(divUsuario);
    
    var nomeDoPerfil = document.createElement('p');
    nomeDoPerfil.classList.add('nomeDoPerfil');
    var texto = document.createTextNode(perfil);
    nomeDoPerfil.appendChild(texto);

    divUsuario.appendChild(nomeDoPerfil);

    var canvasGrafico = document.createElement('canvas');
    canvasGrafico.classList.add('Grafico2');

    divUsuario.appendChild(canvasGrafico);

    var porcentagemEntrega = document.createElement('h1');
    porcentagemEntrega.classList.add('porcentagemEntrega');
    porcentagemEntrega.textContent= maiorStatusDeEntrega.porcentagem+"%"

    var descricaoEntrega = document.createElement('p');
    descricaoEntrega.classList.add('descricaoEntrega');
    descricaoEntrega.textContent = "das atividades foram " + maiorStatusDeEntrega.status;
    console.log(maiorStatusDeEntrega.status)

    divUsuario.appendChild(porcentagemEntrega);
    divUsuario.appendChild(descricaoEntrega);
    
    porcentagemRestante =100-maiorStatusDeEntrega.porcentagem;


    var color= verificarCordoStatus(maiorStatusDeEntrega.status)
    
   
    var context = canvasGrafico.getContext('2d');
    var meuGrafico2 = new Chart(context, {
        type: 'doughnut',
        data: {
            datasets: [{
                data:[maiorStatusDeEntrega.porcentagem, porcentagemRestante],
                backgroundColor: [
                    color,
                    '#1E1F23',
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
                    
                    dados[perfil][(cabecalho[j].replace(/\r$/, ''))] = parseFloat(valores[j].replace('%', '').replace('"', '').replace('"', ''));
                }
            }

            callback(dados);
        })
        .catch(error => console.error('Erro ao carregar dados do CSV:', error));
}
if (document.getElementById("AnaliseUsuarios")) {
    carregarDadosEExibirGraficos();
}

