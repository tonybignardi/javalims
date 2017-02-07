document.addEventListener('deviceready', onDeviceReady, false);
var db = window.openDatabase('javalimsbd', '1.0', 'Banco de Dados', 200000);
function onDeviceReady() {
    db.transaction(populateBD, errorCB, sucessCB);
}
function populateBD(tx) {
    tx.executeSql('CREATE TABLE IF NOT EXISTS usuario(id INTEGER PRIMARY KEY AUTOINCREMENT, email TEXT, senha TEXT,login TEXT)');
    tx.executeSql('CREATE TABLE IF NOT EXISTS registros(id INTEGER PRIMARY KEY AUTOINCREMENT, registroAnimalGeoReferencia TEXT, registroAnimalDataHora datetime, registroAnimalObs TEXT, registroAnimalFoto TEXT, registroAnimalQtd INTEGER, registroAnimalSexo TEXT, registroAnimalTempoVida TEXT , usuarioEmail TEXT, animal TEXT, situacaoAnimal TEXT)');
}
function errorCB(err) {
    if (err.code != 0) {
        alert('Error processing SQL ' + err.code);
    }
}
function sucessCB() {
    db.transaction(queryDB, errorCB);
}
function queryDB(tx) {
    tx.executeSql('SELECT * FROM usuario', [], querySucess, errorCB);
}
function querySucess(tx, result) {
    $('#usuarioList').empty();
    $.each(result.rows, function (index) {
        var row = result.rows.item(index);
        $('#usuarioList').append('<li>Usuario: ' + row['id'] + '</h3><br><br><p class="ui-li-desc">Email: ' + row['email'] + '</p><p class="ui-li-desc">Senha: ********</p><p class="ui-li-desc">Login: ' + row['login'] + '</p></li>');
    });
    $('#usuarioList').listview();
}