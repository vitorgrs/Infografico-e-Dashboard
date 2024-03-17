function moveMarker(event) {

    var marker = document.querySelector('.marker');

    

    var overlay = document.getElementById('overlay');
    var bigCircle = document.getElementById('big-circle');

    marker.style.display= 'none';
    overlay.style.display = 'block';
    bigCircle.style.display = 'block';
}

document.getElementById('marker').addEventListener('click', moveMarker);
