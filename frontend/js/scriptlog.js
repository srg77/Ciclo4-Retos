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

    if (respuesta.id != null){
        window.location = "bienvenida.html";
    }else{
        alert("credenciales incorrectas");
    }

}