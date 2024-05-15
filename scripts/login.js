function togglePassword(toggle) {
    var input = document.getElementById("password")
    if (toggle) {
        input.type = "text";
    }
    else {
        input.type = "password";
    }
}

function resizeInput(input) {
    input.style.width = 'auto';
    input.style.width = input.scrollWidth + 'px';
}

function checkPassword(){
    fetch('data/profile.json', { cache: 'no-store' })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
        console.log(data.password);
      if(document.getElementById("password").value == data.password){
        localStorage.setItem('lastActivityTime', Date.now());
        window.location.href = "index.html";
      }
      else{
        alert("Špatné heslo. Zkuste to znova");
      }
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
}

window.onload = function(){localStorage.setItem('lastActivityTime', 0);}