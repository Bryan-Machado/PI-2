document.addEventListener("DOMContentLoaded", () => {
    displayFlashMessage();
  
    const form = document.querySelector("#form");
  
    form.addEventListener("submit", async (event) => {
      event.preventDefault();
  
      if (form.checkValidity()) {
        const email = document.querySelector("#email").value;
        const password = document.querySelector("#password").value;
  
        const data = { email, password };
  
        try {
          const response = await axios.post("http://localhost:5000/api/users/login", data);
  
          const token = response.data.accessToken;
          setCookie('token', token);

          // decodifica o token para acessar os dados do payload.
          const tokenInfo = decodeToken(token);
          console.log(tokenInfo);

          // redireciona se necessário.
          // window.location.href = `http://localhost:3000/`;
        } catch (error) {
          // tratar em caso de erro: mensagens, redireciona, etc.
          console.log(error.message);
        }
      }

    });
});