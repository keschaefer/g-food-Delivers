document.addEventListener("DOMContentLoaded", function (event) {

    let foodMenuHead = document.querySelector('#foodMenuHead')
    let foodMenu = document.querySelector('#foodMenuDropdown')
    let orderList = document.querySelector('.order-in-progress')
    let addItem = document.querySelector('#add-items')
    let submitOrder = document.querySelector('#submit-order')
    var menuSelection 
    var menuSelectionPrice
    var subTotalTally = 0
    var subTotal = document.querySelector('.sub-total')
    var tax = 

    fetch('https://galvanize-eats-api.herokuapp.com/menu')
        .then(function (response) {
            return response.json()
        })

        .then(function (data) {
            for (let i = 0; i < data.menu.length; i++) {
                let button = document.createElement('button')
                button.setAttribute('name', data.menu[i].name)
                button.setAttribute('value', data.menu[i].price)
                button.setAttribute('class', 'button-border dropdown-item')
                button.innerHTML = `${data.menu[i].name} $${data.menu[i].price}`
                foodMenu.appendChild(button)
            }
            return data
        })

        .then(function (data) {
            foodMenu.addEventListener("click", function(event) {
                event.preventDefault()
                foodMenuHead.innerHTML = event.target.innerHTML
                menuSelection = event.target.name
                menuSelectionPrice = event.target.value
            }) 
            addItem.addEventListener("click", function(event) {
                event.preventDefault()
                var quantity = parseInt(document.querySelector('.quantity').value)
                console.log(quantity)
                let li = document.createElement('li')
                li.innerHTML = `${menuSelection} Qty. ${quantity} ${quantity * menuSelectionPrice}`
                orderList.appendChild(li)
                subTotalTally += menuSelectionPrice * quantity
                subTotal.innerHTML = `Subtotal    $ ${subTotalTally}`
                foodMenuHead.innerHTML = "Add Additional Items"
            })
        })

        .catch(function (error) {
            console.log(error)
        });
});