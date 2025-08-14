// Smooth scrolling para links de navegação
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = target.offsetTop - headerHeight - 20;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Modal de vídeo
function openVideo() {
    const modal = document.getElementById('videoModal');
    const videoFrame = document.getElementById('videoFrame');
    
    // Substitua pela URL real do vídeo do YouTube/Vimeo
    const videoUrl = 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1';
    
    videoFrame.src = videoUrl;
    modal.style.display = 'block';
    
    // Previne scroll do body quando modal está aberto
    document.body.style.overflow = 'hidden';
}

function closeVideo() {
    const modal = document.getElementById('videoModal');
    const videoFrame = document.getElementById('videoFrame');
    
    videoFrame.src = '';
    modal.style.display = 'none';
    
    // Restaura scroll do body
    document.body.style.overflow = 'auto';
}

// Fecha modal clicando fora do conteúdo
window.addEventListener('click', function(event) {
    const modal = document.getElementById('videoModal');
    if (event.target === modal) {
        closeVideo();
    }
});

// Fecha modal com tecla ESC
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeVideo();
    }
});

// Enhanced scroll animations with multiple effects - Faster trigger
const observerOptions = {
    threshold: 0.05,
    rootMargin: '0px 0px 100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Initialize scroll animations
function initScrollAnimations() {
    // Main sections
    const sections = document.querySelectorAll('.section-header, .resource-group');
    sections.forEach((section, index) => {
        section.classList.add('fade-in-up');
        // Reduced stagger for faster appearance
        if (index > 0) {
            section.classList.add(`stagger-delay-${Math.min(index % 3 + 1, 3)}`);
        }
        observer.observe(section);
    });
    
    // Resource cards with alternating effects (novo sistema modular)
    const resourceCards = document.querySelectorAll('.card');
    resourceCards.forEach((card, index) => {
        if (card.classList.contains('card--horizontal')) {
            card.classList.add('fade-in-left');
        } else if (card.classList.contains('card--horizontal-reverse')) {
            card.classList.add('fade-in-right');
        } else if (card.classList.contains('card--vertical')) {
            card.classList.add('fade-in-up');
        } else if (card.classList.contains('card--compact')) {
            card.classList.add('fade-in-scale');
        } else if (card.classList.contains('card--overlay')) {
            card.classList.add('fade-in-up');
        } else {
            card.classList.add('fade-in-up');
        }
        
        // Add stagger delay
        const delayIndex = (index % 3) + 1;
        card.classList.add(`stagger-delay-${delayIndex}`);
        observer.observe(card);
    });
    
    // Small cards and carousel cards
    const smallCards = document.querySelectorAll('.pricing-card, .update-group');
    smallCards.forEach((card, index) => {
        card.classList.add('fade-in-scale');
        const delayIndex = (index % 4) + 1;
        card.classList.add(`stagger-delay-${delayIndex}`);
        observer.observe(card);
    });
    
    // Hero section elements - removido as animações de opacidade, elementos ficam visíveis normalmente
    
    // Pricing cards
    const pricingCards = document.querySelectorAll('.pricing-card');
    pricingCards.forEach((card, index) => {
        card.classList.add('fade-in-up');
        card.classList.add(`stagger-delay-${index + 1}`);
        observer.observe(card);
    });
    
    // Update timeline items
    const updateItems = document.querySelectorAll('.update-item');
    updateItems.forEach((item, index) => {
        item.classList.add('fade-in-left');
        const delayIndex = (index % 3) + 1;
        item.classList.add(`stagger-delay-${delayIndex}`);
        observer.observe(item);
    });
}

// Apply animations when page loads
document.addEventListener('DOMContentLoaded', function() {
    initScrollAnimations();
    initHamburgerMenu();
});

// Header background no scroll
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (window.scrollY > 50) {
        header.style.background = '#1e293b';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
    } else {
        header.style.background = '#1e293b';
        header.style.boxShadow = 'none';
    }
});


