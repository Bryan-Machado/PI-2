console.log("oi");

function storeFlashMessage(type, message) {
  const flashMessage = { type, message };
  localStorage.setItem('flashMessage', JSON.stringify(flashMessage));
}

function displayFlashMessage() {
  const flashMessage = JSON.parse(localStorage.getItem('flashMessage'));
  if (flashMessage) {
      const flashMessagePlaceholder = document.querySelector("#flashMessageContainer");
      
      flashMessagePlaceholder.innerHTML = '';

      const flashMessageElement = document.createElement('div');
      flashMessageElement.setAttribute("role", "alert");
      flashMessageElement.classList.add('alert', `alert-${flashMessage.type}`, 'alert-dismissible', 'fade', 'show');                
      flashMessageElement.innerHTML = `${flashMessage.message}<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>`;        
      flashMessagePlaceholder.appendChild(flashMessageElement);
      localStorage.removeItem('flashMessage');
  }
}

function triggerFlashMessage(type, message) {
  storeFlashMessage(type, message);
  displayFlashMessage();
}

document.addEventListener("DOMContentLoaded", () => {
  
  displayFlashMessage();

  const form = document.querySelector("#form");

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    //coleta dos dados do form
    if (form.checkValidity()) {
      const nomeCompleto = document.querySelector("#nomeCompleto").value;
      const cpf = document.querySelector("#cpf").value;
      const email = document.querySelector("#email").value;
      const nascimento = document.querySelector("#nascimento").value;
      const senha = document.querySelector("#senha").value;
      const numeroTel = document.querySelector("#numeroTel").value;
      //forma de guarda-los em um array
      const data = { nomeCompleto, cpf, email, nascimento, senha, numeroTel };

      try {
        const response = await axios.post("http://localhost:3000/api/clientes/cadastrar", data);
      
        storeFlashMessage("success", "Cadastro realizado sucesso");

        const id = response.data.id;
      } catch (error) {
        triggerFlashMessage("danger", error.message);
      }
    }
    
    form.classList.add("was-validated");
  });
});