function register(){
    let username = $('#username').val()
    let password = $('#password').val()
    let password2 = $('#password-2').val()
    let email = $('#email').val()
    let phone = $('#phone').val()
    $('.user-icon').css('display', 'none')

    let allUsers

   try{
        allUsers = JSON.parse(localStorage.allUsers)
   } catch(e){
       allUsers = null
   }

    let newUser = {
        username: username,
        password: password,
        email: email,
        phone: phone
    }

    if(!allUsers){
        // if there is no users
        if(password === password2){
            allUsers = {}
            allUsers[username] = newUser
            allUsers = JSON.stringify(allUsers)
            localStorage.allUsers = allUsers
            localStorage.justRegistered = "True"
            gotoLogin()
        } else {
            alert('Passwords does not match')
        }
    } else if(allUsers[username]){
        alert('User with this username is already registered!')
    } else {
        allUsers[username] = newUser
        allUsers = JSON.stringify(allUsers)
        localStorage.allUsers = allUsers
        localStorage.justRegistered = "True"
        gotoLogin()
    }
}

function gotoLogin(){
    let link = document.createElement('a')
    link.href = 'login.html'
    link.click()
}