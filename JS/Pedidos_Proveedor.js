var UrlPedidos = 'http://52.152.236.67:90/G2_19/controller/pedidos_proveedor.php?op=GetPedidos';
var UrlPostPedidos = 'http://52.152.236.67:90/G2_19/controller/pedidos_proveedor.php?op=InsertPedido';
var UrlGetPedidos = 'http://52.152.236.67:90/G2_19/controller/pedidos_proveedor.php?op=GetPedido';
var UrlActualizarPedidos = 'http://52.152.236.67:90/G2_19/controller/pedidos_proveedor.php?op=UpdatePedido';
var UrlEliminarPedidos = 'http://52.152.236.67:90/G2_19/controller/pedidos_proveedor.php?op=DeletePedido';

$(document).ready(function(){
CargarPedidos();
});

function CargarPedidos(){
    $.ajax({
        url: UrlPedidos,
        type: 'GET',
        datatype: 'JSON',
        success: function(reponse){
            var MiItems=reponse;
            var Valores='';

            for(i=0; i < MiItems.length; i++){
                Valores +=   '<tr>'+
                '<td>'+ MiItems[i].ID +'</td>'+
                '<td>'+ MiItems[i].ID_SOCIO +'</td>'+
                '<td>'+ MiItems[i].FECHA_PEDIDO +'</td>'+
                '<td>'+ MiItems[i].DETALLE +'</td>'+
                '<td>'+ MiItems[i].SUB_TOTAL +'</td>'+
                '<td>'+ MiItems[i].TOTAL_ISV +'</td>'+
                '<td>'+ MiItems[i].TOTAL +'</td>'+
                '<td>'+ MiItems[i].FECHA_ENTREGA +'</td>'+
                '<td>'+ MiItems[i].ESTADO +'</td>'+
                '<td>'+
                '<button class="btn btn-info" onclick="CargarPedido('+ MiItems[i].ID +')">Editar</button>'+
                '<button class="btn btn-warning" onclick="EliminarPedidos('+ MiItems[i].ID +')">Eliminar</button>'+
                '</td>'+
            '</tr>';
            $('.Pedidos').html(Valores);
            }            
        }
    })
}

function AgregarPedidos(){
    var datospedidos={
        ID_SOCIO:$('#ID_SOCIO').val(),
        FECHA_PEDIDO:$('#FECHA_PEDIDO').val(),
        DETALLE:$('#DETALLE').val(),
        SUB_TOTAL:$('#SUB_TOTAL').val(),
        TOTAL_ISV:$('#TOTAL_ISV').val(),
        TOTAL:$('#TOTAL').val(),
        FECHA_ENTREGA:$('#FECHA_ENTREGA').val(),
        ESTADO:$('#ESTADO').val()
    };
    var datospedidosjson = JSON.stringify(datospedidos);
    $.ajax({
        url: UrlPostPedidos,
        type: 'POST',
        data: datospedidosjson,
        dataType: 'JSON',
        contenttype: 'application/json',
        success: function(reponse){
            console.log(reponse);
        },
        error: function(){
            alert('Error al crear el pedido.')
        }
    });
    alert('Pedido de proveedor agregado')
}

function CargarPedido(idpedido){
    var datospedido = {
        ID: idpedido        
    };
    var datospedidosjson = JSON.stringify(datospedido);
    alert(datospedidosjson);
    $.ajax({
        url: UrlGetPedidos,
        type: 'POST',
        data: datospedidosjson,
        dataType: 'JSON',
        contenttype: 'application/json',
        success: function (reponse){
            var MiItems = reponse;
            $('#ID_SOCIO').val(MiItems[0].ID_SOCIO);
            $('#FECHA_PEDIDO').val(MiItems[0].FECHA_PEDIDO);
            $('#DETALLE').val(MiItems[0].DETALLE);
            $('#SUB_TOTAL').val(MiItems[0].SUB_TOTAL);
            $('#TOTAL_ISV').val(MiItems[0].TOTAL_ISV);
            $('#TOTAL').val(MiItems[0].TOTAL);
            $('#FECHA_ENTREGA').val(MiItems[0].FECHA_ENTREGA);
            $('#ESTADO').val(MiItems[0].ESTADO);
            var btnactualizar = '<input type="submit" id="btn_actualizar" onclick="ActualizarPedidos('+ MiItems[0].ID +')"'+
            'value="Actualziar Pedido" class="btn btn-primary"></input>';
            $('.btnpedido').html(btnactualizar);
        }
    });

}

function ActualizarPedidos(idpedido){
    var datospedidos={
        ID:idpedido,
        ID_SOCIO:$('#ID_SOCIO').val(),
        FECHA_PEDIDO:$('#FECHA_PEDIDO').val(),
        DETALLE:$('#DETALLE').val(),
        SUB_TOTAL:$('#SUB_TOTAL').val(),
        TOTAL_ISV:$('#TOTAL_ISV').val(),
        TOTAL:$('#TOTAL').val(),
        FECHA_ENTREGA:$('#FECHA_ENTREGA').val(),
        ESTADO:$('#ESTADO').val()
    }
    var datospedidosjson = JSON.stringify(datospedidos);
    $.ajax({
        url: UrlActualizarPedidos,
        type: 'PUT',
        data: datospedidosjson,
        dataType: 'JSON',
        contenttype: 'application/json',
        success: function(reponse){
            console.log(reponse);
        },
        error: function(){
            alert('Error al actualizar el pedido.')
        }
    });
    alert('Pedido de proveedor actualizado')
}

function EliminarPedidos(idpedido){
    var datospedido = {
        ID: idpedido        
    };
    var datospedidosjson = JSON.stringify(datospedido);
    $.ajax({
        url: UrlEliminarPedidos,
        type: 'DELETE',
        data: datospedidosjson,
        dataType: 'JSON',
        contenttype: 'application/json',
        success: function(reponse){
            console.log(reponse);
        },
        error: function(){
            alert('Error al eliminar el pedido')
        }
    });
    alert('Pedido Eliminado')
    CargarPedidos();
}