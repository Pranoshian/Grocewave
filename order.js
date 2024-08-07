document.addEventListener('DOMContentLoaded', () => {
    // Get references to DOM elements
    const orderTable = document.getElementById('total-table').querySelector('tbody');
    const totalPriceElement = document.getElementById('total-price');
    const orderForm = document.getElementById('order-form');
    const checkboxes = document.querySelectorAll('input[name="payment"]');
    const theForm = document.getElementById("order-form");

    // Retrieve the current order from local storage
    const currentOrder = JSON.parse(localStorage.getItem('currentOrder'));

    // Define product prices
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

    // Calculate and display the order details and total price
    //make var as total proce and assign valuve as 0
    let totalPrice = 0;
    //using for loop change the currentorder into array with key and value
    for (const [productId, quantity] of Object.entries(currentOrder)) {
        //get price
        const product = products[productId];
        //calculate item total  
        const itemTotal = product.price * quantity;
        //create a tr element and store as row
        const row = document.createElement('tr');

        row.innerHTML = `<td>${productId.charAt(0).toUpperCase() + productId.slice(1)}</td>
        <td>${itemTotal.toFixed(2)}</td>
        <td>${quantity}</td>`;
        orderTable.appendChild(row);
        totalPrice += itemTotal;
    }
    totalPriceElement.textContent = totalPrice.toFixed(2) + ' Rs';

    // Handle form submission
    orderForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        if (validateForm(formData)) {
            alert(`Thank you for your purchase! Your order will be delivered on ${getDeliveryDate()}.`);
            localStorage.removeItem('currentOrder');
            window.location.href = 'index.html';
        }
    });

    // Function to validate form inputs
   function validateForm(formData) {
    // Check if the form is valid
    if (!theForm.checkValidity()) {
        // Prevent form submission if not valid
        return false;
    }
    return true;
}


    // Function to get the delivery date
    function getDeliveryDate() {
        //create totay const and store system  date 
        const today = new Date();
        //get the day and add 2 day 
        today.setDate(today.getDate() + 2);
        //return today and convert date string as human readable
        return today.toDateString();
    }

    
    //make check box to select only ones at time
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            if (checkbox.checked) {
                checkboxes.forEach(cb => cb !== checkbox && (cb.checked = false));
            }
        });
    });
});
