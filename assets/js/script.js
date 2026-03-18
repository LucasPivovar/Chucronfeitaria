
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

if (sweetSelect && detailsTextarea) {
    sweetSelect.addEventListener('change', () => {
        if (sweetSelect.value) {
            detailsTextarea.classList.add('active');
        } else {
            detailsTextarea.classList.remove('active');
        }
    });
}

const orderForm = document.getElementById('orderForm');

if (orderForm) {
    orderForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const addressInput = document.getElementById('address');
        const sweetInput = document.getElementById('sweet');
        const detailsInput = document.getElementById('details');
        
        const name = nameInput ? nameInput.value : '';
        const email = emailInput ? emailInput.value : '';
        const address = addressInput ? addressInput.value : '';
        const sweetText = sweetInput ? sweetInput.options[sweetInput.selectedIndex].text : 'N/A';
        const details = detailsInput ? detailsInput.value : '';
        
        orderForm.reset();
        if (detailsTextarea) detailsTextarea.classList.remove('active');
        
        alert('Mensagem enviada com sucesso! 🎂\n\nEm breve entraremos em contato.');
    });
}

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

// Intersection Observer for scroll animations
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            
            // Handle staggered children if it's a grid
            const staggeredItems = entry.target.querySelectorAll('.staggered');
            staggeredItems.forEach((item, index) => {
                item.style.transitionDelay = `${index * 0.2}s`;
                item.classList.add('active');
            });
        }
    });
}, {
    threshold: 0.1
});

document.querySelectorAll('.reveal').forEach(el => {
    revealObserver.observe(el);
});

// Chef Interactive Data
const chefData = [
    {
        name: "Maria Santos",
        title: "Chef Executiva",
        bio: "Graduada na Le Cordon Bleu Paris, Maria traz a sofisticação da confeitaria francesa para a Chucronfeitaria. Sua paixão por texturas delicadas e sabores equilibrados transformou nossos clássicos em obras de arte.",
        edu: "Le Cordon Bleu Paris",
        exp: "Desde 2010 com confeitaria fina",
        image: "assets/chef1.jpg"
    },
    {
        name: "João Silva",
        title: "Mestre Confeiteiro",
        bio: "João é o guardião das receitas tradicionais da família. Mestre Confeiteiro pela Escola Superior de Gastronomia, ele combina técnicas ancestrais com a precisão da confeitaria moderna.",
        edu: "Escola Superior de Gastronomia",
        exp: "Desde 2015 na Chucronfeitaria",
        image: "assets/chef2.jpg"
    },
    {
        name: "André Costa",
        title: "Especialista em Cake Design",
        bio: "Premiada internacionalmente por suas esculturas de açúcar, André é responsável por transformar sonhos em bolos artísticos. Cada criação sua é única, focada na perfeição visual e no sabor inesquecível.",
        edu: "Instituto de Artes Culinárias",
        exp: "12 anos de experiência premiada",
        image: "assets/chef3.jpg"
    }
];

let currentChefIndex = 0;

function openChefDetail(index) {
    currentChefIndex = index;
    updateChefModal();
    const modal = document.getElementById('chefModal');
    if (!modal) return;
    
    modal.style.display = 'flex';
    setTimeout(() => {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }, 10);

    // Close on click outside
    if (!modal.dataset.listenerAdded) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeChefDetail();
            }
        });
        modal.dataset.listenerAdded = 'true';
    }
}

function updateChefModal() {
    const chef = chefData[currentChefIndex];
    document.getElementById('chefDetailName').textContent = chef.name;
    document.getElementById('chefDetailTitle').textContent = chef.title;
    document.getElementById('chefDetailBio').textContent = chef.bio;
    document.getElementById('chefDetailEdu').textContent = chef.edu;
    document.getElementById('chefDetailExp').textContent = chef.exp;
    document.getElementById('chefDetailImage').style.backgroundImage = `url(${chef.image})`;
}

function closeChefDetail() {
    const modal = document.getElementById('chefModal');
    modal.classList.remove('active');
    setTimeout(() => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }, 400);
}

function navigateChef(direction) {
    currentChefIndex = (currentChefIndex + direction + chefData.length) % chefData.length;
    
    // Quick fade transition effect
    const grid = document.querySelector('.chef-detail-grid');
    grid.style.opacity = '0';
    grid.style.transform = 'translateX(' + (direction * 20) + 'px)';
    
    setTimeout(() => {
        updateChefModal();
        grid.style.opacity = '1';
        grid.style.transform = 'translateX(0)';
    }, 200);
}

