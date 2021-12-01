//variable global que almacena la lista de usuarios
var listaItems;
//Función para cargar header en la página
$(function(){
    $("#nav-placeholder").load("nav.html");
});

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
    $("#tbodyUsers").empty();
    $("#tableUsers").show();
    for (var i=0; i < items.length; i++) {

        let nombreId = "botonDet"+i
        let nombreIdDelete = "botonDel"+i
        let nombreIdButtons = "buttons"+i
        let identIdUpdate = "#"+nombreId
        let idButtonGroup = "#"+nombreIdButtons
        let identIdDelete ="#"+nombreIdDelete;

        let idUser = items[i].id;
        console.log(idUser);
        let objeto = items[i];

        $("#tbodyUsers").append("<tr class='table-dark'>");
        $("#tbodyUsers").append("<td class='text-center'>"+items[i].id+"</td>");
        $("#tbodyUsers").append("<td class='text-center'>"+items[i].identification+"</td>");
        $("#tbodyUsers").append("<td class='text-center'>"+items[i].name+"</td>");
        $("#tbodyUsers").append("<td class='text-center'>"+items[i].address+"</td>");
        $("#tbodyUsers").append("<td class='text-center'>"+items[i].cellPhone+"</td>");
        $("#tbodyUsers").append("<td class='text-center'>"+items[i].email+"</td>");
        $("#tbodyUsers").append("<td class='text-center'>"+items[i].password+"</td>");
        $("#tbodyUsers").append("<td class='text-center'>"+items[i].zone+"</td>");
        $("#tbodyUsers").append("<td class='text-center'>"+items[i].type+"</td>");

        $("#tbodyUsers").append("<td id='"+nombreIdButtons+"' class='text-center'> </td>");
        //$(idButtonGroup).append("<a class=\"btn btn-primary text-center me-2\" id=\""+nombreId+"\" onclick=llenarCampos("+objeto+")>Actualizar</a>");
        //$(idButtonGroup).append("<a class=\"btn btn-primary text-center\" onclick=removeProduct("+item+")>Eliminar</a>");
        // $("#tbodyUsers").append("</td>");
        $(idButtonGroup).append("<a class=\"btn btn-primary text-center me-2\" id=\'"+nombreId+"'>Actualizar</a>");
        $(identIdUpdate).click(() => fillInformation(objeto));
        
        $(idButtonGroup).append("<a id='"+nombreIdDelete+"' class='btn btn-primary text-center'>Eliminar</a>");
        $(identIdDelete).click(() => removeUser(idUser));
    
        $("#tbodyUsers").append("</tr>");

        
    }


    // var tabla = `<table class="table table-dark table-striped" border="1">
    //                 <thead >
    //                     <tr>
    //                         <th class="text-center">Identificacion</th>
    //                         <th class="text-center">Nombre</th>
    //                         <th class="text-center">Direccion</th>
    //                         <th class="text-center">Celular</th>
    //                         <th class="text-center">Email</th>
    //                         <th class="text-center">Contraseña</th>
    //                         <th class="text-center">Zona</th>
    //                         <th class="text-center">Tipo</th>
    //                         <th class="text-center">Opciones</th>
    //                     </tr>
    //                 </thead>`;
                
                
    
    // for (var i=0; i < items.length; i++) {
    //     tabla +=`<tr>
    //                 <td class="text-center">${items[i].identification}</td>
    //                 <td class="text-center">${items[i].name}</td>
    //                 <td class="text-center">${items[i].address}</td>
    //                 <td class="text-center">${items[i].cellPhone}</td>
    //                 <td class="text-center">${items[i].email}</td>
    //                 <td class="text-center">${items[i].password}</td>
    //                 <td class="text-center">${items[i].zone}</td>
    //                 <td class="text-center">${items[i].type}</td>
    //                 <td class="text-center">
    //                     <button class="btn btn-primary text-center me-2" onclick="fillInformation(${items[i].id})" >Actualizar</button>`
    //                     tabla+=`<button class="btn btn-primary text-center" onclick="removeUser(${items[i].id})">Eliminar</button>
    //                 </td> 
    //             </tr>`;
    // }
    // tabla +=`</table>`;

    // $("#table_UserAdmin").html(tabla);
    cleanFieldsUser();

}
function fillInformation(infoItem){

    alert("A continuación modifique los campos que desea actualizar");
    // let infoItem;
    // for (const elemento of listaItems) {

    //     if(elemento.id == id){
    //         console.log(elemento.id)
    //         infoItem = elemento;
    //     }
        
    // }
    $("#idprueba").val(infoItem.id);
    $("#user_identification").val(infoItem.identification);
    $("#user_namec").val(infoItem.name);
    $("#user_adress").val(infoItem.address);
    $("#user_cellphone").val(infoItem.cellPhone);
    $("#user_email").val(infoItem.email);
    $("#user_password").val(infoItem.password);
    $("#user_zone").val(infoItem.zone);
    $("#user_type").val(infoItem.type);

    $("#btn-cambios").remove();
    $("#btn-group").append("<button id=\"btn-cambios\" class=\"btn btn-primary text-center\" type=\"button\">Guardar Cambios</button>");
    
    console.log($("#user_zone").val());

    

    console.log(checkSelect());

    // $("input").change(

        
    //     function(){

            

    //         $( this ).val();
    //         console.log($( this ).val());

    //         idInput = $("#idprueba").val();
    //         identificationInput = $("#user_identification").val();
    //         nameInput = $("#user_namec").val();
    //         addressInput = $("#user_adress").val();
    //         cellPhoneInput = $("#user_cellphone").val();
    //         emailInput = $("#user_email").val();
    //         passwordInput = $("#user_password").val();
    //         zoneInput = $("#user_zone").change(function(){return $( this ).val()});
    //         typeInput = $("#user_type").change(function(){return $( this ).val()});

            
            // userAd = {

            //     id: idInput,
            //     identification: identificationInput,
            //     name: nameInput,
            //     address: addressInput,
            //     cellPhone: cellPhoneInput,
            //     email: emailInput,
            //     password: passwordInput,
            //     zone: zoneInput,
            //     type: typeInput
            // };
    //     }
    // );

    // $("#user_zone").change(function(){
        
    //     let userAd = {

    //         id: $("#idprueba").val(),
    //         identification: $("#user_identification").val(),
    //         name: $("#user_namec").val(),
    //         address: $("#user_adress").val(),
    //         cellPhone: $("#user_cellphone").val(),
    //         email: $("#user_email").val(),
    //         password: $("#user_password").val(),
    //         zone: $("#user_zone").val(),
    //         type: $("#user_type").val()
    //     };
    //     console.log(userAd);

    //     setInterval(1000);
    //     $("#btn-cambios").click(()=> updateUser(userAd));
    // });
    

    // let userAd = {

    //     id: idInput,
    //     identification: identificationInput,
    //     name: nameInput,
    //     address: addressInput,
    //     cellPhone: cellPhoneInput,
    //     email: emailInput,
    //     password: passwordInput,
    //     zone: zoneInput,
    //     type: typeInput
    // };
    // console.log(userAd);
    
    $("#btn-cambios").click(()=> updateUser());
    
}
function checkSelect(){
    let valor;
    $("select").change(


        function(){
            console.log($( this ).val());
            valor = $( this ).val();
            if (typeof valor === 'undefined') {
                valor = "nada";
                
            } else {
                valor = $( this ).val();
            }
            
    
            // zoneInput = $("#user_zone").val();
            // typeInput = $("#user_type").val();
            // console.log(zoneInput);
            // console.log(typeInput);

            
        }
    );
    console.log("dentro del check "+valor );
    return valor
}

function updateUser(){

    let idInput = $("#idprueba").val();
    let identificationInput= $("#user_identification").val();
    let nameInput = $("#user_namec").val();
    let addressInput = $("#user_adress").val();
    let cellPhoneInput = $("#user_cellphone").val();
    let emailInput = $("#user_email").val();
    let passwordInput = $("#user_password").val();
    let zoneInput = $("#user_zone").val();
    let typeInput = $("#user_type").val();

    let userUpdate;

    userUpdate = {

        id: idInput,
        identification: identificationInput,
        name: nameInput,
        address: addressInput,
        cellPhone: cellPhoneInput,
        email: emailInput,
        password: passwordInput,
        zone: zoneInput,
        type: typeInput
    };
    
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
        contentType: "application/json",
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