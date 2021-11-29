function saveUser(){
    console.log("Ejecutando funcion para guardar");
    
    let userAd = {

        id: $("#idprueba").val(),
        identification: $("#user_identification").val(),
        name: $("#user_namec").val(),
        address: $("#user_adress").val(),
        cellPhone: $("#user_cellphone").val(),
        email: $("#user_email").val(),
        password: $("#user_password").val(),
        zone: $("#user_zone").val(),
        type: $("#user_type").val()
    };
    
    emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;

    console.log(userAd);
    if (validateUser(userAd)){
        if (emailRegex.test($("#user_email").val())){   
        $.ajax({
            url: url + "/api/user/new",
            type: 'POST',
            dataType: 'json',
            headers: {
                "Content-Type": "application/json"
            },
            data: JSON.stringify(userAd),
            statusCode:{
                201:function(){
                    alert('Se ha registrado el producto');
                    allUsers();
                    }
                },
            });}else{
                alert("Email Invalido");
            }  
    }else{
        alert("Error, no fue posible registrar al usuario verifique los campos digitados");
    }
}

function allUsers(){
    $("#table_UserAdmin").empty();
    $.ajax({
        url: url + '/api/user/all',
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
                    
                    <th>Identificacion</th>
                    <th>Nombre</th>
                    <th>Direccion</th>
                    <th>Celular</th>
                    <th>Email</th>
                    <th>Contraseña</th>
                    <th>Zona</th>
                    <th>Tipo</th>

                  </tr>`;
                  
    
    for (var i=0; i < items.length; i++) {
        let item= items;
        tabla +=`<tr>
                   <td>${items[i].identification}</td>
                   <td>${items[i].name}</td>
                   <td>${items[i].address}</td>
                   <td>${items[i].cellPhone}</td>
                   <td>${items[i].email}</td>
                   <td>${items[i].password}</td>
                   <td>${items[i].zone}</td>
                   <td>${items[i].type}</td>
                   <td>
                   <button onclick="updateUser(${item})">Actualizar</button>
                   <button onclick="removeUser(${items[i].id})">Eliminar</button>
                   </td> 
                </tr>`;
    }
    tabla +=`</table>`;

    $("#table_UserAdmin").html(tabla);
}

function updateUser(item){
    alert("Hola entre update :)" + item.id );
    $("#idprueba").val(item.id);
    let userAd = {
        id: $("#idprueba").val(),
        identification: $("#user_identification").val(),
        name: $("#user_namec").val(),
        adress: $("#user_adress").val(),
        cellphone: $("#user_cellphone").val(),
        email: $("#user_email").val(),
        password: $("#user_password").val(),
        zone: $("#user_zone").val(),
        type: $("#user_type").val()
    };

    console.log(userAd);
    if (validateUser(userAd)){
        $.ajax({
            url: url+"/api/user/update",
            type: 'PUT',
            dataType: 'json',
            headers: {
                "Content-Type": "application/json"
            },
            data: JSON.stringify(userAd),
            statusCode:{
                201:function(){
                    alert('Se han actualizado los datos del producto');
                }
            }
        });

    }else{
        alert("No ha sido posible actualizar al usuario");
    }
}

function removeUser(id){
    $.ajax({
        url: url+"/api/user/"+id,
        type: 'DELETE',
        dataType: 'json',
        headers: {
            "Content-Type": "application/json"
        },
        data: JSON.stringify({idUser:id}),
        statusCode:{
            204:function(){
                alert('Se ha eliminado el Usuario');
                allUsers()
            }
            },
        });
}

function validateUser(user){
    if (user.identification==="" || user.name==="" || user.email==="" || user.password===""  || user.cellphone==="" || user.zone==="" || user.type==="" || user.adress===""){
        alert("Procure no dejar campos vacíos")
        return false;
    }
    return true;
}