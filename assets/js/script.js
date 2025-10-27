
let currentIndex = 0;

function moveSlide(direction) {
    const carouselInner = document.getElementById('carouselInner');
    const slides = carouselInner.querySelectorAll('img');
    const totalSlides = slides.length;
    currentIndex = (currentIndex + direction + totalSlides) % totalSlides;
    carouselInner.style.transform = `translateX(-${currentIndex * 100}%)`;
}

setInterval(() => moveSlide(1), 5000);

const menuToggle = document.getElementById('menuToggle');
const nav = document.getElementById('nav');

menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    nav.classList.toggle('active');
});

document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        nav.classList.remove('active');
    });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!nav.contains(e.target) && !menuToggle.contains(e.target) && nav.classList.contains('active')) {
        menuToggle.classList.remove('active');
        nav.classList.remove('active');
    }
});

const sweetSelect = document.getElementById('sweet');
const detailsTextarea = document.getElementById('details');

sweetSelect.addEventListener('change', () => {
    if (sweetSelect.value) {
        detailsTextarea.classList.add('active');
    } else {
        detailsTextarea.classList.remove('active');
    }
});

const orderForm = document.getElementById('orderForm');

orderForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const address = document.getElementById('address').value;
    const sweet = document.getElementById('sweet');
    const sweetText = sweet.options[sweet.selectedIndex].text;
    const details = document.getElementById('details').value;
    
    orderForm.reset();
    detailsTextarea.classList.remove('active');
    
    alert('Pedido enviado com sucesso! 🎂\n\nNome: ' + name + '\nEmail: ' + email + '\nEndereço: ' + address + '\nPedido: ' + sweetText + (details ? '\nDetalhes: ' + details : ''));
});

let lastScroll = 0;

window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        header.style.boxShadow = '0 5px 30px rgba(0, 0, 0, 0.15)';
    } else {
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    }
    
    lastScroll = currentScroll;
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        if (nav.classList.contains('active')) {
            menuToggle.classList.remove('active');
            nav.classList.remove('active');
        }
    }
});