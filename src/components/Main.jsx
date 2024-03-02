/* eslint-disable react/prop-types */
// Importações necessárias
// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import styled from 'styled-components';

const Main = () => {
  const [selectedMovie, setSelectedMovie] = useState(null);

  const handleMovieSelect = (movie) => {
    setSelectedMovie(movie);
  };

  const handleCloseButtonClick = () => {
    setSelectedMovie(null);
  };

  const movies = [
    {
      id: 1,
      title: 'Dom',
      coverImage: 'https://apostiladecinema.com.br/wp-content/uploads/2021/05/dom-critica-serie-amazon-prime-video-poster.png',
      description: 'Uma história emocionante...',
      videoUrl: 'https://www.youtube.com/embed/5PP9bZYGA0o',
    },
    {
      id: 2,
      title: 'Creed',
      coverImage: 'https://th.bing.com/th/id/R.dcd2e15fdcfdbb6a54eeb1f532d2f0ca?rik=Phm2dNsQdqJN8g&riu=http%3a%2f%2fimg3.wikia.nocookie.net%2f__cb20130101153549%2fharrypotter%2fpt-br%2fimages%2f8%2f81%2fCapa_Harry_Potter_e_o_Prisioneiro_de_Azkaban_(filme).jpg&ehk=V0jLmilHoiDzAH5gGQ3hjoeqr%2brPAA59H0nWK8YKCkc%3d&risl=&pid=ImgRaw&r=0',
      description: 'Uma história emocionante...',
      videoUrl: 'https://www.youtube.com/embed/e02fwhC6DiQ',
    },
    {
      id: 3,
      title: 'Creed',
      coverImage: 'https://apostiladecinema.com.br/wp-content/uploads/2021/05/dom-critica-serie-amazon-prime-video-poster.png',
      description: 'Uma história emocionante...',
      videoUrl: 'https://www.youtube.com/embed/5PP9bZYGA0o',
    },
    {
      id: 4,
      title: 'Creed',
      coverImage: 'https://apostiladecinema.com.br/wp-content/uploads/2021/05/dom-critica-serie-amazon-prime-video-poster.png',
      description: 'Uma história emocionante...',
      videoUrl: 'https://www.youtube.com/embed/5PP9bZYGA0o',
    },
    {
      id: 5,
      title: 'Creed',
      coverImage: 'https://apostiladecinema.com.br/wp-content/uploads/2021/05/dom-critica-serie-amazon-prime-video-poster.png',
      description: 'Uma história emocionante...',
      videoUrl: 'https://www.youtube.com/embed/5PP9bZYGA0o',
    },
    {
      id: 6,
      title: 'Creed',
      coverImage: 'https://apostiladecinema.com.br/wp-content/uploads/2021/05/dom-critica-serie-amazon-prime-video-poster.png',
      description: 'Uma história emocionante...',
      videoUrl: 'https://www.youtube.com/embed/5PP9bZYGA0o',
    },
    {
      id: 7,
      title: 'Creed',
      coverImage: 'https://apostiladecinema.com.br/wp-content/uploads/2021/05/dom-critica-serie-amazon-prime-video-poster.png',
      description: 'Uma história emocionante...',
      videoUrl: 'https://www.youtube.com/embed/5PP9bZYGA0o',
    },
    {
      id: 8,
      title: 'Creed',
      coverImage: 'https://apostiladecinema.com.br/wp-content/uploads/2021/05/dom-critica-serie-amazon-prime-video-poster.png',
      description: 'Uma história emocionante...',
      videoUrl: 'https://www.youtube.com/embed/5PP9bZYGA0o',
    },
    {
      id: 9,
      title: 'Creed',
      coverImage: 'https://apostiladecinema.com.br/wp-content/uploads/2021/05/dom-critica-serie-amazon-prime-video-poster.png',
      description: 'Uma história emocionante...',
      videoUrl: 'https://www.youtube.com/embed/5PP9bZYGA0o',
    },
    {
      id: 10,
      title: 'Creed',
      coverImage: 'https://apostiladecinema.com.br/wp-content/uploads/2021/05/dom-critica-serie-amazon-prime-video-poster.png',
      description: 'Uma história emocionante...',
      videoUrl: 'https://www.youtube.com/embed/5PP9bZYGA0o',
    },
    {
      id: 11,
      title: 'Creed',
      coverImage: 'https://apostiladecinema.com.br/wp-content/uploads/2021/05/dom-critica-serie-amazon-prime-video-poster.png',
      description: 'Uma história emocionante...',
      videoUrl: 'https://www.youtube.com/embed/5PP9bZYGA0o',
    },
    {
      id: 12,
      title: 'Creed',
      coverImage: 'https://apostiladecinema.com.br/wp-content/uploads/2021/05/dom-critica-serie-amazon-prime-video-poster.png',
      description: 'Uma história emocionante...',
      videoUrl: 'https://www.youtube.com/embed/5PP9bZYGA0o',
    },
    // Lista de filmes
  ];

  const MovieCard = ({ movie }) => (
    <MovieContainer onClick={() => handleMovieSelect(movie)}>
      <MovieCover src={movie.coverImage} alt={movie.title} />
      <DescriptionOverlay>
        <MovieDescription>{movie.description}</MovieDescription>
      </DescriptionOverlay>
    </MovieContainer>
  );

  return (
    <MainContainer>
      <Header>Logo e navegação</Header>
      <MovieList>
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </MovieList>
      {selectedMovie && (
        <Modal>
          <ModalContent>
            <MovieCoverLarge src={selectedMovie.coverImage} alt={selectedMovie.title} />
            <MovieDetails>
              <MovieTitle>{selectedMovie.title}</MovieTitle>
              <MovieDescription>{selectedMovie.description}</MovieDescription>
              <VideoContainer>
                <iframe
                  width="400"
                  height="225"
                  src={selectedMovie.videoUrl}
                  title={selectedMovie.title}
                  allowFullScreen
                />
              </VideoContainer>
              <CloseButton onClick={handleCloseButtonClick}>Fechar</CloseButton>
            </MovieDetails>
          </ModalContent>
        </Modal>
      )}
      <Footer>Links e informações</Footer>
    </MainContainer>
  );
};

