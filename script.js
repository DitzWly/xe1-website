// === LIGHTBOX ===
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const captionText = document.getElementById("lightbox-caption");
const closeBtn = document.querySelector(".close");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");
const thumbStrip = document.getElementById("thumb-strip");
let currentIndex = 0;

const images = [...document.querySelectorAll(".doc-item img")];

function showLightbox(index) {
  currentIndex = index;
  lightbox.style.display = "flex";
  lightboxImg.src = images[index].src;
  captionText.textContent = images[index].nextElementSibling.textContent;
  thumbStrip.innerHTML = "";
  images.forEach((img, i) => {
    const thumb = document.createElement("img");
    thumb.src = img.src;
    if (i === index) thumb.classList.add("active");
    thumb.onclick = () => showLightbox(i);
    thumbStrip.appendChild(thumb);
  });
}
images.forEach((img, i) => img.addEventListener("click", () => showLightbox(i)));
closeBtn.onclick = () => (lightbox.style.display = "none");
prevBtn.onclick = () => showLightbox((currentIndex - 1 + images.length) % images.length);
nextBtn.onclick = () => showLightbox((currentIndex + 1) % images.length);

// === FADE-IN SCROLL EFFECT ===
const faders = document.querySelectorAll(".fade-in");
function checkFade() {
  const triggerBottom = window.innerHeight * 0.85;
  faders.forEach(fader => {
    const rect = fader.getBoundingClientRect();
    if (rect.top < triggerBottom) fader.classList.add("show");
  });
}
window.addEventListener("scroll", checkFade);
window.addEventListener("load", checkFade);
