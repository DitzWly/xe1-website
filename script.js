// NAVBAR SCROLL
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

// HERO TYPING
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
    }
  }
  typing();
});

// SMOOTH SCROLL
document.querySelectorAll("a[href^='#']").forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();
    document.querySelector(link.getAttribute("href")).scrollIntoView({behavior:"smooth"});
  });
});

// SECTION REVEAL
const sections = document.querySelectorAll("section");
const obs = new IntersectionObserver(entries=>{
  entries.forEach(e=>{ if(e.isIntersecting) e.target.classList.add("revealed"); });
},{threshold:0.2});
sections.forEach(s=>obs.observe(s));

// CUSTOM CURSOR
const cursor = document.createElement("div");
cursor.classList.add("cursor-glow");
document.body.appendChild(cursor);
document.addEventListener("mousemove", e=>{
  cursor.style.left = e.pageX+"px";
  cursor.style.top = e.pageY+"px";
});

// 3D TILT
document.querySelectorAll(".doc-item, .mission-card").forEach(card=>{
  card.addEventListener("mousemove", e=>{
    const rect=card.getBoundingClientRect();
    const x=e.clientX-rect.left, y=e.clientY-rect.top;
    const rotateX=(y-rect.height/2)/20, rotateY=(x-rect.width/2)/20;
    card.style.transform=`rotateX(${-rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
  });
  card.addEventListener("mouseleave", ()=>{
    card.style.transform="rotateX(0) rotateY(0) scale(1)";
    card.style.transition="transform 0.3s ease";
  });
});

// LIGHTBOX PRO
const lightbox=document.getElementById("lightbox");
const lightboxImg=document.getElementById("lightbox-img");
const lightboxCaption=document.getElementById("lightbox-caption");
const closeBtn=document.querySelector(".close");
const prevBtn=document.querySelector(".prev");
const nextBtn=document.querySelector(".next");
const thumbStrip=document.getElementById("thumb-strip");

let currentIndex=0;
const images=document.querySelectorAll(".doc-item img");

images.forEach((img,i)=>{
  const thumb=document.createElement("img");
  thumb.src=img.src;
  thumb.addEventListener("click",()=>showImage(i));
  thumbStrip.appendChild(thumb);
});

function updateThumb(){ document.querySelectorAll(".thumb-strip img").forEach((t,i)=>t.classList.toggle("active",i===currentIndex)); }
function showImage(i){
  if(i<0) i=images.length-1; if(i>=images.length) i=0;
  currentIndex=i;
  lightbox.classList.add("show"); lightbox.style.display="flex";
  lightboxImg.src=images[i].src; lightboxCaption.textContent=images[i].nextElementSibling.textContent;
  updateThumb();
}
images.forEach((img,i)=>img.addEventListener("click",()=>showImage(i)));
prevBtn.addEventListener("click",()=>showImage(currentIndex-1));
nextBtn.addEventListener("click",()=>showImage(currentIndex+1));
closeBtn.addEventListener("click",()=>{ lightbox.style.display="none"; lightbox.classList.remove("show"); });
window.addEventListener("click",e=>{ if(e.target===lightbox){ lightbox.style.display="none"; lightbox.classList.remove("show"); }});
document.addEventListener("keydown",e=>{
  if(lightbox.style.display==="flex"){
    if(e.key==="ArrowLeft") showImage(currentIndex-1);
    if(e.key==="ArrowRight") showImage(currentIndex+1);
    if(e.key==="Escape"){ lightbox.style.display="none"; lightbox.classList.remove("show"); }
  }
});
// Swipe
let startX=0;
lightbox.addEventListener("touchstart",e=>{startX=e.touches[0].clientX;});
lightbox.addEventListener("touchend",e=>{
  const endX=e.changedTouches[0].clientX;
  if(startX-endX>50) showImage(currentIndex+1);
  if(endX-startX>50) showImage(currentIndex-1);
});
