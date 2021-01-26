import IsAuthenticated from '../../service/isAuth.js';

let Dash = {
    render: async () => {
        let userData = JSON.parse(localStorage.getItem('userDataAccount'));
        const { usuario: {nome}, conta } = userData
        let fullName = nome.split(' ')
        let IsAuth = await IsAuthenticated(!localStorage.getItem('@token'), 'login');
        let view = `
        <div>
            <div class="dash-contentheading">
                <h1>Seja bem vindo ao seu internet banking</h1>
                <button id="destroy_session" class="dash-button--logout">Encerrar sessão</button>
            </div>
            <h3> Olá, ${fullName[0]}</h3>
            <p>Seu saldo em conta é:</p>
            <p>${conta.saldo.toLocaleString('pt-br', {style: 'currency', currency: 'BRL'})}</p>
        </div>
        `
        return view
    },
    after_render: async () => {
        document.getElementById('destroy_session').addEventListener('click', function(){
            localStorage.clear()
            window.location.replace('#/login')
        })
    }
}

export default Dash;