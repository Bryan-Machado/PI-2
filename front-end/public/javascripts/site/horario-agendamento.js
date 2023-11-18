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
        
        

        const diaEscolhido = dia.value

        

        try {
            const response = await axios.get(`http://localhost:5000/api/agendamento/horario/${diaEscolhido}`);
      
      
            const horario =  document.querySelector("#horario")
              response.data.forEach((agendamento) =>{
                var option = document.createElement("option")
                  option.innerHTML = `<option value="${formatarHorario(agendamento.horario)}">${formatarHorario(agendamento.horario)}</option>`
                  dia.appendChild(option)
              })

            } catch (error) {
                alert(error.message)
              }


    })


});