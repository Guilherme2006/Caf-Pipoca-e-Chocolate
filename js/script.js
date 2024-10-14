const carouselInner = document.querySelector('.carousel-inner');
const carouselItems = document.querySelectorAll('.carousel-item');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
let currentIndex = 0;
let autoPlay;

const totalItems = carouselItems.length;
const itemsToShow = 5; // Quantos itens aparecem ao mesmo tempo no carrossel

// Clona os primeiros itens e adiciona ao final
for (let i = 0; i < itemsToShow; i++) {
    const clone = carouselItems[i].cloneNode(true);
    carouselInner.appendChild(clone);
}

// Clona os últimos itens e adiciona ao início
for (let i = totalItems - itemsToShow; i < totalItems; i++) {
    const clone = carouselItems[i].cloneNode(true);
    carouselInner.insertBefore(clone, carouselInner.firstChild);
}

// Função para atualizar a posição do carrossel
function updateCarousel() {
    const itemWidth = document.querySelector('.carousel-item').offsetWidth;
    carouselInner.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
}

// Função para rodar automaticamente
function autoPlayCarousel() {
    currentIndex++;
    if (currentIndex === totalItems + itemsToShow) {
        carouselInner.style.transition = 'none';
        currentIndex = itemsToShow; // Volta ao início invisivelmente
        updateCarousel();
        setTimeout(() => {
            carouselInner.style.transition = 'transform 0.5s ease-in-out'; // Restaura a transição
        }, 50);
    }
    updateCarousel();
}

// Função para iniciar o autoplay
function startAutoPlay() {
    autoPlay = setInterval(autoPlayCarousel, 3000); // Define o intervalo de tempo (3 segundos)
}

// Função para parar o autoplay quando o mouse estiver sobre o carrossel
carouselInner.addEventListener('mouseover', () => {
    clearInterval(autoPlay);
});

// Função para reiniciar o autoplay quando o mouse sair do carrossel
carouselInner.addEventListener('mouseout', () => {
    startAutoPlay();
});

// Função para o botão "próximo"
nextBtn.addEventListener('click', () => {
    clearInterval(autoPlay); // Para o autoplay temporariamente
    currentIndex++;
    if (currentIndex === totalItems + itemsToShow) {
        carouselInner.style.transition = 'none';
        currentIndex = itemsToShow;
        updateCarousel();
        setTimeout(() => {
            carouselInner.style.transition = 'transform 0.5s ease-in-out';
        }, 50);
    }
    updateCarousel();
    startAutoPlay(); // Reinicia o autoplay
});

// Função para o botão "anterior"
prevBtn.addEventListener('click', () => {
    clearInterval(autoPlay); // Para o autoplay temporariamente
    currentIndex--;
    if (currentIndex < 0) {
        carouselInner.style.transition = 'none';
        currentIndex = totalItems;
        updateCarousel();
        setTimeout(() => {
            carouselInner.style.transition = 'transform 0.5s ease-in-out';
        }, 50);
    }
    updateCarousel();
    startAutoPlay(); // Reinicia o autoplay
});

// Inicializa o autoplay
startAutoPlay();
function mostrarAutores(tipo) {
    const autoresContainer = document.getElementById('autores-container');
    autoresContainer.innerHTML = ''; // Limpa autores anteriores

    const autoresNacionais = [
        { nome: 'Silvanabarbosa', img: './images/Silvanabarbosa.jpg', link: './AutoresNacionais/SilvanaBarosa/SilvanaBarbosa.html' },
        { nome: 'Autor Nacional 2', img: 'autor-nacional2.jpg', link: 'link-autor-nacional2.html' }
    ];

    const autoresInternacionais = [
        { nome: 'SarahJMaas', img: './images/SarahJMaas.jpg', link: './AutoresInternacionais/SarahJMaas/SarahJMaas.html' },
        { nome: 'Autor Internacional 2', img: 'autor-internacional2.jpg', link: 'link-autor-internacional2.html' }
    ];

    let autores = tipo === 'nacionais' ? autoresNacionais : autoresInternacionais;

    autores.forEach(autor => {
        const autorDiv = document.createElement('div');
        autorDiv.classList.add('autor');

        autorDiv.innerHTML = `
            <a href="${autor.link}">
                <img src="${autor.img}" alt="Foto de ${autor.nome}">
                <h2>${autor.nome}</h2>
            </a>
        `;
        autoresContainer.appendChild(autorDiv);
    });

    autoresContainer.style.display = 'flex';
}


