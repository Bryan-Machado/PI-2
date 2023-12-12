// Função para criar um cookie.
const setCookie = (name, value, expirationDays = 1) => {
    const date = new Date();
    date.setTime(date.getTime() + (expirationDays * 24 * 60 * 60 * 1000));
    const expires = `expires=${date.toUTCString()}`;
    document.cookie = `${name}=${value}; ${expires}; SameSite=strict`;
}

// Função para obter um valor de cookie.
const getCookie = (name) => {
    const cookieName = name + "=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookiePairs = decodedCookie.split("; ");

    for (let pair of cookiePairs) {
        if (pair.startsWith(cookieName)) {
            return pair.split("=")[1];
        }
    }

    return null;
}

// Função para atualizar um cookie existente.
const updateCookie = (name, updatedValue) => {
    if (getCookie(name)) {
        setCookie(name, updatedValue);
    }
}

// Função para excluir um cookie.
const deleteCookie = (name) => {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}

// Função para decodificar um token JWT (não valida a assinatura).
const decodeToken = (token) => {
    try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const payload = JSON.parse(atob(base64));
        return payload;
    } catch (error) {
        throw Error('Token inválido.');
    }
}


document.addEventListener("DOMContentLoaded", async (event) => {
    const tokenDaSessao = getCookie('token');
    let loginCheck;
    let token;
    try {
        token = decodeToken(tokenDaSessao);
        loginCheck = true;
    } catch (error) {
        console.log('Você não logou ou não forneceu um token de login válido. Por favor, faça seu login!')
    }

    if (loginCheck){
        const element = document.querySelector('.header-botoes');
        element.innerHTML = '';
        let mensagem = `Bem vindo, ${token.nomeCompleto}`;
        element.innerHTML = `
            <div class="dropdown">
                <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false" style="background-color: #0D116B; min-width: 235px;">
                    ${mensagem}
                </button>
                <ul class="dropdown-menu">
                    <li><a class="dropdown-item" id="botao-logout">Log out</a></li>
                </ul>
            </div>
        `
        const botaoLogout = document.querySelector('#botao-logout')
        botaoLogout.addEventListener('click', (event) => {
            deleteCookie('token');

            window.location.href = 'http://localhost:3000/logar'
        })

    }

})

// Exemplo de uso:
// setCookie("token", "valor");
// Decodificar um JWT:
// const data = decodeToken(token);