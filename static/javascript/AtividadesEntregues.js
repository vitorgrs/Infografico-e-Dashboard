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
    // Selecionar o elemento tbody correspondente
    var tbody = document.getElementById('tbodyAtividades');

    // Verificar o tamanho máximo para determinar o número de linhas necessárias
    var maximo = Math.max(entregueAtividades.length, entreguesParciais.length, naoEntreguesAtividades.length);

    // Criar linhas e adicionar as células correspondentes
    for (var i = 0; i < maximo; i++) {
        var linha = document.createElement('tr');

        // Adicionar célula para atividades entregues
        var celulaEntregue = criarCelula(entregueAtividades[i] || '');
        celulaEntregue.classList.add('codigoAtividade');
        linha.appendChild(celulaEntregue);

        // Adicionar célula para atividades parciais
        var atividadeParcial = entreguesParciais[i] || {codigo: '', porcentagem: ''};
        var celulaParcial = criarCelula(atividadeParcial.codigo);
        celulaParcial.classList.add('codigoAtividade');
        linha.appendChild(celulaParcial);

        // Adicionar célula para atividades não entregues
        var celulaNaoEntregue = criarCelula(naoEntreguesAtividades[i] || '');
        celulaNaoEntregue.classList.add('codigoAtividade');
        linha.appendChild(celulaNaoEntregue);

        // Adicionar linha ao tbody
        tbody.appendChild(linha);
    }
}

function criarCelula(texto) {
    var celula = document.createElement('td');
    celula.textContent = texto;
    return celula;
}

if (document.getElementById("analiseAtividades")) {
    carregarDadosCSV();
}
