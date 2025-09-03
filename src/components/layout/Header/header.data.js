import { faUser, faCog, faBookmark, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

export const navLinks = [
  { label: 'Início', to: '/' },
  { label: 'Filmes', to: '/filmes' },
  { label: 'Séries', to: '/series' },
  { label: 'Minha Lista', to: '/my-list' },
];

export const profileLinks = [
    { label: 'Meu Perfil', to: '/profile', icon: faUser },
    { label: 'Configurações', to: '/settings', icon: faCog },
    { label: 'Minha Lista', to: '/my-list', icon: faBookmark },
];

export const profileActions = [
    { label: 'Sair', onClick: () => console.log('Logout!'), icon: faSignOutAlt },
];