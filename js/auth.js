const form = document.querySelector("#logon");
const email = document.getElementById('email');
const senha = document.getElementById('password');

form.addEventListener('submit', (event) => {
    
    event.defaultPrevented;
    em = email.value;
    pwd = senha.value;

    const formData = {"email": em, "password": pwd}

    fetch("https://fiap-clube-api.herokuapp.com/auth/login/",{
        method: 'post',
        body: formData  
    }).then(function(response){
        return response.text();
    }).then(function(text){
        console.log(text);
    }).catch(function(error){
        console.error(error);
    })

})

  

  