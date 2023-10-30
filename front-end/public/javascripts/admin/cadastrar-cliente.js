
document.addEventListener("DOMContentLoaded", () => {
  
  displayFlashMessage();

  const form = document.querySelector("#form");

  console.log("foi + ou -")

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

      console.log("quase que foi")

      try {
        console.log("quase laaaa")
        const response = await axios.post("http://localhost:5000/api/clientes/cadastrar", data);
      
        storeFlashMessage("success", "Cadastro realizado sucesso");
        console.log("foi ebaaaa")

        const id = response.data.id;
      } catch (error) {
        triggerFlashMessage("danger", error.message);
      }
    }
    
    form.classList.add("was-validated");
  });
});