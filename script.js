// Carrinho de Compras
let cart = [];

// Função para adicionar itens ao carrinho
function addToCart(productName, productPrice) {
    const productIndex = cart.findIndex(item => item.name === productName);

    if (productIndex !== -1) {
        cart[productIndex].quantity += 1;
    } else {
        cart.push({ name: productName, price: productPrice, quantity: 1 });
    }

    updateCartCount();
    alert(`${productName} adicionado ao carrinho!`);
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
    cartItemsContainer.innerHTML = ''; // Limpa os itens anteriores

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
    cart.splice(index, 1); // Remove o item do array de carrinho
    updateCartCount();
    showCart(); // Atualiza a exibição do carrinho
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

    closeCart(); // Fecha o modal após o envio
}

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


const images = ["img/mudarparamelhor.png", "img/melhores_precos.png", "img/teste.png"]; // adicione as URLs das suas imagens
let currentIndex = 0;

function changeBanner() {
    const bannerImage = document.getElementById('bannerImage');
    currentIndex = (currentIndex + 1) % images.length; // aumenta o índice e faz o loop
    bannerImage.style.opacity = 0; // faz a imagem desaparecer

    setTimeout(() => {
        bannerImage.src = images[currentIndex]; // muda a imagem
        bannerImage.style.opacity = 1; // faz a nova imagem aparecer
    }, 1000); // espera a transição de saída
}

// Troca a imagem a cada 3 segundos
setInterval(changeBanner, 3500);
