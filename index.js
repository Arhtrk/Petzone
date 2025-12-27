setTimeout(() => {
    const overlay = document.getElementById("welcome-overlay");
    overlay.style.opacity = 0; // شروع محو شدن لایه
}, 7000); // 6 ثانیه انیمیشن پیام + 1 ثانیه تأخیر

// بعدش کامل حذف بشه (مثلاً بعد از 1.5 ثانیه محو شدن)
setTimeout(() => {
    const overlay = document.getElementById("welcome-overlay");
    overlay.style.display = "none";
}, 8500); // 7 ثانیه + 1.5 ثانیه محو شدن







document.addEventListener("DOMContentLoaded", function() {
    const searchInput = document.getElementById("searchInput");
    const searchResults = document.getElementById("searchResults");
    const searchButton = document.getElementById("searchBtn");

    const services = [
        "واکسیناسیون حیوانات",
        "مشاوره تغذیه",
        "کلینیک دامپزشکی",
        "اصلاح و شستشوی حیوانات",
        "جراحی تخصصی سگ و گربه",
        "پت‌شاپ لوازم سگ و گربه",
        "تربیت حیوانات خانگی"
    ];

    const searchHistory = [];

    searchInput.addEventListener("input", function() {
        const query = this.value.trim().toLowerCase();
        searchResults.innerHTML = "";

        if (!query) {
            searchResults.style.display = "none";
            return;
        }

        const filtered = services.filter(item =>
            item.toLowerCase().includes(query)
        );

        if (filtered.length) {
            filtered.forEach(item => {
                const li = document.createElement("li");
                const regex = new RegExp('(${query})', 'gi');
                li.innerHTML = item.replace(regex, "<span class='highlight'>$1</span>");
                li.classList.add("list-group-item");
                li.addEventListener("click", () => {
                    searchInput.value = item;
                    searchResults.style.display = "none";
                });
                searchResults.appendChild(li);
            });
            searchResults.style.display = "block";
        } else {
            searchResults.style.display = "none";
        }
    });

    searchButton.addEventListener("click", function() {
        const keyword = searchInput.value.trim();
        if (keyword) {
            searchHistory.push(keyword);
            console.log("تاریخچه جستجو:", searchHistory);
            searchInput.value = "";
            searchResults.style.display = "none";
        }
    });

    document.addEventListener("click", function(e) {
        if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
            searchResults.style.display = "none";
        }
    });
});

document.addEventListener("DOMContentLoaded", function() {
    AOS.init({
        duration: 1000,
        offset: 100,
        once: true
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

    cartItemsContainer.innerHTML = "";
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
        cart.push({ title, image, quantity: 1, price });
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

// JavaScript کامل و بدون خطا + ذخیره آرایه‌ای
document.getElementById('reservationForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const ownerName = this.ownerName.value.trim();
    const phone = this.phone.value.trim();
    const petType = this.petType.value;
    const petBreed = this.petBreed.value.trim();
    const serviceType = this.serviceType.value;
    const date = this.date.value;
    const time = this.time.value;
    const vetName = this.vetName.value;
    const messageBox = document.getElementById('successMessage');

    const showMessage = (text, type = 'success') => {
        const isSuccess = type === 'success';
        const icon = isSuccess ? '&#10003;' : '&#9888;';
        const bgColor = isSuccess ? '#e6f4ea' : '#fcebea';
        const iconBg = isSuccess ? '#4caf50' : '#e74c3c';
        const textColor = isSuccess ? '#2e7d32' : '#c0392b';

        messageBox.innerHTML = `<span class ="message-icon"style ="background-color:${iconBg};color:white;">${ icon }</span><span class="message-text"style="color:${textColor};">${text}</span>`;

        messageBox.style.backgroundColor = bgColor;
        messageBox.style.display = 'flex';
        messageBox.style.opacity = '1';

        setTimeout(() => {
            messageBox.style.opacity = '0';
            setTimeout(() => {
                messageBox.style.display = 'none';
            }, 300);
        }, 5000);
    };

    // اعتبارسنجی
    if (!/^[آ-ی\s]+$/.test(ownerName)) {
        showMessage('لطفا نام و نام خانوادگی را به درستی وارد کنید.', 'error');
        return;
    }

    if (!/^\d{10,11}$/.test(phone.replace(/[\s\-]/g, ''))) {
        showMessage('لطفا شماره تماس معتبر وارد کنید (۱۰ یا ۱۱ رقم).', 'error');
        return;
    }

    if (new Date(date) < new Date()) {
        showMessage('تاریخ انتخاب شده نمی‌تواند در گذشته باشد.', 'error');
        return;
    }

    if (!petType || !vetName) {
        showMessage('لطفا همه فیلدهای الزامی را کامل کنید.', 'error');
        return;
    }

    // آماده‌سازی داده‌ها
    const reservationData = {
        ownerName,
        phone,
        petType,
        petBreed,
        serviceType,
        date,
        time,
        vetName
    };

    // خواندن و بروزرسانی آرایه ذخیره‌شده
    let reservations;
    try {
        reservations = JSON.parse(localStorage.getItem('reservationData'));
        if (!Array.isArray(reservations)) {
            reservations = [];
        }
    } catch {
        reservations = [];
    }

    reservations.push(reservationData);

    localStorage.setItem('reservationData', JSON.stringify(reservations));

    // نمایش در کنسول
    console.log(reservations); // آرایه‌ی به‌روزشده در کنسول

    this.reset();
    showMessage('نوبت با موفقیت ثبت شد!');
});
const toggleBtn = document.getElementById("productsMenuToggle");
const dropdown = document.getElementById("productsDropdown");

toggleBtn.addEventListener("click", function(e) {
    e.preventDefault();
    dropdown.classList.toggle("d-none");
});

// بستن منو با کلیک بیرون
document.addEventListener("click", function(e) {
    if (!toggleBtn.contains(e.target) && !dropdown.contains(e.target)) {
        dropdown.classList.add("d-none");
    }
});