<!-- Título -->

<h1 align="center">PRIMEFIX</h1>
<p align="center">
  <img width="200" height="200" alt="Logo" src="https://github.com/user-attachments/assets/6777aa0e-60c0-4375-81b2-efee728c43b3" />
    <h1 align="center">PRIMEFIX</h1>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/-React-333333?style=flat&logo=react" />
  <img src="https://img.shields.io/badge/-Git-333333?style=flat&logo=git" />
  <img src="https://img.shields.io/badge/-GitHub-333333?style=flat&logo=github" />
  <img src="https://img.shields.io/badge/-Visual%20Studio%20Code-333333?style=flat&logo=visual-studio-code&logoColor=007ACC" />
  <img src="https://img.shields.io/badge/-TMDB%20API-333333?style=flat&logo=themoviedatabase" />
  <img src="https://img.shields.io/badge/-TailwindCSS-333333?style=flat&logo=tailwindcss" />
  <img src="https://img.shields.io/badge/-Vite-333333?style=flat&logo=vite" />
</p>

<h2 align="center">🎬 PrimeFlix Moderno</h2>

## Sobre
<p align="center">
  PrimeFlix Moderno é uma aplicação de streaming premium, pensada para entregar uma experiência fluida, envolvente e visualmente marcante.  
Cada detalhe — da arquitetura ao design — foi cuidadosamente planejado para refletir excelência técnica, usabilidade refinada e uma identidade visual coerente com plataformas de entretenimento de alto nível.
</p>
<p align="center">
<img width="1891" height="881" alt="telaprimefix" src="https://github.com/user-attachments/assets/610aa910-723f-4309-8d5a-51d732590726" />
<img width="1858" height="965" alt="explorar filmes" src="https://github.com/user-attachments/assets/b46ef5bb-97a3-4538-b183-4b410c71acb4" />
</p>

---

## 📌 Pitch para Recrutadores

- ✅ Domínio técnico completo: arquitetura escalável, componentes reutilizáveis, performance otimizada  
- ✅ Visão de produto: cada decisão foi pensada para entregar valor real ao usuário  
- ✅ Uso estratégico de IA: aceleração com Copilot e Gemini, sem abrir mão da autoria e qualidade  
- ✅ Design e UX refinados: interface fluida, estética minimalista e heurísticas de Nielsen aplicadas  
- ✅ Organização impecável: estrutura de pastas clara, documentação completa e código limpo  

---

## 🧠 Visão Estratégica

PrimeFlix Moderno é mais que uma aplicação React. É uma demonstração clara de engenharia de produto moderna, onde cada componente, cada decisão e cada linha de código foram pensadas para:

- Encantar o usuário com uma experiência fluida, imersiva e visualmente harmônica  
- Impressionar recrutadores com organização, clareza arquitetural e domínio técnico  
- Mostrar como IA pode acelerar sem comprometer qualidade, visão ou autoria  

---

## ⚙️ Tecnologias Utilizadas

| Tecnologia            | Finalidade                                      |
|-----------------------|-------------------------------------------------|
| React 18              | UI declarativa e componentizada                |
| Vite                  | Bundler moderno e ultra-rápido                 |
| TailwindCSS           | Estilização utilitária e responsiva            |
| Styled Components     | Estilo dinâmico por componente                 |
| Axios                 | Requisições HTTP com interceptadores           |
| React Router DOM      | Navegação SPA com rotas dinâmicas              |
| FontAwesome           | Ícones acessíveis e modernos                   |
| ESLint + Plugins      | Padronização e qualidade de código             |

---

## 📁 Estrutura de Pastas

