// Muat data dari localStorage dan tampilkan di halaman
const formData = JSON.parse(localStorage.getItem('formData'));
if (formData) {
    document.getElementById('jeniskunjungan').textContent = formData.jeniskunjungan;
    document.getElementById('unit').textContent = formData.unit;
    document.getElementById('fname').textContent = formData.fname;
    document.getElementById('lname').textContent = formData.lname;
    document.getElementById('email').textContent = formData.email;
    document.getElementById('phone').textContent = formData.phone;
    document.getElementById('birthday').textContent = formData.dd
    document.getElementById('gender').textContent = formData.gender;
    document.getElementById("keluhan").innerText = formData.keluhan;
    document.getElementById('queueNumber').textContent = formData.queueNumber;
} else {
    alert("No data found!");
}
function printAndRedirect() {
    window.print();
    window.location.href = "home.html";
}

document.addEventListener('DOMContentLoaded', function() {
    var script = document.createElement('script');
    script.src = 'https://cdn.rawgit.com/davidshimjs/qrcodejs/gh-pages/qrcode.min.js';
    script.onload = function() {
        var formData = JSON.parse(localStorage.getItem('formData'));
        if (formData && formData.queueNumber) {
            var qrcode = new QRCode(document.getElementById("qrcode"), {
                text: formData.queueNumber,
                width: 128,
                height: 128
            });
        } else {
            alert("No queue number found!");
        }
    };
    document.head.appendChild(script);
});
