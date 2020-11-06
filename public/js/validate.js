const form = document.querySelector('#form');
const mobile = document.getElementById('mobile');
const name = document.getElementById('name');
const password = document.getElementById('password');
const confirmPassword = document.getElementById('confirm-password');

form.addEventListener('submit', (e)=>{
    e.preventDefault();
    let errors = [];
    if( mobile.value.length !== 10){
        errors.push('Please enter a valid mobile number');
    }
    if(name.value === ''){
        errors.push('Please enter your name');
    }
    if(password.value === '' || confirmPassword.value === ''){
        errors.push('Please enter your name');
    }
    if(password.value !== confirmPassword.value){
        errors.push('Your Passwords do not match');
    }
    if(errors.length){
        let msg = '';
        errors.forEach((error)=>{
            msg += `${error} \n`;
        });
        alert(msg);
        return;
    }
    form.submit();
});