```bash
/primeflix-moderno
├── src/
│   ├── assets/                         # Imagens, ícones e arquivos estáticos
│   ├── components/                     # Componentes reutilizáveis da aplicação
│   │   ├── common/                     # Elementos visuais globais
│   │   │   ├── BackgroundGlow.jsx
│   │   │   ├── LoadingSpinner.jsx
│   │   │   └── ScrollProgress.jsx
│   │   ├── features/                   # Componentes com funcionalidades específicas
│   │   │   ├── ConfirmationModal.jsx
│   │   │   ├── CookieConsentBanner.jsx
│   │   │   ├── HeroCarousel.jsx
│   │   │   ├── MovieCarousel.jsx
│   │   │   └── MovieForm.jsx
│   │   ├── layout/                     # Estrutura visual da aplicação
│   │   │   ├── Footer/
│   │   │   │   ├── BackToTopButton.jsx
│   │   │   │   ├── footer.data.js
│   │   │   │   ├── FooterLinkColumn.jsx
│   │   │   │   ├── NewsletterForm.jsx
│   │   │   │   └── SocialLinks.jsx
│   │   │   ├── Header/
│   │   │   │   ├── header.data.js
│   │   │   │   ├── MobileMenu.jsx
│   │   │   │   ├── NavLinks.jsx
│   │   │   │   ├── ProfileDropdown.jsx
│   │   │   │   └── Search.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── Header.jsx
│   │   │   └── RootLayout.jsx
│   │   ├── ui/                         # Componentes visuais genéricos e reutilizáveis
│   │   │   ├── MovieCard/
│   │   │   │   ├── CardHoverOverlay.jsx
│   │   │   │   ├── CardImage.jsx
│   │   │   │   └── useMovieCardLogic.js
│   │   │   ├── Button.jsx
│   │   │   ├── ErrorDisplay.jsx
│   │   │   ├── Input.jsx
│   │   │   ├── LoadingSkeleton.jsx
│   │   │   ├── MovieCard.jsx
│   │   │   ├── Spinner.jsx
│   │   │   └── Toast.jsx
│   ├── contexts/                       # Contextos globais para gerenciamento de estado
│   │   ├── auth-context.js
│   │   ├── AuthProvider.jsx
│   │   ├── MovieContext.jsx
│   │   └── PageTransitionContext.jsx
│   ├── hooks/                          # Hooks personalizados
│   │   ├── useAuth.js
│   │   ├── useCarouselScroll.js
│   │   ├── useClickOutside.js
│   │   ├── useHeroCarousel.js
│   │   ├── usePageData.js
│   │   ├── useScroll.js
│   │   └── useToast.js
│   ├── pages/                          # Páginas principais da aplicação
│   │   ├── AddMoviePage.jsx
│   │   ├── EditMoviePage.jsx
│   │   ├── HomePage.jsx
│   │   ├── MoviesPage.jsx
│   │   ├── MyListPage.jsx
│   │   ├── NotFoundPage.jsx
│   │   ├── PlaceholderPage.jsx
│   │   └── SeriesPage.jsx
│   ├── services/                       # Lógica de negócio e integração com APIs
│   │   ├── movieStorageService.js
│   │   └── tmdbService.js
│   ├── utils/                          # Funções auxiliares e utilitárias
│   │   ├── imageUrlBuilder.js
│   │   └── throttle.js
│   ├── App.jsx                         # Componente raiz da aplicação
│   ├── index.css                       # Estilos globais
│   └── main.jsx                        # Ponto de entrada da aplicação
├── .env                                # Variáveis de ambiente
├── package.json                        # Dependências e scripts do projeto
├── tailwind.config.js                  # Configuração do TailwindCSS
├── postcss.config.js                   # Configuração do PostCSS
```

---
## 🧩 Componentes-Chave

### `HeroCarousel.jsx`
- Destaque visual da home  
- Navegação fluida e responsiva  
- Integração com dados dinâmicos  

### `MovieCard.jsx`
- Exibição de filmes/séries  
- Design adaptável e acessível  
- Botões de ação (favoritar, assistir, etc.)  

### `MovieForm.jsx`
- Formulário para adicionar/editar conteúdo  
- Validação de campos e UX clara  
- Feedback visual para erros  

---

## 🎥 Integração com a API TMDB

Este projeto utiliza a [The Movie Database (TMDB)](https://developer.themoviedb.org/docs) como fonte principal de dados para filmes e séries.  
A API fornece informações atualizadas e confiáveis, permitindo que a aplicação exiba conteúdos reais com imagens, descrições, avaliações e muito mais.


## 🧠 UX com Base nas 10 Heurísticas de Nielsen

Este projeto foi desenhado com base nas 10 heurísticas de usabilidade de Jakob Nielsen:

1. **Visibilidade do status do sistema**  
2. **Correspondência entre sistema e mundo real**  
3. **Controle e liberdade do usuário**  
4. **Consistência e padrões**  
5. **Prevenção de erros**  
6. **Reconhecimento em vez de memorização**  
7. **Flexibilidade e eficiência de uso**  
8. **Design estético e minimalista**  
9. **Ajuda para reconhecer e recuperar erros**  
10. **Ajuda e documentação**

> Cada componente foi avaliado e ajustado com base nessas heurísticas, garantindo uma experiência intuitiva, eficiente e agradável.

---

## 🔐 Segurança e Performance

- Uso de `.env` para variáveis sensíveis  
- Prevenção contra XSS e falhas comuns  
- Lazy loading e code-splitting para otimização  
- Imagens otimizadas e renderizações controladas  

---

## 📦 Scripts Disponíveis

```json
"scripts": {
  "dev": "vite",
  "build": "vite build",
  "lint": "eslint .",
  "preview": "vite preview"
}
```
## 📈 Próximos Passos

- Autenticação com Firebase ou OAuth  
- Sistema de recomendação inteligente  
- Modo escuro e preferências do usuário  
- Testes automatizados com Jest + React Testing Library  

---

## 👨‍💻 Sobre o Autor

**Renato Filho** — Desenvolvedor Frontend com foco em excelência, usabilidade e arquitetura limpa.  
Este projeto foi acelerado com IA (Copilot + Gemini), mas cada decisão técnica e visual foi tomada com base em experiência, pesquisa e domínio de boas práticas.

> Mesmo com IA, o domínio é meu.  
> A arquitetura foi pensada, não gerada.  
> O design foi alinhado, não improvisado.  
> O resultado é um projeto que une velocidade, qualidade e visão de produto.
