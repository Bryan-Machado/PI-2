document.addEventListener("DOMContentLoaded", () => {



  

        
    const form = document.querySelector("#form");

    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      event.stopPropagation();
      
      function formatardatainverso(data) {



          var dia = data.split("/")[0]
          var mes = data.split("/")[1]
          var ano = data.split("/")[2]

          var datacerta = `${ano}-${mes}-${dia}`


          return  datacerta;
        }
        

        var diacerto = formatardatainverso(dia.value)
      //coleta dos dados do form
      if (form.checkValidity()) {
        const cidade = document.querySelector("#cidade").value;
        const tipoCarteirinha = document.querySelector("#tipoCarteirinha").value;
        const nomeCompleto = document.querySelector("#nomeCompleto").value;
        let dia = document.querySelector("#dia").value;
        dia = `${diacerto}T00:00:00Z`;
        let hora = document.querySelector("#hora").value;
        hora = `0001-01-01T${hora}:00.000Z`


        let idyyutyuytuytuyt
        form.querySelectorAll("option").forEach((e) =>{
            if(e.getAttribute("data-id") && e.value ==  document.querySelector("#hora").value){
                idyyutyuytuytuyt = e.getAttribute("data-id")
            }
        })

        //forma de guarda-los em um array
        const data = { cidade, tipoCarteirinha, nomeCompleto, dia, hora };

        try {
            console.log(data)
          const response = await axios.patch(`http://localhost:5000/api/agendamento/agendar/${idyyutyuytuytuyt}`, data)

  
          const id = response.data.id;
        } catch (error) {
          alert(error.message)
        }
      }
      
      form.classList.add("was-validated");

      
    });
  });