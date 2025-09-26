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
  setTimeout(() => {
    document.querySelector(target).scrollIntoView({ behavior: "smooth" });
  }, 400);
  setTimeout(() => {
    overlayPath.setAttribute("d", "M0,320 L1440,320 L1440,0 Q720,180 0,0 Z");
  }, 900);
}

document.querySelectorAll("a[href^='#']").forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();
    morphTransition(link.getAttribute("href"));
  });
});
