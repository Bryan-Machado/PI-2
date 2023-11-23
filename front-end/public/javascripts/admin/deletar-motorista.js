document.addEventListener("DOMContentLoaded", async (event) => {
    displayFlashMessage();

    const url = window.location.href;
    const urlId = url.split("/").pop();

    try {
        const response = await axios.get(`http://localhost:5000/api/motoristas/${urlId}`);
        const motorista = response.data;

        console.log(motorista)

        const labelfoto = document.querySelector('#labelfoto')

        const img = document.createElement('img');
        imagem.innerHTML = '';
        img.src = `http://localhost:5000/${motorista.fotoInput}`
        img.classList.add('foto-em-si');
        labelfoto.appendChild(img)
        document.querySelector("#nomeCompleto").value = motorista.nomeCompleto;
        document.querySelector("#cpf").value = motorista.cpf;
        document.querySelector("#nascimento").value = motorista.nascimento.split("T")[0];
        document.querySelector("#numeroTel").value = motorista.numeroTel;
        document.querySelector("#email").value = motorista.email;
    } catch (error) {
        triggerFlashMessage("danger", error.message);
    }

    const form = document.querySelector("#form");
  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    try {
      const response = await axios.delete(`http://localhost:5000/api/motoristas/deletar/${urlId}`);

      storeFlashMessage("success", "Exclusão realizada com sucesso");
      window.location.href = "http://localhost:3000/admin/lista-motorista";    
    } catch (error) {
      triggerFlashMessage("danger", error.message);
    }
  });
});
