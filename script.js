document.addEventListener("DOMContentLoaded", () => {
    const container = document.querySelector(".container");
    const loginForm = document.querySelector(".form.login form");
    const signupForm = document.querySelector(".form.signup form");
    const loginBtn = loginForm.querySelector("input[type='button']");
    const signupBtn = signupForm.querySelector("input[type='button']");
    const showHidePwIcons = document.querySelectorAll(".showHidePw");
    const pwFields = document.querySelectorAll(".password");
    const signupLink = document.querySelector(".signup-link");
    const loginLink = document.querySelector(".login-link");
    const passwordStrengthBar = document.getElementById("password-strength-bar");
    const passwordStrengthText = document.getElementById("password-strength-text");

    // سوییچ بین فرم‌ها
    signupLink.addEventListener("click", (e) => {
        e.preventDefault();
        container.classList.add("active");
    });

    loginLink.addEventListener("click", (e) => {
        e.preventDefault();
        container.classList.remove("active");
    });

    // نمایش/مخفی کردن رمز عبور
    showHidePwIcons.forEach(icon => {
        icon.addEventListener("click", () => {
            pwFields.forEach(field => {
                if (field.type === "password") {
                    field.type = "text";
                    icon.classList.replace("uil-eye-slash", "uil-eye");
                } else {
                    field.type = "password";
                    icon.classList.replace("uil-eye", "uil-eye-slash");
                }
            });
        });
    });

    // بررسی قدرت رمز عبور هنگام تایپ
    const passwordInput = signupForm.querySelectorAll(".password")[0];
    passwordInput.addEventListener("input", () => {
        const value = passwordInput.value;
        let strength = 0;

        if (value.length >= 6) strength++;
        if (/[A-Z]/.test(value)) strength++;
        if (/[0-9]/.test(value)) strength++;
        if (/[@$!%*?&#^]/.test(value)) strength++;

        let width = "0%",
            color = "#ccc",
            text = "";
        switch (strength) {
            case 1:
                width = "25%";
                color = "#e74c3c";
                text = "خیلی ضعیف";
                break;
            case 2:
                width = "50%";
                color = "#f39c12";
                text = "ضعیف";
                break;
            case 3:
                width = "75%";
                color = "#27ae60";
                text = "خوب";
                break;
            case 4:
                width = "100%";
                color = "#2ecc71";
                text = "قوی";
                break;
        }

        passwordStrengthBar.style.width = width;
        passwordStrengthBar.style.backgroundColor = color;
        passwordStrengthText.textContent = text;
    });

    // توابع نمایش خطا و موفقیت
    const showError = (input, message) => {
        let error = input.nextElementSibling;
        if (!error || !error.classList.contains("input-error")) {
            error = document.createElement("div");
            error.className = "input-error";
            input.after(error);
        }
        input.classList.add("invalid");
        input.classList.remove("valid");
        error.textContent = message;
    };

    const showSuccess = (input) => {
        let error = input.nextElementSibling;
        if (error && error.classList.contains("input-error")) {
            error.textContent = "";
        }
        input.classList.remove("invalid");
        input.classList.add("valid");
    };

    const showToast = (message) => {
        const toast = document.createElement("div");
        toast.className = "custom-toast";
        toast.textContent = message;
        document.body.appendChild(toast);

        setTimeout(() => {
            toast.classList.add("show");
        }, 100);

        setTimeout(() => {
            toast.classList.remove("show");
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }; // اعتبارسنجی زنده
    const fullNameInput = signupForm.querySelector("input[name='fullname']");
    const emailInput = signupForm.querySelector("input[name='email']");
    const password1Input = signupForm.querySelectorAll(".password")[0];
    const password2Input = signupForm.querySelectorAll(".password")[1];

    fullNameInput.addEventListener("input", () => {
        if (!fullNameInput.value.trim()) {
            showError(fullNameInput, "نام را وارد کنید.");
        } else {
            showSuccess(fullNameInput);
        }
    });

    emailInput.addEventListener("input", () => {
        const value = emailInput.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!value) {
            showError(emailInput, "ایمیل را وارد کنید.");
        } else if (!emailRegex.test(value)) {
            showError(emailInput, "فرمت ایمیل معتبر نیست.");
        } else {
            showSuccess(emailInput);
        }
    });

    password1Input.addEventListener("input", () => {
        const value = password1Input.value.trim();
        if (value.length < 6) {
            showError(password1Input, "رمز عبور باید حداقل 6 کاراکتر باشد.");
        } else {
            showSuccess(password1Input);
        }
    });

    password2Input.addEventListener("input", () => {
        const value1 = password1Input.value.trim();
        const value2 = password2Input.value.trim();
        if (value2 !== value1) {
            showError(password2Input, "رمز عبور با تأیید آن مطابقت ندارد.");
        } else {
            showSuccess(password2Input);
        }
    });

    // ذخیره و بررسی اطلاعات ورود
    loginBtn.addEventListener("click", () => {
        const email = loginForm.querySelector("input[type='text']").value.trim();
        const password = loginForm.querySelector("input[type='password']").value.trim();
        if (email && password) {
            console.log("ورود با اطلاعات:", { email, password });
            showToast("ورود موفق!");
            loginForm.reset();
        } else {
            // پیام خطا فقط در کنسول یا می‌تونی toast هم بزاری اینجا
        }
    });

    // ذخیره و بررسی اطلاعات ثبت‌نام
    signupBtn.addEventListener("click", () => {
        const fullName = fullNameInput.value.trim();
        const email = emailInput.value.trim();
        const password = password1Input.value.trim();
        const confirmPassword = password2Input.value.trim();
        const terms = signupForm.querySelector("#termCon").checked;

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        // نمایش خطا کنار هر فیلد
        if (!fullName) showError(fullNameInput, "نام را وارد کنید.");
        if (!email) showError(emailInput, "ایمیل را وارد کنید.");
        if (!password) showError(password1Input, "رمز عبور را وارد کنید.");
        if (!confirmPassword) showError(password2Input, "تأیید رمز را وارد کنید.");
        if (!fullName || !email || !password || !confirmPassword) return;

        if (!emailRegex.test(email)) {
            showError(emailInput, "فرمت ایمیل معتبر نیست.");
            return;
        }

        if (password !== confirmPassword) {
            showError(password2Input, "رمز عبور با تأیید آن مطابقت ندارد.");
            return;
        }

        if (!terms) {
            const termsLabel = signupForm.querySelector("label[for='termCon']");
            termsLabel.style.color = "red";
            return;
        }

        console.log("ثبت‌نام با اطلاعات:", { fullName, email, password });
        showToast("ثبت‌نام با موفقیت انجام شد!");
        signupForm.reset();
        passwordStrengthBar.style.width = "0%";
        passwordStrengthText.textContent = "";

        // پاکسازی وضعیت اعتبارسنجی
        [fullNameInput, emailInput, password1Input, password2Input].forEach(input => {
            input.classList.remove("valid", "invalid");
            const err = input.nextElementSibling;
            if (err && err.classList.contains("input-error")) err.remove();
        });
    });
});