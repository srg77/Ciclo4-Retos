var listaItems;//variable global que almacena la lista de usuarios
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
                    alert('Cuenta creada de forma correcta');
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
            listaItems = respuesta;
        },
        error: function (xhr, status) {
            alert('ha sucedido un problema');
        }
    });
}

function showUsers(items){
    var tabla = `<table class="table table-dark table-striped" border="1">
                    <thead >
                        <tr>
                            <th class="text-center">Identificacion</th>
                            <th class="text-center">Nombre</th>
                            <th class="text-center">Direccion</th>
                            <th class="text-center">Celular</th>
                            <th class="text-center">Email</th>
                            <th class="text-center">Contraseña</th>
                            <th class="text-center">Zona</th>
                            <th class="text-center">Tipo</th>
                            <th class="text-center">Opciones</th>
                        </tr>
                    </thead>`;
                
                
    
    for (var i=0; i < items.length; i++) {
        tabla +=`<tr>
                    <td class="text-center">${items[i].identification}</td>
                    <td class="text-center">${items[i].name}</td>
                    <td class="text-center">${items[i].address}</td>
                    <td class="text-center">${items[i].cellPhone}</td>
                    <td class="text-center">${items[i].email}</td>
                    <td class="text-center">${items[i].password}</td>
                    <td class="text-center">${items[i].zone}</td>
                    <td class="text-center">${items[i].type}</td>
                    <td class="text-center">
                        <button class="btn btn-primary text-center me-2" onclick="fillInformation(${items[i].id})" >Actualizar</button>`
                        tabla+=`<button class="btn btn-primary text-center" onclick="removeUser(${items[i].id})">Eliminar</button>
                    </td> 
                </tr>`;
    }
    tabla +=`</table>`;

    $("#table_UserAdmin").html(tabla);
    cleanFieldsUser();

}
function fillInformation(id){

    alert("A continuación modifique los campos que desea actualizar");
    let infoItem;
    for (const elemento of listaItems) {

        if(elemento.id == id){
            console.log(elemento.id)
            infoItem = elemento;
        }
        
    }
    $("#idprueba").val(infoItem.id);
    $("#user_identification").val(infoItem.identification);
    $("#user_namec").val(infoItem.name);
    $("#user_adress").val(infoItem.address);
    $("#user_cellphone").val(infoItem.cellPhone);
    $("#user_email").val(infoItem.email);
    $("#user_password").val(infoItem.password);
    $("#user_zone").val(infoItem.zone);
    $("#user_type").val(infoItem.type);

    
    $("#btn-group").append("<button id=\"btn-cambios\" class=\"btn btn-primary text-center\" type=\"button\">Guardar Cambios</button>");
    

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
    console.log(userAd)
    $("#btn-cambios").click(()=> updateUser(userAd));
}

function updateUser(userUpdate){

    console.log(userUpdate);
    if (validateUser(userUpdate)){
        $.ajax({
            url: url+"/api/user/update",
            type: 'PUT',
            dataType: 'json',
            headers: {
                "Content-Type": "application/json"
            },
            data: JSON.stringify(userUpdate),
            statusCode:{
                201:function(){
                    alert('Usuario editado');
                    allUsers();
                }
            }
        });

    }else{
        alert("Usuario no editado");
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
                alert('Usuario borrado de la BD');
                allUsers()
            }
            },
        });
}
function cleanFieldsUser(){
    $("#idprueba").val("");
    $("#user_identification").val("");
    $("#user_namec").val("");
    $("#user_adress").val("");
    $("#user_cellphone").val("");
    $("#user_email").val("");
    $("#user_password").val("");
    $("#user_zone").val("");
    $("#user_type").val("");
}

function validateUser(user){
    if (user.identification==="" || user.name==="" || user.email==="" || user.password===""  || user.cellphone==="" || user.zone==="" || user.type==="" || user.adress===""){
        alert("Procure no dejar campos vacíos")
        return false;
    }
    return true;
}