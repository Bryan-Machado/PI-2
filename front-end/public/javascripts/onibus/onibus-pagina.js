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
        
        let tarifa = 5
        

        const data = { codCartao, tarifa };
        try {
          const response = await axios.patch("http://localhost:5000/api/clientes/onibusComum", data);
          
          const resposta = response.data

          
          window.location.href = "http://localhost:3000/onibus/aprovado"
         
          
        } catch (error) {
            console.log(error)
            if (error.response && error.response.status === 400) {
              window.location.href = "http://localhost:3000/onibus/recusado"
            }
            else if (error.response && error.response.status === 406) {
              window.location.href = "http://localhost:3000/onibus/recusado/estudante"
            }
            else if (error.response && error.response.status === 407) {
              window.location.href = "http://localhost:3000/onibus/aprovado/estudante"
            }
            else if (error.response && error.response.status === 408) {
              window.location.href = "http://localhost:3000/onibus/aprovado/deficiente"
            }
            // else{
            //   window.location.href = "http://localhost:3000/onibus/aprovado"
            // }
        }
      }
    
      
      
      form.classList.add("was-validated");
      
    });
  }


  
});
