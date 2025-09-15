//получаем форму по ID
const form = document.getElementById('ContactForm')

//Получаем поля ввода
const nameInput = document.getElementById("name")
const emailInput = document.getElementById("email")

//Валидация в реальном времени
emailInput.addEventListener('input', validateEmail);

//Функция валидации email
// на событие ввода(input) будет вызываться функция validateEmail
function validateEmail(){
    //[A-Za-z0-9_\.]{3,10}@[a-z0-9_\.]{1,15}\.[a-z]{2,3}
    const emailRegex = /[A-Za-z0-9_\.]{3,10}@[a-z0-9_\.]{1,15}\.[a-z]{2,3}/;
    if(emailRegex.test(emailInput.value)){  //проверка совпадений с регулярным выражением
        hideError(emailInput); //убираем ошибку
        return true;
    }else{ //не совпадает
        showError(emailInput,"email должен состоять мимнимум из 3 символов и содержать домен");
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
    input.style.bordercolor='green';
}