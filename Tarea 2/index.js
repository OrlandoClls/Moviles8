var firebaseConfig = {
    apiKey: "AIzaSyDz3f3SE_Cb4HNdfQ8ihInVf6T2McRPJ84",
  authDomain: "suanik-project.firebaseapp.com",
  databaseURL: "https://suanik-project-default-rtdb.firebaseio.com",
  projectId: "suanik-project",
  storageBucket: "suanik-project.appspot.com",
  messagingSenderId: "1039841495476",
  appId: "1:1039841495476:web:544ea036327074ddfecae1",
  measurementId: "G-X5WXLLH4M4"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);


function resetFields(){
    document.getElementById("Input1").value='';
    document.getElementById("Input2").value='';
    document.getElementById("Input3").value='';
    document.getElementById("Input4").value='selecciona';
    document.getElementById("Input5").value='';
    document.getElementById("Input6").value='selecciona';
    document.getElementById("Input7").value='selecciona';
}
function createR() {
    //document.getElementById("Input1").disabled = false;
    //Guardo los datos capturados usando el id de cada control
    var id = document.getElementById("Input1").value;
    var nombre = document.getElementById("Input2").value;
    var genero = document.getElementById("Input3").value;
    var plataforma = document.getElementById("Input4").value;
    var lanzamiento = document.getElementById("Input5").value;
    var movil = document.getElementById("Input6").value;
    var multijugador = document.getElementById("Input7").value;

    //validaciones
    if (id.length > 0) {
        //creo un objeto que guarda los datos
        var juego = {
            id, 
            nombre,
            genero,
            plataforma,
            lanzamiento,
            movil,
            multijugador
        }

        

        firebase.database().ref('Juegos/' + id).update(juego).then(() => {
           resetFields();
        }).then(()=>{
           read();
        });

        swal("Listo!", "Agregado correctamente", "success");

        
    } 
    else {
        swal("Error", "Llena todos los campos","warning");
    }

    document.getElementById("Input1").disabled = false;
        //firebase.database().ref('users/' + userId).set({
    //    username: name,
    //    email: email,
    //    profile_picture : imageUrl
    //  });
    //https://firebase.google.com/docs/database/web/read-and-write?hl=es

  
    //Esto se usa cuando no tienen un id/matricula y Firebase les genera una
    //automaticamente
    //const key = firebase.database().ref().child('Alumnos').push().key;
    //data[`Alumnos/${key}`]= alumno;
    //firebase.database().ref().update(data).then(()=>{
    //  alert('Agregado exitosamente');
    //})
}

function read(){
    document.getElementById("Table1").innerHTML='';

    var ref = firebase.database().ref('Juegos');
/**   
   ref.on('value', function(snapshot) {
        snapshot.forEach(row=>{
            printRow(row.val());
        })
    });
 */
   
    ref.on("child_added", function(snapshot) {
        printRow(snapshot.val());
    });

}

function printRow(juego){
    
    if(juego!=null){
        var table = document.getElementById("Table1"); 

        //creamos un nuevo elemento en la tabla en la ultima posicion
        var row = table.insertRow(-1);

        //Insertamos cada una de las celdas/columnas del registro
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        var cell4 = row.insertCell(3);
        var cell5 = row.insertCell(4);
        var cell6 = row.insertCell(5);
        var cell7 = row.insertCell(6);
        var cell8 = row.insertCell(7);
        var cell9 = row.insertCell(8);
        
        //Agregamos la informacion a cada una de las columnas del registro
        cell1.innerHTML = juego.id;
        cell2.innerHTML = juego.nombre; 
        cell3.innerHTML = juego.genero;
        cell4.innerHTML = juego.plataforma;
        cell5.innerHTML = juego.lanzamiento;
        cell6.innerHTML = juego.movil;
        cell7.innerHTML = juego.multijugador; 
        cell8.innerHTML = `<button type="button" class="btn btn-danger" onClick="deleteR(${juego.id})">Eliminar</button>`;
        cell9.innerHTML = '<button type="button" class="btn btn-success" onClick="seekR('+juego.id+')">Modificar</button>';
    }
}

function deleteR(id){
    firebase.database().ref('Juegos/' + id).set(null).then(() => {
      read();
    }).then(()=>{
       swal("Listo!", "Eliminado correctamente", "success");
    });
}

function seekR(id){
    var ref = firebase.database().ref('Juegos/' + id);
    ref.on('value', function(snapshot) {
      updateR(snapshot.val());
    });
}

function updateR(juego){
    if(alumno!=null)
    {
        document.getElementById("Input1").value=juego.id;
        document.getElementById("Input1").disabled = true;
        document.getElementById("Input2").value=juego.nombre;
        document.getElementById("Input3").value=juego.genero;
        document.getElementById("Input4").value=juego.plataforma;
        document.getElementById("Input5").value=juego.lanzamiento;
        document.getElementById("Input6").value=juego.movil;
        document.getElementById("Input7").value=juego.multijugador;
    }
}


//Para consulta de carrera
function readQ(){
    document.getElementById("Table2").innerHTML='';
    var c = document.getElementById("Input5").value;

    var ref = firebase.database().ref("Juegos");
    ref.orderByChild("genero").equalTo(c).on("child_added", function(snapshot) {
        printRowQ(snapshot.val());
    });

}


function printRowQ(juego){

    var table = document.getElementById("Table2"); 
    
    //creamos un nuevo elemento en la tabla en la ultima posicion
    var row = table.insertRow(-1);

    //Insertamos cada una de las celdas/columnas del registro
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    var cell5 = row.insertCell(4);
    var cell6 = row.insertCell(5);
    var cell7 = row.insertCell(6);
    
    //Agregamos la informacion a cada una de las columnas del registro
    cell1.innerHTML = juego.id;
    cell2.innerHTML = juego.nombre; 
    cell3.innerHTML = juego.genero;
    cell4.innerHTML = juego.plataforma;
    cell5.innerHTML = juego.lanzamiento;
    cell6.innerHTML = juego.movil;
    cell7.innerHTML = juego.multijugador; 
   
}