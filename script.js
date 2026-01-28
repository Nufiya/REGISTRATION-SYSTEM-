const form = document.getElementById("registrationForm");
const submitBtn = document.getElementById("submitBtn");
const topError = document.getElementById("topError");
const successMsg = document.getElementById("successMessage");

const inputs = {
    firstName: document.getElementById("firstName"),
    lastName: document.getElementById("lastName"),
    email: document.getElementById("email"),
    phone: document.getElementById("phone"),
    password: document.getElementById("password"),
    confirmPassword: document.getElementById("confirmPassword"),
    terms: document.getElementById("terms")
};

const country = document.getElementById("country");
const state = document.getElementById("state");
const city = document.getElementById("city");

const locationData = {
    India: {
        Telangana: ["Hyderabad", "Warangal", "Nizamabad", "Karimnagar"],
        Karnataka: ["Bangalore", "Mysore", "Mangalore", "Hubli"],
        Maharashtra: ["Mumbai", "Pune", "Nagpur", "Nashik"],
        TamilNadu: ["Chennai", "Coimbatore", "Madurai", "Trichy"],
        Gujarat: ["Ahmedabad", "Vadodara", "Surat", "Rajkot"]
    },

    USA: {
        California: ["Los Angeles", "San Francisco", "San Diego"],
        Texas: ["Houston", "Dallas", "Austin"],
        NewYork: ["New York City", "Buffalo"]
    },

    UK: {
        England: ["London", "Manchester", "Liverpool"],
        Scotland: ["Edinburgh", "Glasgow"]
    },

    Australia: {
        NewSouthWales: ["Sydney", "Newcastle"],
        Victoria: ["Melbourne", "Geelong"]
    }
};


country.addEventListener("change", () => {
    state.innerHTML = '<option value="">Select State</option>';
    city.innerHTML = '<option value="">Select City</option>';

    if (country.value) {
        Object.keys(locationData[country.value]).forEach(st => {
            state.innerHTML += `<option value="${st}">${st}</option>`;
        });
    }
});

state.addEventListener("change", () => {
    city.innerHTML = '<option value="">Select City</option>';

    if (state.value) {
        locationData[country.value][state.value].forEach(ct => {
            city.innerHTML += `<option value="${ct}">${ct}</option>`;
        });
    }
});


function showError(input, msg) {
    input.classList.add("error-border");
    input.nextElementSibling.innerText = msg;
}

function clearError(input) {
    input.classList.remove("error-border");
    input.nextElementSibling.innerText = "";
}

/* ---------- VALIDATIONS ---------- */
function validateRequired(input, msg) {
    if (input.value.trim() === "") {
        showError(input, msg);
        return false;
    }
    clearError(input);
    return true;
}

function validateEmail() {
    const email = inputs.email.value.trim();
    if (email === "" || email.includes("@tempmail.com")) {
        showError(inputs.email, "Disposable email not allowed");
        return false;
    }
    clearError(inputs.email);
    return true;
}

function validatePhone() {
    if (!/^[0-9]{10}$/.test(inputs.phone.value.trim())) {
        showError(inputs.phone, "Enter valid 10-digit phone number");
        return false;
    }
    clearError(inputs.phone);
    return true;
}

function validateGender() {
    const genders = document.getElementsByName("gender");
    for (let g of genders) {
        if (g.checked) {
            topError.innerText = "";
            return true;
        }
    }
    topError.innerText = "Please select Gender";
    return false;
}

function validatePassword() {
    const pwd = inputs.password.value;
    const strength = document.getElementById("strength");

    if (pwd.length < 6) {
        strength.innerText = "Weak Password";
        strength.style.color = "red";
        return false;
    }

    if (/[A-Za-z]/.test(pwd) && /[0-9]/.test(pwd) && !/[!@#$%^&*]/.test(pwd)) {
        strength.innerText = "Medium Password";
        strength.style.color = "orange";
        return true; // ✅ ALLOW SUBMIT
    }

    if (/[A-Za-z]/.test(pwd) && /[0-9]/.test(pwd) && /[!@#$%^&*]/.test(pwd)) {
        strength.innerText = "Strong Password";
        strength.style.color = "green";
        return true;
    }

    return false;
}

function validateConfirmPassword() {
    if (inputs.password.value !== inputs.confirmPassword.value) {
        showError(inputs.confirmPassword, "Passwords do not match");
        return false;
    }
    clearError(inputs.confirmPassword);
    return true;
}

function validateForm() {
    let valid = true;
    topError.innerText = "";
    successMsg.innerText = "";

    valid = validateRequired(inputs.firstName, "First name required") && valid;
    valid = validateRequired(inputs.lastName, "Last name required") && valid;
    valid = validateEmail() && valid;
    valid = validatePhone() && valid;
    valid = validatePassword() && valid;
    valid = validateConfirmPassword() && valid;
    valid = validateGender() && valid;

    if (!inputs.terms.checked) {
        topError.innerText = "Please accept Terms & Conditions";
        valid = false;
    }

    submitBtn.disabled = !valid;
    submitBtn.classList.toggle("enabled", valid);
}

form.addEventListener("input", validateForm);

form.addEventListener("submit", function (e) {
    e.preventDefault();

    successMsg.innerText =
        "✅ Thank you for registering! Your details have been submitted successfully.";

    form.reset();
    submitBtn.disabled = true;
    submitBtn.classList.remove("enabled");
    document.getElementById("strength").innerText = "";
});
