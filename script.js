const pswrd = document.getElementById("password");
const pswrd_confirm = document.getElementById("password-confirm");
const form = document.getElementById("sign-up-form");
const pwInputError = document.getElementById("pw-input-error");
const showPwButtons = document.querySelectorAll(".show-pw");
const pwSecurityLow = document.getElementById("pw-security-low");
const pwSecurityMedium = document.getElementById("pw-security-medium");
const pwSecurityGood = document.getElementById("pw-security-good");
const pwRequirement = document.getElementById("pw-requirement");
const passwordDialog = document.getElementById("pw-dialog");
const openPwDialog = document.getElementById("openPwDialog");
const closePwDialog = document.getElementById("close-pw-dialog");



openPwDialog.addEventListener("click", e => {
    passwordDialog.showModal();
});

closePwDialog.addEventListener("click", e => {
    passwordDialog.close();
});

passwordDialog.addEventListener("click", e => {
    const dialogRect = passwordDialog.getBoundingClientRect();
    if (
        e.clientX < dialogRect.left ||
        e.clientX > dialogRect.right ||
        e.clientY < dialogRect.top ||
        e.clientY > dialogRect.bottom
    ) {
        passwordDialog.close();
    }
});

form.addEventListener("submit", e => {
    if (!pwIsIdentical()) {
        pwInputError.textContent = pwErrorMsg;
        e.preventDefault();
    };
});

const pwErrorMsg = "Passwords don't match. Please try again.";
const pwIsIdentical = () => pswrd.value === pswrd_confirm.value;

form.addEventListener("keyup", e => {
    checkPwSecurity(pswrd.value);
    if (pswrd_confirm.value !== "") {
    pwIsIdentical() ? pwInputError.textContent = "" :
                      pwInputError.textContent = pwErrorMsg;
    
    };
    if (pswrd.value === "") {
        removeRequirement();
        removePwIndicator();
    };
    if (pswrd_confirm.value === "") removePwErrorMsg();
});

showPwButtons.forEach(pwButton => {
    pwButton.addEventListener("click", e => {
        pwIsHidden() ? pwShow() : pwHide();
        toggleButtonText();
    });
});

const pwIsHidden = () => pswrd.type === "password" ||
                         pswrd_confirm.type === "password";

const pwShow = () => {
    pswrd.type = "text";
    pswrd_confirm.type = "text";
};

const pwHide = () => {
    pswrd.type = "password";
    pswrd_confirm.type = "password";
};

const toggleButtonText = () => {
    const buttonText = pswrd.type === "text" ? "HIDE" : "SHOW";
    showPwButtons.forEach(pwButton => {
        pwButton.textContent = buttonText;
    });
};


const checkPwSecurity = (password) => {
    const checks = [
        hasLowerCaseLetter(password),
        hasUpperCaseLetter(password),
        hasNumber(password),
        hasSpecialCharacter(password),
        overMinLength(password),
        underMaxLength(password)
    ];
    
    const trueCount = checks.filter(Boolean).length;
    removePwIndicator();

    if (trueCount > 1 && trueCount <=  3) {
        pwSecurityLow.classList.add("pw-low");
    } else if (trueCount > 3 && trueCount <= 5) {
        pwSecurityLow.classList.add("pw-low");
        pwSecurityMedium.classList.add("pw-medium");
    } else if (trueCount === 6) {
        pwSecurityLow.classList.add("pw-low");
        pwSecurityMedium.classList.add("pw-medium");
        pwSecurityGood.classList.add("pw-good");
    };

    for (let i = 0; i < checks.length; i++) {
        if (!checks[i]) {
            pwRequires(pwRequirements[i]);
            return;
        };
        if (checks[checks.length-1]) removeRequirement();
    };

};

const hasLowerCaseLetter = (password) => /[a-z]/.test(password);
const hasUpperCaseLetter = (password) => /[A-Z]/.test(password);
const hasNumber = (password) => /[0-9]/.test(password);
const hasSpecialCharacter = (password) => /[?!\-_.,]/.test(password);
const overMinLength = (password) => password.length >= 8;
const underMaxLength = (password) => password.length <= 128;


const pwRequirements = [
    includeLowerCaseMsg = "Lower case letter a-z",
    includeUpperCaseMsg = "Upper case letter A-Z",
    includeNumber = "Number 0-9",
    includeSpecialChar = "Any of: ? ! - _ . ,",
    includeMinLength = "at least 8 characters",
    includeMaxLength = "less than 128 characters",
];

const pwRequires = (required) => {
    const includeMsg = "Please include: ";
    pwRequirement.textContent = includeMsg + required;
};
 

const removePwIndicator = () => {
    pwSecurityLow.classList.remove("pw-low");
    pwSecurityMedium.classList.remove("pw-medium");
    pwSecurityGood.classList.remove("pw-good");
};

const removePwErrorMsg = () => pwInputError.textContent = "";

const removeRequirement = () => pwRequirement.textContent = "";