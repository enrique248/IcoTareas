




db = null;

$(document).ready(function onDeviceReady() {
    //conectar base de datos
    db = window.openDatabase('basededatos', '1.0', 'prueba', 1000000);
});

function AgregarMaterias() {
    $.mobile.changePage('#Materias', { transition: 'pop', role: 'dialog' });
}
function ConsultarMaterias() {
    $.mobile.changePage('#ConsultaMaterias', { transition: 'pop', role: 'dialog' });
}

function onInsert()
{
    db.transaction(insertTask, ErrorDB);
}

function onSelectt(){
    db.transaction(SelectTask,ErrorDB);
}

function SelectTask(tx){
    tx.executeSql('SELECT * FROM MATERIAS',[], querySuccess, ErrorDB);
}

function querySuccess(tx,result){
    $('#_materias').empty();
    for (var i=0; i<result.rows.length;i++) {
        $('#_materias').append('<li><a  href="javascript:DetalleMateria(' + result.rows.item(i).id + ');" data-rel="dialog">' + result.rows.item(i).materia + '</a></li>').listview('refresh');
    }
    }

function DetalleMateria(idMateria)

    SELECT * FROM MATERIAS where id = idMateria 

function insertTask(tx) {
    tx.executeSql('CREATE TABLE IF NOT EXISTS MATERIAS (id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, materia)');

    var _materia = $('#fMaterias').val();

    tx.executeSql('INSERT INTO MATERIAS (materia) VALUES("' + _materia + '")');
}

function ErrorDB(error) {
    alert("Error: " + error);
}




$(document).on("pagebeforeshow", "#ConsultaMaterias",

            function () {
                onSelectt();

            });


//Cargar pagina 
$(document).on("pagebeforeshow", "#Materias",
    function () {
        $("#fMaterias").text("");

    });
  