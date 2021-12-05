function checkOrder(){
    $.ajax({
        url: url+'/api/order/zona/ZONA 1',
        type: 'GET',
        dataType: 'json',

        success: function(respuesta){
            console.log(respuesta);
            
            let nombreIdButtons = "buttons"+i
            let nombreId = "botonDet"+i
            let identificador = "#"+nombreId
            let idButtonGroup = "#"+nombreIdButtons

            $('#res').empty();
        for (var i=0; i < respuesta.length; i++) {

         $("#res").append("<tr class='border-bottom'>");
        $("#res").append("<td class='text-center'>" + respuesta[i].salesMan.identification + "</td>");
        $("#res").append("<td class='text-center'>" + respuesta[i].salesMan.name+ "</td>");
        $("#res").append("<td class='text-center col-md-2'>" + respuesta[i].salesMan.email+ "</td>");
        $("#res").append("<td class='text-center'>" + respuesta[i].registerDay + "</td>");
        $("#res").append("<td class='text-center'>" + respuesta[i].id + "</td>");
        $("#res").append("<td class='text-center'>" + respuesta[i].status + "</td>");
        $("#res").append("</td>");

        $(idButtonGroup).append("<a class=\"btn btn-primary text-center me-2\" id=\'"+nombreId+"'>Actualizar</a>");
        $(identificador).click(() => llenarCampos(objeto));

               // console.log(respuesta[i].salesMan.identification);
                //console.log(respuesta[i].salesMan.name);
                //console.log(respuesta[i].salesMan.email);
                //console.log(respuesta[i].registerDay);
                //console.log(respuesta[i].id);
                //console.log(respuesta[i].status);

                //enviar a otro metodo con un id  ----> function verProduct(id)
            }

        },
        error: function (xhr, status) {
            alert('ha sucedido un problema');
        }
      

    })

}
function verProduct(idOrder){
    //tabla en la cual se puede editar el estado del producto
    $.ajax({
        url: url+'/api/order/'+idOrder,
        type: 'GET',
        dataType: 'json',

        success: function(respuesta){
            console.log(respuesta);
         
                console.log(respuesta.registerDay);
                console.log(respuesta.id);
                console.log(respuesta.status);
                listarProducts(respuesta);
                //option que cambia el estado del pedido
                 //boton que permite actualizar
                 update(respuesta);
        },
        error: function (xhr, status) {
            alert('Error, no se encontro ID');
        }
        
    });
}
function listarProducts(obj){
    //tabla en la cual se pueden observar el detalle de los productos solicitados
    let iterar = obj.products;
    let iterarCan = obj.quantities;

    let refer = iterarCan.length;
    var keys = Object.keys(iterarCan);
     
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

    }
    

}

function update(idOrder, estado){
    
    cambio      = {id: idOrder, status: estado};
    datosEnvio   = JSON.stringify(cambio);
    $.ajax (
                {
                    url: url+"/api/order/update",
                    type         : 'PUT',
                    data         :  datosEnvio,
                    contentType  : 'application/json',

                    success      :  function(response){
                                        alert("El pedido "+ idOrder+" se actualizo a"+ estado);
                                    },
                    error       :   function(xhr,status){
                                        console.log( xhr);

                                    }
                }
            );
}
       
