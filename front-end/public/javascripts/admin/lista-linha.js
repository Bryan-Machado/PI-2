const axios = require('axios').default;

document.addEventListener("DOMContentLoaded", async (event) => {
  displayFlashMessage();

  try {
    const tableBody = document.querySelector("tbody");
    const response = await axios.get("http://localhost:5000/api/linhas");
    response.data.forEach((linhas) => {
      const row = tableBody.insertRow(-1);
      row.insertCell(0).innerHTML = linhas.nome;
      row.insertCell(1).innerHTML = linhas.horaSaida;
      row.insertCell(2).innerHTML = linhas.horaChegada;
      row.insertCell(3).innerHTML = linhas.localSaida;
      row.insertCell(4).innerHTML = linhas.localDestino;

      const showLink = document.createElement("a");
      showLink.innerHTML = "Exibir";
      showLink.classList.add("btn", "btn-info", "btn-sm", "mx-1");
      showLink.href = `http://localhost:3000/admin/exibir/${linhas.id}`;
      row.insertCell(5).appendChild(showLink);

      const editLink = document.createElement("a");
      editLink.innerHTML = "Editar";
      editLink.classList.add("btn", "btn-success", "btn-sm", "mx-1");
      editLink.href = `http://localhost:3000/admin/editar/${linhas.id}`;
      row.insertCell(6).appendChild(editLink);

      const deleteLink = document.createElement("a");
      deleteLink.innerHTML = "Excluir";
      deleteLink.classList.add("btn", "btn-danger", "btn-sm", "mx-1");
      deleteLink.href = `http://localhost:3000/admin/excluir/${linhas.id}`;
      row.insertCell(7).appendChild(deleteLink);
      });
  } catch (error) {
    triggerFlashMessage("danger", error.message);
  }
});

function formatarHorario(data) {
  const date = new Date(data);
  const horaLocal = date.getHours() + date.getTimezoneOffset() / 60;
  const minutos = date.getMinutes();
  return `${horaLocal < 10 ? "0" + horaLocal : horaLocal}:${
    minutos < 10 ? "0" + minutos : minutos
  }`;
}