// Menu mobile hamburger
function toggleMobileMenu() {
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (hamburgerBtn && mobileMenu) {
        const isActive = mobileMenu.classList.contains('active');
        
        if (isActive) {
            // Fechar menu
            hamburgerBtn.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.style.overflow = 'auto';
        } else {
            // Abrir menu
            hamburgerBtn.classList.add('active');
            mobileMenu.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }
}

// Inicializar menu hamburger
function initHamburgerMenu() {
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const mobileMenuClose = document.getElementById('mobile-menu-close');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileMenuLinks = document.querySelectorAll('.mobile-menu-list a');
    
    // Toggle do hamburger
    if (hamburgerBtn) {
        hamburgerBtn.addEventListener('click', toggleMobileMenu);
    }
    
    // Botão de fechar
    if (mobileMenuClose) {
        mobileMenuClose.addEventListener('click', toggleMobileMenu);
    }
    
    // Fechar ao clicar em um link
    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', toggleMobileMenu);
    });
    
    // Fechar ao clicar fora do menu (no overlay)
    if (mobileMenu) {
        mobileMenu.addEventListener('click', (e) => {
            if (e.target === mobileMenu) {
                toggleMobileMenu();
            }
        });
    }
    
    // Fechar com ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && mobileMenu && mobileMenu.classList.contains('active')) {
            toggleMobileMenu();
        }
    });
}

// REMOVIDO: Carousel principal não existe mais no sistema modular

// Mini carousel functionality for cards
function currentMiniSlide(slideIndex, carouselIndex, restartTimer = true) {
    const miniCarousels = document.querySelectorAll('.mini-carousel');
    const carousel = miniCarousels[carouselIndex];
    
    if (carousel) {
        const images = carousel.querySelectorAll('.mini-carousel-image');
        const dots = carousel.querySelectorAll('.mini-dot');
        
        // Remove active class from all
        images.forEach(img => img.classList.remove('active'));
        if (dots.length > 0) {
            dots.forEach(dot => dot.classList.remove('active'));
        }
        
        // Add active class to selected (slideIndex is 1-based, convert to 0-based)
        const targetIndex = slideIndex - 1;
        
        if (images[targetIndex]) {
            images[targetIndex].classList.add('active');
        }
        if (dots[targetIndex]) {
            dots[targetIndex].classList.add('active');
        }
        
        // Reiniciar timer se solicitado (interações manuais)
        if (restartTimer && carousel.autoTimer) {
            clearInterval(carousel.autoTimer);
            startCarouselAutoTimer(carousel, carouselIndex, targetIndex);
        }
    }
}

// Navigation arrows for mini carousels
function changeMiniSlide(direction, carouselIndex) {
    const miniCarousels = document.querySelectorAll('.mini-carousel');
    const carousel = miniCarousels[carouselIndex];
    
    if (carousel) {
        const images = carousel.querySelectorAll('.mini-carousel-image');
        
        // Find current active slide
        let currentSlide = 0;
        images.forEach((img, index) => {
            if (img.classList.contains('active')) {
                currentSlide = index;
            }
        });
        
        // Calculate new slide index
        let newSlide = currentSlide + direction;
        
        // Wrap around
        if (newSlide >= images.length) {
            newSlide = 0;
        } else if (newSlide < 0) {
            newSlide = images.length - 1;
        }
        
        // Update active slide (currentMiniSlide expects 1-based index) - reiniciar timer por ser interação manual
        currentMiniSlide(newSlide + 1, carouselIndex, true);
    }
}

// REMOVIDO: Auto-slide para carousel principal que não existe mais

// Função para iniciar/reiniciar timer automático de um carrossel
function startCarouselAutoTimer(carousel, carouselIndex, currentSlideIndex = 0) {
    const images = carousel.querySelectorAll('.mini-carousel-image');
    if (images.length <= 1) return; // Não precisa de timer se só há 1 imagem
    
    let slideIndex = currentSlideIndex;
    carousel.autoTimer = setInterval(() => {
        slideIndex = (slideIndex + 1) % images.length;
        // Não reiniciar timer aqui (false) pois é mudança automática
        currentMiniSlide(slideIndex + 1, carouselIndex, false);
    }, 4000);
}

