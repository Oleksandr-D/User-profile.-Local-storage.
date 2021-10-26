// Потрібно розробити форму для реєстрації, логінування а також блок профайлу.
// Всі дані проходять через localStorage. Основні пункти що має працювати.
// — При реєстрації дані попадають в localStorage. Перед добавленням нового
//  користувача провіряємо чи нема у нас вже користувача з такою поштою,
//   якщо є то не добавляти його. Всі дані мають валідуватися регулярними виразами.
// — При логінуванні перевіряти чи всі поля заповнені і чи правильний логін
//  та пароль, якщо щось не так виводити відповідне повідомлення.
//   Всі дані беруться з localStorage.
// — Якщо правильний логін та пароль то перейти на блок профайлу.
// — При натисканні на Sign Out переходимо назад на блок Sign In.

const getS = selector => document.querySelector(selector);
const first_name = getS('#first_name');
const last_name = getS('#last_name');
const email_address = getS('#email_address');
const password = getS('#password');
const sign_up = getS('#sign_up');
const registered_email = getS('#registered_email');
const registered_password = getS('#registered_password');
let user_list = [];
let new_user = new Object();
// Submit sign_up form. Local storage
getS('.sign_up_block').onsubmit = function () {
    event.preventDefault();
    if (first_name.value !== '' && last_name.value !== '' && email_address.value !== '' && password.value !== '') {
        if (localStorage.length > 0) {
            user_list = JSON.parse(localStorage.getItem('user_list'));
        }
        if (user_list.some(elem => elem.email_addresses.toLowerCase() === email_address.value.toLowerCase())) {
            alert('Введена пошта вже існує. Увійдіть у свій запис');
            getS('.sign_in_block').classList.remove('hide');
            getS('.sign_up_block').classList.add('hide');
        }
        if (!user_list.some(elem => elem.email_addresses.toLowerCase() === email_address.value.toLowerCase())) {
            new_user.first_name = first_name.value;
            new_user.last_names = last_name.value;
            new_user.email_addresses = email_address.value.toLowerCase();
            new_user.passwords = password.value;
            user_list.push(new_user);
        }
        localStorage.setItem('user_list', JSON.stringify(user_list));
    }
    getS('#sign_up').disabled = true;
    sign_up_block.reset()
}
//buttons Sign in now, Sign up now
getS('.sign_in').onclick = () => {
    getS('.sign_in_block').classList.remove('hide');
    getS('.sign_up_block').classList.add('hide');
}
getS('.sign_up').onclick = () => {
    getS('.sign_in_block').classList.add('hide');
    getS('.sign_up_block').classList.remove('hide');
}
//Submit sign_in form.
getS('.sign_in_block').onsubmit = function () {
    event.preventDefault();
    if (user_list.some(elem => elem.email_addresses === registered_email.value.toLowerCase() &&
            elem.passwords === registered_password.value)) {
        const regUs = user_list.filter(usr => usr.email_addresses === registered_email.value.toLowerCase())
        getS('.user_email').textContent = regUs[0].email_addresses;
        getS('.user_name').textContent = regUs[0].first_name + ' ' + regUs[0].last_names;
        sign_in_block.reset();
        getS('.user_block').classList.remove('hide');
        getS('.sign_in_block').classList.add('hide');
    } else {
        alert('Невірна пошта або пароль!');
    }
}
//user_block. sign_out buton
getS('#sign_out').onclick = () => {
    getS('.user_block').classList.add('hide');
    getS('.sign_in_block').classList.remove('hide');
}
//regExp
let firstNameRegExp = /^[a-zA-Z]{2,20}$/;
let lastNameRegExp = /^[a-zA-Z]{2,20}$/;
let emailRegExp = /^[a-z0-9_.&#]+[^\s@]+@[^\s@]+[.][^\s@\W]{1,3}$/;
let passRegExp = /^[a-zA-Z0-9]{8,20}$/;
// input field color validation
getS('#first_name').oninput = function () {
    let testName = firstNameRegExp.test(getS('#first_name').value);
    if (testName) {
        this.style.boxShadow = '0 0 3px 3px green';
    } else {
        this.style.boxShadow = '0 0 3px 3px red';
    }
}
getS('#last_name').oninput = function () {
    let testLastN = lastNameRegExp.test(getS('#last_name').value);
    if (testLastN) {
        this.style.boxShadow = '0 0 3px 3px green';
    } else {
        this.style.boxShadow = '0 0 3px 3px red';
    }
}
getS('#email_address').oninput = function () {
    let testEmail = emailRegExp.test(getS('#email_address').value);
    if (testEmail) {
        this.style.boxShadow = '0 0 3px 3px green';
    } else {
        this.style.boxShadow = '0 0 3px 3px red';
    }
}
getS('#password').oninput = function () {
    let testPass = passRegExp.test(getS('#password').value);
    if (testPass) {
        this.style.boxShadow = '0 0 3px 3px green';
    } else {
        this.style.boxShadow = '0 0 3px 3px red';
    }
}
// sign_up button activation.
getS('.sign_up_block').oninput = function () {
    if (first_name.validity.valid && last_name.validity.valid && email_address.validity.valid &&
        password.validity.valid) {
        getS('#sign_up').disabled = false;
    } else {
        getS('#sign_up').disabled = true;
    }
}