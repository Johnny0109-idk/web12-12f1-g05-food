
function toggleMobileMenu() {
    var x = document.getElementById("navDemo");
    if (x.className.indexOf("w3-show") == -1) {
        x.className += " w3-show"; 
    } else { 
        x.className = x.className.replace(" w3-show", "");
    }
}


function openModal(cityName) {
    document.getElementById('ticketModal').style.display = 'block';
}

var modal = document.getElementById('ticketModal');
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

function mixColor() {
    const colors = ['#edd0ac', '#fbc3b9', '#f1745e', '#3fa3a0', '#8e44ad', '#2c3e50'];
    const shuffled = colors.sort(() => 0.5 - Math.random());
    
    document.documentElement.style.setProperty('--primary-header', shuffled[0]);
    document.documentElement.style.setProperty('--bg-color-1', shuffled[1]);
    document.documentElement.style.setProperty('--bg-color-2', shuffled[2]);
}