// Auto-advance mini carousels
function startMiniCarousels() {
    const miniCarousels = document.querySelectorAll('.mini-carousel');
    
    miniCarousels.forEach((carousel, index) => {
        const images = carousel.querySelectorAll('.mini-carousel-image');
        
        // PRIMEIRO: Garantir que a primeira imagem esteja ativa
        if (images.length > 0) {
            // Limpar todas as classes active primeiro
            images.forEach(img => img.classList.remove('active'));
            // Ativar apenas a primeira imagem
            images[0].classList.add('active');
        }
        
        // DEPOIS: Setup dos controles (botões e dots)
        setupCarouselControls(carousel, index);
        
        // Auto-advance apenas se há mais de 1 imagem
        if (images.length > 1) {
            startCarouselAutoTimer(carousel, index, 0);
        }
    });
}

// Carrossel de Cards (resources-grid--carousel)
function setupCardCarousels() {
    const cardCarousels = document.querySelectorAll('.resources-grid--carousel');
    
    cardCarousels.forEach((carousel, index) => {
        setupCardCarouselControls(carousel, index);
        initCardCarouselSwipe(carousel, index);
    });
}

function setupCardCarouselControls(carousel, carouselIndex) {
    const cards = carousel.querySelectorAll('.card');
    if (cards.length <= 1) return; // Não precisa de carrossel para 1 card
    
    let currentSlide = 0; // Posição atual (0 a totalSlides-1)  
    const totalSlides = cards.length;
    let isTransitioning = false;
    
    // Criar wrapper track se não existir
    let track = carousel.querySelector('.resources-grid-track');
    if (!track) {
        track = document.createElement('div');
        track.className = 'resources-grid-track';
        
        // CONTINUIDADE VISUAL: Clone básico do último/primeiro
        
        // Clone do último card no início (para ver à esquerda do primeiro)
        const lastCardClone = cards[cards.length - 1].cloneNode(true);
        lastCardClone.classList.add('card-clone');
        lastCardClone.dataset.originalIndex = cards.length - 1;
        track.appendChild(lastCardClone);
        
        // Cards originais
        cards.forEach((card, index) => {
            card.dataset.originalIndex = index;
            card.classList.remove('card-clone');
            track.appendChild(card);
        });
        
        // Clone do primeiro card no final (para ver à direita do último)
        const firstCardClone = cards[0].cloneNode(true);
        firstCardClone.classList.add('card-clone');
        firstCardClone.dataset.originalIndex = 0;
        track.appendChild(firstCardClone);
        
        carousel.appendChild(track);
    }
    
    // Criar botões prev/next
    let prevBtn = carousel.querySelector('.carousel-btn.prev');
    let nextBtn = carousel.querySelector('.carousel-btn.next');
    
    if (!prevBtn) {
        prevBtn = document.createElement('button');
        prevBtn.className = 'carousel-btn prev';
        prevBtn.innerHTML = '‹';
        carousel.appendChild(prevBtn);
    }
    
    if (!nextBtn) {
        nextBtn = document.createElement('button');
        nextBtn.className = 'carousel-btn next';
        nextBtn.innerHTML = '›';
        carousel.appendChild(nextBtn);
    }
    
    // Detectar se o carousel usa abas em vez de dots
    const usesTabs = carousel.classList.contains('resources-grid--carousel--tabs');
    
    if (usesTabs) {
        // Criar abas com texto
        let tabsContainer = carousel.querySelector('.carousel-tabs');
        if (!tabsContainer) {
            tabsContainer = document.createElement('div');
            tabsContainer.className = 'carousel-tabs';
            carousel.appendChild(tabsContainer);
        }
        
        // Limpar e criar abas baseado nos títulos dos cards
        tabsContainer.innerHTML = '';
        cards.forEach((card, tabIndex) => {
            const cardTitle = card.querySelector('.card__title')?.textContent || `Item ${tabIndex + 1}`;
            const tab = document.createElement('button');
            tab.className = tabIndex === 0 ? 'carousel-tab active' : 'carousel-tab';
            tab.textContent = cardTitle;
            tab.onclick = () => moveToSlide(tabIndex, true);
            tabsContainer.appendChild(tab);
        });
    } else {
        // Criar dots tradicionais
        let dotsContainer = carousel.querySelector('.carousel-dots');
        if (!dotsContainer) {
            dotsContainer = document.createElement('div');
            dotsContainer.className = 'carousel-dots';
            carousel.appendChild(dotsContainer);
        }
        
        // Limpar e criar dots baseado no número de cards
        dotsContainer.innerHTML = '';
        cards.forEach((_, dotIndex) => {
            const dot = document.createElement('span');
            dot.className = dotIndex === 0 ? 'carousel-dot active' : 'carousel-dot';
            dot.onclick = () => moveToSlide(dotIndex, true);
            dotsContainer.appendChild(dot);
        });
    }
    
    // Função para mover para slide específico (compensando clone inicial)
    function moveToSlide(slideIndex, withTransition = true) {
        if (slideIndex < 0 || slideIndex >= totalSlides) return;
        
        const allTrackItems = track.querySelectorAll('.card');
        const carouselWidth = carousel.offsetWidth;
        const gap = 32; // 2rem = 32px
        
        // Posição física = slideIndex + 1 (devido ao clone inicial)
        const physicalPosition = slideIndex + 1;
        const targetCard = allTrackItems[physicalPosition];
        if (!targetCard) return;
        
        // Calcular posição para centralizar o card alvo
        let cardPosition = 0;
        for (let i = 0; i < physicalPosition; i++) {
            cardPosition += allTrackItems[i].offsetWidth + gap;
        }
        
        // Centralizar o card
        const targetCardWidth = targetCard.offsetWidth;
        const translateX = (carouselWidth / 2) - (targetCardWidth / 2) - cardPosition;
        
        track.style.transition = withTransition ? 'transform 0.5s ease-in-out' : 'none';
        track.style.transform = `translateX(${translateX}px)`;
        
        // Atualizar posição atual
        currentSlide = slideIndex;
        
        // Se não tem transição, restaurar transições após um frame
        if (!withTransition) {
            requestAnimationFrame(() => {
                track.style.transition = 'transform 0.5s ease-in-out';
            });
        }
        
        // Detectar se usa sistema de destaque
        const usesHighlight = carousel.classList.contains('resources-grid--carousel--highlight');
        
        // Atualizar indicadores (dots ou abas)
        if (usesTabs) {
            const tabs = carousel.querySelectorAll('.carousel-tab');
            tabs.forEach((tab, index) => {
                tab.classList.toggle('active', index === currentSlide);
            });
        } else {
            const dots = carousel.querySelectorAll('.carousel-dot');
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentSlide);
            });
        }
        
        // Sistema de destaque: marcar cards com mesmo originalIndex como ativos
        if (usesHighlight) {
            const allTrackItems = track.querySelectorAll('.card');
            allTrackItems.forEach((trackCard) => {
                const cardOriginalIndex = parseInt(trackCard.dataset.originalIndex);
                trackCard.classList.toggle('active', cardOriginalIndex === currentSlide);
            });
        }
    }
    
    // Função para navegar com wrap-around simples
    function navigateCardCarousel(direction) {
        if (isTransitioning) return;
        
        let newSlide = currentSlide + direction;
        
        // Wrap around - volta para o início/fim
        if (newSlide >= totalSlides) {
            newSlide = 0; // Volta para o primeiro
        } else if (newSlide < 0) {
            newSlide = totalSlides - 1; // Vai para o último
        }
        
        moveToSlide(newSlide, true);
    }
    
    // Setup eventos dos botões
    prevBtn.onclick = () => navigateCardCarousel(-1);
    nextBtn.onclick = () => navigateCardCarousel(1);
    
    // Tornar função acessível globalmente para swipe
    carousel.moveToSlide = moveToSlide;
    carousel.navigateCardCarousel = navigateCardCarousel;
    carousel.currentSlide = () => currentSlide;
    
    // Inicializar sistema de destaque se necessário
    const usesHighlight = carousel.classList.contains('resources-grid--carousel--highlight');
    if (usesHighlight) {
        // Marcar o primeiro card como ativo
        cards.forEach((card, index) => {
            card.classList.toggle('active', index === 0);
        });
    }
    carousel.totalSlides = totalSlides;
    carousel.physicalPosition = () => physicalPosition;
    
    // Centralizar o primeiro card na inicialização
    setTimeout(() => {
        // Inicializar sem transição para evitar animação inicial
        track.style.transition = 'none';
        moveToSlide(0, false); // Começar no primeiro card lógico (slide 0)
        // Restaurar transição após posicionamento inicial
        setTimeout(() => {
            track.style.transition = 'transform 0.5s ease-in-out';
        }, 100);
    }, 50); // Pequeno delay para garantir que o DOM está totalmente carregado
}

