// Função para ajustar tamanho dos textos nos cards overlay-right proporcionalmente
function adjustOverlayRightTextSizes() {
    const overlayRightCards = document.querySelectorAll('.card--overlay-right');
    
    overlayRightCards.forEach(card => {
        const image = card.querySelector('.card__image');
        const title = card.querySelector('.card__title h4');
        const subtitle = card.querySelector('.card__title p');
        const description = card.querySelector('.card__description');
        
        if (image && image.complete) {
            // Aguarda a imagem carregar completamente
            const imageWidth = image.offsetWidth;
            const imageHeight = image.offsetHeight;
            
            // Calcula tamanhos baseados na largura da imagem (reduzidos em 0.7)
            // Título: 5.6% da largura da imagem (8% * 0.7)
            const titleSize = Math.max(11, imageWidth * 0.056); // Mínimo 11px
            // Subtítulo: 1.54% da largura da imagem (2.2% * 0.7)
            const subtitleSize = Math.max(8, imageWidth * 0.0154); // Mínimo 8px
            // Descrição: 1.26% da largura da imagem (1.8% * 0.7)
            const descriptionSize = Math.max(7, imageWidth * 0.0126); // Mínimo 7px
            
            // Aplica os tamanhos
            if (title) title.style.fontSize = titleSize + 'px';
            if (subtitle) subtitle.style.fontSize = subtitleSize + 'px';
            if (description) description.style.fontSize = descriptionSize + 'px';
        }
    });
}

// Chama a função quando as imagens carregam e quando a janela é redimensionada
document.addEventListener('DOMContentLoaded', function() {
    // Espera todas as imagens carregarem
    const images = document.querySelectorAll('.card--overlay-right .card__image');
    let loadedImages = 0;
    
    function checkAllImagesLoaded() {
        loadedImages++;
        if (loadedImages === images.length) {
            adjustOverlayRightTextSizes();
        }
    }
    
    images.forEach(img => {
        if (img.complete) {
            checkAllImagesLoaded();
        } else {
            img.addEventListener('load', checkAllImagesLoaded);
        }
    });
    
    // Se não há imagens, chama mesmo assim
    if (images.length === 0) {
        adjustOverlayRightTextSizes();
    }
});

// Reajusta quando a janela é redimensionada
window.addEventListener('resize', function() {
    clearTimeout(window.resizeTimeout);
    window.resizeTimeout = setTimeout(adjustOverlayRightTextSizes, 150);
});

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


// Menu mobile hambúrguer
function toggleMobileMenu() {
    const navMenu = document.querySelector('.nav-menu');
    const hamburger = document.querySelector('.hamburger');
    const overlay = document.querySelector('.nav-overlay');
    
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
    if (overlay) {
        overlay.classList.toggle('active');
    }
    
    // Prevenir scroll do body quando menu está ativo
    document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : 'auto';
}

// Inicializar menu hambúrguer
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.getElementById('hamburgerBtn');
    const navMenu = document.getElementById('navMenu');
    const overlay = document.getElementById('navOverlay');
    
    function closeMobileMenu() {
        if (navMenu) navMenu.classList.remove('active');
        if (hamburger) hamburger.classList.remove('active');
        if (overlay) overlay.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', toggleMobileMenu);
        
        // Fechar menu ao clicar no overlay
        if (overlay) {
            overlay.addEventListener('click', closeMobileMenu);
        }
        
        // Fechar menu ao clicar em um link
        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', closeMobileMenu);
        });
        
        // Fechar menu com tecla ESC
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                closeMobileMenu();
            }
        });
    }
});

// REMOVIDO: Carousel principal não existe mais no sistema modular

// Mini carousel functionality - usando referência direta ao elemento
function currentMiniSlideByElement(slideIndex, carousel, restartTimer = true) {
    if (carousel) {
        const images = carousel.querySelectorAll('.mini-carousel-image');
        const dots = carousel.querySelectorAll('.mini-dot');

        // Remove active class from all
        images.forEach(img => img.classList.remove('active'));
        if (dots.length > 0) {
            dots.forEach(dot => dot.classList.remove('active'));
        }

        // Add active class to selected
        if (images[slideIndex]) {
            images[slideIndex].classList.add('active');
        }

        if (dots[slideIndex]) {
            dots[slideIndex].classList.add('active');
        }

        // Reiniciar timer se solicitado (interações manuais)
        if (restartTimer && carousel.autoTimer) {
            clearInterval(carousel.autoTimer);
        }
    }
}

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

// Navigation arrows for mini carousels - usando referência direta ao elemento
function changeMiniSlideByElement(direction, carousel) {
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

        // Update active slide directly
        currentMiniSlideByElement(newSlide, carousel, true);
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

        // Update active slide (currentMiniSlide expects 1-based index)
        currentMiniSlide(newSlide + 1, carouselIndex, true);
    }
}

// REMOVIDO: Auto-slide para carousel principal que não existe mais

// Função para verificar se um mini-carousel deve estar animando
function shouldCarouselAnimate(carousel) {
    // 1. Verificar se o carousel está visível na viewport
    if (!isCarouselInViewport(carousel)) {
        return false;
    }
    
    // 2. Verificar se o card que contém o carousel é o card ativo (se aplicável)
    const parentCard = carousel.closest('.card');
    if (parentCard) {
        const cardCarousel = parentCard.closest('.resources-grid--carousel');
        if (cardCarousel) {
            // Se o card está em um carousel de cards, verificar se é o ativo
            const isHighlightCarousel = cardCarousel.classList.contains('resources-grid--carousel--highlight');
            if (isHighlightCarousel) {
                // Sistema de destaque: apenas o card com classe 'active' deve animar
                return parentCard.classList.contains('active');
            }
        }
    }
    
    return true; // Se não há restrições, pode animar
}

// Função para verificar se um carousel está visível na viewport
function isCarouselInViewport(carousel) {
    // Se o observador de viewport já foi configurado, usar o resultado cacheado
    if (carousel.dataset.inViewport !== undefined) {
        return carousel.dataset.inViewport === 'true';
    }
    
    // Fallback: verificação manual (para casos onde o observador ainda não executou)
    const rect = carousel.getBoundingClientRect();
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;
    const windowWidth = window.innerWidth || document.documentElement.clientWidth;
    
    // Verificar se pelo menos 50% do carousel está visível
    const verticalInView = (rect.top < windowHeight * 0.5) && (rect.bottom > windowHeight * 0.5);
    const horizontalInView = (rect.left < windowWidth) && (rect.right > 0);
    
    return verticalInView && horizontalInView;
}

