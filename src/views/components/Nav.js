let Nav = {
    render: async () => {
        let view =  /*html*/`
             <nav class="navbar" role="navigation" aria-label="main navigation">
                <div class="container">
                    <div class="navbar-brand">
                        <a class="navbar-item" href="/#/">
                            <img class="fluid" src="https://logodownload.org/wp-content/uploads/2014/05/accenture-logo-1-1.png" height="60" width="auto">
                        </a>
                    </div>

                    <div class="navbar-menu">
                        <div class="navbar-start">
                            <a class="navbar-item m-1" href="/#/">
                                Home
                            </a>
                            <a class="navbar-item  m-1" href="/#/signup">
                                Cadastrar
                            </a>
                            <a class="navbar-item m-1" href="/#/login">
                                Entrar
                            </a>
   
                            <a class="button  m-1" href="/#/dashboard">
                                <strong>Logar</strong>
                            </a>
                        </div>
                    </div>
                </div>
            </nav>
        `
        return view
    },
    after_render: async () => { 
    }

}

export default Nav;