function initCardCarouselSwipe(carousel, carouselIndex) {
    let startX = 0;
    let startY = 0;
    let endX = 0;
    let endY = 0;
    let isDown = false;
    const minSwipeDistance = 50;
    
    const track = carousel.querySelector('.resources-grid-track');
    if (!track) return;
    
    // Touch events
    track.addEventListener('touchstart', (e) => {
        isDown = true;
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
    });
    
    track.addEventListener('touchmove', (e) => {
        if (!isDown) return;
        e.preventDefault();
    });
    
    track.addEventListener('touchend', (e) => {
        if (!isDown) return;
        isDown = false;
        
        endX = e.changedTouches[0].clientX;
        endY = e.changedTouches[0].clientY;
        
        handleCardSwipe();
    });
    
    // Mouse events
    track.addEventListener('mousedown', (e) => {
        isDown = true;
        startX = e.clientX;
        startY = e.clientY;
        track.style.cursor = 'grabbing';
    });
    
    track.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
    });
    
    track.addEventListener('mouseup', (e) => {
        if (!isDown) return;
        isDown = false;
        track.style.cursor = 'grab';
        
        endX = e.clientX;
        endY = e.clientY;
        
        handleCardSwipe();
    });
    
    track.addEventListener('mouseleave', () => {
        isDown = false;
        track.style.cursor = 'grab';
    });
    
    function handleCardSwipe() {
        const diffX = startX - endX;
        const diffY = startY - endY;
        
        // Check if it's more horizontal than vertical movement
        if (Math.abs(diffX) > Math.abs(diffY)) {
            if (Math.abs(diffX) > minSwipeDistance) {
                if (diffX > 0) {
                    // Swipe left - next slide
                    carousel.navigateCardCarousel(1);
                } else {
                    // Swipe right - previous slide
                    carousel.navigateCardCarousel(-1);
                }
            }
        }
    }
}

