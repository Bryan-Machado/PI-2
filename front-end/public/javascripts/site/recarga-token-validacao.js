document.addEventListener("DOMContentLoaded", async (event) => {
    const tokenDaSessao = getCookie('token');

        if (tokenDaSessao == null){
            window.location.href = 'http://localhost:3000/logar'
        }
    
    const tokenDecodificado = decodeToken(tokenDaSessao)
    console.log(tokenDecodificado)

    const campoNome = document.querySelector('#nome');
    const campoCPF = document.querySelector('#cpf');
    const botaoSaldo = document.querySelector('#button-saldo');

    var saldoCliente, cpfCliente, nomeCliente;

    try {
        const response = await axios.get(`http://localhost:5000/api/clientes/${tokenDecodificado.id}`);

        saldoCliente = response.data.saldo;
        cpfCliente = response.data.cpf;
        nomeCliente = response.data.nomeCompleto;

        
    } catch (error) {
        alert(error.message)
    }

    botaoSaldo.setAttribute('clicado', 'nao')

    botaoSaldo.addEventListener('click', (event) => {
        if (botaoSaldo.attributes.clicado.value == 'nao'){
            botaoSaldo.innerHTML = `R$${saldoCliente}`
            botaoSaldo.attributes.clicado.value = 'sim'
        } else {
            botaoSaldo.innerHTML = "******"
            botaoSaldo.attributes.clicado.value = 'nao'
        }
    })

    campoNome.value = nomeCliente;
    campoCPF.value = cpfCliente;
    

    const formPatch = document.querySelector('#formulario-recarregar');

     //aqui nois devemos pegar os dados do formulario que vamos enviar para recarregar
    formPatch.addEventListener('submit', async (event) => {
        event.preventDefault();

        const valor = document.querySelector('#recarga-valor').value;
        const dados = { valor }

        try {
            const response = await axios.patch(`http://localhost:5000/api/clientes/recarregar/${tokenDecodificado.id}`, dados);

            alert(`Sucesso! novo saldo: ${saldoCliente + valor}`);

            window.location.reload();
    
            
        } catch (error) {
            alert(error.message)
        }
    })
})