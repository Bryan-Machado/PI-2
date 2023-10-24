document.addEventListener("DOMContentLoaded", async (event) => {
  displayFlashMessage();

  try {
    const tableBody = document.querySelector("tbody");
    const response = await axios.get("http://localhost:5000/api/clientes");
    response.data.forEach((linha) => {
      const row = tableBody.insertRow(-1);
      row.insertCell(0).innerHTML = linha.nomeCompleto;
      row.insertCell(1).innerHTML = linha.email;
      row.insertCell(2).innerHTML = linha.nascimento;
      row.insertCell(3).innerHTML = linha.numeroTel;
      });
  } catch (error) {
    triggerFlashMessage("danger", error.message);
  }
});