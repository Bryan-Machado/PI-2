const axios = require('axios').default;

document.addEventListener("DOMContentLoaded", async (event) => {
  displayFlashMessage();

  try {
    const tableBody = document.querySelector("tbody");
    const response = await axios.get("http://localhost:5000/api/motoristas");
    response.data.forEach((motoristas) => {
      const row = tableBody.insertRow(-1);
      row.insertCell(0).innerHTML = motoristas.nomeCompleto;
      row.insertCell(1).innerHTML = motoristas.email;
      row.insertCell(2).innerHTML = motoristas.nascimento;
      row.insertCell(3).innerHTML = motoristas.numeroTel;

            const showLink = document.createElement("a");
      showLink.innerHTML = "Exibir";
      showLink.classList.add("btn", "btn-info", "btn-sm", "mx-1");
      showLink.href = `http://localhost:3001/admin/exibir/${motoristas.id}`;
      row.insertCell(6).appendChild(showLink);

      const editLink = document.createElement("a");
      editLink.innerHTML = "Editar";
      editLink.classList.add("btn", "btn-success", "btn-sm", "mx-1");
      editLink.href = `http://localhost:3001/admin/editar/${motoristas.id}`;
      row.insertCell(7).appendChild(editLink);

      const deleteLink = document.createElement("a");
      deleteLink.innerHTML = "Excluir";
      deleteLink.classList.add("btn", "btn-danger", "btn-sm", "mx-1");
      deleteLink.href = `http://localhost:3001/admin/excluir/${motoristas.id}`;
      row.insertCell(8).appendChild(deleteLink);
      });
  } catch (error) {
    triggerFlashMessage("danger", error.message);
  }
});