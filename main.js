document.addEventListener("DOMContentLoaded", function (event) {

    let foodMenuHead = document.querySelector('#foodMenuHead')
    let foodMenu = document.querySelector('#foodMenuDropdown')
    let orderList = document.querySelector('.order-in-progress')
    let addItem = document.querySelector('#add-items')
    let submitOrder = document.querySelector('#submit-order')
    let menuSelection 
    let menuSelectionPrice
    let subTotalTally = 0
    let tipAdd= document.querySelector('.add-tip')
    let tipButton = document.querySelector('.tip-title')
    let subTotal = document.querySelector('.sub-total')
    let taxField = document.querySelector('.tax')
    let totalField = document.querySelector('.total')
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
                foodMenuHead.innerHTML = event.target.innerHTML
                menuSelection = event.target.name
                menuSelectionPrice = event.target.value
            }) 
            addItem.addEventListener("click", function(event) {
                event.preventDefault()
                var quantity = parseInt(document.querySelector('.quantity').value)
                let li = document.createElement('li')
                li.innerHTML = `${quantity} x     ${menuSelection} $${quantity * menuSelectionPrice}`
                orderList.appendChild(li)
                foodMenuHead.innerHTML = "Add Additional Items"
                subTotalTally += menuSelectionPrice * quantity
                subTotal.innerHTML = `Subtotal    $${subTotalTally}`
                var tax = (subTotalTally * .075).toFixed(2)
                taxField.innerHTML = `Tax      $${tax}`
                total = (subTotalTally * 1.075).toFixed(2)
                totalField.innerHTML = `Total       $${total}`
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
                    let submitObject= ({
                        "fullName": fullName,
                        "phoneNumber": phoneNumber,
                        "streetAddress": streetAddress,
                        "city": city,
                        "state": state,
                        "zipcode": zipcode,
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