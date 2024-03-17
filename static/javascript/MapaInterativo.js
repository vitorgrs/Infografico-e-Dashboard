function moveMarker(event) {

    var marker = document.querySelector('.marker');

    
    var overlay = document.getElementById('overlay');
    var bigCircle = document.getElementById('big-circle');

    marker.style.display= 'none';
    overlay.style.display = 'block';
    bigCircle.style.display = 'block';
}

var p = document.getElementById('myP');
var div = document.querySelector('.descricaoConclusaoAtividades');

function adicionaP(event) {    
    var text = document.createTextNode('Lorem ipsum dolor sit amet consectetur adipisicing elit. Error ut harum facere quos, eius dolorem consequuntur consequatur eveniet cumque nam numquam voluptas modi aspernatur ab voluptatibus nobis alias sint corrupti!');

    p.appendChild(text);

    p.className = "fade-in";
    this.removeEventListener('click', handler);
}

div.addEventListener('click', adicionaP);
document.getElementById('marker').addEventListener('click', moveMarker);
