import { faFacebookF, faTwitter, faInstagram, faYoutube, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';

export const linkColumns = [
  {
    title: 'Navegação',
    links: [
      { label: 'Início', to: '/' },
      { label: 'Filmes', to: '/filmes' },
      { label: 'Séries', to: '/series' },
      { label: 'Minha Lista', to: '/my-list' },
    ],
  },
  {
    title: 'Suporte',
    links: [
      { label: 'Central de Ajuda', to: '/help' },
      { label: 'Fale Conosco', to: '/contact' },
      { label: 'Status do Serviço', to: '/status' },
      { label: 'Dispositivos Compatíveis', to: '/devices' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Termos de Uso', to: '/terms' },
      { label: 'Política de Privacidade', to: '/privacy' },
      { label: 'Acessibilidade', to: '/accessibility' },
    ],
  },
];

export const socialLinks = [
  { label: 'Facebook', icon: faFacebookF, href: 'https://facebook.com' },
  { label: 'Twitter', icon: faTwitter, href: 'https://twitter.com' },
  { label: 'Instagram', icon: faInstagram, href: 'https://instagram.com' },
  { label: 'YouTube', icon: faYoutube, href: 'https://youtube.com' },
  { label: 'LinkedIn', icon: faLinkedinIn, href: 'https://linkedin.com' },
];