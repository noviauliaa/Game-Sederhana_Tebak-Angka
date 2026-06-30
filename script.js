// Membuat angka acak 1 - 100
let randomNumber = Math.floor(Math.random() * 100) + 1;

// Jumlah percobaan
let attempts = 0;

// Mengambil elemen HTML
const guessInput = document.getElementById("guessInput");
const guessBtn = document.getElementById("guessBtn");
const restartBtn = document.getElementById("restartBtn");
const message = document.getElementById("message");
const attemptsText = document.getElementById("attempts");
const bestScore = document.getElementById("bestScore");

// Menampilkan skor terbaik jika ada
if (localStorage.getItem("bestScore")) {
    bestScore.textContent = localStorage.getItem("bestScore");
}

// Tombol Tebak
guessBtn.addEventListener("click", function () {

    let guess = Number(guessInput.value);

    // Validasi input
    if (guess === "" || isNaN(guess)) {
        message.textContent = "Masukkan angka terlebih dahulu!";
        return;
    }

    if (guess < 1 || guess > 100) {
        message.textContent = "Masukkan angka antara 1 sampai 100!";
        return;
    }

    attempts++;
    attemptsText.textContent = attempts;

    if (guess < randomNumber) {
        message.textContent = "📉 Terlalu Kecil!";
    }
    else if (guess > randomNumber) {
        message.textContent = "📈 Terlalu Besar!";
    }
    else {
        message.innerHTML =
            "Selamat! Angka benar! Kamu menebak dalam <b>" +
            attempts +
            "</b> percobaan.";

        // Simpan Best Score
        let best = localStorage.getItem("bestScore");

        if (best === null || attempts < Number(best)) {
            localStorage.setItem("bestScore", attempts);
            bestScore.textContent = attempts;
        }

        guessBtn.disabled = true;
    }

    guessInput.value = "";
    guessInput.focus();

});

// Tombol Main Lagi
restartBtn.addEventListener("click", function () {

    randomNumber = Math.floor(Math.random() * 100) + 1;

    attempts = 0;

    attemptsText.textContent = "0";

    message.textContent = "Menunggu tebakan...";

    guessInput.value = "";

    guessBtn.disabled = false;

    guessInput.focus();

});