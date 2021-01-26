let Error404 = {

    render : async () => {
        let view =  /*html*/`
            <section class="container text-center">
                <h1> Oops, algo deu errado </h1>
            </section>
        `
        return view
    }
    , after_render: async () => {
    }
}
export default Error404;