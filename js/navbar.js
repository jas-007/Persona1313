let loginBtn = $('#loginBtn')
let user = $('.user-icon')

if(localStorage.authorized == 'True'){
    loginBtn.css('display', 'none')
    let user
    let address
    try{
        let username = localStorage.authorizedUser
        user = JSON.parse(localStorage.allUsers)[username]
    } catch(e){
        address = localStorage.unauthorizedUserAddress
    }
    if(user.address){
        document.getElementById('nav-address').innerHTML = 'Delivery:<br>' + user.address
    } else if(address != undefined){
        document.getElementById('nav-address').innerHTML = 'Delivery:<br>' + address
    }
} else {
    user.css('display', 'none')
}