// Função para notificar mudança de estado de um card (ativo/inativo)
function notifyCardStateChange(card, isActive) {
    // Encontrar todos os mini-carousels dentro deste card
    const miniCarousels = card.querySelectorAll('.mini-carousel');
    
    miniCarousels.forEach(carousel => {
        if (isActive) {
            // Card se tornou ativo - tentar iniciar animação
            tryStartCarouselAnimation(carousel);
        } else {
            // Card se tornou inativo - pausar animação
            pauseCarouselAnimation(carousel);
        }
    });
}

// Função utilitária para obter o índice do slide atual de um carousel
function getCurrentSlideIndex(carousel) {
    const images = carousel.querySelectorAll('.mini-carousel-image');
    for (let i = 0; i < images.length; i++) {
        if (images[i].classList.contains('active')) {
            return i;
        }
    }
    return 0; // Default para primeiro slide
}

// Função utilitária para obter o índice de um carousel na lista de mini-carousels
function getCarouselIndex(targetCarousel) {
    const allCarousels = document.querySelectorAll('.mini-carousel');
    for (let i = 0; i < allCarousels.length; i++) {
        if (allCarousels[i] === targetCarousel) {
            return i;
        }
    }
    return 0; // Default
}

// Função para tentar iniciar animação de um carousel
function tryStartCarouselAnimation(carousel) {
    const images = carousel.querySelectorAll('.mini-carousel-image');
    if (images.length <= 1) return; // Não animar se só há 1 imagem
    
    // Verificar se deve animar e se já não está animando
    if (shouldCarouselAnimate(carousel) && !carousel.autoTimer) {
        const carouselIndex = getCarouselIndex(carousel);
        const isClean = carousel.classList.contains('mini-carousel--clean');
        
        // Resetar para primeira imagem quando iniciar animação
        resetToFirstSlide(carousel);
        
        if (isClean) {
            startCleanCarouselAutoTimer(carousel, carouselIndex, 0);
        } else {
            startCarouselAutoTimer(carousel, carouselIndex, 0);
        }
    }
}

// Função para pausar animação de um carousel
function pauseCarouselAnimation(carousel) {
    if (carousel.autoTimer) {
        clearTimeout(carousel.autoTimer);
        carousel.autoTimer = null;
    }
}

// Função para resetar carousel para primeira imagem
function resetToFirstSlide(carousel) {
    const images = carousel.querySelectorAll('.mini-carousel-image');
    const dots = carousel.querySelectorAll('.mini-dot');
    
    // Remover classe active de todas as imagens
    images.forEach(img => img.classList.remove('active'));
    
    // Remover classe active de todos os dots
    dots.forEach(dot => dot.classList.remove('active'));
    
    // Ativar primeira imagem e primeiro dot
    if (images.length > 0) {
        images[0].classList.add('active');
    }
    if (dots.length > 0) {
        dots[0].classList.add('active');
    }
}

// Função para iniciar/reiniciar timer automático de um carrossel
function startCarouselAutoTimer(carousel, carouselIndex, currentSlideIndex = 0) {
    const images = carousel.querySelectorAll('.mini-carousel-image');
    if (images.length <= 1) return; // Não precisa de timer se só há 1 imagem
    
    let slideIndex = currentSlideIndex;
    
    // Função para obter o tempo de uma imagem específica
    function getImageTiming(imageIndex) {
        const image = images[imageIndex];
        // Buscar atributo data-timing (em milissegundos)
        const customTiming = image ? image.getAttribute('data-timing') : null;
        return customTiming ? parseInt(customTiming) : 4000; // Default 4 segundos
    }
    
    function scheduleNextSlide() {
        // Verificar se o carousel ainda deve estar animando antes de agendar próximo slide
        if (!shouldCarouselAnimate(carousel)) {
            // Se não deve animar, reagendar verificação em 1 segundo
            carousel.autoTimer = setTimeout(scheduleNextSlide, 1000);
            return;
        }
        
        const currentTiming = getImageTiming(slideIndex);
        
        carousel.autoTimer = setTimeout(() => {
            // Verificar novamente antes de executar a animação
            if (!shouldCarouselAnimate(carousel)) {
                scheduleNextSlide(); // Reagendar
                return;
            }
            
            slideIndex = (slideIndex + 1) % images.length;
            // Não reiniciar timer aqui (false) pois é mudança automática
            currentMiniSlide(slideIndex + 1, carouselIndex, false);
            scheduleNextSlide(); // Agendar próximo slide com novo timing
        }, currentTiming);
    }
    
    scheduleNextSlide();
}

// Função para iniciar/reiniciar timer automático de um carrossel MINIMALISTA (sem controles)
function startCleanCarouselAutoTimer(carousel, carouselIndex, currentSlideIndex = 0) {
    const images = carousel.querySelectorAll('.mini-carousel-image');
    if (images.length <= 1) return; // Não precisa de timer se só há 1 imagem
    
    let slideIndex = currentSlideIndex;
    
    // Função para obter o tempo de uma imagem específica
    function getImageTiming(imageIndex) {
        const image = images[imageIndex];
        // Buscar atributo data-timing (em milissegundos)
        const customTiming = image ? image.getAttribute('data-timing') : null;
        return customTiming ? parseInt(customTiming) : 3000; // Default 3 segundos para carousel minimalista
    }
    
    function scheduleNextSlide() {
        // Verificar se o carousel ainda deve estar animando antes de agendar próximo slide
        if (!shouldCarouselAnimate(carousel)) {
            // Se não deve animar, reagendar verificação em 1 segundo
            carousel.autoTimer = setTimeout(scheduleNextSlide, 1000);
            return;
        }
        
        const currentTiming = getImageTiming(slideIndex);
        
        carousel.autoTimer = setTimeout(() => {
            // Verificar novamente antes de executar a animação
            if (!shouldCarouselAnimate(carousel)) {
                scheduleNextSlide(); // Reagendar
                return;
            }

            // Verificar se a imagem atual tem transição habilitada
            const currentImage = images[slideIndex];
            const hasTransition = currentImage.getAttribute('data-transition') !== 'false';

            // Se não tem transição, remover temporariamente as transições CSS
            if (!hasTransition) {
                images.forEach(img => img.style.transition = 'none');
            }

            // Remove active da imagem atual
            images[slideIndex].classList.remove('active');
            
            slideIndex = (slideIndex + 1) % images.length;
            
            // Adiciona active na próxima imagem
            images[slideIndex].classList.add('active');

            // Restaurar transições se foram removidas
            if (!hasTransition) {
                // Usar setTimeout para restaurar após o navegador processar a mudança
                setTimeout(() => {
                    images.forEach(img => img.style.transition = '');
                }, 50);
            }

            scheduleNextSlide(); // Agendar próximo slide com novo timing
        }, currentTiming);
    }
    
    scheduleNextSlide();
}

