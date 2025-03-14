document.addEventListener("DOMContentLoaded", function () {
    let flower = document.getElementById("flowerFusion");
    let bulb = document.getElementById("bulbFusion");
    let fusionSound = document.getElementById("fusionSound");
    let instructionModal = document.getElementById("instructionModal");
    let startAnimationButton = document.getElementById("startAnimation");

    let unlockSound = document.getElementById("unlockSound");
    let flash = document.getElementById("flashEffect");
    let rewardModal = document.getElementById("rewardModal");
    let closeModal = document.getElementById("closeModal");
    let modalText = document.getElementById("modalText"); // Tambahan untuk mengubah teks modal
    let modalSound = document.getElementById("modalSound");
    let duck = document.querySelector(".duck-container");
    let duckText = document.getElementById("duckText");
    let duckSound = new Audio("assets/sound/quack.mp3");
    let backgroundTransitionSound = document.getElementById("backgroundTransitionSound");
    let backgroundFade = document.getElementById("backgroundFade");
    let canClickDuck = false;
    let speechBubble = document.querySelector(".speech-bubble");
    let bgMusic = document.getElementById("bgMusic");

    let firstDuck = true;
    let speechIndex = 0;
    let speechIndexSecond = 0;
    let isModalClosed = false;

    let storeModal = document.getElementById("storeModal");
    let closeStoreModal = document.getElementById("closeStoreModal");
    let failSound = document.getElementById("failSound");
    let doorSound = document.getElementById("doorSound");

    let finalModal = document.getElementById("finalModal");
    let closeFinalModal = document.getElementById("closeFinalModal");
    let finalModal2 = document.getElementById("finalModal2");
    let closeFinalModal2 = document.getElementById("closeFinalModal2");
    let hbdSound = document.getElementById("hbdSound");

    let confetti = document.getElementById("confetti");
    let partyHornSound = document.getElementById("partyHornSound");

    let cake = document.getElementById("cake");
    let balloonLeft = document.getElementById("balloon-left");
    let balloonRight = document.getElementById("balloon-right");

    let openModalButton = document.getElementById("openModalButton");



    // Teks pertama bebek
    const speechLinesFirst = [
        "Loh? Kok aku muncul lagi?",
        "Oalah ternyata hei kamu si Kucul udah nemu hadiah pertama yang dari Si Bos..",
        "Gimana perasaannya? Kasih tahu si Bos dong!",
        "Eh tapi kamu jangan kesenengan dulu",
        "Masih banyak yang lain nungguin kamu buka-buka loh!",
        "Ayo yuk buruan! Ikut Bento!!!!",
        "(Klik Bento)"
    ];

    // Teks bebek kedua
    const speechLinesSecond = [
        "Wow! Sekarang kita di tempat baru!",
        "Kamu tau ga ini tempat apa?",
        "Yap benar, kita lagi di Jepang.",
        "Karena Bento tau kamu suka makanan Jepang banget kannn...",
        "Bento juga udah pesenin menu yang paling spesial buat yang lagi ultah!",
        "Yaudah GPL, Ga Pake Lama, yok kita masookk!"
    ];

    // Fungsi untuk memulai animasi bunga dan lampu
    function startAnimationAndSound() {
        if (!isModalClosed) {
            isModalClosed = true;
        }

        setTimeout(() => {
            instructionModal.classList.remove("show");
        }, 300);

        setTimeout(() => {
            flower.classList.add("flower-move");
            bulb.classList.add("bulb-move");
        }, 1000);

        setTimeout(() => {
            fusionSound.play().catch(error => console.warn("Audio play blocked:", error));

            flower.classList.add("fast-rotate");
            bulb.classList.add("fast-rotate");

            setTimeout(() => {
                flower.classList.remove("fast-rotate");
                bulb.classList.remove("fast-rotate");

                flower.classList.add("bounce-once");
                bulb.classList.add("bounce-once");
                unlockSound.play();

                setTimeout(() => {
                    flash.classList.add("active");

                    setTimeout(() => {
                        flower.style.display = "none";
                        bulb.style.display = "none";
                        flash.classList.remove("active");
                        rewardModal.classList.add("show");
                        modalSound.play();
                    }, 2000);
                }, 600);

            }, 2500);
        }, 4000);
    }

    // Event listener untuk menutup modal hadiah dan memunculkan bebek pertama
    closeModal.addEventListener("click", function () {
        rewardModal.classList.remove("show");

        setTimeout(() => {
            duck.classList.add("show-duck");
            duck.classList.add("disabled"); // Nonaktifkan cursor sementara


            setTimeout(() => {
                duckSound.play();
                bgMusic.volume = 0.4;
                bgMusic.play();
                speechBubble.style.display = "block";
                speechBubble.classList.add("speech-visible");
                typeText(speechLinesFirst[speechIndex], duckText);

                setTimeout(() => {
                    canClickDuck = true;
                    duck.classList.remove("disabled"); // Kembalikan cursor pointer
                }, 2000);
            }, 1000);
        }, 1000);
    });

    // Klik pada bebek pertama untuk mengganti teks
    duck.addEventListener("click", function () {
        if (firstDuck && canClickDuck && speechIndex < speechLinesFirst.length - 1) {
            speechIndex++;
            speechBubble.classList.remove("speech-visible");
            canClickDuck = false;
            duck.classList.add("disabled");

            duckSound.currentTime = 0;
            duckSound.play();

            setTimeout(() => {
                typeText(speechLinesFirst[speechIndex], duckText);
                speechBubble.classList.add("speech-visible");

                setTimeout(() => {
                    canClickDuck = true;
                    if (speechIndex === speechLinesFirst.length - 1) {
                        duck.classList.add("disabled");
                    } else {
                        duck.classList.remove("disabled");
                    }
                }, 2000);
            }, 500);
        } else if (firstDuck && canClickDuck && speechIndex === speechLinesFirst.length - 1) {
            canClickDuck = false;
            firstDuck = false;

            backgroundFade.classList.add("fade-in");

            setTimeout(() => {
                document.body.classList.add("background-transition");

                setTimeout(() => {
                    duck.style.display = "none";
                    speechBubble.style.display = "none";
                    backgroundTransitionSound.play();
                }, 500);

                setTimeout(() => {
                    backgroundFade.classList.remove("fade-in");
                }, 1500);

                setTimeout(() => {
                    bgMusic.pause();
                    bgMusic.currentTime = 0;
                }, 2000);

                setTimeout(() => {
                    showSecondDuck();
                }, 8000);
            }, 1500);
        }
    });

    // Fungsi untuk menampilkan bebek kedua
    function showSecondDuck() {
        duck.style.display = "block";
        duck.classList.remove("show-duck");

        setTimeout(() => {
            duck.classList.add("show-duck");
            duck.classList.add("disabled"); // Nonaktifkan cursor sementara
        }, 500);

        setTimeout(() => {
            duckSound.play();
            bgMusic.play();
            speechBubble.style.display = "block";
            speechBubble.classList.add("speech-visible");
            canClickDuck = false;

            typeText(speechLinesSecond[speechIndexSecond], duckText);

            setTimeout(() => {
                canClickDuck = true;
                duck.classList.remove("disabled"); // Kembalikan cursor pointer

            }, 2000);
        }, 2000);
    }

    // Klik pada bebek kedua untuk mengganti teks atau menampilkan modal
    function handleSecondDuckClick() {
        if (canClickDuck && speechIndexSecond < speechLinesSecond.length - 1) {
            speechIndexSecond++;
            speechBubble.classList.remove("speech-visible");
            canClickDuck = false;
            duck.classList.add("disabled");

            duckSound.currentTime = 0;
            duckSound.play();

            setTimeout(() => {
                typeText(speechLinesSecond[speechIndexSecond], duckText);
                speechBubble.classList.add("speech-visible");

                setTimeout(() => {
                    canClickDuck = true;
                    if (speechIndexSecond === speechLinesSecond.length - 1) {
                        duck.classList.add("disabled");
                    } else {
                        duck.classList.remove("disabled");
                    }
                }, 2000);
            }, 500);
        } else if (canClickDuck && speechIndexSecond === speechLinesSecond.length - 1) {
            // Menampilkan modal setelah dialog terakhir bebek kedua
            canClickDuck = false;
            storeModal.classList.add("show");
            modalSound.play();
        }
    }

    duck.removeEventListener("click", handleSecondDuckClick);
    duck.addEventListener("click", handleSecondDuckClick);

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

    rejectStoreModal.addEventListener("click", function () {
        failSound.play();
        alert("Hey kamu! Kamu mau kabur kemana? Lagian ini di Jepang. Nanti yang ada kamu kesasar lagi.. Sana masuk aja! 😂");
        setTimeout(() => {
            failSound.pause();
        }, 1200);
    });

    closeStoreModal.addEventListener("click", function () {
        storeModal.classList.remove("show");

        backgroundFade.classList.add("fade-in");

            setTimeout(() => {
                document.body.classList.add("background-sushistore");

                setTimeout(() => {
                    // duck.style.display = "none";
                    speechBubble.style.display = "none";
                    doorSound.play();
                }, 500);

                setTimeout(() => {
                    backgroundFade.classList.remove("fade-in");
                }, 500);

                // setTimeout(() => {
                //     bgMusic.pause();
                //     bgMusic.currentTime = 0;
                // }, 2000);

                setTimeout(() => {
                    showThirdDuck(); // Panggil fungsi untuk menampilkan speech bubble baru
                }, 4000);
            }, 1500);
    });

    function showThirdDuck() {
        speechBubble.style.display = "block"; // Tampilkan kembali bubble
        speechBubble.classList.add("speech-visible");
        canClickDuck = false;
        duckSound.play();
    
        // Hapus event listener lama agar tidak ada konflik
        duck.removeEventListener("click", handleSecondDuckClick);
        duck.removeEventListener("click", handleThirdDuckClick); // Pastikan tidak ada event listener ganda
    
        // Teks bebek ketiga
        const speechLinesThird = [
            "Wah, kita udah masuk ke dalam toko sushi!",
            "Bento tau kamu suka banget sama sushi karena dikasih tau Bos Bento...",
            "Sebelum pesen, Bento mau mewakili semua...",
            "Selamat ulang tahun ya sekali lagi! 😄",
            "Bento seneng bisa ketemu sama Cawi lagi...",
            "Kapan-kapan kita bakal main lagi yah!",
            "Love from Bento ❤️",
            "Ayo sekarang kita lihat pesenan menu spesial yang dari Bento! 🍣"
        ];
    
        let speechIndexThird = 0;
    
        // Tampilkan teks pertama dari bebek ketiga
        typeText(speechLinesThird[speechIndexThird], duckText);
    
        function handleThirdDuckClick() {
            if (canClickDuck && speechIndexThird < speechLinesThird.length - 1) {
                speechIndexThird++;
                speechBubble.classList.remove("speech-visible");
                canClickDuck = false;
                duck.classList.add("disabled");
    
                duckSound.currentTime = 0;
                duckSound.play();
    
                setTimeout(() => {
                    typeText(speechLinesThird[speechIndexThird], duckText);
                    speechBubble.classList.add("speech-visible");
    
                    setTimeout(() => {
                        canClickDuck = true;
                        if (speechIndexThird === speechLinesThird.length - 1) {
                            duck.classList.add("disabled");
                            duck.removeEventListener("click", handleThirdDuckClick);
    
                            // Tampilkan modal pertama setelah teks terakhir
                            setTimeout(() => {
                                finalModal.classList.add("show");
                                modalSound.play();
                            }, 1000);
                        } else {
                            duck.classList.remove("disabled");
                        }
                    }, 2000);
                }, 500);
            }
        }
    
        // Tambahkan event listener baru untuk menangani klik bebek hanya pada speech bubble ketiga
        duck.addEventListener("click", handleThirdDuckClick);
    
        // Event listener untuk berpindah ke modal kedua
        closeFinalModal.addEventListener("click", function () {
            finalModal.classList.remove("show"); // Tutup modal pertama
            setTimeout(() => {
                finalModal2.classList.add("show"); // Tampilkan modal kedua
                modalSound.play();
                setTimeout(() => {
                    bgMusic.volume = 0.4;
                    hbdSound.play();
                }, 1500);
            }, 500);
        });
    
        // Event listener untuk menutup modal final
        closeFinalModal2.addEventListener("click", function () {
            finalModal2.classList.remove("show");
            // duck.style.display = "none";
            speechBubble.style.display = "none";

            // Munculkan Confetti
            setTimeout(() => {
                duck.classList.add("goyang");
                confetti.style.opacity = "1"; // Tampilkan confetti
                confetti.classList.add("fall"); // Tambahkan animasi jatuh dan goyang
                partyHornSound.play();
                setTimeout(() => {
                    cake.classList.remove("cake-hidden"); // Hapus class yang menyembunyikan kue
                    cake.classList.add("appear-cake"); // Tambahkan class animasi muncul
                }, 4000);
                setTimeout(() => {
                    balloonLeft.classList.remove("balloon-hidden");
                    balloonLeft.classList.add("appear-balloon-left");
                
                    balloonRight.classList.remove("balloon-hidden");
                    balloonRight.classList.add("appear-balloon-right");
                }, 5000);

                setTimeout(() => {
                    setTimeout(() => {
                        openModalButton.classList.add("fade-in");
                    }, 100);
                    openModalButton.style.display = "block"; // Munculkan tombol
                }, 15000); // Tombol muncul setelah 15 detik dari animasi balon

            }, 2000);
        });

        document.getElementById("openModalButton").addEventListener("click", function () {
            let modal = document.getElementById("scrollModal");
            console.log("Modal dibuka:", modal); // Debugging
            modal.classList.add("show"); // Tambahkan class show untuk menampilkan modal
            modalSound.play();
        });

        document.getElementById("closeModalButton").addEventListener("click", function () {
            let modal = document.getElementById("scrollModal");
            window.location.href = "index.html";ss
        });
        
    
        // Aktifkan kembali klik setelah 2 detik
        setTimeout(() => {
            canClickDuck = true;
            duck.classList.remove("disabled"); // Kembalikan cursor pointer
        }, 2000);
    }
    
    
    
    


    startAnimationButton.addEventListener("click", startAnimationAndSound, { once: true });
});
