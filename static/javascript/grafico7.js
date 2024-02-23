function criarGrafico7(){
    var containerGrafico7 = document.createElement('div');
    containerGrafico7.classList.add('containerGrafico7');
    document.getElementById('divGrafico7').appendChild(containerGrafico7);

    var imagemgrafico7 = document.createElement('img');
    imagemgrafico7.src = '../static/images/perfilmaiortaxa.svg';  
    imagemgrafico7.alt = 'imagem'; 
    imagemgrafico7.classList.add('imagemgrafico7')

    containerGrafico7.appendChild(imagemgrafico7);

    var divDescricaoGrafico7 = document.createElement('p');
    divDescricaoGrafico7.classList.add('divDescricaoGrafico7');
    divDescricaoGrafico7.textContent = 'O perfil com maior taxa de entrega no prazo é o: ';

    containerGrafico7.appendChild(divDescricaoGrafico7);

}

if (document.getElementById("divGrafico7")) {
    /*criarGrafico7();*/
}