// Auto-advance mini carousels
function startMiniCarousels() {
    const miniCarousels = document.querySelectorAll('.mini-carousel');
    
    // Configurar observador de viewport para otimização de performance
    setupMiniCarouselViewportObserver();
    
    miniCarousels.forEach((carousel, index) => {
        const images = carousel.querySelectorAll('.mini-carousel-image');
        const isCleanCarousel = carousel.classList.contains('mini-carousel--clean');
        
        // PRIMEIRO: Garantir que a primeira imagem esteja ativa
        if (images.length > 0) {
            // Limpar todas as classes active primeiro
            images.forEach(img => img.classList.remove('active'));
            // Ativar apenas a primeira imagem
            images[0].classList.add('active');
        }
        
        // DEPOIS: Setup dos controles apenas para carousels normais
        if (!isCleanCarousel) {
            setupCarouselControls(carousel, index);
        }
        
        // Auto-advance apenas se há mais de 1 imagem E se deve estar animando
        if (images.length > 1 && shouldCarouselAnimate(carousel)) {
            if (isCleanCarousel) {
                // Usar timer específico para carousel minimalista
                startCleanCarouselAutoTimer(carousel, index, 0);
            } else {
                // Usar timer normal
                startCarouselAutoTimer(carousel, index, 0);
            }
        }
    });
}

// Configurar observador de viewport para mini-carousels
function setupMiniCarouselViewportObserver() {
    const observerOptions = {
        threshold: 0.5, // 50% do carousel deve estar visível
        rootMargin: '100px' // Começar a observar 100px antes
    };
    
    const viewportObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const carousel = entry.target;
            const isVisible = entry.isIntersecting;
            const wasVisible = carousel.dataset.inViewport === 'true';
            
            // Marcar o carousel como visível/invisível
            carousel.dataset.inViewport = isVisible ? 'true' : 'false';
            
            // Se mudou de estado de visibilidade
            if (isVisible !== wasVisible) {
                if (isVisible) {
                    // Carousel se tornou visível - tentar iniciar animação
                    tryStartCarouselAnimation(carousel);
                } else {
                    // Carousel se tornou invisível - pausar animação
                    pauseCarouselAnimation(carousel);
                }
            }
        });
    }, observerOptions);
    
    // Observar todos os mini-carousels
    const miniCarousels = document.querySelectorAll('.mini-carousel');
    miniCarousels.forEach(carousel => {
        viewportObserver.observe(carousel);
        // Inicializar como não visível
        carousel.dataset.inViewport = 'false';
    });
    
    // Após configurar o observador, verificar estado inicial dos carousels visíveis
    setTimeout(() => {
        miniCarousels.forEach(carousel => {
            // Se o carousel está visível inicialmente, tentar iniciar animação
            if (carousel.dataset.inViewport === 'true') {
                tryStartCarouselAnimation(carousel);
            }
        });
    }, 100); // Pequeno delay para garantir que o observador executou
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
        const isMobile = window.innerWidth <= 768;
        const gap = isMobile ? 24 : 32; // 1.5rem mobile, 2rem desktop
        
        // Posição física = slideIndex + 1 (devido ao clone inicial)
        const physicalPosition = slideIndex + 1;
        const targetCard = allTrackItems[physicalPosition];
        if (!targetCard) return;
        
        // Centralizar o card - método híbrido mais preciso
        const targetCardWidth = targetCard.offsetWidth;
        const effectiveCarouselWidth = isMobile ? window.innerWidth : carouselWidth;
        
        // Calcular posição relativa do card no track (sem transforms anteriores)
        let cardPosition = 0;
        for (let i = 0; i < physicalPosition; i++) {
            cardPosition += allTrackItems[i].offsetWidth + gap;
        }
        
        // Calcular centro do viewport com offset para mobile
        const mobileOffset = isMobile ? 10 : 0; // Compensar margin negativo
        const viewportCenter = (effectiveCarouselWidth / 2) + mobileOffset;
        
        // Posição do centro do card alvo
        const targetCardCenter = cardPosition + (targetCardWidth / 2);
        
        // Calcular translateX para centralizar
        const translateX = viewportCenter - targetCardCenter;
        
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
                const wasActive = trackCard.classList.contains('active');
                const willBeActive = cardOriginalIndex === currentSlide;
                
                trackCard.classList.toggle('active', willBeActive);
                
                // Notificar mudança de estado para mini-carousels
                if (wasActive !== willBeActive) {
                    notifyCardStateChange(trackCard, willBeActive);
                }
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
        // Marcar o primeiro card como ativo e notificar mini-carousels
        cards.forEach((card, index) => {
            const wasActive = card.classList.contains('active');
            const willBeActive = index === 0;
            
            card.classList.toggle('active', willBeActive);
            
            // Notificar mudança inicial para mini-carousels
            if (wasActive !== willBeActive) {
                notifyCardStateChange(card, willBeActive);
            }
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
            
            // Garantir que mini-carousels do primeiro card sejam iniciados
            if (usesHighlight && cards.length > 0) {
                const firstCard = cards[0];
                if (firstCard.classList.contains('active')) {
                    const miniCarousels = firstCard.querySelectorAll('.mini-carousel');
                    miniCarousels.forEach(carousel => {
                        tryStartCarouselAnimation(carousel);
                    });
                }
            }
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
    prevBtn.removeEventListener('click', prevBtn._clickHandler);
    nextBtn.removeEventListener('click', nextBtn._clickHandler);

    prevBtn._clickHandler = () => {
        changeMiniSlideByElement(-1, carousel);
    };
    nextBtn._clickHandler = () => {
        changeMiniSlideByElement(1, carousel);
    };

    prevBtn.addEventListener('click', prevBtn._clickHandler);
    nextBtn.addEventListener('click', nextBtn._clickHandler);
    
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
        dot.className = 'mini-dot';
        dot.onclick = () => {
            currentMiniSlideByElement(dotIndex, carousel, true);
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
    
    // Não precisa mais de lógica complexa - o CSS reformulado 
    // faz a imagem ativa determinar o tamanho naturalmente
    miniCarousels.forEach((carousel, carouselIndex) => {
        // Mini-carousel agora se comporta naturalmente
    });
}

// Carousel com Efeito Fade
function initCarouselFade() {
    const fadeCarousels = document.querySelectorAll('.resources-grid--carousel-fade');
    
    fadeCarousels.forEach(carousel => {
        const cards = carousel.querySelectorAll('.card');
        if (cards.length <= 1) return;
        
        let currentSlide = 0;
        let autoPlayInterval;
        let progressInterval;
        const autoPlayDuration = 5000; // 5 segundos por slide
        
        // Inicializar primeiro card como ativo
        cards[0].classList.add('active');
        
        // Configurar altura inicial do container
        setTimeout(() => adjustContainerHeight(0), 100);
        
        // Criar controles
        const controls = document.createElement('div');
        controls.className = 'carousel-fade-controls';
        
        // Botão anterior
        const prevBtn = document.createElement('button');
        prevBtn.className = 'carousel-fade-btn';
        prevBtn.innerHTML = '&#8249;';
        prevBtn.onclick = () => goToSlide(currentSlide - 1);
        
        // Container dos dots
        const dotsContainer = document.createElement('div');
        dotsContainer.className = 'carousel-fade-dots';
        
        // Criar dots
        cards.forEach((_, index) => {
            const dot = document.createElement('span');
            dot.className = index === 0 ? 'carousel-fade-dot active' : 'carousel-fade-dot';
            dot.onclick = () => goToSlide(index);
            dotsContainer.appendChild(dot);
        });
        
        // Botão próximo
        const nextBtn = document.createElement('button');
        nextBtn.className = 'carousel-fade-btn';
        nextBtn.innerHTML = '&#8250;';
        nextBtn.onclick = () => goToSlide(currentSlide + 1);
        
        // Barra de progresso
        const progressContainer = document.createElement('div');
        progressContainer.className = 'carousel-fade-progress';
        const progressBar = document.createElement('div');
        progressBar.className = 'carousel-fade-progress-bar';
        progressContainer.appendChild(progressBar);
        
        // Montar controles
        controls.appendChild(prevBtn);
        controls.appendChild(dotsContainer);
        controls.appendChild(nextBtn);
        
        // Adicionar controles ao carousel
        carousel.appendChild(controls);
        carousel.appendChild(progressContainer);
        
        // Função para ajustar altura do container
        function adjustContainerHeight(targetIndex) {
            const targetCard = cards[targetIndex];
            if (!targetCard) return;
            
            // Criar clone invisível para medir altura sem afetar o original
            const clone = targetCard.cloneNode(true);
            clone.style.position = 'absolute';
            clone.style.top = '-9999px';
            clone.style.left = '-9999px';
            clone.style.opacity = '1';
            clone.style.pointerEvents = 'none';
            clone.style.width = targetCard.offsetWidth + 'px';
            
            document.body.appendChild(clone);
            const targetHeight = clone.offsetHeight;
            document.body.removeChild(clone);
            
            // Animar altura do container
            carousel.style.height = targetHeight + 'px';
        }

        // Função para ir para um slide específico
        function goToSlide(slideIndex) {
            // Parar auto-play temporariamente
            stopAutoPlay();
            
            // Normalizar índice
            if (slideIndex >= cards.length) slideIndex = 0;
            if (slideIndex < 0) slideIndex = cards.length - 1;
            
            // Se já está no slide atual, não fazer nada
            if (slideIndex === currentSlide) {
                startAutoPlay();
                return;
            }
            
            // Ajustar altura do container para o próximo card
            adjustContainerHeight(slideIndex);
            
            // Cross fade puro - apenas remover/adicionar classe active
            cards[currentSlide].classList.remove('active');
            cards[slideIndex].classList.add('active');
            
            // Atualizar dots
            dotsContainer.children[currentSlide].classList.remove('active');
            dotsContainer.children[slideIndex].classList.add('active');
            
            currentSlide = slideIndex;
            
            // Reiniciar auto-play após transição
            setTimeout(startAutoPlay, 600);
        }
        
        // Auto-play
        function startAutoPlay() {
            stopAutoPlay(); // Limpar intervalos anteriores
            
            // Iniciar progresso
            progressBar.style.transition = `width ${autoPlayDuration}ms linear`;
            progressBar.style.width = '100%';
            
            autoPlayInterval = setTimeout(() => {
                goToSlide(currentSlide + 1);
            }, autoPlayDuration);
        }
        
        function stopAutoPlay() {
            if (autoPlayInterval) {
                clearTimeout(autoPlayInterval);
                autoPlayInterval = null;
            }
            
            // Reset progresso
            progressBar.style.transition = 'none';
            progressBar.style.width = '0%';
            
            // Pequeno delay para reiniciar progresso suavemente
            setTimeout(() => {
                progressBar.style.transition = `width ${autoPlayDuration}ms linear`;
            }, 50);
        }
        
        // Pausar auto-play ao hover
        carousel.addEventListener('mouseenter', stopAutoPlay);
        carousel.addEventListener('mouseleave', startAutoPlay);
        
        // Controle por teclado
        carousel.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') goToSlide(currentSlide - 1);
            if (e.key === 'ArrowRight') goToSlide(currentSlide + 1);
        });
        
        // Tornar carousel focável
        carousel.setAttribute('tabindex', '0');
        
        // Iniciar auto-play
        startAutoPlay();
    });
}

