import baseURL from '../../service/baseURL.js'
import IsAuthenticated from '../../service/isAuth.js'

let Login = {
    render : async () => {
        let IsAuth = await IsAuthenticated(localStorage.getItem('@token'), 'dashboard');
        let view = `
        <div>
            <h1>Informe seus dados para acessar sua conta.</h1>
            <div class="d-flex">
                <div class="col-m-6">
                    <img src="https://ghaio.com.br/wp-content/uploads/2019/08/fim-conta-digital.png" width="50%">
                </div>
                <div>
                    <input type="text" id="username" placeholder="Nome de usuário">
                    <input type="password" id="passlogin" placeholder="Senha">
                    <button id="login_start" type="button" class="btn btn-primary btn-lg">Login</button>
                </div>
            </div>
        </div>
        `

        return view
    },
    after_render: async () => {
        document.getElementById('login_start').addEventListener('click', () => {
            let nameUser = document.getElementById('username').value,
                userPass = document.getElementById('passlogin').value
            
            if ( nameUser.length >= 4 && userPass.length >= 4 ){

                axios.post(`${baseURL}login`, {
                    usuario: nameUser,
                    senha: userPass,
                })
                .then( res => {


                        if ( res.status === 200 ){
                            window.location.replace('#/dashboard')
                            localStorage.setItem('userDataAccount', JSON.stringify(res.data))
                        } 
                    
                }).catch((err) => {
                    alert( err.response.data.error)
                    window.location.replace('#/signup') 
                })

            } else {
                alert('Quantidade de caracteres inferior ao permitido')
            }
        })

    }
}

export default Login;