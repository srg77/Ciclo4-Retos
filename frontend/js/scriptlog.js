$(function(){
    $("#nav-placeholder").load("nav.html");
});

function iniciarSesion() {
    if ($("#emailuser").val().length == 0 ||$("#passworduser").val().length == 0) {
        alert("Todos los campos son obligatorios");

    } else {

        emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
        if (emailRegex.test($("#emailuser").val())){
            
            $.ajax({
                url: url+"/api/user/" +$("#emailuser").val() +"/" +$("#passworduser").val(),
                type: "GET",
                dataType: "json",
                success: function (respuesta) {
                    console.log(respuesta);
                    relocate(respuesta)

                },
                error: function (xhr, status) {
                    alert("ha sucedido un problema");
                },
            });

        }
        else{
            $("#user_email").css("border", "1px solid yellow");
            $("#badEmail").css("display", "block");
            $("#badEmail").text("La direccion de correo es invalida");
        }

    }
}

function relocate(respuesta){

<<<<<<< HEAD
    if (respuesta.id != null && respuesta.type=="ADMIN"){
=======
    if (respuesta.id != null){
>>>>>>> 7bf32b50d8b31e384fc1b44c8e4e432b3871f808
        window.location = "../pages/dashboard.html";
    }else{
        alert("credenciales incorrectas");
    }

}