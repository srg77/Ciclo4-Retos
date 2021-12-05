$(function(){
    $("#nav-placeholder").load("nav.html");
    getInfoPage();
});
const getInfoPage = () =>{

    let urlPage = jQuery(location).attr('href');
    let userName = getParameters(urlPage);
    console.log(userName[0]);
    getInfoUser(userName[0]);
}
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

const fillTableInfoUser = (respuesta) => {
    $("#userName").text(respuesta.name);
    $("#table-body-user").empty();
    console.log(respuesta);
    
        $("#table-body-user").append("<tr class='border-bottom'>");
        $("#table-body-user").append("<td class='text-center'>"+respuesta.identification+"</td>");
        $("#table-body-user").append("<td class='text-center'>"+respuesta.name+"</td>");
        $("#table-body-user").append("<td class='text-center'>"+respuesta.email+"</td>");
        $("#table-body-user").append("<td class='text-center'>"+respuesta.type+"</td>");
        $("#table-body-user").append("<td class='text-center'>"+respuesta.zone+"</td>");
        checkOrders(respuesta.zone);

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

function checkOrders(getZona){

        document.getElementById("tablaid").style.display="";
        $.ajax({
            url: url+'/api/order/zona/'+getZona,
            type: 'GET',
            dataType: 'json',
    
            success: function(respuesta){
                console.log(respuesta);
                
                
    
            $('#table-body-orders').empty();
            for (var i=0; i < respuesta.length; i++) {
    
    
                f = new Date(respuesta[i].registerDay);
                fechaPasar = f.getDate() + '/' + ( f.getMonth() + 1 ) + '/' + f.getFullYear();
                
                $("#table-body-orders").append("<tr class='border-bottom'>");
                $("#table-body-orders").append("<td class='text-center'>" + respuesta[i].salesMan.identification + "</td>");
                $("#table-body-orders").append("<td class='text-center'>" + respuesta[i].salesMan.name+ "</td>");
                $("#table-body-orders").append("<td class='text-center col-md-2'>" + respuesta[i].salesMan.email+ "</td>");
                $("#table-body-orders").append("<td class='text-center'>" + fechaPasar + "</td>");
                $("#table-body-orders").append("<td class='text-center'>" + respuesta[i].id + "</td>");
                $("#table-body-orders").append("<td class='text-center'>" + respuesta[i].status + "</td>");

                let nombreId = "botonDet"+i
                let identificador = "#"+nombreId
                let idOrder = respuesta[i].id;

                $("#table-body-orders").append("<td class='text-center'> <button id='"+nombreId+"' class='btn btn-primary text-center me-2' >Ver Pedido</button></td>");
                $(identificador).click(() => showDetailOrder(idOrder,getZona));

            }
    
            },
            error: function (xhr, status) {
                alert('ha sucedido un problema');
            }
        
    
        })
}
    
function showDetailOrder(idOrder,getZone){
    //tabla en la cual se puede editar el estado de la orden
    $('#table-body-detail-order').empty();
    document.getElementById("tablaid2").style.display="";
    document.getElementById("tablaid3").style.display="";
    document.getElementById("title").style.display="";
    $.ajax({
        url: url+'/api/order/'+idOrder,
        type: 'GET',
        dataType: 'json',

        success: function(respuesta){
            console.log(respuesta);
            f = new Date(respuesta.registerDay);
            fechaPasar = f.getDate() + '/' + ( f.getMonth() + 1 ) + '/' + f.getFullYear();
            /*<select name="availability" id="availability" class="form-control" required>
                <option selected value="" id="seleccionador">Selecciona disponibilidad</option>
                <option value="true" id="seleccionadorD">Disponible</option>
                <option value="false" id="seleccionadorND">No disponible</option>
            </select>*/

            $("#table-body-detail-order").append("<td class='text-center'>" + fechaPasar + "</td>");
            $("#table-body-detail-order").append("<td class='text-center'>" + respuesta.id + "</td>");
            $("#table-body-detail-order").append("<td class='text-center'>" + respuesta.status + "</td>");
            $("#table-body-detail-order").append("<td class='text-center'><select class='form-control ' id='status'> <option value=''>Seleccione el estado</option>");
            $("#status").append("<option value='Aprobado'>Aprobado</option>")
            $("#status").append("<option value='Rechazado'>Rechazado</option>")
            $("#status").append("<option value='Pendiente'>Pendiente</option> </select></td>")
            let estado = "";
            let idOrder = respuesta.id;
            $("#status").change(function() {
                estado = $('#status').val();
            });
            $("#table-body-detail-order").append("<td class='text-center'> <button id='update' class='btn btn-primary text-center me-2' >Guardar Estado</button></td>");
            $("#update").click(() => update(idOrder, estado, respuesta,getZone)); 

        },
        error: function (xhr, status) {
            alert('Error, no se encontro ID');
        }
        
    });
}

function update(idOrder, estado, respuesta, getZone){
    listProducts(respuesta);
    if(estado === ""){
        alert("Por favor seleccione un estado para esta orden");

    }else{
    
        cambio      = {id: idOrder, status: estado};
        datosEnvio   = JSON.stringify(cambio);
        $.ajax (
                    {
                        url: url+"/api/order/update",
                        type         : 'PUT',
                        data         :  datosEnvio,
                        contentType  : 'application/json',

                        success      :  function(response){
                                            alert("El pedido "+ idOrder+" se actualizo a: "+ estado);
                                            checkOrders(getZone);
                                        },
                        error       :   function(xhr,status){
                                            console.log( xhr);
                                            alert("El pedido "+ idOrder+" se actualizo a: "+ estado);
                                        }
                    }
        );
    }
    
}

function listProducts(obj){
    //tabla en la cual se pueden ver los productos de la orden actualizada
    let iterar = obj.products;
    let iterarCan = obj.quantities;

    let refer = iterarCan.length;
    var keys = Object.keys(iterarCan).length;
    $("#table-body-detail").empty();
    for (i in iterar){
    
        refer = iterar[i].reference;
        //console.log("REFERENCIAAAA: "+ refer);
        console.log(iterar[i].photography);
        console.log(iterar[i].reference);
        console.log(iterar[i].category);
        console.log(iterar[i].description);
        console.log(iterar[i].price);
        //for (x in iterarCan){
            //console.log("LEYENDO-...."+ Object.keys(obj.quantities)[0]);
            if(iterar[i].reference == refer){
                console.log(obj.quantities[i]);
            }
        //}
        console.log(iterar[i].quantity);  //stock
        $("#table-body-detail").append("<tr class='border-bottom'>");
        $("#table-body-detail").append("<td class='text-center col-md-1'>" + iterar[i].photography + "</td>");
        $("#table-body-detail").append("<td class='text-center'>" + iterar[i].reference + "</td>");
        $("#table-body-detail").append("<td class='text-center'>" + iterar[i].category + "</td>");
        $("#table-body-detail").append("<td class='text-center'>" + iterar[i].description + "</td>");
        $("#table-body-detail").append("<td class='text-center'>" + iterar[i].price+ "</td>");
        $("#table-body-detail").append("<td class='text-center'>" + obj.quantities[i]+ "</td>");
        $("#table-body-detail").append("<td class='text-center'>" + iterar[i].quantity + "</td></tr>");
        
console.log("recorri "+i);
    }
    

}