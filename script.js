// Reveal sections as they enter the viewport
const observer = new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
},{threshold:.12});
document.querySelectorAll(".reveal").forEach(el=>observer.observe(el));

// Smooth cursor glow on desktop
const glow=document.querySelector(".cursor-glow");
let mouseX=window.innerWidth/2, mouseY=window.innerHeight/2;
let glowX=mouseX, glowY=mouseY;
window.addEventListener("pointermove",e=>{ mouseX=e.clientX; mouseY=e.clientY; });
function animateGlow(){
  glowX += (mouseX-glowX)*0.12;
  glowY += (mouseY-glowY)*0.12;
  if(glow){ glow.style.left=glowX+"px"; glow.style.top=glowY+"px"; }
  requestAnimationFrame(animateGlow);
}
animateGlow();

// Subtle mouse tilt for the profile card
const card=document.querySelector(".hero-card");
if(card && window.matchMedia("(pointer:fine)").matches){
  card.addEventListener("pointermove",e=>{
    const r=card.getBoundingClientRect();
    const x=(e.clientX-r.left)/r.width-.5;
    const y=(e.clientY-r.top)/r.height-.5;
    card.style.transform=`perspective(900px) rotateX(${-y*4}deg) rotateY(${x*5}deg) translateY(-4px)`;
  });
  card.addEventListener("pointerleave",()=>{
    card.style.transform="";
  });
}

// Interactive project cards
const projects=document.querySelectorAll(".project");
projects.forEach(project=>{
  project.addEventListener("pointermove",e=>{
    const r=project.getBoundingClientRect();
    project.style.setProperty("--mx", `${e.clientX-r.left}px`);
    project.style.setProperty("--my", `${e.clientY-r.top}px`);
  });
});

// Mobile navigation
const menu=document.querySelector(".menu");
const nav=document.querySelector(".nav nav");
menu?.addEventListener("click",()=>{
  const open=nav.classList.toggle("open");
  menu.setAttribute("aria-expanded",open);
});
nav?.querySelectorAll("a").forEach(link=>link.addEventListener("click",()=>nav.classList.remove("open")));

// Respect reduced-motion preferences
if(window.matchMedia("(prefers-reduced-motion: reduce)").matches){
  document.documentElement.style.scrollBehavior="auto";
  document.querySelectorAll(".reveal").forEach(el=>el.classList.add("visible"));
}
