# Projeto TQS v26 - Landing Page

## Status do Projeto
✅ **FUNCIONAL** - Página completa com sistema modular de cards e grid automático implementados

## Visão Geral
Landing page para o lançamento da versão 26 do software TQS, apresentando novos recursos e funcionalidades de forma moderna e responsiva.

## Objetivos
- ✅ Criar página de apresentação dos novos recursos da v26
- ✅ Implementar navegação fluida e responsiva
- ✅ Destacar principais melhorias técnicas
- 🔄 Otimizar conversão de visitantes em leads/vendas

## Estrutura Atual Implementada

### 1. Header ✅
- Navegação dropdown com todos os recursos
- Botão "Adquirir" posicionado à direita
- Logo com link para site principal (tqs.com.br)
- Menu responsivo com dropdown funcional

### 2. Hero Section ✅
- Layout com imagem principal e conteúdo
- Título e subtítulo hierarquizados
- Call-to-action para download/trial

### 3. Seções de Recursos ✅
Recursos implementados com navegação:
- Editor Gráfico, Editor 3D, Viewport
- NBR 8681, Gerenciador, Modelador Estrutural
- Análise Estrutural, Pilares, Vigas, Lajes
- Fundações, Biblioteca de Desenhos, BIM
- PREO, MetalCheck, Lajes Protendidas
- SISEs, Alvest, Paredes de Concreto
- IA, Python, Outras novidades

### 4. Seção de Atualizações ✅
- Lista de atualizações por versão
- Formato organizado e legível

## Tecnologias Implementadas

### Frontend
- **HTML5**: Estrutura semântica completa
- **CSS3**: Sistema de grid moderno, flexbox, variáveis CSS
- **JavaScript**: Interações, smooth scroll, dropdown menus
- **Design Responsivo**: Mobile-first approach

### Arquivos do Projeto
```
R:\Marketing\Site\
├── index.html                    # Página principal
├── styles.css                   # Estilos principais (movido da pasta css/)
├── main.js                      # Interações JavaScript (movido da pasta js/)
├── images/                      # Assets visuais
│   ├── logo-header.png
│   ├── hero-main.png
│   └── test.png
├── Docs/                        # Documentação técnica
│   ├── TQS V26 - Lista de Itens.pdf
│   └── ED55-DESENVOLV-17.pdf
└── CLAUDE.md                    # Este arquivo
```

## Design System Atual

### Tipografia
- **Sistema**: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto
- **Hierarquia**: H1 (3.5rem), H2 (2.5rem), H3 (2rem), H4 (1.5rem)
- **Peso**: 600 para títulos, 500 para botões
- **Line-height**: 1.2 para títulos, 1.6 para texto

### Layout e Responsividade
- **Container**: Max-width 1200px, padding 20px
- **Grid System**: CSS Grid e Flexbox
- **Breakpoints**: Mobile-first design
- **Smooth Scroll**: Implementado via CSS

### Componentes
- **Botões**: Border-radius 8px, padding 12px 24px
- **Dropdown**: Menu de navegação funcional
- **Cards**: Layout de recursos organizados (ver seção Cards abaixo)
- **Transições**: 0.3s ease para interações

## Sistema Modular de Cards ✅

**NOVO SISTEMA IMPLEMENTADO**: Sistema unificado e modular que facilita a troca de estilos

### Estrutura Base Uniforme
Todos os cards seguem a mesma estrutura HTML:
```html
<div class="card [modificadores]">
    <div class="card__media">
        <img src="imagem.png" alt="Alt" class="card__image">
    </div>
    <div class="card__content">
        <h4 class="card__title">Título</h4>
        <p class="card__description">Descrição</p>
    </div>
</div>
```

### Modificadores de Layout
- `card--horizontal`: Layout horizontal (imagem + texto lado a lado)
- `card--horizontal-reverse`: Layout horizontal invertido
- `card--vertical`: Layout vertical (texto em cima, imagem embaixo)
- `card--compact`: Layout compacto (apenas texto)
- `card--overlay`: Layout overlay (texto sobre imagem)