// Função global para acessar slides
function goToCardSlide(carouselIndex, slideIndex) {
    const carousels = document.querySelectorAll('.resources-grid--carousel');
    const carousel = carousels[carouselIndex];
    if (carousel && carousel.moveToSlide) {
        carousel.moveToSlide(slideIndex, true);
    }
}

// Automatizar criação completa dos controles do carrossel
function setupCarouselControls(carousel, carouselIndex) {
    const images = carousel.querySelectorAll('.mini-carousel-image');
    const track = carousel.querySelector('.mini-carousel-track');
    
    // Se não há track ou menos de 2 imagens, não precisa de controles
    if (!track || images.length < 2) return;
    
    // Criar botões prev/next se não existirem
    let prevBtn = carousel.querySelector('.mini-carousel-btn.prev, .mini-prev');
    let nextBtn = carousel.querySelector('.mini-carousel-btn.next, .mini-next');
    
    if (!prevBtn) {
        prevBtn = document.createElement('button');
        prevBtn.className = 'mini-carousel-btn prev';
        prevBtn.innerHTML = '‹';
        carousel.appendChild(prevBtn);
    }
    
    if (!nextBtn) {
        nextBtn = document.createElement('button');
        nextBtn.className = 'mini-carousel-btn next';
        nextBtn.innerHTML = '›';
        carousel.appendChild(nextBtn);
    }
    
    // Setup eventos dos botões
    prevBtn.onclick = () => changeMiniSlide(-1, carouselIndex);
    nextBtn.onclick = () => changeMiniSlide(1, carouselIndex);
    
    // Criar container de dots se não existir
    let dotsContainer = carousel.querySelector('.mini-carousel-dots');
    if (!dotsContainer) {
        dotsContainer = document.createElement('div');
        dotsContainer.className = 'mini-carousel-dots';
        carousel.appendChild(dotsContainer);
    }
    
    // Limpar dots existentes e criar novos baseado no número de imagens
    dotsContainer.innerHTML = '';
    images.forEach((_, dotIndex) => {
        const dot = document.createElement('span');
        // NÃO definir classe active aqui - deixar para a inicialização das imagens
        dot.className = 'mini-dot';
        dot.onclick = () => {
            currentMiniSlide(dotIndex + 1, carouselIndex, true); // Reiniciar timer ao clicar no dot
        };
        dotsContainer.appendChild(dot);
    });
    
    // APÓS criar os dots, ativar o primeiro baseado no estado atual das imagens
    const activeDots = dotsContainer.querySelectorAll('.mini-dot');
    if (activeDots.length > 0) {
        activeDots[0].classList.add('active');
    }
}