// Scroll-triggered Fade - Abordagem Natural
function initScrollFade() {
    const scrollFadeElements = document.querySelectorAll('.resources-grid--scroll-fade');
    
    scrollFadeElements.forEach(element => {
        if (element.dataset.scrollInitialized === 'true') return;

        const variant = element.dataset.scrollVariant || 'fade';

        if (variant === 'before-after') {
            const initialized = setupScrollBeforeAfter(element);
            if (initialized) {
                element.dataset.scrollInitialized = 'true';
            }
            return;
        }

        const cards = element.querySelectorAll(':scope > .card');
        if (cards.length <= 1) return;
        
        setupScrollFadeCards(element, cards);
        element.dataset.scrollInitialized = 'true';
    });
}

function setupScrollFadeCards(originalElement, cards) {
    // Criar nova estrutura
    const stickyContainer = document.createElement('div');
    stickyContainer.className = 'scroll-fade-sticky';
    
    const contentArea = document.createElement('div');
    contentArea.className = 'scroll-fade-content';
    
    // Mover cards para nova estrutura
    cards.forEach((card, index) => {
        const cardClone = card.cloneNode(true);
        cardClone.classList.remove('active');
        if (index === 0) cardClone.classList.add('active');
        contentArea.appendChild(cardClone);
    });
    
    // Criar indicadores de progresso
    const progressContainer = document.createElement('div');
    progressContainer.className = 'scroll-fade-progress';
    
    cards.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.className = index === 0 ? 'scroll-fade-dot active' : 'scroll-fade-dot';
        progressContainer.appendChild(dot);
    });
    
    contentArea.appendChild(progressContainer);
    stickyContainer.appendChild(contentArea);
    
    // Altura FIXA por card - rolagem uniforme independente da quantidade
    const totalCards = cards.length;
    const heightPerCard = 100; // 100vh por card = rolagem consistente entre todos os cards
    const totalHeight = heightPerCard * totalCards;
    originalElement.style.height = `${totalHeight}vh`;
    
    // Substituir elemento original
    originalElement.innerHTML = '';
    originalElement.appendChild(stickyContainer);
    
    // Configuração do sistema contínuo
    const newCards = contentArea.querySelectorAll('.card');
    const dots = progressContainer.querySelectorAll('.scroll-fade-dot');
    
    // Calcular altura do container baseada no card mais alto
    let maxCardHeight = 0;
    cards.forEach(card => {
        const cardHeight = card.offsetHeight;
        if (cardHeight > maxCardHeight) {
            maxCardHeight = cardHeight;
        }
    });
    
    // Definir altura fixa do container para evitar mudanças de layout
    contentArea.style.height = `${maxCardHeight}px`;
    
    // Inicializar todos os cards com posicionamento absoluto centrado
    newCards.forEach((card, index) => {
        card.style.opacity = index === 0 ? '1' : '0';
        card.style.position = 'absolute';
        card.style.top = '50%';
        card.style.left = '50%';
        card.style.width = '100%';
        card.style.transform = 'translate(-50%, -50%)';
        card.style.transition = 'none';
        card.classList.remove('active', 'fade-out');
    });
    
    function handleScroll() {
        const rect = originalElement.getBoundingClientRect();
        const elementHeight = originalElement.offsetHeight;
        const viewportHeight = window.innerHeight;
        
        // Verificar se a seção está na viewport
        const isInView = rect.top <= 0 && rect.bottom >= viewportHeight;
        
        if (isInView) {
            // Calcular progresso dentro da seção (0 a 1)
            const scrolledIntoSection = Math.abs(rect.top);
            const maxScroll = elementHeight - viewportHeight;
            let scrollPercent = Math.min(Math.max(scrolledIntoSection / maxScroll, 0), 1);
            
            // Sistema uniforme: cada card ocupa exatamente o mesmo espaço de scroll
            const viewTime = 0.85; // 85% do tempo para visualizar sem transição  
            const transitionTime = 0.15; // 15% do tempo para transição (MUITO mais rápida - metade de 0.3)
            const segmentSize = 1 / totalCards; // Cada card ocupa proporção igual do scroll total
            
            let cardPosition = 0;
            let fadeProgress = 0;
            
            // Caso especial: se chegou ao final, mostrar último card com opacidade total SEM ANIMAÇÃO
            if (scrollPercent >= 0.9) {
                cardPosition = totalCards - 1;
                fadeProgress = 0; // Último card sempre 100% opaco no final SEM transição
            } else {
                // Para cada card, calcular zona de visualização vs transição
                for (let i = 0; i < totalCards; i++) {
                    const segmentStart = i * segmentSize;
                    const segmentEnd = (i + 1) * segmentSize;
                    
                    if (scrollPercent >= segmentStart && scrollPercent <= segmentEnd) {
                        const segmentProgress = (scrollPercent - segmentStart) / segmentSize;
                        
                        if (segmentProgress <= viewTime) {
                            // Zona de visualização - card 100% opaco, sem transição
                            cardPosition = i;
                            fadeProgress = 0;
                        } else {
                            // Zona de transição - fade rápido para próximo card
                            cardPosition = i;
                            const transitionProgress = (segmentProgress - viewTime) / transitionTime;
                            fadeProgress = Math.min(transitionProgress, 1); // Limitar a 1
                        }
                        break;
                    }
                }
            }
            
            const currentCardIndex = Math.floor(cardPosition);
            const nextCardIndex = Math.min(currentCardIndex + 1, totalCards - 1);
            
            // Aplicar opacidade mantendo todos os cards com absolute
            newCards.forEach((card, index) => {
                let opacity = 0;
                
                if (index === currentCardIndex) {
                    opacity = 1 - fadeProgress;
                } else if (index === nextCardIndex && currentCardIndex !== nextCardIndex && fadeProgress > 0) {
                    opacity = fadeProgress;
                }
                
                // Garantir que último card fique visível quando scroll chegar ao final SEM animação
                if (scrollPercent >= 0.9 && index === totalCards - 1) {
                    opacity = 1;
                }
                
                card.style.opacity = opacity;
            });
            
            // Atualizar dots
            let activeCardIndex = fadeProgress > 0.5 ? nextCardIndex : currentCardIndex;
            // Garantir que dot do último card fique ativo no final SEM animação
            if (scrollPercent >= 0.9) {
                activeCardIndex = totalCards - 1;
            }
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === activeCardIndex);
            });
        }
    }
    
    // Throttle para performance
    let ticking = false;
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(() => {
                handleScroll();
                ticking = false;
            });
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestTick, { passive: true });
    
    // Executar uma vez no início
    handleScroll();
}


