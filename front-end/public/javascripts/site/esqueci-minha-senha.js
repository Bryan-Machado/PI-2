document.addEventListener("DOMContentLoaded", () => {

  
    const form = document.querySelector("#form");
  
    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      event.stopPropagation();  
      //coleta dos dados do form
      if (form.checkValidity()) {
        const cpf = document.querySelector("#cpf").value;
        const novasenha = document.querySelector("#novasenha").value;
        //forma de guarda-los em um array
        const data = { cpf, novasenha };
        try {
          const response = await axios.patch("http://localhost:5000/api/clientes/novasenha", data);
  
          
        } catch (error) {
            alert(error.message);
        }
      }
      
      form.classList.add("was-validated");
      window.location.href = 'http://localhost:3000/logar'
      
    });
  });