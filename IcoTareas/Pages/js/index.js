

var Materia = {
    id: null,
    Nombre: null
}


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

function SQL(Query)
{
    db.transaction(Query, ErrorDB);
}

function insertTask(tx) {
    tx.executeSql('CREATE TABLE IF NOT EXISTS MATERIAS (id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, materia)');

    var _materia = $('#fMaterias').val();

    tx.executeSql('INSERT INTO MATERIAS (materia) VALUES("' + _materia + '")');
}

function UpdateMateria(tx) {
    tx.executeSql('UPDATE prueba.MATERIAS SET materia=' + Materia.Nombre + ' WHERE id=' + Materia.id + '');
}

function ErrorDB(error) {
    alert("Error: " + error);
}


function SelectTask(tx){
    tx.executeSql('SELECT * FROM MATERIAS',[], querySuccess, ErrorDB);
}

function querySuccess(tx,result){
    $('#_materias').empty();
    for (var i=0; i<result.rows.length;i++) {
        $('#_materias').append('<li><a  href="javascript:DetalleMateria(' + result.rows.item(i).id + ',\'' + result.rows.item(i).materia + '\');" data-rel="dialog">' + result.rows.item(i).materia + '</a></li>').listview('refresh');
    }
    }

function DetalleMateria(idMateria, NombreMateria)
{
    Materia.id = idMateria;
    Materia.Nombre = NombreMateria;


    $.mobile.changePage('#DetalleMateria', { transition: 'pop', role: 'dialog' });

    
}




$(document).on("pagebeforeshow", "#ConsultaMaterias",

            function () {
                SQL(SelectTask);

            });


//Cargar pagina 
$(document).on("pagebeforeshow", "#Materias",
    function () {
        $("#fMaterias").text("");

    });



// inicia pagina DetalleMateria
$(document).on("pagebeforeshow", "#DetalleMateria",

            function () {
               $('#idMateria').val(Materia.id);
               $('#NombreMateria').val(Materia.Nombre);

               $("#btnGuardar").click(function (event) {

                   //UPDATE TABLA MATERIAS
                   SQL(UpdateMateria);

               });


            });
  