document.addEventListener("DOMContentLoaded", function (event) {
    
    let foodMenu = document.querySelector('#foodMenuDropdown');
    
    fetch('https://galvanize-eats-api.herokuapp.com/menu')
        .then(function (response) {
            return response.json()
        })

        .then(function (data) {
            for (let i = 0; i < data.menu.length; i++) {
                let button = document.createElement('button')
                button.setAttribute('value', data.menu[i].name)
                button.setAttribute('value2', data.menu[i].price)
                button.setAttribute('class', 'button-border dropdown-item')
                button.innerHTML = `${data.menu[i].name} $${data.menu[i].price}` 
                foodMenu.appendChild(button); 
            }
            return data
        })

        .catch(function (error) {
            console.log(error)
            });
    });