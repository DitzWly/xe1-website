// === NAVBAR SCROLL EFFECT ===
window.addEventListener("scroll", () => {
  const header = document.querySelector("header");
  if (window.scrollY > 50) {
    header.style.background = "rgba(20,20,30,0.95)";
    header.style.boxShadow = "0 4px 20px rgba(0,0,0,0.6)";
  } else {
    header.style.background = "rgba(20,20,30,0.7)";
    header.style.boxShadow = "none";
  }
});

// === HERO TYPING EFFECT ===
document.addEventListener("DOMContentLoaded", () => {
  const title = document.getElementById("hero-title");
  const text = "X E1 Boarding School";
  title.textContent = "";
  let i = 0;

  function typing() {
    if (i < text.length) {
      title.textContent += text.charAt(i);
      i++;
      setTimeout(typing, 100);
    } else {
      // setelah selesai, kasih glow animasi
      title.style.animation = "glowText 2s infinite alternate";
    }
  }
  typing();

  // Sub animasi fade in
  const sub = document.getElementById("hero-sub");
  sub.style.opacity = 0;
  setTimeout(() => {
    sub.style.transition = "opacity 1.5s ease";
    sub.style.opacity = 1;
  }, 2000);
});

// === SMOOTH SCROLL NAVIGATION ===
document.querySelectorAll("a[href^='#']").forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();
    document.querySelector(link.getAttribute("href")).scrollIntoView({
      behavior: "smooth"
    });
  });
});

// === SCROLL REVEAL EFFECT ===
const revealElements = document.querySelectorAll(
  "#visi, #misi, #tentang, .doc-item, .mission-card, .quote"
);
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = 1;
      entry.target.style.transform = "translateY(0)";
    }
  });
}, { threshold: 0.2 });

revealElements.forEach(el => {
  el.style.opacity = 0;
  el.style.transform = "translateY(60px)";
  el.style.transition = "all 0.8s cubic-bezier(0.25, 1, 0.5, 1)";
  observer.observe(el);
});

// === RANDOM PARTICLE BACKGROUND EFFECT (futuristik) ===
const particleContainer = document.createElement("div");
particleContainer.style.position = "fixed";
particleContainer.style.top = 0;
particleContainer.style.left = 0;
particleContainer.style.width = "100%";
particleContainer.style.height = "100%";
particleContainer.style.zIndex = "-1";
particleContainer.style.overflow = "hidden";
document.body.appendChild(particleContainer);

for (let i = 0; i < 30; i++) {
  const particle = document.createElement("span");
  particle.classList.add("particle");
  particle.style.left = Math.random() * 100 + "vw";
  particle.style.top = Math.random() * 100 + "vh";
  particle.style.animationDuration = 5 + Math.random() * 10 + "s";
  particle.style.opacity = Math.random();
  particleContainer.appendChild(particle);
}

// === LIGHTBOX GALLERY ===
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const lightboxCaption = document.getElementById("lightbox-caption");
const closeBtn = document.querySelector(".close");

document.querySelectorAll(".doc-item img").forEach(img => {
  img.addEventListener("click", () => {
    lightbox.style.display = "block";
    lightboxImg.src = img.src;
    lightboxCaption.textContent = img.nextElementSibling.textContent;
  });
});

closeBtn.addEventListener("click", () => {
  lightbox.style.display = "none";
});
window.addEventListener("click", e => {
  if (e.target === lightbox) lightbox.style.display = "none";
});
