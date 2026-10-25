function toggleFilters() {
    const filterBox = document.getElementById("filterBox");
    filterBox.style.display = filterBox.style.display === "block" ? "none" : "block";
}

document.querySelectorAll('input[name="animal"]').forEach(input => {
    input.addEventListener('change', () => {
        const selected = input.value;
        document.querySelectorAll('.product').forEach(card => {
            if (selected === 'all' || card.dataset.animal === selected) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
});
let currentIndex = 0;

function slide(direction) {
    const wrapper = document.getElementById("sliderWrapper");
    const allProducts = wrapper.querySelectorAll(".product");
    const visibleProducts = Array.from(allProducts).filter(p => p.style.display !== "none");

    if (visibleProducts.length === 0) return;

    const productWidth = visibleProducts[0].offsetWidth + 20;
    const container = wrapper.parentElement;
    const visibleCount = Math.floor(container.offsetWidth / productWidth);
    const maxIndex = visibleProducts.length - visibleCount;

    currentIndex += direction;
    if (currentIndex < 0) currentIndex = 0;
    if (currentIndex > maxIndex) currentIndex = maxIndex;

    wrapper.style.transform = `translateX(-${currentIndex * productWidth}px)`;
}
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
// Particles animation
const canvas = document.getElementById('particle-canvas');
const ctx = canvas.getContext('2d');
let width, height;
let particles = [];

function resize() {
    width = canvas.width = canvas.offsetWidth;
    height = canvas.height = canvas.offsetHeight;
}
window.addEventListener('resize', resize);
resize();

class Particle {
    constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.radius = Math.random() * 2 + 1;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = (Math.random() - 0.5) * 0.5;
        this.opacity = Math.random() * 0.5 + 0.3;
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x < 0 || this.x > width) this.speedX *= -1;
        if (this.y < 0 || this.y > height) this.speedY *= -1;
    }
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
        ctx.fill();
    }
}

function initParticles(num = 100) {
    particles = [];
    for (let i = 0; i < num; i++) {
        particles.push(new Particle());
    }
}
initParticles();

function animate() {
    ctx.clearRect(0, 0, width, height);
    particles.forEach(p => {
        p.update();
        p.draw();
    });
    requestAnimationFrame(animate);
}
animate();

// Typing effect
const texts = [
    "غذای کامل برای سگ شما",
    "تنوع بی‌نظیر برای گربه‌های شما",
    "سلامتی و شادابی پرندگانتان"
];
let count = 0;
let index = 0;
let currentText = '';
let isDeleting = false;
const speed = 120;
const typingElement = document.getElementById('typing-text');

function type() {
    if (count >= texts.length) count = 0;
    const fullText = texts[count];

    if (isDeleting) {
        currentText = fullText.substring(0, index - 1);
        index--;
    } else {
        currentText = fullText.substring(0, index + 1);
        index++;
    }

    typingElement.textContent = currentText;

    if (!isDeleting && currentText === fullText) {
        setTimeout(() => isDeleting = true, 1500);
    } else if (isDeleting && currentText === '') {
        isDeleting = false;
        count++;
        index = 0;
    }
    setTimeout(type, isDeleting ? speed / 2 : speed);
}
type();