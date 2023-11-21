document.addEventListener("DOMContentLoaded", () => {
  
    const form = document.querySelector("#form");
  
    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      event.stopPropagation();  
      //coleta dos dados do form
      if (form.checkValidity()) {
        const cidade = document.querySelector("#cidade").value;
        const tipoCarteirinha = document.querySelector('#tipoCarteirinha').value;
        const nomeCompleto = document.querySelector("#nomeCompleto").value;
        const hora = document.querySelector("#hora").value;
        const dia = document.querySelector("#dia").value;
        //forma de guarda-los em um array
        const data = { cidade,tipoCarteirinha, nomeCompleto, hora, nascimento, dia};
        console.log(data)
        try {
          console.log("quase laaaa")
          const response = await axios.post("http://localhost:5000/api/clientes/cadastrar", data);
  
          const id = response.data.id;
        } catch (error) {
          console.log(error.mensage)
        }
      }
      
      form.classList.add("was-validated");
      window.location.href = 'http://localhost:3000/admin/cadastrar-cliente'
      
    });
  });