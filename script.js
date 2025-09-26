// === LIGHTBOX GALLERY ===
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

// === MORPH TRANSITION MULTICOLOR ===
const overlayPath = document.querySelector(".morph-overlay path");
const gradientStops = document.querySelectorAll("#morphGradient stop");
const morphColors = [
  ["#ff416c", "#ff4b2b"],
  ["#00c6ff", "#0072ff"],
  ["#7F00FF", "#E100FF"],
  ["#f7971e", "#ffd200"],
  ["#11998e", "#38ef7d"]
];
let colorIndex = 0;
function morphTransition(target) {
  const [c1, c2] = morphColors[colorIndex];
  gradientStops[0].setAttribute("stop-color", c1);
  gradientStops[1].setAttribute("stop-color", c2);
  colorIndex = (colorIndex + 1) % morphColors.length;
  overlayPath.setAttribute("d", "M0,320 L1440,320 L1440,0 Q720,600 0,0 Z");
  setTimeout(() => { document.querySelector(target).scrollIntoView({ behavior: "smooth" }); }, 400);
  setTimeout(() => { overlayPath.setAttribute("d", "M0,320 L1440,320 L1440,0 Q720,180 0,0 Z"); }, 900);
}
document.querySelectorAll("a[href^='#']").forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();
    morphTransition(link.getAttribute("href"));
  });
});
