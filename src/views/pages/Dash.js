import IsAuthenticated from '../../service/isAuth.js';
import baseURL from '../../service/baseURL.js'

const RequestDataAccount = async () => {

    let dataUser = JSON.parse(localStorage.getItem('userDataAccount'))
    
    let { token, usuario: { login }} = dataUser

    console.log(dataUser)
    
    let headersDefault = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    }
    
    const response = await axios.get(`${baseURL}lancamentos/planos-conta?login=${login}`, headersDefault)
    const allData = response.data
    console.log(allData)
    return allData
}


let Dash = {
    
    render: async () => {
        let ComponentsData = await RequestDataAccount()
        let userData = JSON.parse(localStorage.getItem('userDataAccount'));
        const { usuario: {nome}, conta, token } = userData
        let fullName = nome.split(' ')
        let IsAuth = await IsAuthenticated(!token, 'login');
        let view = `
        <div>
            <div class="dash-contentheading">
                <h1>Seja bem vindo ao seu internet banking</h1>
                <button id="destroy_session" class="btn btn-primary">Encerrar sessão</button>
            </div>
            <h3> Olá, ${fullName[0]}</h3>
            <p> Olá, ${fullName[0]}</p>
            <br>


            <div class="container d-flex">

                <div class="input-group mb-3 m-2 ">
                    <input type="text" class="form-control" id="cpf" maxlegth="11" placeholder="Numero do CPF">
                </div>

                <div class="input-group mb-3 m-2 ">
                    <input type="text" class="form-control" id="description" placeholder="Descrição">
                </div>
            
                <div class="input-group mb-3 m-2 ">
                    <span class="input-group-text">R$</span>
                    <input type="text" class="form-control" id="moneyvalue" placeholder="Valor em reais">
                </div>

                <div class="input-group mb-3 m-2 col-md-3">
                    <button type="button" id="sendtransfer" class="btn btn-primary">Transferir</button>
                </div>
            </div>
            

            <div class="row align-items-center mt-5">
                ${ComponentsData ? ComponentsData.map( data => (`
                <div class="col">  
                         <div class="card" style="width: 100%;">
                             <div class="card-body">
                                 <h5 class="card-title">${data.descricao}</h5>
                                 <h6 class="card-subtitle mb-2 text-muted">${data.login}</h6>
                                 <p class="card-text">Movimentação tipo: ${data.tipoMovimento}</p>
                             </div>
                         </div>
                     </div>`)) : ''}
            </div>
        </div>
        `
        return view
    },
    after_render: async () => {
        document.getElementById('destroy_session').addEventListener('click', function(){
            localStorage.clear()
            window.location.replace('#/login')
        })

        // document.getElementById('sendtransfer').addEventListener('click', function(){
        //     let 

        //     axios.post()
        // })
        
    }
}

export default Dash;