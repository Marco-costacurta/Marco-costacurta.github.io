document.addEventListener('DOMContentLoaded', function() {
    // Carrinho de compras
    let cart = [];
    const cartCount = document.getElementById('cart-count');
    const cartItemsContainer = document.getElementById('cart-items');
    const totalAmount = document.getElementById('total-amount');
    const modal = document.getElementById('cart-modal');
    const cartButtons = document.querySelectorAll('.cart-icon a');
    const closeBtn = document.querySelector('.close');
    const checkoutBtn = document.getElementById('checkout-btn');
    
    // Botões "Adicionar ao Carrinho"
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const service = this.getAttribute('data-service');
            const price = parseFloat(this.getAttribute('data-price'));
            
            addToCart(service, price);
        });
    });
    
    // Função para adicionar item ao carrinho
    function addToCart(service, price) {
        const existingItem = cart.find(item => item.service === service);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({
                service: service,
                price: price,
                quantity: 1
            });
        }
        
        updateCart();
        openModal();
    }
    
    // Atualizar o carrinho
    function updateCart() {
        cartCount.textContent = cart.reduce((total, item) => total + item.quantity, 0);
        
        cartItemsContainer.innerHTML = '';
        
        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p>Seu carrinho está vazio.</p>';
            totalAmount.textContent = '0';
            return;
        }
        
        let total = 0;
        
        cart.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.className = 'cart-item';
            
            const itemTotal = item.price * item.quantity;
            total += itemTotal;
            
            itemElement.innerHTML = `
                <span>${item.service} x${item.quantity}</span>
                <span>$${itemTotal.toFixed(2)}</span>
            `;
            
            cartItemsContainer.appendChild(itemElement);
        });
        
        totalAmount.textContent = total.toFixed(2);
    }
    
    // Abrir modal do carrinho
    function openModal() {
        modal.style.display = 'block';
    }
    
    // Fechar modal do carrinho
    function closeModal() {
        modal.style.display = 'none';
    }
    
    // Event listeners para o modal
    cartButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            openModal();
        });
    });
    
    closeBtn.addEventListener('click', closeModal);
    
    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // Finalizar compra
    checkoutBtn.addEventListener('click', function() {
        if (cart.length === 0) {
            alert('Seu carrinho está vazio!');
            return;
        }
        
        alert('Compra finalizada com sucesso! Total: $' + totalAmount.textContent);
        cart = [];
        updateCart();
        closeModal();
    });
    
    // Inicializar o carrinho
    updateCart();
});