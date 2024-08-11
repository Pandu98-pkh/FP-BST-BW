var currentTab = 0; // Tab pertama yang akan ditampilkan
showTab(currentTab); // Panggil fungsi untuk menampilkan tab saat ini

function showTab(n) {
    var x = document.getElementsByClassName("tab");
    if (x[n]) {  // Pastikan tab saat ini ada sebelum menampilkan
        x[n].style.display = "block"; // Tampilkan tab saat ini
    }
    if (n == 0) {
        document.getElementById("prevBtn").style.display = "none";
    } else {
        document.getElementById("prevBtn").style.display = "inline";
    }
    if (n == (x.length - 1)) {
        document.getElementById("nextBtn").innerHTML = "Submit";
    } else {
        document.getElementById("nextBtn").innerHTML = "Lanjut";
    }
    fixStepIndicator(n);
}

function nextPrev(n) {
    var x = document.getElementsByClassName("tab");
    if (n == 1 && !validateForm()) return false;
    if (x[currentTab]) {  // Sembunyikan tab saat ini jika ada
        x[currentTab].style.display = "none";
    }
    currentTab = currentTab + n;
    if (currentTab >= x.length) {
        saveFormData();  // Simpan data form ke localStorage
        window.location.href = "print.html"; // Alihkan ke halaman cetak
        return false;
    }
    showTab(currentTab);
}


function validateForm() {
    var x, y, i, valid = true;
    x = document.getElementsByClassName("tab");
    if (x[currentTab]) {  // Pastikan tab saat ini ada
        y = x[currentTab].getElementsByTagName("input");
        for (i = 0; i < y.length; i++) {
            if (y[i].value == "") {
                y[i].className += " invalid";
                valid = false;
            }
        }
        if (valid) {
            document.getElementsByClassName("step")[currentTab].className += " finish";
        }
    } else {
        console.error("Tab tidak ditemukan pada index " + currentTab);
        valid = false;
    }
    return valid;
}

function fixStepIndicator(n) {
    var i, x = document.getElementsByClassName("step");
    for (i = 0; i < x.length; i++) {
        x[i].className = x[i].className.replace(" active", "");
    }
    x[n].className += " active";
}

function generateQueueNumber() {
    var date = new Date();
    var dateString = date.getFullYear().toString() + '-' + (date.getMonth() + 1).toString().padStart(2, '0') + '-' + date.getDate().toString().padStart(2, '0');
    
    var lastDate = localStorage.getItem('lastDate');
    var lastNumber = localStorage.getItem('lastNumber') || 0;
    
    if (lastDate !== dateString) {
        // Jika tanggal berubah, atur ulang nomor antrian
        lastNumber = 0;
        localStorage.setItem('lastDate', dateString);
    }
    
    var nextNumber = parseInt(lastNumber) + 1;
    localStorage.setItem('lastNumber', nextNumber);
    
    return dateString + '-' + nextNumber.toString().padStart(4, '0');
}


function saveFormData() {
    var queueNumber = generateQueueNumber();  // Panggil fungsi untuk menghasilkan nomor antrian
    var formData = {
        queueNumber: queueNumber,  // Tambahkan nomor antrian ke data form
        jeniskunjungan: document.querySelector('select[name="jeniskunjungan"]').value,
        unit: document.querySelector('select[name="unit"]').value,
        fname: document.querySelector('input[name="fname"]').value,
        lname: document.querySelector('input[name="lname"]').value,
        email: document.querySelector('input[name="email"]').value,
        phone: document.querySelector('input[name="phone"]').value,
        dd: document.querySelector('input[name="dd"]').value,
        gender: document.querySelector('input[name="gender"]:checked').value,
        keluhan: document.querySelector('#Keluhan').value,
    };
    localStorage.setItem('formData', JSON.stringify(formData));
}


