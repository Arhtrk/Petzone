const animalButtons = document.querySelectorAll('#animal-filter .filter-btn');
const materialButtons = document.querySelectorAll('#material-filter .filter-btn');
const cards = document.querySelectorAll('.card');

let selectedAnimal = 'all-animal';
let selectedMaterial = 'all-material';

animalButtons.forEach(button => {
    button.addEventListener('click', () => {
        animalButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        selectedAnimal = button.getAttribute('data-filter');
        filterCards();
    });
});

materialButtons.forEach(button => {
    button.addEventListener('click', () => {
        materialButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        selectedMaterial = button.getAttribute('data-filter');
        filterCards();
    });
});

function filterCards() {
    cards.forEach(card => {
        const cardAnimal = card.getAttribute('data-animal');
        const cardMaterial = card.getAttribute('data-material');

        const animalMatch = (selectedAnimal === 'all-animal') || (cardAnimal === selectedAnimal);
        const materialMatch = (selectedMaterial === 'all-material') || (cardMaterial === selectedMaterial);

        if (animalMatch && materialMatch) {
            card.style.display = 'flex';
        } else {
            card.style.display = 'none';
        }
    });
}
document.querySelectorAll('.filter-group > label').forEach(label => {
    label.addEventListener('click', () => {
        const group = label.parentElement;
        group.classList.toggle('open');
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