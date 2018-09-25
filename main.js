document.addEventListener("DOMContentLoaded", function (event) {

    let foodMenu = document.querySelector('#foodMenuDropdown')
    let orderList = document.querySelector('.order-in-progress')

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
                foodMenu.appendChild(button);
            }
            return data
        })

        .then(function (data) {
            foodMenu.addEventListener("click", function (event) {
                event.preventDefault()
                let menuSelection = event.target.name
                let menuSelectionPrice = event.target.value
            })
        })

        .catch(function (error) {
            console.log(error)
        });
});