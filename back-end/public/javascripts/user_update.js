document.addEventListener("DOMContentLoaded", () => {
    displayFlashMessage();
  
    const form = document.querySelector("#form");
  
    form.addEventListener("submit", async (event) => {
      event.preventDefault();
  
      if (form.checkValidity()) {
        const email = document.querySelector("#email").value;
        const name = document.querySelector("#name").value;
        const password = document.querySelector("#password").value;
  
        const data = { email, name, password };
        const token = getCookie('token');
        const tokenInfo = decodeToken(token);
        const headers = {'Authorization': `Bearer ${token}`};
  
        try {
          const response = await axios.patch(
                "http://localhost:5000/api/users/`${tokenInfo.id}`",
                data,
                {
                    headers: headers
                }
            );

          // redireciona se necessário.
          // window.location.href = `http://localhost:3000/`;
        } catch (error) {
          // tratar em caso de erro: mensagens, redireciona, etc.
          console.log(error.message);
        }
      }

    });
});