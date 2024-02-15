document.addEventListener('DOMContentLoaded', function() {
    var botonMostrar = document.getElementById('botonMostrar');
    var botonOcultar = document.getElementById('botonOcultar');
    var botonfondo = document.getElementById("botonfondo");
    var botonGeo = document.getElementById("botonGeo");
    var b2 = document.getElementById('b2');
    var b1 = document.getElementById('b1');
    var ubicacionElemento = document.getElementById('ubicacion');
    var colorCambiado = false;
    var botoncreditos = document.getElementById("botoncreditos");
    var map;
    var marker;

    botonMostrar.addEventListener('click', function() {
        b2.style.display = 'block';
    });

    botoncreditos.addEventListener('click', function() {
        alert("Mario Castrillo Carballo 2ºC");
    });

    botonOcultar.addEventListener('click', function() {
        b2.style.display = 'none';
    });

    function mostrarFecha() {
        var fecha = new Date();
        var fechaString = fecha.toString();
        window.alert("La fecha actual es: " + fechaString);
    }

    b1.addEventListener('mouseover', function() {
        mostrarFecha();
    });

    b2.addEventListener('mouseover', function() {
        b2.style.backgroundColor = "lightblue";
    });

    b2.addEventListener('mouseout', function() {
        b2.style.backgroundColor = "white";
    });

    botonfondo.addEventListener('click', function() {
        if (!colorCambiado) {
            b1.style.backgroundColor = "gold";
            colorCambiado = true;
        } else {
            b1.style.backgroundColor = "lightgray";
            colorCambiado = false;
        }
    });

    botonGeo.addEventListener('click', function() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
                var latitude = position.coords.latitude;
                var longitude = position.coords.longitude;
                var ubicacion = "Latitud: " + latitude + ", Longitud: " + longitude;
                ubicacionElemento.textContent = ubicacion;

                if (!map) {
                    map = L.map('mapid').setView([latitude, longitude], 13);
                    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                        attribution: '© OpenStreetMap contributors'
                    }).addTo(map);
                } else {
                    map.setView([latitude, longitude], 13);
                }

                if (marker) {
                    map.removeLayer(marker);
                }
                marker = L.marker([latitude, longitude]).addTo(map);
            }, function(error) {
                alert('Error al obtener la ubicación: ' + error.message);
            });
        } else {
            alert('No hay Geolocalización disponible');
        }
    });
});
