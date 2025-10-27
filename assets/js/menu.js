
let cart = [];
let currentQuantity = 1;
let currentItem = null;

const filterBtns = document.querySelectorAll('.filter-btn');
const menuItems = document.querySelectorAll('.menu-item');
const modal = document.getElementById('modal');
const cartSidebar = document.getElementById('cartSidebar');
const cartOverlay = document.getElementById('cartOverlay');
const cartItems = document.getElementById('cartItems');
const cartBadge = document.getElementById('cartBadge');
const cartTotal = document.getElementById('cartTotal');
const cartFooter = document.getElementById('cartFooter');

document.addEventListener('DOMContentLoaded', () => {
    updateCartUI();
    initializeAnimations();
});

function initializeAnimations() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from {
                transform: translateX(400px);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOutRight {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(400px);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const category = btn.dataset.category;

        menuItems.forEach(item => {
            if (category === 'all' || item.dataset.category === category) {
                item.classList.remove('hidden');
            } else {
                item.classList.add('hidden');
            }
        });
    });
});

function openModal(btn) {
    const item = btn.closest('.menu-item');
    const title = item.querySelector('.menu-item-title').textContent;
    const price = item.querySelector('.menu-item-price').textContent;
    const priceValue = parseFloat(item.querySelector('.menu-item-price').dataset.price);
    const description = item.querySelector('.menu-item-description').textContent;
    const imageElement = item.querySelector('.menu-item-image');
    const imageSrc = imageElement.src;
    const imageAlt = imageElement.alt || title;

    currentItem = { 
        title, 
        price, 
        priceValue,
        description, 
        imageSrc
    };

    document.getElementById('modalTitle').textContent = title;
    document.getElementById('modalPrice').textContent = price;
    document.getElementById('modalDescription').textContent = description;
    
    const modalImage = document.getElementById('modalImage');
    modalImage.innerHTML = `<img src="${imageSrc}" alt="${imageAlt}" style="width: 100%; height: 100%; object-fit: cover; border-radius: 8px;">`;
    
    document.getElementById('quantity').textContent = '1';
    currentQuantity = 1;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

function changeQuantity(delta) {
    currentQuantity = Math.max(1, currentQuantity + delta);
    document.getElementById('quantity').textContent = currentQuantity;
}

function addToCart() {
    const existingItem = cart.find(item => item.title === currentItem.title);

    if (existingItem) {
        existingItem.quantity += currentQuantity;
    } else {
        cart.push({
            title: currentItem.title,
            price: currentItem.price,
            priceValue: currentItem.priceValue,
            imageSrc: currentItem.imageSrc,
            quantity: currentQuantity
        });
    }

    updateCartUI();
    closeModal();
    showNotification(`${currentQuantity}x ${currentItem.title} adicionado ao carrinho!`);
}

function toggleCart() {
    cartSidebar.classList.toggle('active');
    cartOverlay.classList.toggle('active');
    document.body.style.overflow = cartSidebar.classList.contains('active') ? 'hidden' : 'auto';
}

function updateCartUI() {
    // Atualizar badge
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    
    if (totalItems > 0) {
        cartBadge.textContent = totalItems;
        cartBadge.style.display = 'flex';
    } else {
        cartBadge.style.display = 'none';
    }

    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="cart-empty">
                <div class="cart-empty-icon">🍰</div>
                <p>Seu carrinho está vazio</p>
                <p style="font-size: 0.9rem; margin-top: 0.5rem;">Adicione alguns doces deliciosos!</p>
            </div>
        `;
        cartFooter.style.display = 'none';
    } else {
        cartItems.innerHTML = cart.map((item, index) => `
            <div class="cart-item">
                <div class="cart-item-image">
                    <img src="${item.imageSrc}" alt="${item.title}" style="width: 100%; height: 100%; object-fit: cover; border-radius: 4px;">
                </div>
                <div class="cart-item-details">
                    <div class="cart-item-title">${item.title}</div>
                    <div class="cart-item-price">${item.price}</div>
                    <div class="cart-item-controls">
                        <button class="cart-qty-btn" onclick="updateCartQuantity(${index}, -1)">-</button>
                        <span class="cart-qty">${item.quantity}</span>
                        <button class="cart-qty-btn" onclick="updateCartQuantity(${index}, 1)">+</button>
                        <button class="remove-item" onclick="removeFromCart(${index})" title="Remover">🗑️</button>
                    </div>
                </div>
            </div>
        `).join('');
        cartFooter.style.display = 'block';
    }

    const total = cart.reduce((sum, item) => sum + (item.priceValue * item.quantity), 0);
    cartTotal.textContent = `R$ ${total.toFixed(2).replace('.', ',')}`;
}

function updateCartQuantity(index, delta) {
    cart[index].quantity += delta;
    
    if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
    }
    
    updateCartUI();
}

function removeFromCart(index) {
    const item = cart[index];
    cart.splice(index, 1);
    updateCartUI();
    showNotification(`${item.title} removido do carrinho`);
}

function clearCart() {
    if (cart.length === 0) return;
    
    if (confirm('Deseja realmente limpar todo o carrinho?')) {
        cart = [];
        updateCartUI();
        showNotification('Carrinho limpo!');
    }
}

function checkout() {
    if (cart.length === 0) return;
    
    const total = cart.reduce((sum, item) => sum + (item.priceValue * item.quantity), 0);
    const itemsList = cart.map(item => `${item.quantity}x ${item.title}`).join('\n');
    
    const message = `🛒 *Novo Pedido - Chucronfeitaria*\n\n${itemsList}\n\n💰 *Total: R$ ${total.toFixed(2).replace('.', ',')}*`;
    
    const whatsappNumber = '5541988188085'; 
    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    
    window.open(whatsappURL, '_blank');
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        bottom: 100px;
        right: 2rem;
        background: var(--primary-dark);
        color: black;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 5px 20px rgba(0, 0, 0, 0.3);
        z-index: 4000;
        animation: slideInRight 0.3s ease;
        max-width: 300px;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

modal.addEventListener('click', (e) => {
    if (e.target.id === 'modal') {
        closeModal();
    }
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        if (modal.classList.contains('active')) {
            closeModal();
        }
        if (cartSidebar.classList.contains('active')) {
            toggleCart();
        }
        if (nav && nav.classList.contains('active')) {
            menuToggle.classList.remove('active');
            nav.classList.remove('active');
        }
    }
});

const menuToggle = document.getElementById('menuToggle');
const nav = document.getElementById('nav');

if (menuToggle && nav) {
    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        nav.classList.toggle('active');
    });

    // Fechar menu ao clicar em um link
    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            nav.classList.remove('active');
        });
    });

    // Fechar menu ao clicar fora
    document.addEventListener('click', (e) => {
        if (!nav.contains(e.target) && !menuToggle.contains(e.target) && nav.classList.contains('active')) {
            menuToggle.classList.remove('active');
            nav.classList.remove('active');
        }
    });
}

window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (header) {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            header.style.boxShadow = '0 5px 30px rgba(0, 0, 0, 0.15)';
        } else {
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        }
    }
});