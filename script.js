/* ================= HERO SECTION ================= */
const heroContent = document.querySelector(".hero-content");
const hero = document.querySelector(".hero");

// Hero entrance on load
window.addEventListener("load", () => {
  heroContent.style.opacity = "1";
  heroContent.style.transform = "translateY(0)";
  // Staggered text + buttons
  const heroTitle = heroContent.querySelector("h2");
  const heroPara = heroContent.querySelector("p");
  const heroButtons = heroContent.querySelector(".hero-buttons");

  heroTitle.style.opacity = "1";
  heroTitle.style.transform = "translateY(0)";
  
  setTimeout(() => {
    heroPara.style.opacity = "1";
    heroPara.style.transform = "translateY(0)";
  }, 300);

  setTimeout(() => {
    heroButtons.style.opacity = "1";
    heroButtons.style.transform = "translateY(0)";
  }, 600);
});

// Parallax mouse movement
hero.addEventListener("mousemove", (e) => {
  const x = (window.innerWidth / 2 - e.pageX) / 40;
  const y = (window.innerHeight / 2 - e.pageY) / 40;
  heroContent.style.transform = `translate(${x}px, ${y}px)`;
});
hero.addEventListener("mouseleave", () => {
  heroContent.style.transform = "translate(0,0)";
});

// hero-section time counting
const stats = document.querySelectorAll(".stats-section .stat h3");

function easeOutQuad(t, b, c, d) {
  t /= d;
  return -c * t * (t - 2) + b;
}

const statsObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {

      const target = parseInt(entry.target.getAttribute("data-target"));
      const duration = 1500;
      let start = null;

      function animate(timestamp) {
        if (!start) start = timestamp;
        const progress = timestamp - start;

        const value = Math.round(
          easeOutQuad(progress, 0, target, duration)
        );

        entry.target.textContent = value + "+";

        if (progress < duration) {
          requestAnimationFrame(animate);
        } else {
          entry.target.textContent = target + "+";
        }
      }

      setTimeout(() => {
        requestAnimationFrame(animate);
      }, index * 300);

      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

stats.forEach(stat => statsObserver.observe(stat));


/* ================= HAMBURGER MENU ================= */
const hamburger = document.getElementById("hamburger");
const navigation = document.getElementById("navigation");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navigation.classList.toggle("active");
});

/* ================= BUTTON SMOOTH SCROLL ================= */
document.querySelector(".btn-outline")?.addEventListener("click", () => {
  document.querySelector("#deck-section")?.scrollIntoView({ behavior: "smooth" });
});
document.querySelector(".btn-solid")?.addEventListener("click", () => {
  document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
});

/* ================= DECK FILTER ================= */
const filterButtons = document.querySelectorAll(".deck-tabs button");
const deckCards = document.querySelectorAll(".deck-glass");

filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    filterButtons.forEach(btn => btn.classList.remove("active"));
    button.classList.add("active");

    const filterValue = button.getAttribute("data-filter");

    deckCards.forEach(card => {
      const deckType = card.getAttribute("data-deck");
      if(filterValue === "all" || filterValue === deckType){
        card.classList.remove("hide");
      } else {
        card.classList.add("hide");
      }
    });
  });
});

/* ================= SCROLL REVEAL ================= */
const reveals = document.querySelectorAll(".reveal");
function revealOnScroll() {
  reveals.forEach(element => {
    const elementTop = element.getBoundingClientRect().top;
    if(elementTop < window.innerHeight - 100){
      element.classList.add("show");
    }
  });
}
window.addEventListener("scroll", revealOnScroll);
revealOnScroll();

/* ================= BOOKING MODAL ================= */
const bookModal = document.getElementById("bookModal");
const openBooking = document.getElementById("openBooking");
const confirmBooking = document.getElementById("confirmBooking");
const closeBooking = document.getElementById("closeBooking");

const fullName = document.getElementById("fullName");
const email = document.getElementById("email");
const date = document.getElementById("date");

const nameError = document.getElementById("nameError");
const emailError = document.getElementById("emailError");
const dateError = document.getElementById("dateError");

const successBox = document.getElementById("successBox");

openBooking?.addEventListener("click", () => bookModal.classList.add("open"));
closeBooking?.addEventListener("click", () => bookModal.classList.remove("open"));
bookModal?.addEventListener("click", e => { if(e.target === bookModal) bookModal.classList.remove("open"); });
document.addEventListener("keydown", e => { if(e.key === "Escape") bookModal.classList.remove("open"); });

confirmBooking?.addEventListener("click", () => {
  let valid = true;
  nameError.textContent = emailError.textContent = dateError.textContent = "";

  if(fullName.value.trim() === "") { nameError.textContent = "Full name is required"; valid = false; }
  const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
  if(email.value.trim() === "") { emailError.textContent = "Email is required"; valid = false; }
  else if(!email.value.match(emailPattern)){ emailError.textContent = "Enter valid email"; valid = false; }
  if(date.value === "") { dateError.textContent = "Select a date"; valid = false; }

  if(valid){
    confirmBooking.classList.add("loading");
    confirmBooking.textContent = "Processing...";
    setTimeout(() => {
      confirmBooking.classList.remove("loading");
      confirmBooking.textContent = "Confirm Booking";
      successBox.classList.add("show");
      setTimeout(() => {
        successBox.classList.remove("show");
        bookModal.classList.remove("open");
        fullName.value = email.value = date.value = "";
      }, 2000);
    }, 1500);
  }
});

/* ================== GALLERY MAIN  ================== */
const galleryItems = document.querySelectorAll(".gallery-main .card");

galleryItems.forEach((card, index) => {
  card.style.transition = "transform 0.6s ease, box-shadow 0.6s ease";
  card.addEventListener("mouseenter", () => {
    card.style.transform = "scale(1.08)";
    card.style.boxShadow = "0 20px 40px rgba(0,0,0,0.4)";
  });
  card.addEventListener("mouseleave", () => {
    card.style.transform = "scale(1)";
    card.style.boxShadow = "0 10px 20px rgba(0,0,0,0.2)";
  });

  card.classList.add("reveal");
  setTimeout(() => card.classList.add("show"), index * 150);
});


const galleryCards = document.querySelectorAll('.photo-grid .card');

const cardObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add('show');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

galleryCards.forEach(card => cardObserver.observe(card));