### Modificadores de Aparência
- `card--dark`: Fundo escuro, texto branco
- `card--blue`: Fundo azul, texto branco
- `card--transparent`: Fundo transparente
- `card--overlay-dark`: Overlay mais escuro
- `card--overlay-blue`: Overlay azul

### Elementos Internos
- `card__content`: Área do conteúdo textual
- `card__media`: Área da mídia/imagem
- `card__title`: Título do card
- `card__description`: Descrição do card
- `card__image`: Imagem do card

### Sistema de Grid Automático ✅
**INOVAÇÃO**: Apenas uma classe de grid necessária!
- `resources-grid`: Grid que detecta automaticamente o tipo de card e aplica layout apropriado
- Sistema CSS com `:has()` detecta o conteúdo e ajusta automaticamente:
  - Cards overlay → Layout full-width
  - Cards horizontais → Grid flexível responsivo
  - Cards compactos → Auto-fit grid
  - Cards verticais → Grid responsivo balanceado

### Benefícios do Novo Sistema
- ✅ **Facilidade**: Trocar estilo = alterar apenas o modificador
- ✅ **Consistência**: Todos os cards seguem a mesma estrutura
- ✅ **Manutenibilidade**: Sistema unificado, mais fácil de manter
- ✅ **Flexibilidade**: Fácil adicionar novos modificadores
- ✅ **Performance**: CSS otimizado sem redundâncias
- ✅ **Grid Inteligente**: Detecção automática do layout baseada no conteúdo

### Mini Carrossel ✅
**Uso**: Múltiplas imagens dentro de um card
**Classes**: `mini-carousel` dentro de `card__media`
**Elementos**:
- `mini-carousel-track` (container das imagens)
- `mini-carousel-image` (imagens individuais)
- `mini-carousel-dots` (navegação por pontos)
- `mini-carousel-btn` (botões prev/next)
**Funciona**: Com qualquer tipo de card do sistema modular

## Referências de Design
- **v25**: https://www.tqs.com.br/v25 (estrutura base)
- **v24**: https://www.tqs.com.br/v24 (comparação)

### Inspirações de UX
- **Apple**: Layout modular, espaçamento generoso
- **Dropbox**: Visual storytelling, CTAs claros
- **TechSmith**: Demo de software, pricing claro

## Próximos Passos

### Desenvolvimento 🔄
1. **Conteúdo**: Finalizar textos e imagens dos recursos
2. **Performance**: Otimizar imagens e CSS
3. **SEO**: Meta tags, structured data
4. **Analytics**: Integrar tracking de conversão

### Otimizações Técnicas
- [ ] Lazy loading para imagens
- [ ] Minificação de CSS/JS
- [ ] Service Worker para cache
- [ ] Testes cross-browser

## Atualizações Recentes ✅

### v1.2 - Sistema Modular Implementado
- ✅ **Cards Unificados**: Sistema modular com estrutura única
- ✅ **Grid Automático**: Sistema inteligente que detecta conteúdo automaticamente
- ✅ **Overlay Uniformizado**: Todos os overlays seguem mesma estrutura
- ✅ **Arquivos Organizados**: CSS e JS movidos para pasta raiz
- ✅ **Eliminação de Redundâncias**: Removidas classes inconsistentes
- ✅ **Documentação Atualizada**: CLAUDE.md com novo sistema

### Arquivos de Teste e Demonstração
- `test-grid-automatico.html`: Demonstra funcionamento do grid automático
- `test-overlay-uniform.html`: Mostra uniformização dos overlays
- `card-system-examples.html`: Exemplos de uso do sistema modular

## Comandos e Ferramentas

### Desenvolvimento Local
- **Servidor local**: Usar extensão Live Server no VS Code
- **Navegador**: Testar em Chrome, Firefox, Safari, Edge
- **DevTools**: Usar para debugging responsivo

### Arquivos de Referência
- **Lista de recursos**: `Docs/TQS V26 - Lista de Itens.pdf`
- **Especificações**: `Docs/ED55-DESENVOLV-17.pdf`

## Observações Importantes
- ⚠️ Projeto não usa package.json (HTML/CSS/JS puro)
- ⚠️ Não é repositório Git (arquivo standalone)
- ✅ Estrutura modular permite fácil manutenção
- ✅ Código semântico e acessível implementado