// Close chef modal on escape
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const chefModal = document.getElementById('chefModal');
        if (chefModal && chefModal.classList.contains('active')) {
            closeChefDetail();
        }
    }
});

// Cart Logic
let cart = [];

function loadCart() {
    try {
        const savedCart = localStorage.getItem('chucro_cart');
        cart = savedCart ? JSON.parse(savedCart) : [];
        console.log("Cart loaded from storage:", cart);
    } catch (e) {
        console.error("Error loading cart:", e);
        cart = [];
    }
}

function saveCart() {
    localStorage.setItem('chucro_cart', JSON.stringify(cart));
}

function toggleCart() {
    const sidebar = document.getElementById('cartSidebar');
    const overlay = document.getElementById('cartOverlay');
    if (!sidebar || !overlay) return;
    
    sidebar.classList.toggle('active');
    overlay.classList.toggle('active');
    document.body.style.overflow = sidebar.classList.contains('active') ? 'hidden' : 'auto';
}

function updateCartUI() {
    const cartItemsContainer = document.getElementById('cartItems');
    const cartBadge = document.getElementById('cartBadgeHeader');
    const cartTotal = document.getElementById('cartTotal');
    const cartFooter = document.getElementById('cartFooter');

    if (!cartItemsContainer || !cartBadge) return;

    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartBadge.textContent = totalItems;
    cartBadge.style.display = totalItems > 0 ? 'flex' : 'none';

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `
            <div class="cart-empty">
                <div class="cart-empty-icon"><i class="fas fa-birthday-cake"></i></div>
                <p>Seu carrinho está vazio</p>
                <p style="font-size: 0.9rem; margin-top: 0.5rem;">Escolha um bolo delicioso!</p>
            </div>
        `;
        if (cartFooter) cartFooter.style.display = 'none';
    } else {
        cartItemsContainer.innerHTML = cart.map((item, index) => `
            <div class="cart-item">
                <div class="cart-item-image">
                    <img src="${item.image}" alt="${item.name}" style="width: 100%; height: 100%; object-fit: cover; border-radius: 4px;">
                </div>
                <div class="cart-item-details">
                    <div class="cart-item-title">${item.name}</div>
                    <div class="cart-item-price">R$ ${Number(item.price).toFixed(2).replace('.', ',')}</div>
                    <div class="cart-item-controls">
                        <button class="cart-qty-btn" onclick="updateQuantity(${index}, -1)">-</button>
                        <span>${item.quantity}</span>
                        <button class="cart-qty-btn" onclick="updateQuantity(${index}, 1)">+</button>
                        <button class="remove-item" onclick="removeFromCart(${index})">🗑️</button>
                    </div>
                </div>
            </div>
        `).join('');
        if (cartFooter) cartFooter.style.display = 'block';
    }

    if (cartTotal) {
        const total = cart.reduce((sum, item) => sum + (Number(item.price) * item.quantity), 0);
        cartTotal.textContent = `R$ ${total.toFixed(2).replace('.', ',')}`;
    }
}

function addToCart(name, price, image) {
    const existing = cart.find(item => item.name === name);
    if (existing) {
        existing.quantity++;
    } else {
        cart.push({ name, price, image, quantity: 1 });
    }
    saveCart();
    updateCartUI();
    if (!document.getElementById('cartSidebar').classList.contains('active')) {
        toggleCart();
    }
}

function updateQuantity(index, delta) {
    cart[index].quantity += delta;
    if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
    }
    saveCart();
    updateCartUI();
}

function removeFromCart(index) {
    cart.splice(index, 1);
    saveCart();
    updateCartUI();
}

function clearCart() {
    if (confirm('Deseja limpar o carrinho?')) {
        cart = [];
        saveCart();
        updateCartUI();
    }
}

function checkout() {
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const items = cart.map(item => `${item.quantity}x ${item.name}`).join('\n');
    const message = `Olá! Gostaria de fazer um pedido:\n\n${items}\n\nTotal: R$ ${total.toFixed(2).replace('.', ',')}`;
    window.open(`https://wa.me/5541988188085?text=${encodeURIComponent(message)}`, '_blank');
}

// Initialize Cart UI
document.addEventListener('DOMContentLoaded', () => {
    loadCart();
    updateCartUI();
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const sidebar = document.getElementById('cartSidebar');
        if (sidebar && sidebar.classList.contains('active')) {
            toggleCart();
        }
        if (nav.classList.contains('active')) {
            menuToggle.classList.remove('active');
            nav.classList.remove('active');
        }
    }
});