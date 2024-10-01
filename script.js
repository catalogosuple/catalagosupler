// Carrinho de Compras
let cart = JSON.parse(localStorage.getItem('cart')) || [];
updateCartCount(); // Atualiza a contagem de itens no carrinho ao carregar a página

// Função para adicionar itens ao carrinho
function addToCart(productName, productPrice) {
    const productIndex = cart.findIndex(item => item.name === productName);

    if (productIndex !== -1) {
        cart[productIndex].quantity += 1;
    } else {
        cart.push({
            name: productName,
            price: productPrice,
            quantity: 1
        });
    }

    updateCartCount();
    saveCartToLocalStorage();

    // Exibir mensagem de feedback
    const messageDiv = document.getElementById('message');
    messageDiv.innerText = `${productName} adicionado ao carrinho!`;
    messageDiv.style.display = 'block'; 
    messageDiv.style.opacity = '1'; 
    setTimeout(() => {
        messageDiv.style.opacity = '0'; 
        setTimeout(() => {
            messageDiv.style.display = 'none'; 
        }, 500); 
    }, 2000);

    const button = event.target; 
    button.classList.add('button-green'); 

    setTimeout(() => {
        button.classList.remove('button-green');
    }, 1000);
}

// Função para salvar o carrinho no localStorage
function saveCartToLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Função para atualizar o número de itens no carrinho
function updateCartCount() {
    document.getElementById('cart-count').innerText = cart.reduce((total, item) => total + item.quantity, 0);
}

// Função para mostrar o carrinho
function showCart() {
    if (cart.length === 0) {
        alert('Seu carrinho está vazio.');
        return;
    }

    const cartItemsContainer = document.getElementById('cart-items');
    cartItemsContainer.innerHTML = ''; 

    cart.forEach((item, index) => {
        const itemElement = document.createElement('div');
        itemElement.classList.add('cart-item');
        itemElement.innerHTML = `
            <p>${item.name} - R$${item.price} x ${item.quantity}</p>
            <button onclick="removeFromCart(${index})">Remover</button>
        `;
        cartItemsContainer.appendChild(itemElement);
    });

    document.getElementById('cart-modal').style.display = 'flex';
}

// Função para remover um item do carrinho
function removeFromCart(index) {
    cart.splice(index, 1); 
    updateCartCount();
    saveCartToLocalStorage(); 
    showCart(); 
}

// Função para fechar o modal do carrinho
function closeCart() {
    document.getElementById('cart-modal').style.display = 'none';
}

// Função para enviar o carrinho para o WhatsApp
function sendToWhatsApp() {
    if (cart.length === 0) {
        alert('Seu carrinho está vazio.');
        return;
    }

    let message = 'Olá, gostaria de comprar os seguintes itens:\n\n';

    cart.forEach(item => {
        message += `${item.name} - R$${item.price.toFixed(2)} x ${item.quantity}\n`;
    });

    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    message += `\nTotal: R$${total.toFixed(2)}`;

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://api.whatsapp.com/send?phone=5585985934633&text=${encodedMessage}`, '_blank');

    closeCart(); 
}

// Detectar mudanças de visibilidade da página
document.addEventListener('visibilitychange', function() {
    if (document.visibilityState === 'visible') {
        updateCartCount();
    }
});

// Atualizar carrinho ao voltar
window.onpopstate = function(event) {
    updateCartCount();
};



function nextImage(button) {
    const card = button.closest('.product-card');
    const images = card.querySelectorAll('.product-image');
    const currentIndex = Array.from(images).findIndex(img => img.style.display !== 'none');
    const nextIndex = (currentIndex + 1) % images.length;

    images[currentIndex].style.display = 'none';
    images[nextIndex].style.display = 'block';
}

function prevImage(button) {
    const card = button.closest('.product-card');
    const images = card.querySelectorAll('.product-image');
    const currentIndex = Array.from(images).findIndex(img => img.style.display !== 'none');
    const prevIndex = (currentIndex - 1 + images.length) % images.length;

    images[currentIndex].style.display = 'none';
    images[prevIndex].style.display = 'block';
}

const images = ["img/mudarparamelhor.png", "img/melhores_precos.png", "img/teste.png", "img/seumelhor.png"]; // URLs das imagens
let currentIndex = 0;
const bannerImage = document.getElementById('bannerImage');
const indicators = document.querySelectorAll('.indicator');
let startX = 0; // Para capturar a posição inicial do toque

// Função para atualizar o banner e os indicadores
function updateBanner() {
    bannerImage.style.opacity = 0; // faz a imagem desaparecer
    setTimeout(() => {
        bannerImage.src = images[currentIndex]; // muda a imagem
        bannerImage.style.opacity = 1; // faz a nova imagem aparecer
        updateIndicators(); // atualiza os indicadores
    }, 1000); // espera a transição de saída
}

// Função para alterar o banner automaticamente
function changeBanner() {
    currentIndex = (currentIndex + 1) % images.length; // aumenta o índice e faz o loop
    updateBanner();
}

// Função para mudar para um banner específico quando o indicador é clicado
function changeBannerTo(index) {
    currentIndex = index; // define o índice com base no indicador clicado
    updateBanner();
}

// Função para atualizar os indicadores visuais
function updateIndicators() {
    indicators.forEach((indicator, index) => {
        indicator.classList.toggle('active', index === currentIndex);
    });
}

// Função para alterar para o próximo banner
function nextBanner() {
    currentIndex = (currentIndex + 1) % images.length;
    updateBanner();
}

// Função para voltar ao banner anterior
function prevBanner() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    updateBanner();
}

// Troca a imagem a cada 4 segundos automaticamente
setInterval(changeBanner, 4000);

// Inicializa os indicadores corretamente na primeira execução
updateIndicators();

// Lógica de arrastar (swipe) para dispositivos móveis
bannerImage.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX; // Captura a posição inicial do toque
});

bannerImage.addEventListener('touchend', (e) => {
    const endX = e.changedTouches[0].clientX; // Captura a posição final do toque
    const diffX = startX - endX; // Calcula a diferença

    if (diffX > 50) {
        // Se arrastou para a esquerda
        nextBanner();
    } else if (diffX < -50) {
        // Se arrastou para a direita
        prevBanner();
    }
});

// Seleciona o ícone do menu hamburguer e a lista de navegação
const hamburger = document.querySelector('.hamburger');
const menu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', function() {
    this.classList.toggle('active'); // Alterna o estado do ícone
    menu.classList.toggle('active'); // Alterna a visibilidade do menu
});

// Atualiza a contagem de itens do carrinho ao carregar a página
updateCartCount();