function setupScrollBeforeAfter(originalElement) {
    const beforeSource = originalElement.querySelector('.scroll-compare__source--before');
    const afterSource = originalElement.querySelector('.scroll-compare__source--after');

    if (!beforeSource || !afterSource) {
        console.warn('Scroll before/after: fontes nao encontradas para o componente.', originalElement);
        return false;
    }

    const stickyContainer = document.createElement('div');
    stickyContainer.className = 'scroll-compare-sticky';

    const frame = document.createElement('div');
    frame.className = 'scroll-compare__frame';

    const beforeImage = beforeSource.cloneNode(true);
    beforeImage.classList.remove('scroll-compare__source', 'scroll-compare__source--before');
    beforeImage.classList.add('scroll-compare__image', 'scroll-compare__image--before');

    const afterImage = afterSource.cloneNode(true);
    afterImage.classList.remove('scroll-compare__source', 'scroll-compare__source--after');
    afterImage.classList.add('scroll-compare__image', 'scroll-compare__image--after');
    afterImage.style.setProperty('--reveal', '100%');

    frame.appendChild(beforeImage);
    frame.appendChild(afterImage);

    const applyAspectRatio = () => {
        const reference = afterImage.naturalWidth ? afterImage : beforeImage;
        if (!reference.naturalWidth || !reference.naturalHeight) return;
        frame.style.aspectRatio = `${reference.naturalWidth} / ${reference.naturalHeight}`;
    };

    if (beforeImage.complete && afterImage.complete) {
        applyAspectRatio();
    } else {
        const handleLoad = () => applyAspectRatio();
        [beforeImage, afterImage].forEach(image => {
            if (image.complete) return;
            image.addEventListener('load', handleLoad, { once: true });
        });
        applyAspectRatio();
    }

    const beforeLabelText = originalElement.dataset.beforeLabel || beforeImage.alt || 'Antes';
    const afterLabelText = originalElement.dataset.afterLabel || afterImage.alt || 'Depois';

    if (beforeLabelText) {
        const beforeLabel = document.createElement('span');
        beforeLabel.className = 'scroll-compare__label scroll-compare__label--before';
        beforeLabel.textContent = beforeLabelText;
        frame.appendChild(beforeLabel);
    }

    if (afterLabelText) {
        const afterLabel = document.createElement('span');
        afterLabel.className = 'scroll-compare__label scroll-compare__label--after';
        afterLabel.textContent = afterLabelText;
        frame.appendChild(afterLabel);
    }

    stickyContainer.appendChild(frame);

    originalElement.innerHTML = '';
    originalElement.appendChild(stickyContainer);

    const scrollHeight = Number(originalElement.dataset.scrollHeight || 220);
    originalElement.style.height = `${scrollHeight}vh`;
    originalElement.style.minHeight = originalElement.style.height;

    let ticking = false;

    function updateReveal() {
        const rect = originalElement.getBoundingClientRect();
        const maxScroll = Math.max(originalElement.offsetHeight - window.innerHeight, 1);
        const currentScroll = Math.min(Math.max(-rect.top, 0), maxScroll);
        const progress = currentScroll / maxScroll;
        const revealPercentage = (1 - progress) * 100;
        afterImage.style.setProperty('--reveal', `${revealPercentage}%`);
    }

    function requestTick() {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                updateReveal();
                ticking = false;
            });
            ticking = true;
        }
    }

    window.addEventListener('scroll', requestTick, { passive: true });
    window.addEventListener('resize', requestTick);

    updateReveal();

    return true;
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

    // Start fade
    initCarouselFade();
    initScrollFade();
    
    // Ajustar tamanho dos mini-carousels baseado nas imagens
    setTimeout(() => {
        adjustMiniCarouselSize();
        equalizeCarouselCardHeights();
    }, 200); // Delay maior para garantir que imagens carregaram

    //Start Before/After slider
    const sliderElement = document.getElementById('slider');
    if (sliderElement) {
        // Armazena a instância para ser acessada pelo 'resize'
        window.sliderInstance = new AppleSlider(sliderElement);
    }
    
    // Inicializar todos os componentes .before-after reutilizáveis
    initBeforeAfterComponents();
});

