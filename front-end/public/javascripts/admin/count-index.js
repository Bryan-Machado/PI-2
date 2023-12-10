document.addEventListener('DOMContentLoaded', async () => {
    const motoristas = document.querySelector('#count-motoristas');
    const clientes = document.querySelector('#count-clientes');
    const linhas = document.querySelector('#count-linhas');

    try {
        const response = await axios.get('http://localhost:5000/api/count')
        const total = response.data

        motoristas.innerHTML = total.motoristas
        clientes.innerHTML = total.clientes
        linhas.innerHTML = total.linhas

    } catch (error) {
        alert('Não foi possível retornar a quantidade de funcionários, clientes e linhas.')
    }
})
