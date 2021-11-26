$(document).ready(function() {
checkProduct() //Consulta de usuarios
})

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
        $.ajax({
            url: url + "/api/chocolate/new",
            type: 'POST',
            dataType: 'json',
            headers: {
                "Content-Type": "application/json"
            },
            data: JSON.stringify(product),
            statusCode:{
                201:function(){
                    alert('Se ha registrado el producto');
                    checkProduct();
                }
            },
        });    
    }
    
}



function checkProduct(){
    $("#table_XXXXXX").empty();
    $.ajax({
        url: url + '/api/chocolate/all',
        type: 'GET',
        dataType: 'json',
        success: function(respuesta){
            showProducts(respuesta);
        },
        error: function (xhr, status) {
            alert('ha sucedido un problema');
        }
    });
}

function showProducts(items){
    var tabla = `<table border="1">
                  <tr>
                    
                    <th>Referencia</th>
                    <th>Categoria</th>
                    <th>Descripcion</th>
                    <th>Disponibilidad</th>
                    <th>Precio</th>
                    <th>Cantidad</th>
                    <th>Fotografía</th>
                    
                  </tr>`;
                  
    
    for (var i=0; i < items.length; i++) {
        tabla +=`<tr>
                   <td>${items[i].reference}</td>
                   <td>${items[i].category}</td>
                   <td>${items[i].description}</td>
                   <td>${items[i].availability}</td>
                   <td>${items[i].price}</td>
                   <td>${items[i].quantity}</td>
                   <td>${items[i].photography}</td>
                   <td>
                        <a href="inicio.html?id=${items[i].idProduct}">
                   </td> 
                </tr>`;
    }
    tabla +=`</table>`;

    $("#table_XXXXXX").html(tabla);
}

/**
 * 
 * @param {type} id
 * @returns {undefined}
 */
function checkProductById(id){
    $.ajax({
        url: url+ "/api/chocolate/all"+id,
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
    $("#id_product").val(item.idProduct);
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
        idProduct: $("#xxxxxxxxxxxxx").val(),
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
                    alert('Se han actualizado los datos del producto');
                    window.location.assign('inicio.html');
                }
            }
        });

        }
}

function removeProduct(id){
    let opc = confirm('¿Está seguro que desea eliminar este producto?')
    if(opc){
        $.ajax({
            url: url+"/api/chocolate/"+id,
            type: 'DELETE',
            dataType: 'json',
            headers: {
                "Content-Type": "application/json"
            },
            data: JSON.stringify({idProduct:id}),
            statusCode:{
                204:function(){
                    alert('Se ha eliminado el producto');
                    checkProduct()
                }
            },
        });
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