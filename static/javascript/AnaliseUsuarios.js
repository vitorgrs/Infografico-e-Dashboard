let primeiroConteiner = true;
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

    var divUsuario = document.createElement('div');

    

    if (primeiroConteiner) {
        divUsuario.classList.add('carousel-item2'); 
        divUsuario.classList.add('active'); 
        primeiroConteiner = false; 
    }else{
        divUsuario.classList.add('carousel-item2');
    }

    document.getElementById('carousel2').appendChild(divUsuario);
    

    var graficoUsuario = document.createElement('div');
    graficoUsuario.classList.add('Grafico2');
    var canvasGrafico = document.createElement('canvas');
    canvasGrafico.classList.add('Grafico2');
    graficoUsuario.appendChild(canvasGrafico);
    divUsuario.appendChild(graficoUsuario);

    var nomeDoPerfil = document.createElement('p');
    nomeDoPerfil.classList.add('nomeDoPerfil');
    var texto = document.createTextNode(perfil);
    nomeDoPerfil.appendChild(texto);



    var porcentagemEntrega = document.createElement('h1');
    porcentagemEntrega.classList.add('porcentagemEntrega');
    porcentagemEntrega.textContent= maiorStatusDeEntrega.porcentagem+"%"
    

    var descricaoEntrega = document.createElement('p');
    descricaoEntrega.classList.add('descricaoEntrega');
    descricaoEntrega.textContent = "das atividades desse perfil são " + maiorStatusDeEntrega.status;
    
    var divDescricaoUsuario = document.createElement('div');
    divDescricaoUsuario.classList.add('divDescricaoUsuario');

    divDescricaoUsuario.appendChild(nomeDoPerfil);
    divDescricaoUsuario.appendChild(porcentagemEntrega);
    divDescricaoUsuario.appendChild(descricaoEntrega);
    divUsuario.appendChild(divDescricaoUsuario);

    porcentagemRestante =100-maiorStatusDeEntrega.porcentagem;

   
    
   
    var context = canvasGrafico.getContext('2d');
    var meuGrafico2 = new Chart(context, {
        type: 'doughnut',
        data: {
            datasets: [{
                data:[maiorStatusDeEntrega.porcentagem, porcentagemRestante],
                backgroundColor: [
                    '#00B4FE',
                    '#1A40F2',
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
        const UsuariosProntos = new Event('UsuariosProntos');
        document.dispatchEvent(UsuariosProntos);

}







if (document.getElementById("carousel2")) {
document.addEventListener('UsuariosProntos', () => {
    const scriptCarrosel = document.createElement('script');
    scriptCarrosel.src = '../static/javascript/carrosel2.js'; 

    
    scriptCarrosel.onload = function() {
    
       
        carrosel2();
    };

  
    document.body.appendChild(scriptCarrosel);
});


carregarDadosEExibirGraficos();
}