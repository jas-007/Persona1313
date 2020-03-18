let increaseForms = $('.form-block-8')

let cartItem = $('.cart-items:first-child')

$('.item-hint').hover(() => {
    setTimeout(() => {
        $('.item-hint').remove()
    }, 2000)
})

let sections = [$('#burgers'), $('#sandwiches'), $('#sides'), $('#drinks'), $('#desserts')]
let menuBtns = [$('#menu-burgers'), $('#menu-sandwiches'), $('#menu-sides'), $('#menu-drinks'), $('#menu-desserts')]

sections.forEach(item => {
    item.css('display', 'none')
})

menuBtns.forEach((btn, i) => {
    $(btn).attr('onclick', 'showSection(' + i + ')')
})

try{
    let cart = JSON.parse(localStorage.cart)
    let cartItems = $('.cart-items')
    cart.forEach(dataItem => {
        console.log(dataItem)
        // create item
        let item = $('#sample-item').clone()
        item.css('display', 'flex')
        item.find('.cart-item-price').text(dataItem.price)
        item.find('.cart-item-name').text(dataItem.name)
        item.attr('id', dataItem.name.replace(/\s/g, ''))
        item.find('input').attr('value', dataItem.quantity)
        item.attr('parent', 'parent' + dataItem.name.replace(/\s/g, ''))
        let price = parseFloat(dataItem.quantity) * parseFloat(dataItem.price.slice(1, dataItem.price.length))
        item.find('.cart-item-price').text('$' + price.toFixed(2))
        item.attr('price-each', dataItem.price)
        cartItems.append(item)
    })
    updateTotalPrice()
}catch(e){
    console.log('Error:\n' + e)
}

showSection(0)

function showSection(i){

    menuBtns.forEach(btn => {
        $(btn).find('.menu-category').removeClass('selected')
        $(btn).find('.dark-filter').css('display', 'block')
    })

    $(menuBtns[i]).find('.menu-category').addClass('selected')
    $(menuBtns[i]).find('.dark-filter').css('display', 'none')

    sections.forEach(section => {
        section.css('display', 'none')
    })

    sections[i].css('display', 'block')
}

Array.prototype.forEach.call(increaseForms, (form) => {
    $(form).find('.w-form-done').remove()
    $(form).find('.w-form-fail').remove()

    let increaseBtn = $(form).find('.btn-add.w-button')
    let decreaseBtn = $(form).find('.btn-remove.w-button')
    let inputField = $(form).find('.text-field-3.w-input')
    $(inputField).removeAttr('id')
    $(inputField).attr('value', '0')
    $(inputField).attr('onchange', 'updateCart(this, null)')

    $(increaseBtn).css('z-index', '999')
    $(decreaseBtn).css('z-index', '999')

    $(increaseBtn).attr('onclick', 'increaseAmount(this)')
    $(decreaseBtn).attr('onclick', 'decreaseAmount(this)')
})

$('.item-cols').each((i, cols) => {
    $(cols).attr('id', 'parent' + $(cols).find('.heading-12').text().replace(/\s/g, ''))
})

function increaseAmount(btn){
    let input = $(btn).parent().find('input')
    let val = input.attr('value')
    val++
    $(input).attr('value', val)
    updateCart(btn, val)
}

function decreaseAmount(btn){
    let input = $(btn).parent().find('input')
    let val = input.attr('value')
    val--
    if(val >= 0){
        $(input).attr('value', val)
        updateCart(btn, val)
    }
    
}

function updateCart(btn, val){
    if(val == null){
        val = btn.value
    }

    let parentObject = $(btn).parent().parent().parent().parent()

    if(parentObject.attr('parent')){
        parentObject = $('#' + parentObject.attr('parent'))
        $(parentObject).find('input').attr('value', val)
    }

    let name = parentObject.find('.heading-12').text()
    let price = parentObject.find('.price-text').text()
    let cartItems = $('.cart-items')

    let item = $(cartItems).find('#' + name.replace(/\s/g, ''))

    if(val == 0){
        $(item).remove()
    } else if(item.length){
        // update item
        item.find('input').attr('value', val)
        item.find('.cart-item-price').text('$' + (parseFloat(price.slice(1, price.length)) * parseFloat(val)))
    } else {
        // create item
        let item = $('#sample-item').clone()
        item.css('display', 'flex')
        item.find('.cart-item-price').text('$' + (parseFloat(price.slice(1, price.length)) * parseFloat(val)))
        item.find('.cart-item-name').text(name)
        item.attr('id', name.replace(/\s/g, ''))
        item.find('input').attr('value', val)
        item.attr('parent', parentObject.attr('id'))
        item.attr('price-each', price)
        cartItems.append(item)
    }
    updateTotalPrice()
    saveCart()
}

async function updateTotalPrice(){
    let cart = $('.cart')
    let total = 0
    await $(cart).find('.cart-item').each((i, item) => {
        let priceString = $(item).find('.cart-item-price').text()
        priceString = priceString.slice(1, priceString.length)
        total += parseFloat(priceString)
    })
    if(total == 0){
        $(cart).find('.cart-total').css('display', 'none')
        $('.button-2').css('display', 'none')
        $('#nav-total-show').text('$0.00')
    } else {
        $(cart).find('#cart-total').text('$' + total.toFixed(2))
        $('#nav-total-show').text('$' + total.toFixed(2))
        $(cart).find('.cart-total').css('display', 'flex')
        $('.button-2').css('display', 'block')
    }
}

async function saveCart(){
    let cart = []
    await $('.cart').find('.cart-item').each((i, block) => {
        let item = {
            name: $(block).find('.cart-item-name').text(),
            price: $(block).attr('price-each'),
            quantity: $(block).find('input').attr('value')
        }
        cart.push(item)
    })
    localStorage.cart = JSON.stringify(cart)
}