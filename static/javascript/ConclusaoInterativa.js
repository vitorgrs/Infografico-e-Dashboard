function moveMarker(event) {
    
    var overlay = document.getElementById('overlay');

    var divConclusao = document.getElementById('div-Conclusao');
   

    overlay.style.display = 'block';
    divConclusao.style.display = 'block';

}

document.getElementById('descricaoConclusaoAtividades').addEventListener('click', moveMarker);


