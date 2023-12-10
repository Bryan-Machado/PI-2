document.addEventListener("DOMContentLoaded", async (event) => {

    function formatardata(data) {

          var nascimentoformatado = data.split("T")[0]

          var ano = nascimentoformatado.split("-")[0]
          var mes = nascimentoformatado.split("-")[1]
          var dia = nascimentoformatado.split("-")[2]

          var datacerta = `${dia}/${mes}/${ano}`


          return  datacerta;
        }
  
    try {
      const response = await axios.get(`http://localhost:5000/api/agendamento/`);


      const dia =  document.querySelector("#dia")
        
        response.data.forEach((agendamento) =>{
          var dataformatada = formatardata(agendamento.dia)
          var option = document.createElement("option")
            option.innerHTML = `<option id="${agendamento.id}" value="${dataformatada}">${dataformatada}</option>`
            dia.appendChild(option)
        })
      
  

    } catch (error) {
      alert(error.message)
    }
  });
  