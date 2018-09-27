document.addEventListener("DOMContentLoaded", function (event) {

    let foodMenuHead = document.querySelector('#foodMenuHead')
    let foodMenu = document.querySelector('#foodMenuDropdown')
    let orderQty = document.querySelector('#qty')
    let orderItem = document.querySelector('#menu-item')
    let orderPrice = document.querySelector('#menu-price')
    let addItem = document.querySelector('#add-items')
    let submitOrder = document.querySelector('#submit-order')
    let menuSelection 
    let menuSelectionPrice
    let subTotalTally = 0
    let tipAdd= document.querySelector('.add-tip')
    let tipButton = document.querySelector('.tip-title')
    let subTotalField = document.querySelector('.sub-total-field')
    let taxField = document.querySelector('.tax-field')
    let totalField = document.querySelector('.total-field')
    let total

    fetch('https://galvanize-eats-api.herokuapp.com/menu')
        .then(function (response) {
            return response.json()
        })

        .then(function (data) {
            console.log(data)
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
                console.log(event.target)
                foodMenuHead.innerHTML = event.target.innerHTML
                menuSelection = event.target.name
                menuSelectionPrice = event.target.value
            }) 
            addItem.addEventListener("click", function(event) {
                event.preventDefault()
                var quantity = parseInt(document.querySelector('.quantity').value)
                console.log(quantity)
                let qty = document.createElement('div')
                qty.innerHTML = `${quantity} x`
                qty.setAttribute('class', '.col-md-3')
                orderQty.appendChild(qty)
                let menuItem = document.createElement('div')  
                menuItem.innerHTML = `${menuSelection}` 
                menuItem.setAttribute('class', '.col-md-6') 
                orderItem.appendChild(menuItem)
                let menuPrice = document.createElement('div')
                menuPrice.innerHTML = `$${quantity * menuSelectionPrice}`
                menuPrice.setAttribute('class', '.col-md-3')
                orderPrice.appendChild(menuPrice)
                foodMenuHead.innerHTML = "Add Additional Items"
                subTotalTally += menuSelectionPrice * quantity
                subTotalField.innerHTML = `$${subTotalTally}`
                var tax = (subTotalTally * .0765).toFixed(2)
                taxField.innerHTML = `$${tax}`
                total = (subTotalTally * 1.0765).toFixed(2)
                totalField.innerHTML = `$${total}`
                return data
            }) 
        })    
            .then(function(data) {
                tipButton.addEventListener("click", function() {
                newTotal = parseFloat(total) + parseFloat(tipAdd.value)
                console.log(total)
                totalField.innerHTML = `Total       $${newTotal}`
                })
            })  

            .then(function () {
                submitOrder.addEventListener('click', submit)
                function submit(event) {
                    event.preventDefault();
                    let fullName = document.querySelector('#name-full').value
                    let phoneNumber = document.querySelector('#phone-info').value
                    let streetAddress = document.querySelector('#inputAddress').value
                    let city = document.querySelector('#inputCity').value
                    let state = document.querySelector('#inputState').value
                    let zipcode = document.querySelector('#inputZip').value
                    let order = document.querySelectorAll('li')
                    console.log(order)
                    let orderArr = []
                    for (let i = 0; i < order.length; i++){
                        orderArr.push(order[i].innerText)
                    }

                    let submitObject= ({
                        "fullName": fullName,
                        "phoneNumber": phoneNumber,
                        "streetAddress": streetAddress,
                        "city": city,
                        "state": state,
                        "zipcode": zipcode,
                        "order": orderArr,
                    })
                    console.log(submitObject)
                    fetch ("https://galvanize-eats-api.herokuapp.com/orders", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json; charset=utf-8"
                        },
                        body: JSON.stringify(submitObject)
                    })
                    .then(function (){
                        swal("Congratulations!", "Your Delivery is on the Way!", "success") 
                    })
                } 
            })
            
        .catch(function (error) {
            console.log(error)
        });
});