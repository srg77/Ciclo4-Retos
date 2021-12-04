
$("#name-user").text(userNameGlobal);

$(function(){
    $("#nav-placeholder").load("nav.html");
});

$(function(){
    getProducts();
    let urlPage = jQuery(location).attr('href');
    let userName = getParameters(urlPage);
    console.log(userName[0]);
    getInfoUser(userName[0]);
    
});
//funcion usando notación flecha. obtiene los parámetros de la url de la página actual
const getParameters = (urlPage) =>{

    //separa el string por el caracter ?
    let array = urlPage.split("?");
    //elimina el primer elemento del arreglo
    array.shift();
    let parametros=[];
    array.forEach(element => {
        console.log(element.replace("%20"," "));
        parametros.push(element.replace("%20"," "));
    });

    return parametros;
}
//función para obtener todas las ordenes
const getInfoUser = (idUser) => {
    
    $.ajax({
        url: url + '/api/user/'+idUser,
        type: 'GET',
        dataType: 'json',
        success: function(respuesta){
            console.log(respuesta);
            fillTableInfoUser(respuesta);
        },
        error: function (xhr, status) {
            alert('ha sucedido un problema');
        }
    });
}
//función para obtener todas las ordenes
const getProducts = () => {
    
    $.ajax({
        url: url + '/api/chocolate/all',
        type: 'GET',
        dataType: 'json',
        success: function(respuesta){
            fillTable(respuesta);
        },
        error: function (xhr, status) {
            alert('ha sucedido un problema');
        }
    });
}
const fillTableInfoUser = (respuesta) => {
    $("#userName").text(respuesta.name);
    $("#table-body-user").empty();
    console.log(respuesta);
    
        $("#table-body-user").append("<tr class='border-bottom'>");
        $("#table-body-user").append("<td class='text-center'>"+respuesta.identification+"</td>");
        $("#table-body-user").append("<td class='text-center'>"+respuesta.name+"</td>");
        $("#table-body-user").append("<td class='text-center'>"+respuesta.email+"</td>");
        $("#table-body-user").append("<td class='text-center'>"+respuesta.zone+"</td>");
        $("#table-body-user").append("<td class='text-center'>"+respuesta.type+"</td>");
        // $("#table-body-users").append("<td id='"+nombreIdButtons+"' class='text-center'>");
        //$(idButtonGroup).append("<a class=\"btn btn-primary text-center me-2\" id=\""+nombreId+"\" onclick=llenarCampos("+objeto+")>Actualizar</a>");
        //$(idButtonGroup).append("<a class=\"btn btn-primary text-center\" onclick=removeProduct("+item+")>Eliminar</a>");
        // $("#tbodyUsers").append("</td>");
        // $(idButtonGroup).append("<a class=\"btn btn-primary text-center me-2\" id=\'"+nombreId+"'>Agregar</a>");
        // $(identIdUpdate).click(() => fillInformation(objeto));
        
        // $(idButtonGroup).append("<a id='"+nombreIdDelete+"' class='btn btn-primary text-center'>Eliminar</a>");
        // $(identIdDelete).click(() => removeUser(item));
    
        $("#table-body-user").append("</tr>");
    
}
const fillTable = (respuesta) => {

    $("#table-body-orders").empty();
    for (var i=0; i < respuesta.length; i++) {

        let nombreIdButtons = "buttons"+i
        let nombreId = "botonDet"+i
        let nombreIdDelete = "botonDel"+i
        let idButtonGroup = "#"+nombreIdButtons
        let identIdUpdate = "#"+nombreId
        let identIdDelete ="#"+nombreIdDelete;
        
        let item = respuesta[i].reference;
        let objeto = respuesta[i];

        $("#table-body-orders").append("<tr class='border-bottom'>");
        $("#table-body-orders").append("<td class='text-center'>" + respuesta[i].reference + "</td>");
        $("#table-body-orders").append("<td class='text-center'>" + respuesta[i].category + "</td>");
        $("#table-body-orders").append("<td class='text-center col-md-2'>" + respuesta[i].description + "</td>");
        $("#table-body-orders").append("<td class='text-center'>" + respuesta[i].availability + "</td>");
        $("#table-body-orders").append("<td class='text-center'>" + respuesta[i].price + "</td>");
        $("#table-body-orders").append("<td class='text-center col-md-1'>" + respuesta[i].photography + "</td>");
        $("#table-body-orders").append("<td class='text-center'>" + respuesta[i].quantity + "</td>");
        $("#table-body-orders").append("<td id='"+nombreIdButtons+"' class='text-center'>");
        //$(idButtonGroup).append("<a class=\"btn btn-primary text-center me-2\" id=\""+nombreId+"\" onclick=llenarCampos("+objeto+")>Actualizar</a>");
        //$(idButtonGroup).append("<a class=\"btn btn-primary text-center\" onclick=removeProduct("+item+")>Eliminar</a>");
        // $("#tbodyUsers").append("</td>");
        $(idButtonGroup).append("<a class=\"btn btn-primary text-center me-2\" id=\'"+nombreId+"'>Agregar</a>");
        $(identIdUpdate).click(() => fillInformation(objeto));
        
        $(idButtonGroup).append("<a id='"+nombreIdDelete+"' class='btn btn-primary text-center'>Eliminar</a>");
        $(identIdDelete).click(() => removeUser(item));
    
        $("#table-body-orders").append("</tr>");
    }
}