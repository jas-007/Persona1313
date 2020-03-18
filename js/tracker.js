const stork = document.getElementById('stork')
var count = 0

function next() {
  count++

  switch(count) {
    case 1:
      stork.classList.add('move-1')
      break

    case 2:
      stork.classList.remove('move-1')
      stork.classList.add('move-2')
      break

    case 3:
      stork.classList.remove('move-2')
      stork.classList.add('move-3')
    break

    case 4:
      stork.classList.remove('move-3')
      stork.classList.add('move-4')
      break

    case 5:
      stork.classList.remove('move-4')
      stork.classList.add('move-5')
      break

    default:
      count = 0
      stork.classList.remove('move-5')
  }
}

if(localStorage.pickup == "True"){
  $('#tracker').css('display', 'none')
  $('#the-header').text('Pickup location: 1050 Pembina Hwy')
}