document.addEventListener("DOMContentLoaded", () => {

    const token = getCookie('token');
    // const tokenInfo = decodeToken(token);
    console.log(token);

    const form = document.querySelector("#formulario");
  
    form.addEventListener("submit", async (event) => {
      event.preventDefault();
  
      if (form.checkValidity()) {
        const email = document.querySelector("#email").value;
        const senha = document.querySelector("#senha").value;
        const data = { email, senha };
  
        try {
          const response = await axios.post("http://localhost:5000/api/admin/login", data);
  
          const token = response.data.accessToken;
          setCookie('token', token);

          // decodifica o token para acessar os dados do payload.
          const tokenInfo = decodeToken(token);
          console.log(tokenInfo);

          // redireciona se necessário.
          window.location.href = `http://localhost:3000/admin/`;
        } catch (error) {
          // tratar em caso de erro: mensagens, redireciona, etc.
          console.log(error.message);
        }
      }

    });
});