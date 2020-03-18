let cart = JSON.parse(localStorage.cart)
let checkoutItems = $('.checkout-items')
let totalPrice = 0

cart.forEach(dataItem => {
    let cartItem = $('#test-item').clone()
    $(cartItem).find('.heading-8').text(dataItem.name)
    let price = parseFloat(dataItem.price.slice(1, dataItem.price.length)) * parseFloat(dataItem.quantity)
    totalPrice += price
    $(cartItem).find('.text-block-11').text('$' + price)
    $(cartItem).find('input').attr('value', dataItem.quantity)
    $(cartItem).find('.cart-quantity-add').attr('onclick', 'updateQuantity(this, true)')
    $(cartItem).find('.cart-quantity-decrease').attr('onclick', 'updateQuantity(this, false)')
    cartItem.css('display', 'flex')
    cartItem.removeAttr('id')
    checkoutItems.append(cartItem)
    $('#payment-total').text('$' + totalPrice.toFixed(2) + ' CAD')
});

if(localStorage.pickup = "True"){
    localStorage.pickup = "False"
}

$('#total-checkout').text('$' + totalPrice.toFixed(2))
delete totalPrice

function updateQuantity(btn, param){
    let parent = $(btn).parent().parent().parent().parent()
    let name = $(parent).find('h4').text()
    let itemFromObject = undefined
    let index = -1

    for(let i = 0; i < cart.length; i++){
        if(cart[i].name === name){
            itemFromObject = cart[i]
            index = i
        }
    }

    if(itemFromObject){
        if(param){
            itemFromObject.quantity++
        } else {
            if(itemFromObject.quantity == 1){
                // delete this item
                parent.remove()
                cart.splice(index, 1)
                console.log(cart)
            } else {
                itemFromObject.quantity--
            }
        }
        $(parent).find('input').attr('value', itemFromObject.quantity)
        localStorage.cart = JSON.stringify(cart)
        updatePrice()
    } else {
        alert('Bad name!')
    }
}

function updatePrice(){
    let totalPrice = 0
    $('.checkout-item').each((i, item) => {
        let price = $(item).find('.text-block-11').text()
        price = parseFloat(price.slice(1, price.length))
        totalPrice += price
        console.log(price)
    })
    $('#total-checkout').text('$' + totalPrice.toFixed(2))
}

$('#btn-confirm').attr('onclick', 'confirmCart()')

function confirmCart(){
    $('.adjust-quantity').each((i, form) => {
        $(form).find('.cart-quantity-add').remove()
        $(form).find('.cart-quantity-decrease').remove()
        $(form).find('input').css('margin-right', '20px').prop('disabled', 'true')
    })

    $('.subtotal').each((i, line) => {
        $(line).css('display', 'flex')
    })

    $('#btn-confirm').css('display', 'none')
    $('#tax').text('$' + (totalPrice * 0.13).toFixed(2))
    $('#total-after-tax').text('$' + ((totalPrice * 0.13) + totalPrice).toFixed(2))
    $('.delivery-method').css('display', 'block')
    selectDelivery()
}

function showUserPreferences(){
    try{
        let allUsers = JSON.parse(localStorage.allUsers)
        let user = allUsers[localStorage.authorizedUser]

        if(user.paymentOptions){
            $('#payment-name').val(user.paymentOptions.name)
            $('#card-number').val('**** **** **** ' + user.paymentOptions.number)
            $('#exp').val(user.paymentOptions.exp)
            $('#cvv').val(user.paymentOptions.cvv)
            console.log(user.paymentOptions)
        }
    } catch(e){
        console.log(e)
    }
}

function selectDelivery(){
    $('#delivery').addClass('selected')
    $('#pickup').removeClass('selected')
    $('#address-lable').text('Delivery address:')
    if(localStorage.authorizedUser){
        let user = JSON.parse(localStorage.allUsers)
        user = user[localStorage.authorizedUser]
        if(user.address){
            $('#get-address').val(user.address)
        }
    }
    $('.paying-online').css('display', 'block')
    $('.upon-delivery').css('display', 'none')
    showUserPreferences()
}

function selectPickup(){
    $('#pickup').addClass('selected')
    $('#delivery').removeClass('selected')
    $('#get-address').val('pichup address').prop('disabled', true)
    $('#address-lable').text('Pickup Address:')
    $('#nav-address').css('display', 'none')
    $('.upon-delivery').css('display', 'flex')
    $('.paying-online').css('display', 'none')

}

function updateAddress(input){
    try{
        let allUsers = JSON.parse(localStorage.allUsers)
        let username = localStorage.authorizedUser
        let user = allUsers[username]

        if(user){
            user.address = $(input).val()
            localStorage.allUsers = JSON.stringify(allUsers)
            document.getElementById('nav-address').innerHTML = 'Delivery:<br>' + $(input).val()
        }

    } catch(e){
        localStorage.unauthorizedUserAddress = $(input).val()
        document.getElementById('nav-address').innerHTML = 'Delivery:<br>' + $(input).val()
    }
}

function saveCard(){
    try{
        let allUsers = JSON.parse(localStorage.allUsers)
        let user = allUsers[localStorage.authorizedUser]
        let cardNumber = $('#card-number').val().replace(/\s/g, '')

        if(cardNumber.length != 16){
            alert('Wrong card!')
            return
        }

        let paymentOptions = {
            name: $('#payment-name').val(),
            number: cardNumber.slice(12, 16),
            exp: $('#exp').val(),
            cvv: $('#cvv').val()
        }

        user.paymentOptions = paymentOptions
        allUsers[user.username] = user
        console.log(allUsers)
        localStorage.allUsers = JSON.stringify(allUsers)
    } catch(e){
        console.log(e)
    } finally {
        let link = document.createElement('a')
        link.href = 'tracker.html'
        link.click()
    }
}

function payUponDelivery(){
    localStorage.pickup = "True"
    let link = document.createElement('a')
    link.href = 'tracker.html'
    link.click()
}