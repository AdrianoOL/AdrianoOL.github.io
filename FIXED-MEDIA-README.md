# Resource Group com Background Fixo
## Efeito Apple Vision Pro - Mídia fixa com conteúdo rolando

### 🎯 O que é?
Um novo modificador para `resource-group` que cria o efeito visual usado no site da Apple Vision Pro: uma imagem ou vídeo de fundo permanece fixo enquanto o conteúdo rola suavemente por cima.

---

## 📋 Como Usar

### Estrutura HTML Básica

```html
<section class="resource-group resource-group--fixed-media [modificador-overlay]">
    <!-- Background fixo (imagem ou vídeo) -->
    <div class="fixed-media-background">
        <img src="images/sua-imagem.jpg" alt="Background" class="fixed-media-bg">
    </div>

    <!-- Conteúdo que rola -->
    <div class="fixed-media-content">
        <h2 class="resource-group-title">Seu Título</h2>
        <p class="resource-group-description">Sua descrição</p>

        <div class="resources-grid">
            <!-- Seus cards aqui -->
        </div>
    </div>
</section>
```

---

## 🎨 Modificadores de Overlay

Para melhorar o contraste do texto sobre a imagem, adicione um dos modificadores:

| Modificador | Efeito | Quando usar |
|------------|--------|-------------|
| `overlay-light` | Escurecimento leve (30%) | Imagens já escuras |
| `with-overlay` | Escurecimento médio (40%) | Uso geral |
| `overlay-dark` | Escurecimento forte (60%) | Imagens muito claras |
| `overlay-blue` | Overlay azul translúcido | Tema azul TQS |

**Exemplo:**
```html
<section class="resource-group resource-group--fixed-media overlay-dark">
    <!-- ... -->
</section>
```

---

## 🎬 Usando com Vídeo

Substitua a tag `<img>` por `<video>`:

```html
<div class="fixed-media-background">
    <video autoplay muted loop playsinline class="fixed-media-bg">
        <source src="videos/seu-video.mp4" type="video/mp4">
        <source src="videos/seu-video.webm" type="video/webm">
    </video>
</div>
```

**Atributos importantes do vídeo:**
- `autoplay`: Inicia automaticamente
- `muted`: Sem som (necessário para autoplay funcionar)
- `loop`: Repete infinitamente
- `playsinline`: Reproduz inline em dispositivos móveis

---

## 🎴 Tipos de Cards Compatíveis

Todos os cards do sistema modular funcionam perfeitamente:

### Cards Transparentes (recomendado)
```html
<div class="card card--transparent">
    <div class="card__content">
        <h4 class="card__title" style="color: white;">Título</h4>
        <p class="card__description" style="color: rgba(255,255,255,0.8);">Texto</p>
    </div>
</div>
```

### Cards Horizontais com Imagem
```html
<div class="card card--horizontal card--transparent">
    <div class="card__media">
        <img src="images/exemplo.png" alt="Exemplo" class="card__image">
    </div>
    <div class="card__content">
        <h4 class="card__title" style="color: white;">Título</h4>
        <p class="card__description" style="color: rgba(255,255,255,0.8);">Texto</p>
    </div>
</div>
```

### Cards Overlay (para fundos claros)
```html
<div class="card card--overlay">
    <div class="card__media">
        <img src="images/exemplo.png" alt="Exemplo" class="card__image">
    </div>
    <div class="card__content">
        <h4 class="card__title">Título</h4>
        <p class="card__description">Texto</p>
    </div>
</div>
```

---

## 🎯 Dicas de Cores para Texto

Quando usar overlay escuro (recomendado), ajuste as cores do texto:

```html
<!-- Títulos principais -->
<h2 class="resource-group-title" style="color: white;">Título</h2>

<!-- Descrições -->
<p class="resource-group-description" style="color: rgba(255,255,255,0.9);">Descrição</p>

<!-- Títulos de cards -->
<h4 class="card__title" style="color: white;">Card Título</h4>

<!-- Texto de cards -->
<p class="card__description" style="color: rgba(255,255,255,0.8);">Card texto</p>
```

### Alternativa com Text Shadow
Para overlay claro, use sombra no texto:

```html
<h2 style="color: white; text-shadow: 0 2px 4px rgba(0,0,0,0.3);">Título</h2>
```

---

## 📱 Responsividade

O sistema se adapta automaticamente:

**Desktop:**
- Background permanece fixo (`position: fixed`)
- Efeito parallax completo

**Mobile (≤768px):**
- Background muda para `position: absolute` (melhor performance)
- Altura aumentada para 120vh (garante scroll suficiente)
- Padding reduzido para otimizar espaço

