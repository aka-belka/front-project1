//получаем форму по ID
const dlg = document.getElementById('contactDialog'); 
const openBtn = document.getElementById('openDialog'); 
const closeBtn = document.getElementById('closeDialog'); 
const form = document.getElementById('ContactForm'); 
let lastActive = null; 

//Получаем поля ввода
const nameInput = document.getElementById("name")
const emailInput = document.getElementById("email")
const phone = document.getElementById('phone');

openBtn.addEventListener('click', () => { 
    lastActive = document.activeElement; 
    form.reset();
    hideError(emailInput);
    dlg.showModal();                               // модальный режим + затемнение 
    dlg.querySelector('input,select,textarea,button')?.focus(); 
}); 

closeBtn.addEventListener('click', () => {
    dlg.close('cancel');
});

//Валидация в реальном времени
emailInput.addEventListener('input', validateEmail);
phone?.addEventListener('input', formatPhone);

// Форматирование телефона
function formatPhone() { 
    const digits = phone.value.replace(/\D/g,'').slice(0,11);
    const d = digits.replace(/^8/, '7');
    const parts = []; 
    if (d.length > 0) parts.push('+7'); 
    if (d.length > 1) parts.push(' (' + d.slice(1,4)); 
    if (d.length >= 4) parts[parts.length - 1] += ')'; 
    if (d.length >= 5) parts.push(' ' + d.slice(4,7)); 
    if (d.length >= 8) parts.push('-' + d.slice(7,9)); 
    if (d.length >= 10) parts.push('-' + d.slice(9,11)); 
    phone.value = parts.join(''); 
}

// Строгая проверка телефона
phone?.setAttribute('pattern', '^\\+7 \\(\\d{3}\\) \\d{3}-\\d{2}-\\d{2}$');

//Функция валидации email
// на событие ввода(input) будет вызываться функция validateEmail
function validateEmail(){
    //[A-Za-z0-9_\.]{3,10}@[a-z0-9_\.]{1,15}\.[a-z]{2,3}
    const emailRegex = /[A-Za-z0-9_\.]{3,10}@[a-z0-9_\.]{1,15}\.[a-z]{2,3}/;
    if(emailRegex.test(emailInput.value)){  //проверка совпадений с регулярным выражением
        hideError(emailInput); //убираем ошибку
        return true;
    }else{ //не совпадает
        showError(emailInput,"E-mail должен состоять мимнимум из 3 символов и содержать домен");
        return false;
    }
}

//Функция отображения ошибки
function showError(input,message){
    const formControl = input.parentElement;
    const errorControl = formControl.querySelector('.error')|| document.createElement('div');
    errorControl.className='error';
    errorControl.textContent = message;
    formControl.appendChild(errorControl);
    input.style.borderColor='red';
}
//Функция скрытия ошибки
function hideError(input){
    const formControl = input.parentElement;
    const errorControl = formControl.querySelector('.error');
    if(errorControl){
        formControl.removeChild(errorControl);
    }
    input.style.borderColor='';
}

// Валидация при отправке формы
form?.addEventListener('submit', (e) => {
    if (!form.checkValidity()) {
        e.preventDefault();
        form.reportValidity();
        return;
    }
    if (!validateEmail()) {
        e.preventDefault();
        return;
    }
    e.preventDefault();
    dlg.close('submit');
    form.reset();
}); 
form?.addEventListener('reset', function() {
    hideError(emailInput);
});
dlg.addEventListener('close', () => { lastActive?.focus(); }); 

document.addEventListener('DOMContentLoaded', function() {
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('.nav__link');
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage) {
            link.classList.add('nav__link--active');
        }
    });
});