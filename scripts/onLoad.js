var inactivityTime = 600000;
var logoutUrl = 'login.html';

function startInactivityTimer() {
    setInterval(checkInactivity, 100);
}

function checkInactivity() {
    var lastActivityTime = localStorage.getItem('lastActivityTime');
    if (lastActivityTime && Date.now() - parseInt(lastActivityTime) > inactivityTime) {
        logout();
    }
}

function logout() {
    window.location.href = logoutUrl;
}

document.addEventListener('DOMContentLoaded', function () {
    var cssFile = 'styles/main.css?v=' + new Date().getTime();
    var tag = '<link rel="stylesheet" type="text/css" href="' + cssFile + '">';
    document.head.innerHTML += tag;
    checkInactivity();
    var lastActivityTime = localStorage.getItem('lastActivityTime');
    if (lastActivityTime) {
        startInactivityTimer();
    } else {
        localStorage.setItem('lastActivityTime', Date.now());
        startInactivityTimer();
    }
        document.addEventListener('mousemove', function () {
            localStorage.setItem('lastActivityTime', Date.now());
        });
    
        document.addEventListener('keypress', function () {
            localStorage.setItem('lastActivityTime', Date.now());
        });
    
        document.addEventListener('click', function () {
            localStorage.setItem('lastActivityTime', Date.now());
        });

});