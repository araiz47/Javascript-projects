const menuBtn = document.getElementById("menuBtn");
const nav = document.getElementById("nav");
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
const filters = document.querySelectorAll('.filter');
const tiles = document.querySelectorAll('.tile');
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
const lightboxClose = document.getElementById("lightboxClose");


menuBtn.addEventListener("click",() =>{
    const isOpen = nav.classList.toggle("open");
    menuBtn.setAttribute("aria-expanded",isOpen);
});

nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () =>{
        nav.classList.remove('open');
        menuBtn.setAttribute("aria-expanded", 'false')
    });
});


let current = 0;
let timer;


function showSlide(index){
    slides.forEach((slide, i) => slide.classList.toggle('active', i === index));
    dots.forEach((dot, i)=> dot.classList.toggle('active', i === index));
    current = index; 
}

function startTimer(){
    timer = setInterval(() => showSlide((current + 1) % slides.length), 5000);
}

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

dots.forEach((dot, i) => {
    dot.addEventListener("click", () =>{
        showSlide(i);
        if(!reducedMotion){
            clearInterval(timer);
            startTimer();
        }
    });
});

if(!reducedMotion) startTimer();


filters.forEach((btn) => {
    btn.addEventListener('click', ()=>{
        const category = btn.dataset.filter;

        filters.forEach(f => f.classList.toggle('active', f === btn));

        tiles.forEach(tile =>{
            const show = category === 'all' || tile.dataset.category === category;
            tile.style.display = show ? '' : 'none';
        });
    });

});



function openlightBox(tile){
    lightboxImg.src = tile.src;
    lightboxImg.alt = tile.alt;
    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden', 'false');
}

function closeLightBox(tile){
    lightbox.classList.remove('open');
    lightbox.setAttribute('aria-hidden', 'true');
    lightbox.removeAttribute('src');
}

tiles.forEach(tile =>{
    tile.tabIndex = 0;
    tile.addEventListener("click", () => openlightBox(tile));
    tile.addEventListener("click", e =>{
        if(e === 'Enter') openlightBox(tile);
    });
});

lightboxClose.addEventListener("click", closeLightBox);

lightbox.addEventListener('click',e => {
    if(e.target === lightbox) closeLightBox();
});

document.addEventListener("keydown", e => {
    if(e.key === 'Escape' && lightbox.classList.contains('open')) closeLightBox();
});


const form = document.getElementById('contactForm');
const formMsg = document.getElementById('formMsg');
 
// Writes a message into the error paragraph under a field ('' clears it)
function setError(fieldId, message) {
  document.getElementById(fieldId + 'Error').textContent = message;
}
 
form.addEventListener('submit', e => {
  e.preventDefault();   // stop the page from reloading
  formMsg.textContent = '';
 
  const name = document.getElementById('name').value.trim();       // trim removes spaces at the ends
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();
  let valid = true;
 
  if (name === '') {
    setError('name', 'Please enter your name.');
    valid = false;
  } else {
    setError('name', '');
  }
 
  // simple email pattern: something@something.something
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    setError('email', 'Please enter a valid email address.');
    valid = false;
  } else {
    setError('email', '');
  }
 
  if (message.length < 10) {
    setError('message', 'Please write at least 10 characters.');
    valid = false;
  } else {
    setError('message', '');
  }
 
  // there's no server, so "success" is just a message on the page
  if (valid) {
    formMsg.textContent = 'Thanks ' + name + '! Your message is on its way.';
    form.reset();
  }
});