// Função utilitária para criar carrossel apenas com imagens
function createSimpleCarousel(container, imageUrls, altTexts = []) {
    // Criar estrutura básica
    const carousel = document.createElement('div');
    carousel.className = 'mini-carousel';
    
    const track = document.createElement('div');
    track.className = 'mini-carousel-track';
    
    // Criar imagens
    imageUrls.forEach((url, index) => {
        const img = document.createElement('img');
        img.src = url;
        img.alt = altTexts[index] || `Imagem ${index + 1}`;
        img.className = index === 0 ? 'mini-carousel-image active' : 'mini-carousel-image';
        track.appendChild(img);
    });
    
    carousel.appendChild(track);
    container.appendChild(carousel);
    
    // O sistema automático cuidará dos controles
    return carousel;
}

// Função para equalizar alturas dos cards nos carousels
function equalizeCarouselCardHeights() {
    const carousels = document.querySelectorAll('.resources-grid--carousel');
    
    carousels.forEach(carousel => {
        const cards = carousel.querySelectorAll('.card');
        if (cards.length <= 1) return; // Não precisa equalizar se há apenas 1 card
        
        // Reset alturas para calcular altura natural
        cards.forEach(card => {
            card.style.height = 'auto';
        });
        
        // Aguardar próximo frame para calcular alturas corretas
        requestAnimationFrame(() => {
            let maxHeight = 0;
            
            // Encontrar a altura máxima
            cards.forEach(card => {
                const cardHeight = card.offsetHeight;
                if (cardHeight > maxHeight) {
                    maxHeight = cardHeight;
                }
            });
            
            // Aplicar altura máxima a todos os cards
            cards.forEach(card => {
                card.style.height = maxHeight + 'px';
            });
        });
    });
}

// Função simplificada - mini-carousel agora se comporta naturalmente
function adjustMiniCarouselSize() {
    const miniCarousels = document.querySelectorAll('.mini-carousel');
    
    console.log(`Mini-carousel reformulado: ${miniCarousels.length} encontrados`);
    
    // Não precisa mais de lógica complexa - o CSS reformulado 
    // faz a imagem ativa determinar o tamanho naturalmente
    miniCarousels.forEach((carousel, carouselIndex) => {
        console.log(`Mini-carousel ${carouselIndex}: agora se comporta como imagem normal`);
    });
}

// Remover lazy loading que estava causando problemas nos carrosséis
document.addEventListener('DOMContentLoaded', function() {
    // Garantir que todas as imagens sejam visíveis (EXCETO as do mini-carousel)
    const images = document.querySelectorAll('img[src]:not(.mini-carousel-image)');
    images.forEach(img => {
        img.style.opacity = '1';
    });
    
    // Start mini carousels
    startMiniCarousels();
    initTouchSupport();
    
    // Start card carousels
    setupCardCarousels();
    
    // Ajustar tamanho dos mini-carousels baseado nas imagens
    setTimeout(() => {
        adjustMiniCarouselSize();
        equalizeCarouselCardHeights();
    }, 200); // Delay maior para garantir que imagens carregaram
});

// Reagir a mudanças de tamanho da janela
window.addEventListener('resize', function() {
    // Debounce para performance
    clearTimeout(window.resizeTimer);
    window.resizeTimer = setTimeout(() => {
        adjustMiniCarouselSize(); // Recalcular mini-carousels
        equalizeCarouselCardHeights();
    }, 250);
});

