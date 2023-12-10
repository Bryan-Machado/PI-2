document.addEventListener("DOMContentLoaded", () => {

    function formatarHorario(data) {
        var date = new Date(data);
        var formattedTime = date.toLocaleTimeString('pt-BR', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
          timeZone: "UTC"
        });
        return formattedTime;
    }
  
    const dia = document.querySelector("#dia");
   
    dia.addEventListener("change", async (event) =>{
        event.preventDefault();

        function formatardatainverso(data) {



          var dia = data.split("/")[0]
          var mes = data.split("/")[1]
          var ano = data.split("/")[2]

          var datacerta = `${ano}-${mes}-${dia}`


          return  datacerta;
        }

        var diacerto = formatardatainverso(dia.value)

        const diaEscolhido = diacerto



        try {
            const response = await axios.get(`http://localhost:5000/api/agendamento/horario/${diaEscolhido}`);
            
            
            const hora =  document.querySelector("#hora")
            hora.innerHTML = ``
              response.data.forEach((agendamento) =>{
                console.log(agendamento);
                var option = document.createElement("option")
                  option.innerHTML = `<option data-id="${agendamento.id}" value="${formatarHorario(agendamento.hora)}">${formatarHorario(agendamento.hora)}</option>`
                  console.log(option);
                  hora.appendChild(option)
              })

            } catch (error) {
                alert(error.message)
              }


    })


});