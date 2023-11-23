document.addEventListener("DOMContentLoaded", async (event) => {
    const tokenDaSessao = getCookie('token');

        if (tokenDaSessao == null){
            window.location.href = 'http://localhost:3000/logar'
        }
    
    const tokenDecodificado = decodeToken(tokenDaSessao)
    conbsole.log(tokenDecodificado)

    const formGet = document.querySelector('#seus-dados'); // formulario que recebera dados do banco preenchidos

    const nomeGet = document.querySelector('#Nome'); // campo ainda não preenchido, devemos preencher com os dados da response e também desabilitar o campo
    const ciGet = document.querySelector('#CI'); // campo de CI, seja lá oque isso seja

    try {
        const response = await axios.get(`http://localhost:5000/api/clientes/${tokenDecodificado.id}`);

        // nomeGet.value = response.data.nomeCompleto;                     Isso é o que eu assumo que voce quer fazer com este formulario.
        // ciGet.value = response.data.id;

        // nomeGet.disabled = true                                          desabilitando os campos pro usuario não mexer
        // ciGet.disabled = true
        
    } catch (error) {
        alert(error.message)
    }

    const formPatch = document.querySelector('#formulario-recarregar');

    const
})