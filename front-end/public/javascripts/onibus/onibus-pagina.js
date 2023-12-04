// modificações do javascript das páginas... aqui são alterações de front, ou seja,
// apenas coisas visuais que não mexem com dados sensíveis

document.addEventListener("DOMContentLoaded", () => {

    window.enviarFormulario = enviarFormulario;
    
    
      
    
     function enviarFormulario() {

        const form = document.querySelector("#form");
        
        
    form.addEventListener("input", async (event) => {
      event.preventDefault();
      event.stopPropagation();  
      //coleta dos dados do form
      if (form.checkValidity()) {
        const codCartao = document.querySelector("#leitor").value
        //forma de guarda-los em um array

        const data = { codCartao };
        let id;
        try {
          const response = await axios.patch("http://localhost:5000/api/clientes/onibusComum", data);
          
          const resposta = response.data
          id = response.data.id

          
          window.location.href = `http://localhost:3000/onibus/aprovado/${id}`
         
          
        } catch (error) {
            console.log(error)
            id = error.response.data.id
            if (error.response.data.error == 'Limite de passagens atingido'){
              window.location.href = `http://localhost:3000/onibus/recusado/estudante/${id}`
            } else if (error.response.data.error == '') {
              console.log('nada')
            }
        }
      }
    
      
      
      form.classList.add("was-validated");
      
    });
  }


  
});
