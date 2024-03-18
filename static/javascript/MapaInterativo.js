function moveMarker(event) {

    var marker = document.querySelector('.marker');

    
    var overlay = document.getElementById('overlay');
    var bigCircle = document.getElementById('big-circle');
    var marcadorInrterativo =   document.getElementById('markerInterativo');


    marcadorInrterativo.style.display = 'block';
    marcadorInrterativo.style.zIndex = '999';
    marcadorInrterativo.style.transform = 'translate(-90%, -3%)';
    marker.style.display= 'none';
    overlay.style.display = 'block';
    bigCircle.style.display = 'block';

}

document.getElementById('marker').addEventListener('click', moveMarker);
document.getElementById('markerInterativo').style.display="none";