// Touch/Swipe support for mini carousels
function initTouchSupport() {
    const miniCarousels = document.querySelectorAll('.mini-carousel-track');
    
    miniCarousels.forEach((track, carouselIndex) => {
        let startX = 0;
        let startY = 0;
        let endX = 0;
        let endY = 0;
        let isDown = false;
        
        // Touch events
        track.addEventListener('touchstart', (e) => {
            isDown = true;
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
        });
        
        track.addEventListener('touchmove', (e) => {
            if (!isDown) return;
            e.preventDefault(); // Prevent scrolling
        });
        
        track.addEventListener('touchend', (e) => {
            if (!isDown) return;
            isDown = false;
            
            endX = e.changedTouches[0].clientX;
            endY = e.changedTouches[0].clientY;
            
            handleSwipe(startX, startY, endX, endY, carouselIndex);
        });
        
        // Mouse events for desktop testing
        track.addEventListener('mousedown', (e) => {
            isDown = true;
            startX = e.clientX;
            startY = e.clientY;
        });
        
        track.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
        });
        
        track.addEventListener('mouseup', (e) => {
            if (!isDown) return;
            isDown = false;
            
            endX = e.clientX;
            endY = e.clientY;
            
            handleSwipe(startX, startY, endX, endY, carouselIndex);
        });
        
        track.addEventListener('mouseleave', () => {
            isDown = false;
        });
    });
}

function handleSwipe(startX, startY, endX, endY, carouselIndex) {
    const diffX = startX - endX;
    const diffY = startY - endY;
    const minSwipeDistance = 50;
    
    // Check if it's more horizontal than vertical movement
    if (Math.abs(diffX) > Math.abs(diffY)) {
        if (Math.abs(diffX) > minSwipeDistance) {
            if (diffX > 0) {
                // Swipe left - next slide (changeMiniSlide já reinicia o timer)
                changeMiniSlide(1, carouselIndex);
            } else {
                // Swipe right - previous slide (changeMiniSlide já reinicia o timer)
                changeMiniSlide(-1, carouselIndex);
            }
        }
    }
}


document.addEventListener('DOMContentLoaded', () => {

    // =======================================================
    //  1. LÓGICA PARA O SLIDER ANTES/DEPOIS
    // =======================================================
    document.querySelectorAll('.before-after-slider').forEach(slider => {
        const handle = slider.querySelector('.before-after-slider__handle');
        const beforeWrapper = slider.querySelector('.before-after-slider__image-wrapper');
        const beforeImage = slider.querySelector('.before-after-slider__image--before');

        if (!handle || !beforeWrapper || !beforeImage) {
            console.error('Slider Antes/Depois: Faltam elementos essenciais (handle, wrapper ou imagem).', slider);
            return;
        }

        const setBeforeImageWidth = () => {
            beforeImage.style.width = `${slider.offsetWidth}px`;
        };
        setBeforeImageWidth();
        window.addEventListener('resize', setBeforeImageWidth);

        let isDragging = false;

        const moveSlider = (clientX) => {
            const rect = slider.getBoundingClientRect();
            let pos = (clientX - rect.left) / rect.width;
            pos = Math.max(0, Math.min(1, pos));
            beforeWrapper.style.width = `${pos * 100}%`;
            handle.style.left = `${pos * 100}%`;
        };

        const startDrag = (e) => {
            e.preventDefault();
            isDragging = true;
        };
        const stopDrag = () => {
            isDragging = false;
        };
        const doDrag = (e) => {
            if (!isDragging) return;
            const clientX = e.touches ? e.touches[0].clientX : e.clientX;
            moveSlider(clientX);
        };

        handle.addEventListener('mousedown', startDrag);
        handle.addEventListener('touchstart', startDrag, { passive: true });

        window.addEventListener('mouseup', stopDrag);
        window.addEventListener('touchend', stopDrag);

        window.addEventListener('mousemove', doDrag);
        window.addEventListener('touchmove', doDrag, { passive: true });
    });

    
});

