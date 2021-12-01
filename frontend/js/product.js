
$(function(){
    $("#nav-placeholder").load("nav.html");
  });
function validateProduct(userAd){
    return true;
}
function saveProduct(){
    console.log("Ejecutando funcion para guardar");

    let product = {
        reference: $("#reference").val(),
        category: $("#category").val(),
        description: $("#description").val(),
        availability: $("#availability").val(),
        price: +$("#price").val(),
        quantity: +$("#quantity").val(),
        photography: $("#photography").val()
    };

    console.log(product);
    if (validateProduct(product)){
       
        $.ajax (
            {
                url          : 'http://129.151.121.220:8081/api/chocolate/new',
                type         : 'POST',
                contentType  : "application/json;charset-UTF-8",
                dataType     : 'JSON',
                data         :  JSON.stringify(product),
    
                success      :  function(response){
                                   console.log(response);
                                   alert("Producto almacenado");
                                //    consultar();
                                },
                error       :   function(xhr,status){
                                console.log(status);
                                alert("Fallo al registrar el producto");
                                }
                            
            }
        );

    }
    
}



function checkProduct(){
    $("#table_Chocolate").empty();
    $.ajax({
        url: url + '/api/chocolate/all',
        type: 'GET',
        dataType: 'json',
        success: function(respuesta){
            //showProducts(respuesta);
            $("#res").empty();
        for (var i=0; i < respuesta.length; i++) {

        let nombreId = "botonDet"+i
        let nombreIdd = "botonDel"+i
        let nombreIdButtons = "buttons"+i
        let identificador = "#"+nombreId
        let idButtonGroup = "#"+nombreIdButtons
        let identificar ="#"+nombreIdd;
        let item = respuesta[i].reference;
        let objeto = respuesta[i];

        $("#res").append("<tr>");
        $("#res").append("<td class='text-wrap'>" + respuesta[i].reference + "</td>");
        $("#res").append("<td class='text-wrap'>" + respuesta[i].category + "</td>");
        $("#res").append("<td class='text-wrap'>" + respuesta[i].description + "</td>");
        $("#res").append("<td class='text-wrap'>" + respuesta[i].availability + "</td>");
        $("#res").append("<td class='text-wrap'>" + respuesta[i].price + "</td>");
        $("#res").append("<td class='text-wrap'>" + respuesta[i].quantity + "</td>");
        $("#res").append("<td class='text-wrap'>" + respuesta[i].photography + "</td>");
        $("#res").append("<td id='"+nombreIdButtons+"' class='text-center'>");
        //$(idButtonGroup).append("<a class=\"btn btn-primary text-center me-2\" id=\""+nombreId+"\" onclick=llenarCampos("+objeto+")>Actualizar</a>");
        //$(idButtonGroup).append("<a class=\"btn btn-primary text-center\" onclick=removeProduct("+item+")>Eliminar</a>");
        $("#res").append("</td>");
        $(idButtonGroup).append("<a class=\"btn btn-primary text-center me-2\" id=\'"+nombreId+"'>Actualizar</a>");
        $(identificador).click(() => llenarCampos(objeto));
        
        $(idButtonGroup).append("<a id=\'"+nombreIdd+"' class=\"btn btn-primary text-center\" onclick=borrar(" +item+")>Eliminar</a>");
        $(identificar).click(() => borrar(item));
     
                   

        $("#res").append("</td></tr>");

        
    }
        },
        error: function (xhr, status) {
            alert('ha sucedido un problema');
        }
    });
}

function showProducts(items){
    
}

function llenarCampos(items){
    alert("A continuación modifique los campos que desea actualizar");
    console.log(items);
    $("#reference").val(items.reference);
    $("#reference").attr("readonly","readonly");
    $('#category').val(items.category);
    $('#description').val(items.description);
    $('#category').val(items.category);

    if(items.availability == true){
        alert("ingreso con true");

       //$('#seleccionador').val('Disponible');
       $('#availability').val($('#seleccionadorD').val());
        //$('#seleccionador').text('disponible');
    }else{
        alert("ingreso con false");
        //$("#seleccionador").attr("value","false");
        $('#seleccionador').text('No disponible');
    }
   


    $('#price').val(items.price);
    $('#quantity').val(items.quantity);
    $('#photography').val(items.photography);
    $('#botonGuardar').val('Guardar Cambios');
    $('#titulo').text('Editar Producto');
}

/**
 * 
 * @param {type} id
 * @returns {undefined}
 */
function checkProductById(id){
    $.ajax({
        url: url+ "/api/chocolate/"+id,
        type: 'GET',
        dataType: 'json',
        success: function(product){
            console.log(product);
            showUniqueProduct(product);
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
function showUniqueProduct(item) {
    $("#reference").val(item.reference);
    $("#category").val(item.category);
    $("#description").val(item.description);
    $("#availability").val(item.availability);
    $("#price").val(item.price);
    $("#quantity").val(item.quantity);
    $("#photography").val(item.photography); 
    
}


function updateProduct(){

    let product = {
        reference: $("#reference").val(),
        category: $("#category").val(),
        description: $("#description").val(),
        availability: $("#availability").val(),
        price: +$("#price").val(),
        quantity: +$("#quantity").val(),
        photography: $("#photography").val()
    };

    console.log(product);
    if (validateUser(product)){
        $.ajax({
            url: url+"/api/chocolate/update",
            type: 'PUT',
            dataType: 'json',
            headers: {
                "Content-Type": "application/json"
            },
            data: JSON.stringify(product),
            statusCode:{
                201:function(){
                    alert('PRODUCTO EDITADO');
                    window.location.assign('inicio.html');
                }
            }
        });

        }
}

function borrar(id){
    let opc = confirm('¿Está seguro que desea eliminar este producto?')
    if(opc){
        $.ajax (
            {
                url          : url+ '/api/chocolate/'+id,
                type         : 'DELETE',
                contentType  : 'application/json',
                success      :  function(response){
                                    console.log("Delete exitoso");
                                    
            
                                },
                error       :   function(xhr,status){
                                    console.log(xhr);
            
                                }
            }
            );
    }

}


function cleanFieldsProduct(){
    $("#reference").val(),
    $("#category").val(),
    $("#description").val(),
    $("#availability").val(),
    +$("#price").val(),
    +$("#quantity").val(),
    $("#photography").val()
}