import IsAuthenticated from '../../service/isAuth.js';
import baseURL from '../../service/baseURL.js'
import DayName from '../../service/DayName.js'
import MonName from '../../service/MonName.js'

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

const ModalCredit = (`
<button data-toggle="modal" data-target="#modal_aside_right" class="btn btn-primary" type="button">  Depósitos  </button>
<div id="modal_aside_right" class="modal fixed-right fade" tabindex="-1" role="dialog">
  <div class="modal-dialog modal-dialog-aside" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Realize um depósito</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <p><p>Aqui vamos adicionar nossos inputs.</p></p>

      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>
        <button type="button" class="btn btn-primary">Realizar transação</button>
      </div>
    </div>
  </div> 
</div> 
`)

const ModalDebit = (`
<button data-toggle="modal" data-target="#modal_aside_left" class="btn btn-primary" type="button">  Pagamentos  </button>
<div id="modal_aside_left" class="modal fixed-left fade" tabindex="-1" role="dialog">
  <div class="modal-dialog modal-dialog-aside" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Pagamentos</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <p>Aqui vamos adicionar nossos inputs.</p>

      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>
        <button type="button" class="btn btn-primary">Realizar transação</button>
      </div>
    </div>
  </div>
</div>
`)


let Dash = {
    
    render: async () => {
        let ComponentsData = await RequestDataAccount()
        let userData = JSON.parse(localStorage.getItem('userDataAccount'));
        const dateNow = new Date();
        const { usuario: {nome}, conta, token } = userData
        let fullName = nome.split(' ')
        let IsAuth = await IsAuthenticated(!token, 'login');
        let view = `
        <div>
            <div class="dash-contentheading">
                <h1>Seja bem vindo ao seu internet banking</h1>
                <div>
                    <button id="refresh" class="btn btn-primary">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-repeat" viewBox="0 0 16 16">
                            <path d="M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41zm-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9z"/>
                            <path fill-rule="evenodd" d="M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002 6.002 0 0 1 13.917 7H12.9A5.002 5.002 0 0 0 8 3zM3.1 9a5.002 5.002 0 0 0 8.757 2.182.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9H3.1z"/>
                        </svg>
                    </button>
                    <button id="destroy_session" class="btn btn-primary">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-box-arrow-right" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z"/>
                            <path fill-rule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"/>
                        </svg>
                    </button>
                </div>
            </div>
            <div class="alert alert-warning alert-dismissible fade show" role="alert">
                <button id="myButtonAlert" type="button" class="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
                Hoje é ${DayName[dateNow.getDay()]} dia ${dateNow.getDate()} de ${MonName[dateNow.getMonth()]} de ${dateNow.getFullYear()}
            </div> 


            <h3> Olá, ${fullName[0]}</h3>
            <p> Olá, ${fullName[0]}</p>
            <br>

            ${ModalCredit}
            ${ModalDebit}

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