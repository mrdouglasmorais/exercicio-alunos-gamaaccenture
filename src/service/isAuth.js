let IsAuthenticated = async (token, route) => {
    if ( token ){
        window.location.replace(`#/${route}`)
    } else {
        console.log('Logado')
    }
} 

export default IsAuthenticated;