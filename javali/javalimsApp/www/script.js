var atual = false, map, login = 'false', xx = document.getElementById("coordenadas"), x = 0, y = 0, z = 0, zz = 0;
document.addEventListener("deviceready", function () {
    var div = document.getElementById("map");
    // Initialize the map view
    map = plugin.google.maps.Map.getMap(div);
    map.addEventListener(plugin.google.maps.event.MAP_READY, onMapReady);
}, false);
document.ready(showPosition());
function sair() {
    json = JSON.parse(localStorage.getItem('user'));
    var db = window.openDatabase('DB', '1.0', 'Banco de Dados', 200000);
    db.transaction(deletarBD, errorDeletarCB, sucessDeletarCB);
    var user = {'nome': 'Visitante', 'email': 'email@company.com', 'login': 'false'};
    localStorage.setItem('user', JSON.stringify(user));
}
function ir(pagina) {
    ate(pagina);
}
function deletarBD(tx) {
    tx.executeSql('DELETE FROM usuario where email = "' + json.email + '"');
    tx.executeSql('DELETE FROM usuario where email = "email@company.com"');
    tx.executeSql('INSERT INTO usuario(email, senha ,login) VALUES ("email@company.com", "", "false")');
}
function errorDeletarCB(err) {
    if (err.code != 0) {
        alert('Error processing SQL ' + err.code);
    }
}
function sucessDeletarCB() {
}
function sign_out() {
    sair();
    open('index.html');
    voltar();
}
/*
 google.maps.event.addDomListener(window, 'load', getLocation);
 function getLocation() {
 navigator.geolocation.getCurrentPosition(onSuccess, onError, {timeout: 30000});
 }
 function onSuccess(position) {
 var lat = position.coords.latitude;
 var lang = position.coords.longitude;
 //Google Maps
 var myLatlng = new google.maps.LatLng(lat, lang);
 var mapOptions = {zoom: 9, center: myLatlng}
 var map = new google.maps.Map(document.getElementById('map'), mapOptions);
 var marker = new google.maps.Marker({position: myLatlng, map: map});
 }
 function onError(error) {
 alert('code: ' + error.code + '\n' + 'message: ' + error.message + '\n');
 }*/
$("#logarUsuario").submit(function (e) {
    e.preventDefault();
    var e = $('#email').val();
    var s = $('#senha').val();
    if (e === undefined & s === undefined) {
        alert(e);
        alert(s);
    }
    $.ajax({
        type: "POST",
        url: "http://192.168.43.30/JavaliMS/usuario_login.php",
        data:
                $("#logarUsuario").serialize(),
        async: false,
        dataType: "json",
        success: function (json) {
            if (json.login == true) {
                alert("sucesso");
                document.getElementById('username1').innerHTML = json.email;
                document.getElementById('username2').innerHTML = json.email;
                document.getElementById('email').value = '';
                document.getElementById('senha').value = '';
            } else if (json.login == false) {
                alert(json.msg);
            }
            else {
                alert(json.msg);
            }
            Funcoes.hideLoad();
        }, error: function (xhr, e, t) {
            console.log(xhr.responseText);
            alert('Email e/ou senha incorreto(s)!');
        }
    });
});
