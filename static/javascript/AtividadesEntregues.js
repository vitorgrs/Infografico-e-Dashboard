function carregarDadosCSV() {
    fetch('../data/dados_csv/tabela4.csv')
        .then(response => response.text())
        .then(data => criarConteinerGrafico6(data));
}




function criarConteinerGrafico6(dataGrafico6) {
    var dadosGrafico6 = dataGrafico6.replace(/(\d+),(\d+%)/g, '$1.$2');

    const linhas = dadosGrafico6.split('\n').map(linha => linha.trim());
  
    const cabecalho = linhas.shift().split(',');
    
    let entregueAtividades = [];
    let EntreguesParciais = [];
    let naoEntreguesAtividades = [];

    linhas.forEach(linha => {
        const colunas = linha.split(',');
        const codigo = colunas[0];

        if (colunas[1] === 'X') {
            entregueAtividades.push(codigo);
        } else if (colunas[2] && colunas[2].trim() !== '') {
            EntreguesParciais.push({ codigo: codigo, porcentagem: colunas[2].trim() });
        } else {
            naoEntreguesAtividades.push(codigo);
        }
    });

    criarTabela(entregueAtividades,EntreguesParciais,naoEntreguesAtividades)
}

function criarTabela(entregueAtividades, entreguesParciais, naoEntreguesAtividades) {
    // Selecionar as divs correspondentes
    var divEntregue = document.getElementById('colunaEntregue');
    var divEmAndamento = document.getElementById('colunaEmAndamento');
    var divNaoEntregue = document.getElementById('colunaNaoEntregue');

    // Verificar o tamanho máximo para determinar o número de linhas necessárias
    var maximo = Math.max(entregueAtividades.length, entreguesParciais.length, naoEntreguesAtividades.length);

    // Adicionar códigos nas divs respectivas
    for (var i = 0; i < maximo; i++) {
        // Adicionar código para atividades entregues
        if (entregueAtividades[i]) {
            var pEntregue = criarParagrafo(entregueAtividades[i]);
            divEntregue.appendChild(pEntregue);
        }

        // Adicionar código para atividades em andamento
        if (entreguesParciais[i]) {
            var pEmAndamento = criarParagrafo(entreguesParciais[i].codigo);
            divEmAndamento.appendChild(pEmAndamento);
        }

        // Adicionar código para atividades não entregues
        if (naoEntreguesAtividades[i]) {
            var pNaoEntregue = criarParagrafo(naoEntreguesAtividades[i]);
            divNaoEntregue.appendChild(pNaoEntregue);
        }
    }
}

// Função para criar parágrafo
function criarParagrafo(texto) {
    var p = document.createElement('p');
    p.textContent = texto;
    return p;
}

if (document.getElementById("analiseAtividades")) {
    carregarDadosCSV();
}
