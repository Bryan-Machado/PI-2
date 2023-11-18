document.addEventListener("DOMContentLoaded", async (event) => {
  
  
    try {
      const response = await axios.get(`http://localhost:5000/api/agendamento/`);


      const dia =  document.querySelector("#dia")
        response.data.forEach((agendamento) =>{
          var option = document.createElement("option")
            option.innerHTML = `<option id="diaId" value="${agendamento.dia.split("T")[0]}">${agendamento.dia.split("T")[0]}</option>`
            dia.appendChild(option)
        })
      
  

    } catch (error) {
      alert(error.message)
    }
  });
  