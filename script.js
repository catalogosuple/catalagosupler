// Função para carregar o carrinho ao carregar a página
function loadCartFromLocalStorage() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    if (cart.length === 0) {
        document.getElementById('cart-count').innerText = '0'; // Zera o contador
    } else {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        document.getElementById('cart-count').innerText = totalItems; // Atualiza a contagem visual
    }
}

// Evento para carregar o carrinho assim que a página é carregada
document.addEventListener('DOMContentLoaded', function() {
    loadCartFromLocalStorage();
});

// Função para adicionar itens ao carrinho
function addToCart(productName, productPrice) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const productIndex = cart.findIndex(item => item.name === productName);
    
    if (productIndex !== -1) {
        cart[productIndex].quantity += 1; // Incrementa a quantidade do item
    } else {
        cart.push({
            name: productName,
            price: productPrice,
            quantity: 1 // Novo item com quantidade inicial de 1
        });
    }

    localStorage.setItem('cart', JSON.stringify(cart)); // Salva o carrinho atualizado no localStorage

    // Atualiza o contador de itens do carrinho na página
    loadCartFromLocalStorage();

    // Feedback de item adicionado
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

    // Destacar o botão clicado
    const button = event.target; // Obtém o botão que foi clicado
    button.classList.add('button-green'); // Adiciona a classe que muda a cor

    // Remove a classe após 1 segundo (1000 ms)
    setTimeout(() => {
        button.classList.remove('button-green');
    }, 1000);
}

// Função para remover itens do carrinho
function removeFromCart(index) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.splice(index, 1); // Remove o item pelo índice
    localStorage.setItem('cart', JSON.stringify(cart)); // Salva o carrinho atualizado no localStorage
    loadCartFromLocalStorage(); // Atualiza a contagem do carrinho
    showCart(); // Atualiza a exibição dos itens no modal
}

// Função para exibir o carrinho no modal
function showCart() {
    const cartItemsContainer = document.getElementById('cart-items');
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cartItemsContainer.innerHTML = ''; // Limpa o conteúdo anterior

    if (cart.length === 0) {
        const emptyMessage = document.createElement('p');
        emptyMessage.innerText = 'Seu carrinho está vazio.';
        emptyMessage.style.textAlign = 'center';
        emptyMessage.style.fontWeight = 'bold';
        cartItemsContainer.appendChild(emptyMessage);
    } else {
        cart.forEach((item, index) => {
            const itemElement = document.createElement('div');
            itemElement.classList.add('cart-item');
            itemElement.innerHTML = `
                <p>${item.name} - R$${item.price} x ${item.quantity}</p>
                <button onclick="removeFromCart(${index})">Remover</button>
            `;
            cartItemsContainer.appendChild(itemElement);
        });
    }

    document.getElementById('cart-modal').style.display = 'flex'; // Exibe o modal
}

// Fecha o modal do carrinho
function closeCart() {
    document.getElementById('cart-modal').style.display = 'none'; // Fecha o modal
}

// Função para enviar o carrinho para o WhatsApp
function sendToWhatsApp() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

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

// Carregar o carrinho visual e atualizar a contagem ao navegar de volta para a home
document.addEventListener('DOMContentLoaded', function() {
    loadCartFromLocalStorage(); // Atualiza a contagem de itens quando a página inicial carrega
});




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