// Estilos com styled-components
const MainContainer = styled.div`
  background-color: #050505;
  color: #ffffff;
  padding: 20px;
`;

const Header = styled.header`
  background-color: #000000;
  color: #ffffff;
  padding: 10px;
`;

const MovieList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
`;

const MovieContainer = styled.div`
  position: relative;
  cursor: pointer;
`;

const MovieCover = styled.img`
 width: 100%;
  height: auto;
  transition: transform 0.2s ease;
  border-radius: 8px; /* Adicionando bordas arredondadas */

  &:hover {
    transform: scale(1.1);
  }
`;

const DescriptionOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: none;
  justify-content: center;
  align-items: center;
  opacity: 0;
  transition: opacity 0.3s ease;

  ${MovieContainer}:hover & {
    display: flex;
    opacity: 1;
  }
`;

const MovieDescription = styled.p`
  font-size: 14px;
  color: #ffffff;
  text-align: center;
  margin: 10px;
`;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background-color: #1c1c1c;
  padding: 20px;
  border-radius: 8px;
`;

const MovieCoverLarge = styled.img`
 width: 50%;
  height: auto;
  display: block;
  margin: 0 auto;
  border-radius: 8px; /* Adicionando bordas arredondadas */
`;

const MovieDetails = styled.div`
  margin-top: 20px;
  text-align: center;
`;

const MovieTitle = styled.h2`
  font-size: 20px;
  color: #ffffff;
  margin-bottom: 10px;
`;

const VideoContainer = styled.div`
  margin-top: 20px;
`;

const CloseButton = styled.button`
  background-color: #ffffff;
  color: #000000;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 20px;
`;

const Footer = styled.footer`
  background-color: #000000;
  color: #ffffff;
  padding: 10px;
`;

export default Main;
