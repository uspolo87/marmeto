var apiData;

window.onload = function () {
    // Define the API URL
    const apiUrl = 'https://cdn.shopify.com/s/files/1/0883/2188/4479/files/apiCartData.json?v=1728384889';

    fetch(apiUrl)
        .then(response => {
            return response.json();
        })
        .then(data => {

            apiData = data;
            console.log('API Data:', data);
            renderProduct(data)
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
};


function renderProduct(data) {
    let html = ``;

    var price = 0;
    var quan = 0;

    data.items.forEach(element => {
        price = element.price;
        quan = localStorage.getItem('quan') ? localStorage.getItem('quan') : element.quantity;

        html = html + `
        <div class="product-headings-block">
        <div class="each-product-block">
            <p class="product-heading">Product</p>
    
            <div class="product-name-inner-block">
                <img src="${element.featured_image.url}" alt="${element.featured_image.alt}" class="product-img">
                <p class="product-info prd-name"> ${element.
                product_title}</p>
            </div>
           
        </div>
        <div class="each-product-block">
            <p class="product-heading price">Price</p>
    
    
            <p class="product-info ">Rs.${element.
                original_price}</p>
        </div>
    
        <div class="each-product-block">
            <p class="product-heading">Quantity</p>
            <input type="text" class="quan-input" id=${element.id} value=${quan} class="quan-input">
        </div>
    
        <div class="each-product-block">
            <p class="product-heading">Subtotal</p>
            <p class="product-info sub" id='prod-${element.id}'>Rs. 250,000.00</p>
        </div>
        <img src="assets/delete-icon.svg" alt="delete icon" class="delete-icon">
    
    </div>
        `;
    });

    document.querySelector(".cart-item-diplay-container").innerHTML = html;
    document.querySelector(".stateLoading").style.display = 'none';

    const totalPrice = price * Number(quan); // Multiply price by quantity
    if (totalPrice || totalPrice === 0) {
        document.querySelector('.sub').innerHTML = totalPrice.toFixed(2);
        document.querySelector('.total').innerHTML = totalPrice.toFixed(2);
        document.querySelector('.cart-sub').innerHTML = totalPrice.toFixed(2);
    }





}

document.addEventListener('input', function (event) {
    if (event.target.classList.contains('quan-input')) {
        document.querySelector(".stateLoading").style.display = 'block';

        const inputElement = event.target;
        const quantity = parseInt(inputElement.value); // Get the new quantity
        const itemId = +inputElement.id; // Get the id from the input element

        // Find the matching item from the cart data
        const matchingItem = apiData.items.find(item => item.id === itemId);

        if (matchingItem) {
            const totalPrice = matchingItem.price * quantity; // Multiply price by quantity
            localStorage.setItem('quan', quantity)
            if (totalPrice || totalPrice === 0) {
                document.querySelector('.sub').innerHTML = totalPrice.toFixed(2);
                document.querySelector('.total').innerHTML = totalPrice.toFixed(2);
                document.querySelector('.cart-sub').innerHTML = totalPrice.toFixed(2);
            }


            document.querySelector(".stateLoading").style.display = 'none';
        }
    }
})

document.getElementById('cancel-delete').addEventListener('click', function () {
    document.getElementById('delete-confirmation').classList.remove('show');
});

document.getElementById('confirm-delete').addEventListener('click', function () {
    document.querySelector(".cart-item-diplay-container").innerHTML = '';
    document.getElementById('delete-confirmation').classList.remove('show');

});

document.addEventListener('click', function (event) {
    if (event.target.classList.contains('delete-icon')) {

        // Show the confirmation alert
        const confirmAlert = document.getElementById('delete-confirmation');
        confirmAlert.classList.add('show'); // Display the confirmation alert
    }
});