---

## ✨ Características Técnicas

- ✅ **CSS Puro**: Sem JavaScript necessário
- ✅ **Performance**: `position: fixed` com `transform` otimizado
- ✅ **Acessibilidade**: Mantém hierarquia semântica
- ✅ **Compatibilidade**: Todos os navegadores modernos
- ✅ **Mobile-First**: Design responsivo integrado
- ✅ **Flexível**: Suporta imagem, vídeo, gradiente

---

## 🔧 Customizações Avançadas

### Ajustar altura mínima
```css
.resource-group--fixed-media {
    min-height: 150vh; /* Mais alto */
}
```

### Criar overlay personalizado
```css
.resource-group--fixed-media.overlay-custom .fixed-media-background::after {
    background: linear-gradient(180deg, rgba(0,0,0,0.8), rgba(22,62,100,0.6));
}
```

### Posição da imagem de fundo
```css
.fixed-media-bg {
    object-position: top center; /* Foco no topo */
}
```

---

## 📂 Arquivos de Teste

- **[test-fixed-media.html](test-fixed-media.html)**: 3 exemplos completos
  - Overlay escuro
  - Overlay azul
  - Overlay claro

Abra no navegador e role para ver o efeito!

---

## 🆚 Diferenças vs Intro Section

| Recurso | Intro Section | Fixed Media |
|---------|--------------|-------------|
| Background | `absolute` | `fixed` |
| Scroll | Rola junto | Permanece fixo |
| Altura | 100vh fixa | Variável (conteúdo) |
| Efeito | Estático | Parallax |
| Uso | Hero/Abertura | Seções de destaque |

---

## 💡 Casos de Uso Ideais

1. **Seção de IA**: Fundo tech com efeito futurista
2. **Editor Gráfico**: Screenshot do editor fixo
3. **BIM**: Modelo 3D rotacionando (vídeo)
4. **Análise Estrutural**: Visualização de resultados
5. **Depoimentos**: Foto do projeto em fundo

---

## 🚀 Exemplo Real Completo

```html
<!-- Seção IA com vídeo de fundo -->
<section class="resource-group resource-group--fixed-media overlay-dark">
    <div class="fixed-media-background">
        <video autoplay muted loop playsinline class="fixed-media-bg">
            <source src="videos/ia-background.mp4" type="video/mp4">
        </video>
    </div>

    <div class="fixed-media-content">
        <h2 class="resource-group-title" style="color: #00d4ff;">
            Inteligência Artificial no TQS v26
        </h2>
        <p class="resource-group-description" style="color: rgba(255,255,255,0.9);">
            Otimização automática de estruturas com machine learning
        </p>

        <div class="resources-grid">
            <div class="card card--transparent">
                <div class="card__content">
                    <h4 class="card__title" style="color: white;">
                        Auto-dimensionamento
                    </h4>
                    <p class="card__description" style="color: rgba(255,255,255,0.8);">
                        IA sugere as melhores dimensões baseado em milhares de projetos
                    </p>
                </div>
            </div>

            <div class="card card--transparent">
                <div class="card__content">
                    <h4 class="card__title" style="color: white;">
                        Detecção de Erros
                    </h4>
                    <p class="card__description" style="color: rgba(255,255,255,0.8);">
                        Algoritmos identificam inconsistências antes do cálculo
                    </p>
                </div>
            </div>

            <div class="card card--transparent">
                <div class="card__content">
                    <h4 class="card__title" style="color: white;">
                        Otimização de Custos
                    </h4>
                    <p class="card__description" style="color: rgba(255,255,255,0.8);">
                        Reduz consumo de materiais mantendo segurança
                    </p>
                </div>
            </div>
        </div>
    </div>
</section>
```

---

## ⚠️ Considerações Importantes

1. **Tamanho da Mídia**: Use imagens otimizadas (máx 2MB)
2. **Vídeo**: Formatos MP4 e WebM para compatibilidade
3. **Contraste**: Sempre teste legibilidade do texto
4. **Performance**: Evite múltiplas seções fixed-media consecutivas
5. **Acessibilidade**: Inclua `alt` em imagens

---

## 📚 Referências

- **Inspiração**: [Apple Vision Pro](https://www.apple.com/apple-vision-pro/)
- **Documentação**: [CLAUDE.md](CLAUDE.md) - Sistema modular de cards
- **CSS**: [styles.css](styles.css) - Linhas 3430-3538

---

**Criado para o projeto TQS v26** 🚀
