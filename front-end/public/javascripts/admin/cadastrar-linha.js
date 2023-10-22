document.addEventListener("DOMContentLoaded", () => {
  displayFlashMessage();

  const form = document.querySelector("#form");

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    //coleta dos dados do form
    if (form.checkValidity()) {
      const nome = document.querySelector("#nome").value;
      const localSaida = document.querySelector("#localSaida").value;
      const localDestino = document.querySelector("#localDestino").value;
      const horaSaida = document.querySelector("#horaSaida").value;
      const horaChegada = document.querySelector("#horaChegada").value;
      //forma de guarda-los em um array
      const data = { nome, localSaida, localDestino, horaSaida, horaChegada };

      try {
        const response = await axios.post("http://localhost:3000/api/linhas/cadastrar", data);
      
        storeFlashMessage("success", "Cadastro realizado sucesso");

        const id = response.data.id;
      } catch (error) {
        triggerFlashMessage("danger", error.message);
      }
    }
    
    form.classList.add("was-validated");
  });
});