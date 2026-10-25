// بخش 1: محو شدن و حذف لایه خوش آمدگویی
setTimeout(function() {
    let overlay = document.getElementById("welcome-overlay");
    overlay.style.opacity = 0;
}, 7000);

setTimeout(function() {
    let overlay = document.getElementById("welcome-overlay");
    overlay.style.display = "none";
}, 8500);

// بخش 2: جستجوی زنده
document.addEventListener("DOMContentLoaded", function() {
    let searchInput = document.getElementById("searchInput");
    let searchResults = document.getElementById("searchResults");
    let searchButton = document.getElementById("searchBtn");

    let services = [
        "واکسیناسیون حیوانات",
        "مشاوره تغذیه",
        "کلینیک دامپزشکی",
        "اصلاح و شستشوی حیوانات",
        "جراحی تخصصی سگ و گربه",
        "پت‌شاپ لوازم سگ و گربه",
        "تربیت حیوانات خانگی"
    ];

    let searchHistory = [];

    searchInput.addEventListener("input", function() {
        let query = this.value.trim().toLowerCase();
        searchResults.innerHTML = "";

        if (!query) {
            searchResults.style.display = "none";
            return;
        }

        let filtered = services.filter(function(item) {
            return item.toLowerCase().indexOf(query) !== -1;
        });

        if (filtered.length) {
            filtered.forEach(function(item) {
                let li = document.createElement("li");
                let regex = new RegExp("(" + query + ")", "gi");
                li.innerHTML = item.replace(regex, "<span class='highlight'>$1</span>");
                li.className = "list-group-item";

                li.addEventListener("click", function() {
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
        let keyword = searchInput.value.trim();
        if (keyword) {
            searchHistory.push(keyword);
            console.log("تاریخچه جستجو:", searchHistory);
            searchInput.value = "";
            searchResults.style.display = "none";
        }
    });

    document.addEventListener("click", function(e) {
        if (e.target !== searchInput && !searchResults.contains(e.target)) {
            searchResults.style.display = "none";
        }
    });
});

// بخش 3: راه‌اندازی AOS
document.addEventListener("DOMContentLoaded", function() {
    AOS.init({
        duration: 1000,
        offset: 100,
        once: true
    });
});

// بخش 4: مدیریت سبد خرید
let cart = [];

function toggleCart() {
    let cartElement = document.getElementById("shopping-cart");
    if (cartElement) {
        if (cartElement.classList.contains("open")) {
            cartElement.classList.remove("open");
        } else {
            cartElement.classList.add("open");
        }
    }
}

function updateCart() {
    let cartItemsContainer = document.getElementById("cart-items");
    let cartCount = document.getElementById("cart-count");
    let cartTotal = document.getElementById("cart-total");

    if (!cartItemsContainer || !cartCount || !cartTotal) return;

    cartItemsContainer.innerHTML = "";
    let total = 0;

    for (let i = 0; i < cart.length; i++) {
        let item = cart[i];
        total += item.quantity * item.price;

        cartItemsContainer.innerHTML += '<div class="cart-item">' +
            '<img src="' + item.image + '" alt="' + item.title + '"/>' +
            '<div class="cart-item-info">' +
            '<p>' + item.title + '</p>' +
            '<div class="cart-item-controls">' +
            '<button onclick="changeQuantity(' + i + ', -1)">−</button>' +
            '<span>' + item.quantity + '</span>' +
            '<button onclick="changeQuantity(' + i + ', 1)">+</button>' +
            '<button onclick="removeItem(' + i + ')">حذف</button>' +
            '</div>' +
            '</div>' +
            '</div>';
    }

    cartCount.textContent = cart.length;
    cartTotal.textContent = total.toLocaleString() + " تومان";
}

function addToCart(title, image, price) {
    if (image === undefined) image = "default.jpg";
    if (price === undefined) price = 30000;

    let existing = null;
    for (let i = 0; i < cart.length; i++) {
        if (cart[i].title === title) {
            existing = cart[i];
            break;
        }
    }
    if (existing) {
        existing.quantity++;
    } else {
        cart.push({ title: title, image: image, quantity: 1, price: price });
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

// بخش 5: فرم رزرو نوبت
document.getElementById('reservationForm').addEventListener('submit', function(event) {
    event.preventDefault();

    let ownerName = this.ownerName.value.trim();
    let phone = this.phone.value.trim();
    let petType = this.petType.value;
    let petBreed = this.petBreed.value.trim();
    let serviceType = this.serviceType.value;
    let date = this.date.value;
    let time = this.time.value;
    let vetName = this.vetName.value;
    let messageBox = document.getElementById('successMessage');

    function showMessage(text, type = 'success') {
        let isSuccess = (type === 'success');
        let icon = isSuccess ? '&#10003;' : '&#9888;';
        let bgColor = isSuccess ? '#e6f4ea' : '#fcebea';
        let iconBg = isSuccess ? '#4caf50' : '#e74c3c';
        let textColor = isSuccess ? '#2e7d32' : '#c0392b';

        messageBox.innerHTML = '<span class="message-icon" style="background-color:' + iconBg + ';color:white;">' + icon + '</span>' +
            '<span class="message-text" style="color:' + textColor + ';">' + text + '</span>';

        messageBox.style.backgroundColor = bgColor;
        messageBox.style.display = 'flex';
        messageBox.style.opacity = '1';

        setTimeout(function() {
            messageBox.style.opacity = '0';
            setTimeout(function() {
                messageBox.style.display = 'none';
            }, 300);
        }, 5000);
    }

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

    let reservationData = {
        ownerName,
        phone,
        petType,
        petBreed,
        serviceType,
        date,
        time,
        vetName
    };

    let reservations;
    try {
        reservations = JSON.parse(localStorage.getItem('reservationData'));
        if (!Array.isArray(reservations)) reservations = [];
    } catch (e) {
        reservations = [];
    }

    reservations.push(reservationData);
    localStorage.setItem('reservationData', JSON.stringify(reservations));
    console.log(reservations);

    this.reset();
    showMessage('نوبت با موفقیت ثبت شد!');
});

// بخش 6: منوی کشویی محصولات
document.addEventListener("DOMContentLoaded", function() {
    let toggle = document.getElementById("productsMenuToggle");
    let dropdown = document.getElementById("productsDropdown");

    toggle.addEventListener("click", function(e) {
        e.preventDefault();
        dropdown.classList.toggle("d-none");
    });

    document.addEventListener("click", function(e) {
        if (!toggle.contains(e.target) && !dropdown.contains(e.target)) {
            dropdown.classList.add("d-none");
        }
    });
});