let nav_error = $('.nav-error')
let loginSection = $('#login-section')
let resetSection = $('#reset-password-section')
renderLogin()

if(localStorage.authorized == "True"){
    localStorage.authorized = "False"
}

if(!typeof(localStorage)){
    nav_error.css('display', 'block')
} else {
    nav_error.remove()
}

function login(){
    let username = $('#username').val()
    let password = $('#password').val()
    let authorized = false

    let allUsers = JSON.parse(localStorage.allUsers)

    if(allUsers){
        if(allUsers[username].password === password){
            authorized = true
            localStorage.authorized = "True"
            localStorage.authorizedUser = username
            let link = document.createElement('a')
            link.href = "index.html"
            link.click()
        } else {
            alert('User with this password was not found')
        }
    } else {
        alert('The system has no users yet')
    }

    console.log(authorized)
}

function renderLogin(){
    if(localStorage.justRegistered === "True"){
        $('#text-after-register').css('display', 'block')
        localStorage.justRegistered = "False"
    }
    if(localStorage.passwordWasReset === "True"){
        $('#text-after-register').text('Your password was successfully reset').css('display', 'block')
        localStorage.passwordWasReset = "False"
    }
}

function showResetPassword(){
    loginSection.css('display', 'none')
    resetSection.css('display', 'flex')
}

function showLoginSection(){
    loginSection.css('display', 'flex')
    resetSection.css('display', 'none')
}

function resetPassword(){
    let username = $('#username-reset').val()
    let password = $('#password-reset').val()
    let password2 = $('#password-2-reset').val()

    let allUsers = JSON.parse(localStorage.allUsers)

    if(allUsers){
        let user = allUsers[username]
        if(user){
            if(password === password2){
                user.password = password
                allUsers = JSON.stringify(allUsers)
                localStorage.allUsers = allUsers
                localStorage.passwordWasReset = "True"
                showLoginSection()
                renderLogin()
            } else {
                alert('passwords does not match')
            }
        } else {
            alert('This user is not registered')
        }
    } else {
        alert('The system has no users, register first!')
    }
}