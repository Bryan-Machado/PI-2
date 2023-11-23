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
        img.id = 'img'
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
    //coleta dos dados do form
    if (form.checkValidity()) {
      const headers = {"Content-Type": "multipart/form-data"};
      const formData = new FormData(form);
      let nascimento = formData.get('nascimento')
      formData.set( 'nascimento', `${nascimento}T00:00:00Z`)


      try {
        const response = await axios.patch(`http://localhost:5000/api/motoristas/atualizar/${urlId}`, formData, headers);
      
        storeFlashMessage("success", "Cadastro realizado sucesso");

      } catch (error) {
        storeFlashMessage("danger", error.message);
      }
    }
    
    form.classList.add("was-validated");
    window.location.href = 'http://localhost:3000/admin/lista-motorista';
  });
});
