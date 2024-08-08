document.addEventListener("DOMContentLoaded", () => {
    const products = {
        Butter: { price: 200.00 },
        cheese: { price: 700.00 },
        "ice-cream": { price: 1000.00 },
        "condensed-milk": { price: 980.00 },
        yogurt: { price: 90.00 },
        tomato: { price: 150.00 },
        potato: { price: 200.00 },
        garlic: { price: 520.00 },
        carrot: { price: 155.00 },
        cauliflower: { price: 600.00 },
        onions: { price: 395.00 },
        beets: { price: 215.00 },
        pumpkin: { price: 80.00 },
        greanbeans: { price: 158.00 },
        Apple: { price: 450.00 },
        Avocado: { price: 325.00 },
        Bannana: { price: 150.00 },
        Strawberry: { price: 450.00 },
        Grapes: { price: 380.00 },
        Pineapple: { price: 250.00 },
        Pears: { price: 300.00 },
        Papaya: { price: 180.00 },
        Orange: { price: 200.00 },
        beef: { price: 1250.00 },
        chicken: { price: 1100.00 },
        sausage: { price: 700.00 },
        burger: { price: 900.00 },
        crab: { price: 2000.00 },
        nethili: { price: 600.00 },
        prown: { price: 700.00 },
        tuna: { price: 400.00 },
        squid: { price: 1700.00 },
        Rice: { price: 900.00 },
        Oil: { price: 1100.00 },
        Salt: { price: 300.00 },
        Flour: { price: 700.00 },
        chili: { price: 90.00 },
        "black-papper": { price: 70.00 },
        eggs: { price: 45.00 },
        Sugar: { price: 500.00 },
        "Cinnamon-Stick": { price: 1000.00 }
    };

    // Getting references
    const tableBody = document.querySelector("#total-table tbody");
    const totalPriceElement = document.getElementById("total-price");

    // Creating add to table function
    function addProductToTable(productId, quantity) {
        if (quantity > 0) {
            const itemTotal = products[productId].price * quantity;
            const row = document.createElement('tr');
            //output table 
            row.innerHTML = `
                <td>${productId.charAt(0).toUpperCase() + productId.slice(1)}</td>
                <td>${itemTotal.toFixed(2)}</td>
                <td>${quantity}</td>`;
            tableBody.appendChild(row);

            //call function to update total price
            updateTotalPrice();
        }
    }

    // Create function to update total price
    function updateTotalPrice() {

        //create var for total
        let total = 0;
        //select all tr in tbody
        tableBody.querySelectorAll('tr').forEach(row => {
            //in every tr get the 1st row and make it to float and stor as item total
            const itemTotal = parseFloat(row.children[1].textContent);
            //add item total to total one by one
            total += itemTotal;
        });
        totalPriceElement.textContent = total.toFixed(2) + ' Rs';
    }

    //get all b1 and b2 button 
    document.querySelectorAll('.B1, .B2').forEach(button => {
        //add event listener to button for & when click it call function event
        button.addEventListener('click', event => {
            event.preventDefault();
            const productId = button.previousElementSibling.querySelector('input').id;
            const quantity = document.getElementById(productId).value;
            //call add-to-table function with product id and quantity 
            addProductToTable(productId, quantity);
        });
    });

    // Order var
    let order = {};

    // Function to update table
    function updateOrderUI(order) {
        tableBody.innerHTML = '';
        //store product and quantity using array and for loop {key,value}
        for (const [productId, quantity] of Object.entries(order)) {
            addProductToTable(productId, quantity);
        }

        //call update total price function
        updateTotalPrice();
    }

    // Add to fav button
    document.getElementById('add-to-favourites').addEventListener('click', () => {
        order = {};
        tableBody.querySelectorAll('tr').forEach(row => {
            const productName = row.children[0].textContent.toLowerCase();
            const quantity = parseInt(row.children[2].textContent);
            order[productName] = quantity;
        });
        localStorage.setItem('favouriteOrder', JSON.stringify(order));
        alert('Order saved as favourite.');
    });

    // Apply fav button
    document.getElementById('apply-favourites').addEventListener('click', () => {
        const favouriteOrder = JSON.parse(localStorage.getItem('favouriteOrder'));
        //create if cundtion to see fav order const has valuve or not
        if (favouriteOrder) {
            updateOrderUI(favouriteOrder);
        } else {
            alert('No favourite order found.');
        }
    });

    // Buy now button
    document.getElementById('buy-now').addEventListener('click', () => {
        order = {};
        //select all tr in table body
        tableBody.querySelectorAll('tr').forEach(row => {
            //in 1st row get the product nam and make it lower case to store easy
            const productName = row.children[0].textContent.toLowerCase();
            //in 2nd row get the quantity in integer 
            const quantity = parseInt(row.children[2].textContent);
            //store the product name and quantity 
            order[productName] = quantity;
        });
        
        // Save the order to get next page
        localStorage.setItem('currentOrder', JSON.stringify(order));
        //redirect browse to order page
        window.location.href = './Order.html';
    });
});
