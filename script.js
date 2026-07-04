// Membuat angka acak 1 - 100
let randomNumber = Math.floor(Math.random() * 100) + 1;

// Jumlah percobaan
let attempts = 0;

// LOOP
for (let i = 0; i < 1; i++) {
    console.log("Game aktif");
}

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

// Fungsi animasi pesan
function animateMessage() {
    message.style.animation = "none";
    message.offsetHeight;
    message.style.animation = "fadeMessage .4s";
}

// Tombol Tebak
guessBtn.addEventListener("click", function () {

    let guess = Number(guessInput.value);

    // Validasi input
    if (guessInput.value.trim() === "" || isNaN(guess)) {
        message.textContent = "Masukkan angka terlebih dahulu!";
        animateMessage();
        return;
    }

    if (guess < 1 || guess > 100) {
        message.textContent = "Masukkan angka antara 1 sampai 100!";
        animateMessage();
        return;
    }

    attempts++;
    attemptsText.textContent = attempts;

    if (guess < randomNumber) {

        message.textContent = "📉 Terlalu Kecil!";
        animateMessage();

    }
    else if (guess > randomNumber) {

        message.textContent = "📈 Terlalu Besar!";
        animateMessage();

    }
    else {

        message.innerHTML =
            "🎉 Selamat! Angka benar! Kamu menebak dalam <b>" +
            attempts +
            "</b> percobaan.";

        animateMessage();

        // Efek menang
        message.animate(
            [
                { transform: "scale(.7)" },
                { transform: "scale(1.15)" },
                { transform: "scale(1)" }
            ],
            {
                duration: 600
            }
        );

        // Simpan Best Score
        let best = localStorage.getItem("bestScore");

        if (best === null || attempts < Number(best)) {
            localStorage.setItem("bestScore", attempts);
            bestScore.textContent = attempts;
        }

        guessBtn.disabled = true;
        guessInput.disabled = true;
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
    animateMessage();

    guessInput.value = "";

    guessBtn.disabled = false;
    guessInput.disabled = false;

    guessInput.focus();

});

// Tekan Enter untuk menebak
guessInput.addEventListener("keydown", function (e) {

    if (e.key === "Enter") {
        guessBtn.click();
    }

});