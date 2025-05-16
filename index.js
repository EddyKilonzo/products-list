const desertMenu = document.getElementById("cards");
const addToCart = document.getElementById("add-to-cart");
const orders = document.getElementById("orders");
const remove = document.getElementById("remove");
const total = document.getElementById("total");


const data = [
    {
       "image": {
            "thumbnail": "./assets/images/image-waffle-thumbnail.jpg",
            "mobile": "./assets/images/image-waffle-mobile.jpg",
            "tablet": "./assets/images/image-waffle-tablet.jpg",
            "desktop": "./assets/images/image-waffle-desktop.jpg"
       },
       "name": "Waffle with Berries",
       "category": "Waffle",
       "price": 6.50
    },
    {
        "image": {
            "thumbnail": "./assets/images/image-creme-brulee-thumbnail.jpg",
            "mobile": "./assets/images/image-creme-brulee-mobile.jpg",
            "tablet": "./assets/images/image-creme-brulee-tablet.jpg",
            "desktop": "./assets/images/image-creme-brulee-desktop.jpg"
        },
        "name": "Vanilla Bean Crème Brûlée",
        "category": "Crème Brûlée",
        "price": 7.00
     },
     {
        "image": {
            "thumbnail": "./assets/images/image-macaron-thumbnail.jpg",
            "mobile": "./assets/images/image-macaron-mobile.jpg",
            "tablet": "./assets/images/image-macaron-tablet.jpg",
            "desktop": "./assets/images/image-macaron-desktop.jpg"
        },
        "name": "Macaron Mix of Five",
        "category": "Macaron",
        "price": 8.00
     },
     {
        "image": {
            "thumbnail": "./assets/images/image-tiramisu-thumbnail.jpg",
            "mobile": "./assets/images/image-tiramisu-mobile.jpg",
            "tablet": "./assets/images/image-tiramisu-tablet.jpg",
            "desktop": "./assets/images/image-tiramisu-desktop.jpg"
        },
        "name": "Classic Tiramisu",
        "category": "Tiramisu",
        "price": 5.50
     },
     {
        "image": {
            "thumbnail": "./assets/images/image-baklava-thumbnail.jpg",
            "mobile": "./assets/images/image-baklava-mobile.jpg",
            "tablet": "./assets/images/image-baklava-tablet.jpg",
            "desktop": "./assets/images/image-baklava-desktop.jpg"
        },
        "name": "Pistachio Baklava",
        "category": "Baklava",
        "price": 4.00
     },
     {
        "image": {
            "thumbnail": "./assets/images/image-meringue-thumbnail.jpg",
            "mobile": "./assets/images/image-meringue-mobile.jpg",
            "tablet": "./assets/images/image-meringue-tablet.jpg",
            "desktop": "./assets/images/image-meringue-desktop.jpg"
        },
        "name": "Lemon Meringue Pie",
        "category": "Pie",
        "price": 5.00
     },
     {
        "image": {
            "thumbnail": "./assets/images/image-cake-thumbnail.jpg",
            "mobile": "./assets/images/image-cake-mobile.jpg",
            "tablet": "./assets/images/image-cake-tablet.jpg",
            "desktop": "./assets/images/image-cake-desktop.jpg"
        },
        "name": "Red Velvet Cake",
        "category": "Cake",
        "price": 4.50
     },
     {
        "image": {
            "thumbnail": "./assets/images/image-brownie-thumbnail.jpg",
            "mobile": "./assets/images/image-brownie-mobile.jpg",
            "tablet": "./assets/images/image-brownie-tablet.jpg",
            "desktop": "./assets/images/image-brownie-desktop.jpg"
        },
        "name": "Salted Caramel Brownie",
        "category": "Brownie",
        "price": 4.50
     },
     {
        "image": {
            "thumbnail": "./assets/images/image-panna-cotta-thumbnail.jpg",
            "mobile": "./assets/images/image-panna-cotta-mobile.jpg",
            "tablet": "./assets/images/image-panna-cotta-tablet.jpg",
            "desktop": "./assets/images/image-panna-cotta-desktop.jpg"
        },
        "name": "Vanilla Panna Cotta",
        "category": "Panna Cotta",
        "price": 6.50
     }
]

function showDeserts(deserts) {
    desertMenu.innerHTML = ``;

    deserts.forEach((desert) => {
        const card = document.createElement("div");
        const cartIcon = "./assets/images/icon-add-to-cart.svg"; 
        card.classList.add("card");

        card.innerHTML = `
            <div class="imageItem">
                <img src="${desert.image.desktop}" alt="">
            </div>
            <div class="add-to-cart" style="cursor:pointer;" ">
                <img src="${cartIcon}" alt="Cart Icon">
                <p>Add to Cart</p>
            </div>
            <div class="description">
                <p>${desert.category}</p>
                <h5>${desert.name}</h5>
                <p class="price">$${desert.price}</p>
            </div>
        `;
        desertMenu.appendChild(card);

        
        const addToCartBtn = card.querySelector('.add-to-cart');
        addToCartBtn.addEventListener('click', () => {
            
            addDesertToCart(desert);
        });
    });
}
showDeserts(data);


function  addDesertToCart(desert) {
    if (!orders || !desert) return;

    orders.innerHTML = ``;
    


    const order = document.createElement("div");
    order.classList.add("order");

   
    if (!window.cart) window.cart = [];

    
    const existing = window.cart.find(order => order.name === desert.name);
    if (existing) {
        existing.quantity += 1;
    } else {
        window.cart.push({ ...desert, quantity: 1 });
    }

    
    orders.innerHTML = '';
    window.cart.forEach(order => {

        const orderItem = document.createElement("div");
        const tree = "./assets/images/icon-carbon-neutral.svg";
        orderItem.classList.add("order");


        orderItem.innerHTML = `
            <div class="calculation">
                <div class="name">
                    <p>${order.name}</p> 
                </div>
                <div class="price">
                    <p class="number">${order.quantity} *</p>
                    <p>${order.price}</p>
                    <p>$${(order.price * order.quantity).toFixed(2)}</p>
                </div>
            </div>
            <div id="remove" class="remove" >
                <img src="./assets/images/icon-remove-item.svg" alt="">
            </div>

        `;
        
        
        orders.appendChild(orderItem);
    });
    orders.appendChild(order);

    
    
    total.innerHTML = ``; 
    
    const totalDiv = document.createElement("div");
    totalDiv.classList.add("total");
    
    totalDiv.innerHTML = `
    
    <div class="total" style="gap: 130px;">
        <p style="margin-right: 10px; font-size:18px;">Total</p>
        <p style="font-weight: 700; color:hsl(14, 86%, 42%); font-size:16px;">$${window.cart.reduce((total, order) => 
            total + order.price * order.quantity, 0).toFixed(2)}</p>
    </div>
    
    `;
    total.appendChild(totalDiv);
    
}



function removeOrder() {
    
    window.cart = [];
    orders.innerHTML = ``;
    total.innerHTML = ``;



    
}

function confirmOrder() {

}