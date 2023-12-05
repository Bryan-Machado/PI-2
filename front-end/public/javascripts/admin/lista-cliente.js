
$(document).ready(function() {
  $('#table-clientes').DataTable({
    "ajax": {
      "url": "http://localhost:5000/api/clientes",
      "dataSrc": ""
    },
    "columns": [{
        "data": "nomeCompleto"
      },
      {
        "data": "email"
      },
      {
        "data": "nascimento",
        "render": function(data) {

          var nascimentoformatado = data.split("T")[0]

          var ano = nascimentoformatado.split("-")[0]
          var mes = nascimentoformatado.split("-")[1]
          var dia = nascimentoformatado.split("-")[2]

          var datacerta = `${dia}/${mes}/${ano}`


          return  datacerta;
        },
      },
      {
        "data": "numeroTel"
      },
      {
        "data": "tipoCarteirinha"
      },
      {
        "data": "saldo",
        "render": function(data) {

          var saldoformatado = `R$${data},00`


          return  saldoformatado;
        },
      },
      {
        "data": "ações",
        "render": function(data, type, row, meta) {
          return '<a href="http://localhost:3000/admin/vizualizar-cliente/' + row.id + '">Visualizar</a> / ' +
            '<a href="http://localhost:3000/admin/editar-cliente/' + row.id + '">Editar</a> / ' +
            '<a href="http://localhost:3000/admin/deletar-cliente/' + row.id + '">Excluir</a>';
        }
      }
    ],
    "language": {
      "lengthMenu": "Mostrar _MENU_ registros por página",
      "zeroRecords": "Nenhum registro encontrado",
      "info": "Mostrando página _PAGE_ de _PAGES_",
      "infoEmpty": "Nenhum registro disponível",
      "infoFiltered": "(filtrado de _MAX_ registros no total)",
      "search": "Buscar",
      "paginate": {
        "first": "Primeiro",
        "last": "Último",
        "next": "Próximo",
        "previous": "Anterior"
      }
    }
  });
});

document.addEventListener("DOMContentLoaded", async (event) => {
  displayFlashMessage()
});