// Reagir a mudanças de tamanho da janela
window.addEventListener('resize', function() {
    // Debounce para performance
    clearTimeout(window.resizeTimer);
    window.resizeTimer = setTimeout(() => {
        adjustMiniCarouselSize(); // Recalcular mini-carousels
        equalizeCarouselCardHeights();
    }, 250);

    if (window.sliderInstance) {
        window.sliderInstance.setImageWidth();
    }
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


class AppleSlider {
    constructor(sliderElement) {
        this.slider = sliderElement;
        this.handle = this.slider.querySelector('#handle');
        this.imageWrapper = this.slider.querySelector('#imageWrapper');
        this.imageBefore = this.slider.querySelector('.before-after-slider__image--before');
        this.versionLeft = this.slider.querySelector('#versionLeft');
        this.versionRight = this.slider.querySelector('#versionRight');

        this.isDragging = false;
        this.sliderRect = null;

        this.init();
    }

    init() {
        // Definir a largura correta da imagem "antes"
        this.setImageWidth();

        // Event listeners para mouse
        this.handle.addEventListener('mousedown', this.startDrag.bind(this));
        document.addEventListener('mousemove', this.drag.bind(this));
        document.addEventListener('mouseup', this.stopDrag.bind(this));

        // Event listeners para touch (mobile)
        this.handle.addEventListener('touchstart', this.startDrag.bind(this), { passive: false });
        document.addEventListener('touchmove', this.drag.bind(this), { passive: false });
        document.addEventListener('touchend', this.stopDrag.bind(this));

        // Prevenir seleção de texto
        this.slider.addEventListener('selectstart', (e) => e.preventDefault());

        // Atualizar posições dos números inicialmente
        this.updateVersionLabels(50);

        // Redimensionar quando a janela mudar
        window.addEventListener('resize', this.setImageWidth.bind(this));
    }

    setImageWidth() {
        // Obter a largura atual do slider
        const sliderWidth = this.slider.offsetWidth;

        // Definir a largura da imagem "antes" para ser exatamente igual à largura do slider
        this.imageBefore.style.width = `${sliderWidth}px`;

        // Atualizar a custom property CSS
        this.slider.style.setProperty('--slider-width', `${sliderWidth}px`);
    }

    startDrag(e) {
        this.isDragging = true;
        this.sliderRect = this.slider.getBoundingClientRect();

        // Adicionar classe para feedback visual
        this.slider.classList.add('dragging');

        // Prevenir comportamento padrão
        e.preventDefault();

        // Adicionar cursor para o body
        document.body.style.cursor = 'ew-resize';
    }

    drag(e) {
        if (!this.isDragging) return;

        e.preventDefault();

        // Obter posição do mouse/touch
        const clientX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;

        // Calcular posição relativa
        const x = clientX - this.sliderRect.left;
        const percentage = Math.max(0, Math.min(100, (x / this.sliderRect.width) * 100));

        // Atualizar posição do handle e da máscara
        this.updateSlider(percentage);
    }

    stopDrag() {
        if (!this.isDragging) return;

        this.isDragging = false;

        // Remover classe de feedback visual
        this.slider.classList.remove('dragging');

        // Restaurar cursor
        document.body.style.cursor = '';
    }

    updateSlider(percentage) {
        // Atualizar posição do handle
        this.handle.style.left = `${percentage}%`;

        // CRÍTICO: Apenas alterar a largura da MÁSCARA, não da imagem
        this.imageWrapper.style.width = `${percentage}%`;

        // A imagem "antes" mantém sua largura fixa definida em setImageWidth()

        // Atualizar posições dos números das versões
        this.updateVersionLabels(percentage);
    }

    updateVersionLabels(percentage) {
        // Manter os números em posições fixas, apenas ajustar opacidade
        const leftOpacity = Math.min(1, Math.max(0.3, percentage / 20));
        const rightOpacity = Math.min(1, Math.max(0.3, (100 - percentage) / 20));

        this.versionLeft.style.opacity = leftOpacity;
        this.versionRight.style.opacity = rightOpacity;
    }
}

// ===== COMPONENTE BEFORE-AFTER REUTILIZÁVEL =====
class BeforeAfterComponent {
    constructor(element) {
        this.element = element;
        this.isDragging = false;
        this.sliderRect = null;
        
        // Extrair URLs das imagens dos data attributes
        this.beforeSrc = element.dataset.before;
        this.afterSrc = element.dataset.after;
        
        if (!this.beforeSrc || !this.afterSrc) {
            console.warn('BeforeAfterComponent: data-before e data-after são obrigatórios');
            return;
        }
        
        this.init();
    }
    
    init() {
        this.createStructure();
        this.setupEventListeners();
        this.setImageWidth();
        this.updateSlider(40); // Posição inicial
        
        // Redimensionar quando a janela mudar
        window.addEventListener('resize', () => {
            setTimeout(() => this.setImageWidth(), 100); // Pequeno delay para aguardar re-layout
        });
    }
    
    createStructure() {
        this.element.innerHTML = `
            <img class="before-after__image--after" src="${this.afterSrc}" alt="Imagem depois">
            <div class="before-after__image-wrapper">
                <img class="before-after__image--before" src="${this.beforeSrc}" alt="Imagem antes">
            </div>
            <div class="before-after__handle">
                <div class="before-after__handle-grabber">
                    <svg class="before-after__handle-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8 7L5 10L8 13" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M16 7L19 10L16 13" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                </div>
                <div class="before-after__version-label before-after__version-label--left">TQS25</div>
                <div class="before-after__version-label before-after__version-label--right">TQS26</div>
            </div>
        `;
        
        // Obter referências dos elementos
        this.handle = this.element.querySelector('.before-after__handle');
        this.imageWrapper = this.element.querySelector('.before-after__image-wrapper');
        this.imageBefore = this.element.querySelector('.before-after__image--before');
        this.versionLeft = this.element.querySelector('.before-after__version-label--left');
        this.versionRight = this.element.querySelector('.before-after__version-label--right');
    }
    
    setupEventListeners() {
        // Event listeners para mouse
        this.handle.addEventListener('mousedown', this.startDrag.bind(this));
        document.addEventListener('mousemove', this.drag.bind(this));
        document.addEventListener('mouseup', this.stopDrag.bind(this));

        // Event listeners para touch (mobile)
        this.handle.addEventListener('touchstart', this.startDrag.bind(this), { passive: false });
        document.addEventListener('touchmove', this.drag.bind(this), { passive: false });
        document.addEventListener('touchend', this.stopDrag.bind(this));

        // Prevenir seleção de texto
        this.element.addEventListener('selectstart', (e) => e.preventDefault());
    }
    
    setImageWidth() {
        // Aguardar a imagem "depois" carregar para obter dimensões corretas
        const imageAfter = this.element.querySelector('.before-after__image--after');
        
        if (imageAfter.complete) {
            this.syncImageSizes(imageAfter);
        } else {
            imageAfter.addEventListener('load', () => this.syncImageSizes(imageAfter), { once: true });
        }
    }
    
    syncImageSizes(imageAfter) {
        const containerWidth = this.element.offsetWidth;
        const containerHeight = this.element.offsetHeight;
        
        // CRUCIAL: Definir largura fixa em pixels para a imagem "antes"
        // Isso previne redimensionamento quando o wrapper muda de largura
        this.imageBefore.style.width = `${containerWidth}px`;
        this.imageBefore.style.height = `${containerHeight}px`;
        this.imageBefore.style.top = '0';
        this.imageBefore.style.left = '0';
        this.imageBefore.style.objectFit = 'contain';
        this.imageBefore.style.objectPosition = 'center';
        
        // Definir variável CSS para referência
        this.element.style.setProperty('--container-width', `${containerWidth}px`);
        
        // Wrapper setup
        this.imageWrapper.style.height = `${containerHeight}px`;
        this.imageWrapper.style.top = '0';
        this.imageWrapper.style.left = '0';
        
        console.log('Before/After sync - fixed dimensions:', {
            containerSize: `${containerWidth}x${containerHeight}`,
            beforeImagePixels: `${containerWidth}px x ${containerHeight}px`
        });
    }
    
    startDrag(e) {
        this.isDragging = true;
        this.sliderRect = this.element.getBoundingClientRect();
        
        this.element.classList.add('dragging');
        document.body.style.cursor = 'ew-resize';
        e.preventDefault();
    }
    
    drag(e) {
        if (!this.isDragging) return;
        
        e.preventDefault();
        
        const clientX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
        const x = clientX - this.sliderRect.left;
        const percentage = Math.max(0, Math.min(100, (x / this.sliderRect.width) * 100));
        
        this.updateSlider(percentage);
    }
    
    stopDrag() {
        if (!this.isDragging) return;
        
        this.isDragging = false;
        this.element.classList.remove('dragging');
        document.body.style.cursor = '';
    }
    
    updateSlider(percentage) {
        // Atualizar posição do handle
        this.handle.style.left = `${percentage}%`;
        
        // APENAS alterar a largura do wrapper (que funciona como máscara)
        // A imagem "antes" mantém suas dimensões fixas definidas em syncImageSizes
        this.imageWrapper.style.width = `${percentage}%`;
        
        // Atualizar opacidade dos labels
        this.updateVersionLabels(percentage);
        
        // DEBUG: verificar se as dimensões da imagem permanecem fixas
        // console.log('Update slider - image dimensions:', {
        //     percentage: percentage,
        //     beforeImageWidth: this.imageBefore.style.width,
        //     beforeImageHeight: this.imageBefore.style.height,
        //     wrapperWidth: this.imageWrapper.style.width
        // });
    }
    
    updateVersionLabels(percentage) {
        const leftOpacity = Math.min(1, Math.max(0.3, percentage / 20));
        const rightOpacity = Math.min(1, Math.max(0.3, (100 - percentage) / 20));
        
        this.versionLeft.style.opacity = leftOpacity;
        this.versionRight.style.opacity = rightOpacity;
    }
}

// Auto-inicialização de todos os componentes .before-after
function initBeforeAfterComponents() {
    document.querySelectorAll('.before-after').forEach(element => {
        if (!element.dataset.initialized) {
            new BeforeAfterComponent(element);
            element.dataset.initialized = 'true';
        }
    });
}

// Observer para detectar mudanças no DOM e inicializar novos componentes
const beforeAfterObserver = new MutationObserver((mutations) => {
    let hasNewBeforeAfter = false;
    mutations.forEach((mutation) => {
        if (mutation.type === 'childList') {
            mutation.addedNodes.forEach((node) => {
                if (node.nodeType === 1) { // Element node
                    if (node.classList?.contains('before-after') || 
                        node.querySelector?.('.before-after')) {
                        hasNewBeforeAfter = true;
                    }
                }
            });
        }
        if (mutation.type === 'attributes' && 
            mutation.target.classList?.contains('mini-carousel-image') &&
            mutation.attributeName === 'class') {
            // Quando um item do carousel se torna ativo, reinicializar before-after
            hasNewBeforeAfter = true;
        }
    });
    
    if (hasNewBeforeAfter) {
        setTimeout(initBeforeAfterComponents, 100); // Pequeno delay para garantir que o DOM foi atualizado
    }
});

// Iniciar observação do DOM
beforeAfterObserver.observe(document.body, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ['class']
});

// Adicionar classe CSS para estado de arrastar
const style = document.createElement('style');
style.textContent = `
    .before-after-slider.dragging {
        cursor: ew-resize;
    }
    
    .before-after-slider.dragging .before-after-slider__handle-grabber {
        transform: translate(-50%, -50%) scale(1.2);
        background: rgba(255, 255, 255, 0.3);
        box-shadow: 
            0 15px 45px rgba(0, 0, 0, 0.5),
            0 8px 25px rgba(0, 0, 0, 0.3),
            inset 0 1px 0 rgba(255, 255, 255, 0.7),
            0 0 40px rgba(255, 255, 255, 0.4);
    }
    
    .before-after-slider.dragging .before-after-slider__handle {
        box-shadow: 
            0 0 30px rgba(255, 255, 255, 0.8),
            0 0 60px rgba(255, 255, 255, 0.5);
    }
    
    .before-after-slider.dragging .version-label {
        transform: translateY(-50%) scale(1.05);
        background: rgba(0, 0, 0, 0.6);
        border-color: rgba(255, 255, 255, 0.4);
    }
`;
document.head.appendChild(style);


// --- LÓGICA PARA O COMPONENTE DE FEATURES INTERATIVAS (com arrastar/deslizar) --- //
document.addEventListener('DOMContentLoaded', () => {

    // --- NOVA FUNÇÃO PARA ARRASTAR/DESLIZAR --- //
    function initInteractiveFeaturesSwipe(container, prevBtn, nextBtn) {
        const mediaPanel = container.querySelector('.media-panel');
        if (!mediaPanel) return;

        let startX = 0;
        let startY = 0;
        let isDown = false;
        const minSwipeDistance = 50;

        const handleSwipe = (endX, endY) => {
            const diffX = startX - endX;
            const diffY = startY - endY;

            // Verifica se o movimento foi mais horizontal que vertical
            if (Math.abs(diffX) > Math.abs(diffY)) {
                if (Math.abs(diffX) > minSwipeDistance) {
                    if (diffX > 0) {
                        // Deslize para a esquerda -> Próximo
                        nextBtn.click();
                    } else {
                        // Deslize para a direita -> Anterior
                        prevBtn.click();
                    }
                }
            }
        };

        // Eventos de Mouse
        mediaPanel.addEventListener('mousedown', (e) => {
            isDown = true;
            startX = e.clientX;
            startY = e.clientY;
            mediaPanel.style.cursor = 'grabbing';
        });
        mediaPanel.addEventListener('mouseup', (e) => {
            if (!isDown) return;
            isDown = false;
            mediaPanel.style.cursor = 'grab';
            handleSwipe(e.clientX, e.clientY);
        });
        mediaPanel.addEventListener('mouseleave', () => {
            if (isDown) {
                isDown = false;
                mediaPanel.style.cursor = 'grab';
            }
        });

        // Eventos de Toque
        mediaPanel.addEventListener('touchstart', (e) => {
            isDown = true;
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
        }, { passive: true });
        mediaPanel.addEventListener('touchend', (e) => {
            if (!isDown) return;
            isDown = false;
            handleSwipe(e.changedTouches[0].clientX, e.changedTouches[0].clientY);
        });
    }

    // --- LÓGICA PRINCIPAL DO COMPONENTE --- //
    document.querySelectorAll('.resources-grid--carousel--interactive').forEach(container => {
        if (container.dataset.interactiveInitialized) return;

        const originalCards = Array.from(container.querySelectorAll(':scope > .card'));
        if (originalCards.length === 0) return;

        const controlsPanel = document.createElement('div');
        controlsPanel.className = 'controls-panel';

        const mediaPanel = document.createElement('div');
        mediaPanel.className = 'media-panel';

        const featureList = document.createElement('ul');
        featureList.className = 'feature-list';

        const navContainer = document.createElement('div');
        navContainer.className = 'feature-nav';

        const navPrev = document.createElement('button');
        navPrev.className = 'nav-arrow prev';
        navPrev.setAttribute('aria-label', 'Anterior');

        const navNext = document.createElement('button');
        navNext.className = 'nav-arrow next';
        navNext.setAttribute('aria-label', 'Próximo');

        navContainer.append(navPrev, navNext);

        originalCards.forEach((card, index) => {
            const titleElement = card.querySelector('.card__title');
            const label = titleElement ? titleElement.textContent.trim() : `Feature ${index + 1}`;

            const contentDiv = card.querySelector('.card__content');
            const descElement = contentDiv.querySelector('.card__description');

            if (titleElement && descElement) {
                const newParagraph = document.createElement('p');
                newParagraph.className = 'card__description';
                const boldPart = document.createElement('strong');
                boldPart.textContent = titleElement.textContent.trim() + ". ";
                newParagraph.appendChild(boldPart);
                newParagraph.append(descElement.textContent.trim());
                contentDiv.innerHTML = '';
                contentDiv.appendChild(newParagraph);
            }

            const listItem = document.createElement('li');
            listItem.className = 'feature-list-item';
            const button = document.createElement('button');
            button.className = 'feature-button';
            button.onclick = () => showFeature(index);
            const icon = document.createElement('span');
            icon.className = 'feature-button-icon';
            const labelSpan = document.createElement('span');
            labelSpan.className = 'feature-button-label';
            labelSpan.textContent = label;
            button.append(icon, labelSpan);
            listItem.append(button, card);
            featureList.appendChild(listItem);

            const media = card.querySelector('.card__media');
            if (media) {
                mediaPanel.appendChild(media);
            }
        });

        controlsPanel.append(navContainer, featureList);
        container.innerHTML = '';
        container.append(controlsPanel, mediaPanel);

        const listItems = container.querySelectorAll('.feature-list-item');
        const mediaItems = container.querySelectorAll('.card__media');
        let currentIndex = 0;

        function showFeature(index) {
            listItems.forEach(item => item.classList.remove('active'));
            mediaItems.forEach(item => item.classList.remove('active'));
            if (listItems[index]) listItems[index].classList.add('active');
            if (mediaItems[index]) mediaItems[index].classList.add('active');
            currentIndex = index;
        }

        navPrev.onclick = () => {
            const newIndex = (currentIndex - 1 + listItems.length) % listItems.length;
            showFeature(newIndex);
        };

        navNext.onclick = () => {
            const newIndex = (currentIndex + 1) % listItems.length;
            showFeature(newIndex);
        };

        showFeature(0);
        container.dataset.interactiveInitialized = 'true';

        // Inicia a funcionalidade de arrastar
        initInteractiveFeaturesSwipe(container, navPrev, navNext);
    });
});