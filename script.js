document.addEventListener("DOMContentLoaded", function () {
  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector(".nav-menu");
  const navLinks = document.querySelectorAll(".nav-menu a");
  const contactForm = document.getElementById("contactForm");

  hamburger.addEventListener("click", function () {
    navMenu.classList.toggle("active");
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", function () {
      navMenu.classList.remove("active");
      navLinks.forEach((l) => l.classList.remove("active"));
      this.classList.add("active");
    });
  });

  window.addEventListener("scroll", function () {
    const header = document.querySelector("header");
    if (window.scrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }

    const sections = document.querySelectorAll("section");
    const scrollPos = window.scrollY + 100;

    sections.forEach((section) => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute("id");

      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach((link) => {
          link.classList.remove("active");
          if (link.getAttribute("href") === "#" + id) {
            link.classList.add("active");
          }
        });
      }
    });
  });

  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const nama = document.getElementById("nama").value;
    const email = document.getElementById("email").value;
    const subjek = document.getElementById("subjek").value;
    const pesan = document.getElementById("pesan").value;

    if (nama && email && subjek && pesan) {
      const btn = contactForm.querySelector('button[type="submit"]');
      const originalText = btn.textContent;
      btn.textContent = "Mengirim...";
      btn.disabled = true;

      emailjs.init("qqqFzNlAmngj3Sg6s");
      emailjs
        .send("service_652lmyn", "template_1fp232q", {
          from_name: nama,
          from_email: email,
          subject: subjek,
          message: pesan,
          name: nama,
          email: email,
        })
        .then(function () {
          alert("BERHASIL! Pesan telah terkirim ke email Anda.");
          contactForm.reset();
          btn.textContent = originalText;
          btn.disabled = false;
        })
        .catch(function (error) {
          console.error("EmailJS Error:", error);
          alert(
            "GAGAL: " +
              (error.text || JSON.stringify(error)) +
              "\n\nSaran: Hubungkan ulang Gmail di EmailJS dan CENTANG SEMUA IZIN.",
          );
          btn.textContent = originalText;
          btn.disabled = false;
        });
    }
  });

  // Audio Player Logic with Iframe (Radio Garden)
  const playBtn = document.getElementById("play-button");
  const playerContainer = document.getElementById("player-container");
  const radioIframe = document.getElementById("radio-iframe");
  const closePlayer = document.getElementById("close-player");
  const buttonText = document.getElementById("button-text");
  const playIcon = playBtn.querySelector("i");

  const radioGardenUrl = "https://radio.garden/listen/sebayu-fm/1EZU4YYS";

  playBtn.addEventListener("click", function () {
    if (playerContainer.style.display === "none") {
      // Buka player
      playerContainer.style.display = "block";
      radioIframe.src = radioGardenUrl;
      buttonText.textContent = "Menutup Player";
      playIcon.classList.remove("fa-play");
      playIcon.classList.add("fa-times");

      // Scroll ke player agar terlihat
      playerContainer.scrollIntoView({ behavior: "smooth", block: "center" });
    } else {
      hidePlayer();
    }
  });

  closePlayer.addEventListener("click", hidePlayer);

  function hidePlayer() {
    playerContainer.style.display = "none";
    radioIframe.src = ""; // Stop audio by clearing iframe
    buttonText.textContent = "Dengarkan Sekarang";
    playIcon.classList.remove("fa-times");
    playIcon.classList.add("fa-play");
  }

  // Smooth Scroll for navigation links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        const headerOffset = 70;
        const elementPosition = target.offsetTop;
        const offsetPosition = elementPosition - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    });
  });
});
