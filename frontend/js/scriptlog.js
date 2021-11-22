//Manejador GET
function traerInfoUser() {
    $.ajax({
        url: "http://localhost:8080/api/user/all",
        type: "GET",
        datatype: "JSON",
        success: function (response) {
            console.log(response);
        }
    });
}

//Manejador GET consulta Email
function consultarEmail(emailUser) {
    var elemento = {
        email: emailUser
    }

    var dataToSend = JSON.stringify(elemento);
    console.log(dataToSend);
    $.ajax(
        {
            dataType: 'JSON',
            data: dataToSend,
            url: "http://localhost:8080/api/user/" + email,
            type: 'GET',
            contentType: "application/JSON",
            success: function (response) {
                console.log(response);
                alert("Email Existente")
            },

            error: function (jqXHR, textStatus, errorThrown) {
                alert("Email No Existente")
            }
        });
}

function iniciarSesion() {
    if($("#emailuser").val().length == 0 || $("#passworduser").val().length == 0){
        alert("Todos los campos son obligatorios")
     }else{
             let elemento = {
                 email: $("#emailuser").val(),
                 password: $("#passworduser").val(),
             }
 
             let dataToSend = JSON.stringify(elemento);
             console.log(elemento);
 
             $.ajax({
                 type: "POST",
                 contentType: "application/json",
                 url: "http://localhost:8080/api/user/" + email + "/" + password,
                 data: dataToSend,
                 datatype: 'json',
    })
   }if (elemento != false) {
    window.location="inicio.html"
   }else{
    alert("Bienvenido usuario");
   }

}

