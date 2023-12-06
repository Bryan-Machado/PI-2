
$(document).ready(function() {
  $('#table-agendamentos').DataTable({
    "ajax": {
      "url": "http://localhost:5000/api/agendamento/tabela",
      "dataSrc": ""
    },
    "columns": [{
        "data": "nomeCompleto"
      },
      {
        "data": "cidade"
      },
      {
        "data": "tipoCarteirinha"
        },
      {
        "data": "dia",
        "render": function(data) {

          var nascimentoformatado = data.split("T")[0]

          var ano = nascimentoformatado.split("-")[0]
          var mes = nascimentoformatado.split("-")[1]
          var dia = nascimentoformatado.split("-")[2]

          var datacerta = `${dia}/${mes}/${ano}`


          return  datacerta;
        }
      },
      {
        "data": "hora",
        "render": function(data) {
          var date = new Date(data);
          var formattedTime = date.toLocaleTimeString('pt-BR', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
            timeZone: "UTC"
          });
          return formattedTime;
        }
      
      },
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