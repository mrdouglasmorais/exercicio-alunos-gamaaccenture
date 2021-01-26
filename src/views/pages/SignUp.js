
import BaseURL from '../../service/BaseURL.js'

// document.postRegisterNewUser = async () =>{
//     const options = {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         }
//     };

//     try {

//         const RegisterData = {
//             name: document.getElementById('username').value,
//             email: document.getElementById('email').value,
//             password: document.getElementById('password').value
//         }

//         // const response = await fetch(BaseURL, {
//         //     method: 'post',
//         //     body: JSON.stringify(RegisterData)
//         // })
//         // const json = await response.json();
//         axios.post(BaseURL, RegisterData, options).then(
//             res => {
//                 console.log(res.data)
//             }
//         )

//         return json
//     } catch (err){
//         console.log('Ocorreu erro', err) 
//     }
// }

let SignUp = {
    render : async () => {
        let view = `
        <div class="container d-flex">
            <div class="col">
                <div class="md-12">
                    <h1>View de nossa SignUp</h1>
                </div>
            </div>
            <div class="col">
                <div class="md-6">
                    <input type="text" id="cpf" maxlength="11" placeholder="Insira seu CPF">
                    <input type="text" id="username" placeholder="name">
                    <input type="text" id="fname" placeholder="email">
                    <input type="password" id="password" placeholder="password">
                    <input type="password" id="re_password" placeholder="password">
                    <button id="submit_new_register">Cadastrar</button>
                </div>
            </div>
        </div>
        `

        return view
    },
    after_render: async () => {
        document.getElementById('submit_new_register').addEventListener('click', () => {
            let nameVal = document.getElementById('fname').value,
                userMail = document.getElementById('username').value,
                passwordVal = document.getElementById('password').value,
                RepasswordVal = document.getElementById('re_password').value,
                CPF = document.getElementById('cpf').value.replace(/[^\d]/g, "")
                console.log(CPF)
            
            if ( passwordVal === RepasswordVal ){

                axios.post(`${BaseURL}usuarios`, {
                    cpf: CPF,
                    login: userMail,
                    nome: nameVal,
                    senha: passwordVal
                }, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                .then( res => {
                    if ( res.status === 200 ){
                        window.location.replace('#/login')
                    }
                })

            } else {
                alert('confira sua senha!')
            }
        })
    }
}

export default SignUp;