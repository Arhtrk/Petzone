const buttons = document.querySelectorAll(".filter-box button");
const productList = document.getElementById("productList");

buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
        buttons.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        const filter = btn.dataset.filter;
        productList.className = "products filtered " + filter;
    });
});
let cart = [];

function toggleCart() {
    const cartElement = document.getElementById("shopping-cart");
    if (cartElement) {
        cartElement.classList.toggle("open");
    }
}

function updateCart() {
    const cartItemsContainer = document.getElementById("cart-items");
    const cartCount = document.getElementById("cart-count");
    const cartTotal = document.getElementById("cart-total");

    if (!cartItemsContainer || !cartCount || !cartTotal) return;

    cartItemsContainer.innerHTML = " ";
    let total = 0;

    cart.forEach((item, index) => {
        total += item.quantity * item.price;

        cartItemsContainer.innerHTML +=
            `<div class="cart-item">
        <img src="${item.image}" alt="${item.title}"/>
        <div class="cart-item-info">
            <p>${item.title}</p>
            <div class="cart-item-controls">
                <button onclick="changeQuantity(${index}, -1)">−</button>
                <span>${item.quantity}</span>
                <button onclick="changeQuantity(${index}, 1)">+</button>
                <button onclick="removeItem(${index})">حذف</button>
            </div>
        </div>
    </div>`
    });

    cartCount.textContent = cart.length;
    cartTotal.textContent = `${ total.toLocaleString()}
    تومان`;
}

function addToCart(title, image = "default.jpg", price = 30000) {
    const existing = cart.find(item => item.title === title);
    if (existing) {
        existing.quantity++;
    } else {
        cart.push({
            title,
            image,
            quantity: 1,
            price
        });
    }
    updateCart();
}

function changeQuantity(index, change) {
    if (!cart[index]) return;
    cart[index].quantity += change;
    if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
    }
    updateCart();
}

function removeItem(index) {
    if (!cart[index]) return;
    cart.splice(index, 1);
    updateCart();
}