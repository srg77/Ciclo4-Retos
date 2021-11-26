// $(document).ready(function() {
//     // checkUser() //Consulta de usuarios
// })

function registerUser(){
    let user = {
        
        email: $("#user_email").val(),
        password: $("#user_password").val(),
        name: $("#user_name").val()
    };
    
    if (validateUser(user)){
        
        emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
        if (emailRegex.test($("#user_email").val())){
            $.ajax({
    
                //url asignar de acuerdo a cada maquina
                url: url+'/api/user/new',
                type: 'POST',
                data: JSON.stringify(user),
                contentType  : "application/json;charset-UTF-8",
                dataType: 'json',
                
                success      :  function(response){
                                    console.log(response);
                                    alert("Cuenta creada de forma correcta");
                                    cleanFieldsUser();
                },
                error       :   function(xhr,status){
                                    console.log(status);
                                    alert("No fue posible crear la cuenta, el usuario ya existe");
                                    cleanFieldsUser();
    
                }
            });

        }else {
            $("#user_email").css("border", "1px solid yellow");
            $("#badEmail").css("display", "block");
            $("#badEmail").text("La direccion de correo es invalida");
    
        }

    }
        
    
    
   
}



function checkUser(){
    $("#table_User").empty();
    $.ajax({
        url: url+'/api/user/all',
        type: 'GET',
        dataType: 'json',
        success: function(respuesta){
            showUsers(respuesta);
        },
        error: function (xhr, status) {
            alert('ha sucedido un problema');
        }
    });
}

function showUsers(items){
    var tabla = `<table border="1">
                  <tr>
                    
                    <th>Nombre</th>
                    <th>Correo</th>
                    
                    
                  </tr>`;
                  
    
    for (var i=0; i < items.length; i++) {
        tabla +=`<tr>
                   <td>${items[i].name}</td>
                   <td>${items[i].email}</td>
                   <td>
                        <a href="inicio.html?id=${items[i].idUser}">
                   </td> 
                </tr>`;
    }
    tabla +=`</table>`;

    $("#table_User").html(tabla);
}

/**
 * 
 * @param {type} id
 * @returns {undefined}
 */
function checkUserById(id){
    $.ajax({
        url: url+ ""+id,
        type: 'GET',
        dataType: 'json',
        success: function(user){
            console.log(user);
            showUniqueUser(user);
        },
        error: function (xhr, status) {
            alert('ha sucedido un problema');
        }
    });
}
/**
 * 
 * @param {User} item
 * @returns {undefined}
 */
function showUniqueUser(item) {
    $("#id_user").val(item.idUser);
    $("#user_name").val(item.name);
    $("#user_email").val(item.email);
    
}


function updateUser(){

    let user = {
        idUser: $("#user_id").val(),
        name: $("#user_name").val(),
        email: $("#user_email").val(),
        password: $("#user_password").val()
    };
    console.log(user);
    if (validateUser(user)){
        $.ajax({
            url: url+"",
            type: 'PUT',
            dataType: 'json',
            headers: {
                "Content-Type": "application/json"
            },
            data: JSON.stringify(user),
            statusCode:{
                201:function(){
                    alert('Se han actualizado los datos del usuario');
                    window.location.assign('inicio.html');
                }
            }
        });

        }
}

function removeUser(id){
    let opc = confirm('¿Está seguro que desea eliminar a ese usuario?')
    if(opc){
        $.ajax({
            url: url+""+id,
            type: 'DELETE',
            dataType: 'json',
            headers: {
                "Content-Type": "application/json"
            },
            data: JSON.stringify({idUser:id}),
            statusCode:{
                204:function(){
                    alert('Se ha eliminado el usuario');
                    checkUser()
                }
            },
        });
    }

}

function validateUser(user){
    if (user.name==="" || user.email==="" || user.password===""){
        alert("Procure no dejar campos vacíos")
        return false;
    }else if (user.name.length>80){
        alert('Nombre demasiado extenso. Solamente puede tener hasta 80 caracteres')
        return false;
    }
    else if (user.password.length>50){
        alert('Su contraseña es demasiado extensa. Solamente puede tener hasta 50 caracteres')
        return false;
    }
    else if (user.email.length>50){
        alert('Su correo es demasiado extenso. Solamente puede tener hasta 50 caracteres')
        return false;
    }
    return true;
}

function cleanFieldsUser(){
    $("#user_name").val('');
    $("#user_email").val('');
    $("#user_password").val('')
}