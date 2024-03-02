/** @format */
// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faAngleDown } from '@fortawesome/free-solid-svg-icons';

// Importe sua imagem do logo
import logoImage from '../assets/Logo.png';

const Header = () => {
  const [showSubMenu, setShowSubMenu] = useState(false);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const videos = [
    { src: "https://www.youtube.com/embed/Fbb4e_Q6wR8", description: "Descrição do vídeo 1" },
    { src: "https://www.youtube.com/embed/MmfiqSJAou8", description: "Descrição do vídeo 2" },
    { src: "https://www.youtube.com/embed/Bv67rkuWoMg", description: "Descrição do vídeo 3" }
  ];

  const toggleSubMenu = () => {
    setShowSubMenu(!showSubMenu);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Lógica de pesquisa
    console.log('Pesquisando...');
  };

  const handleNextVideo = () => {
    setCurrentVideoIndex((prevIndex) => (prevIndex === videos.length - 1 ? 0 : prevIndex + 1));
  };

  const handlePreviousVideo = () => {
    setCurrentVideoIndex((prevIndex) => (prevIndex === 0 ? videos.length - 1 : prevIndex - 1));
  };

  return (
    <>
      <HeaderContainer>
        <Logo src={logoImage} alt="Logo" />
        <NavMenu>
          <NavItem onClick={toggleSubMenu}>
            Início <FontAwesomeIcon icon={faAngleDown} />
            {showSubMenu && (
              <SubMenu>
                <SubMenuItem>Início</SubMenuItem>
                <SubMenuItem>TV Ao Vivo</SubMenuItem>
                <SubMenuItem>Loja</SubMenuItem>
                <SubMenuItem>Categorias</SubMenuItem>
              </SubMenu>
            )}
          </NavItem>
        </NavMenu>
        <SearchForm onSubmit={handleFormSubmit}>
          <SearchInput type="text" placeholder="Pesquisar" />
          <SearchIcon icon={faSearch} />
        </SearchForm>
      </HeaderContainer>
      {/* Vídeo abaixo da header */}
      <VideoSection>
        <VideoContainer>
          <iframe
            width="100%"
            height="400px"
            src={videos[currentVideoIndex].src}
            title={`YouTube video player ${currentVideoIndex + 1}`}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
          
          <VideoDescription>
            {videos[currentVideoIndex].description}
            <ButtonMoreDetails>Mais Detalhes</ButtonMoreDetails>
          </VideoDescription>
        </VideoContainer>
        <VideoNavigation>
          <NavigationButton onClick={handlePreviousVideo}>Anterior</NavigationButton>
          <NavigationButton onClick={handleNextVideo}>Próximo</NavigationButton>
        </VideoNavigation>
      </VideoSection>
    </>
  );
};

// Estilos com styled-components
const HeaderContainer = styled.header`
  background-color: black;
  color: white;
  padding: 10px 20px;
  display: flex;
  align-items: center;
`;

const Logo = styled.img`
  max-width: 200px;
  height: auto;
`;

const NavMenu = styled.ul`
  display: flex;
  align-items: center;
  margin-left: auto;
`;

const NavItem = styled.li`
  cursor: pointer;
  margin-right: 20px;
  position: relative;
  font-family: 'Amazon Ember', Arial, sans-serif;
  font-weight: none;

  &:last-child {
    margin-right: 0;
  }

  &:hover {
    color: #d3d3d3;
  }

  svg {
    margin-left: 5px;
  }
`;

const SubMenu = styled.ul`
  position: absolute;
  top: calc(100% + 10px); /* Posiciona o submenu abaixo do item de menu */
  left: 0;
  background-color: #444;
  padding: 10px;
  border-radius: 5px;
  z-index: 1; /* Garante que o submenu esteja acima do conteúdo principal */
`;

const SubMenuItem = styled.li`
  cursor: pointer;
  padding: 5px 0;
  font-family: 'Amazon Ember', Arial, sans-serif;
  font-weight: none;

  &:hover {
    color: #d3d3d3;
  }
`;

const SearchForm = styled.form`
  display: flex;
  align-items: center;
  margin-left: 20px;
`;

const SearchInput = styled.input`
  height: 30px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 0.5rem;
  margin-right: 1rem;
  outline: none;
`;

const SearchIcon = styled(FontAwesomeIcon)`
  font-size: 1.2rem;
  color: #fff;
  cursor: pointer;
`;

// Estilos para a seção de vídeo
const VideoSection = styled.section`
  background-color: black;
  color: white;
  padding: 20px;
  position: relative;
`;

const VideoContainer = styled.div`
  position: relative;
`;

const VideoDescription = styled.div`
  position: absolute;
  bottom: 20px;
  right: 20px;
  background-color: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 20px;
  font-family: 'Amazon Ember', Arial, sans-serif;
`;

const ButtonMoreDetails = styled.button`
  background-color: #007bff; /* Cor azul semelhante à do Prime Video */
  color: #ffffff;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
`;

const VideoNavigation = styled.div`
  display: flex;
  justify-content: center;
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
`;

const NavigationButton = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  margin: 0 10px;
  border-radius: 4px;
  cursor: pointer;
`;

export default Header;
