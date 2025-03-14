document.addEventListener("DOMContentLoaded", function () {
    let lightSwitch = document.getElementById("lightSwitch");
    let body = document.body;
    let loadingScreen = document.querySelector(".loading");
    let switchContainer = document.getElementById("switchContainer");
    let clickSound = document.getElementById("clickSound");
    let flower = document.getElementById("flower"); // Bunga Matahari
    let duck = document.getElementById("duck");
    let speechBubble = document.querySelector(".speech-bubble");
    let duckText = document.getElementById("duckText");
    let duckSound = document.getElementById("duckSound");
    let bgMusic = document.getElementById("bgMusic");
    let flowerSound = document.getElementById("flowerSound");
    let modalSound = document.getElementById("modalSound");
    let modal = document.getElementById("flowerModal");
    let closeModal = document.getElementById("closeModal");


    // Daftar kalimat bebek
    const speechLines = [
        "Halo! Masih ingat aku ga?",
        "Parah sih kalo kamu ga inget aku!",
        "Beneran lupa?",
        "...",
        "Depannya huruf B...",
        "Coba tanya ke Bos aku deh kalo lupa mah...",
        "YAAAA itu masih inget!",
        "Untung aja kamu masih inget, padahal kalo lupa, Bento udah bete!",
        "BTW... Bento liat-liat kamu udah nemuin bunganya",
        "Yahhh sebenernya Bos Thomas titipin itu sih ke Bento",
        "Tapi berhubung udah ketauan, yaudah deh itu hadiahnya...",
        "Seneng tak?",
        "BERCANDA!",
        "Anyway, hepi bersdey bubinya Bos Bento...",
        "Moga-moga kamu tak bete terus sama Icik Bos,",
        "Sehat-sehat selalu,",
        "Dietnya betul-betul,",
        "Makannya sehat dan rajin minum air putih,",
        "Biar kuyus kayak Bento...",
        "Bercanda!",
        "Eh, Bento juga mau kasih kado loh.",
        "Kamu abis ini coba klik bunga mataharinya ya",
        "Bento udah taro sesuatu disitu",
        "Selamat mencari!!! BABAII"
    ];
    let speechIndex = 0;
    let lightOnTime = 0; // Waktu saat light switch dinyalakan

    let canClickDuck = false; // Menentukan apakah bebek bisa diklik

    // Pastikan cursor default saat bebek belum muncul
    duck.classList.add("disabled");

    // Sembunyikan saklar saat loading masih berjalan
    switchContainer.style.display = "none";

    // Setelah 2 detik, sembunyikan loading dan tampilkan saklar dengan fade-in
    setTimeout(() => {
        loadingScreen.style.display = "none";
        switchContainer.style.display = "block";
        setTimeout(() => {
            switchContainer.classList.add("fade-in");
        }, 100);
    }, 2000);

    // Klik saklar
    lightSwitch.addEventListener("click", function () {
        clickSound.play();
        body.classList.remove("dark-mode");
        body.classList.add("light-mode");
        lightOnTime = Date.now(); // Catat waktu saat saklar dinyalakan

        setTimeout(() => {
            flower.style.opacity = "1";
        }, 500);

        setTimeout(() => {
            flower.style.transform = "translate(-50%, -165%)";
        }, 5000);

        setTimeout(() => {
            lightSwitch.classList.add("fade-out");
            switchContainer.classList.add("disabled");
        }, 1500);

        setTimeout(() => {
            duck.classList.add("show-duck");
            duck.classList.add("disabled"); // Nonaktifkan cursor sementara

            setTimeout(() => {
                duckSound.play();
                speechBubble.style.display = "block";
                speechBubble.classList.add("speech-visible");
                typeText(speechLines[speechIndex], duckText);

                // Aktifkan klik setelah 2 detik
                setTimeout(() => {
                    canClickDuck = true;
                    duck.classList.remove("disabled"); // Kembalikan cursor pointer
                }, 2000);
            }, 1000);
        }, 8000);

        setTimeout(() => {
            bgMusic.volume = 0.4;
            bgMusic.play();
        }, 8500);
    });

    // Klik pada bebek untuk mengganti teks bubble
    duck.addEventListener("click", function () {
        if (canClickDuck && speechIndex < speechLines.length - 1) {
            speechIndex++;
            speechBubble.classList.remove("speech-visible");
            canClickDuck = false; // Nonaktifkan klik sementara
            duck.classList.add("disabled"); // Nonaktifkan cursor sementara

            duckSound.currentTime = 0;
            duckSound.play();

            setTimeout(() => {
                typeText(speechLines[speechIndex], duckText);
                speechBubble.classList.add("speech-visible");

                // Aktifkan kembali klik setelah 2 detik
                setTimeout(() => {
                    canClickDuck = true;
                    if (speechIndex === speechLines.length - 1) {
                        duck.classList.add("disabled"); // Set cursor default saat text terakhir
                    } else {
                        duck.classList.remove("disabled");
                    }
                }, 2000);
            }, 500);
        }
    });

    // Pastikan bunga bisa diklik setelah timeout (untuk testing 10 detik)
    setTimeout(() => {
        flower.classList.add("flower-clickable");
        flower.addEventListener("click", function () {
            // Mainkan sound effect
            flowerSound.currentTime = 0; // Reset audio agar bisa dimainkan ulang
            flowerSound.play();

            flower.classList.add("flower-clicked"); // Tambahkan animasi
        
            setTimeout(() => {
                flower.classList.remove("flower-clicked"); // Hapus class setelah animasi selesai
            }, 600); // Durasi animasi 0.6s
        
            setTimeout(() => {
                modal.style.display = "flex"; // Tampilkan modal setelah animasi selesai
                modalSound.play();
            }, 1000);

            // Event listener untuk menutup modal saat tombol "Tutup" diklik
            closeModal.addEventListener("click", function () {
                    window.location.href = "hadiah.html";
            });
        });
    }, 100000); // 10 detik untuk testing
});

// Fungsi mengetik teks di bubble
function typeText(text, element) {
    element.innerHTML = "";
    let i = 0;
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, 50);
        }
    }
    type();
}
