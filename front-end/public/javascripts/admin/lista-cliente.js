const axios = require('axios').default;

document.addEventListener("DOMContentLoaded", async (event) => {
  displayFlashMessage();

  try {
    const tableBody = document.querySelector("tbody");
    const response = await axios.get("http://localhost:5000/api/clientes");
    response.data.forEach((clientes) => {
      const row = tableBody.insertRow();
      row.insertCell(0).innerHTML = clientes.nomeCompleto;
      row.insertCell(1).innerHTML = clientes.email;
      row.insertCell(2).innerHTML = clientes.nascimento;
      row.insertCell(3).innerHTML = clientes.numeroTel;
      row.insertCell(4).innerHTML = clientes.cpf; 

      const showLink = document.createElement("a");
      showLink.innerHTML = "Exibir";
      showLink.classList.add("btn", "btn-info", "btn-sm", "mx-1");
      showLink.href = `http://localhost:3001/admin/exibir/${clientes.id}`;
      row.insertCell(5).appendChild(showLink);

      const editLink = document.createElement("a");
      editLink.innerHTML = "Editar";
      editLink.classList.add("btn", "btn-success", "btn-sm", "mx-1");
      editLink.href = `http://localhost:3001/admin/editar/${clientes.id}`;
      row.insertCell(6).appendChild(editLink);

      const deleteLink = document.createElement("a");
      deleteLink.innerHTML = "Excluir";
      deleteLink.classList.add("btn", "btn-danger", "btn-sm", "mx-1");
      deleteLink.href = `http://localhost:3001/admin/excluir/${clientes.id}`;
      row.insertCell(7).appendChild(deleteLink);
      });
  } catch (error) {
    triggerFlashMessage("danger", error.message);
  }
});