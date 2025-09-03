import PropTypes from 'prop-types';

const CardImage = ({ imageUrl, alt, isLoaded, hasError, onLoad, onError }) => {
  const errorImageUrl = 'https://placehold.co/500x750/1a1a1a/E1E1E6?text=Imagem+Indisponível';

  return (
    <>
      {/* Skeleton loader: só aparece se a imagem não estiver carregada E não houver erro. */}
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 bg-pr-border/10 animate-pulse rounded-lg"></div>
      )}
      
      {/* Imagem do filme */}
      <img
        // Se houver um erro, usamos a URL de erro, senão a URL normal.
        src={hasError ? errorImageUrl : imageUrl}
        alt={alt}
        className={`h-full w-full object-cover transition-all duration-500 ease-out group-hover:scale-110
                    ${isLoaded ? 'opacity-100' : 'opacity-0'}`} // Efeito de fade-in
        // A prop 'onLoad' do React dispara a nossa função quando a imagem é carregada.
        onLoad={onLoad}
        // A prop 'onError' do React dispara a nossa função se a imagem falhar ao carregar.
        onError={onError}
        // Otimização nativa do navegador para carregar imagens apenas quando estão perto de aparecer na tela.
        loading="lazy"
      />
    </>
  );
};

CardImage.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  isLoaded: PropTypes.bool.isRequired,
  hasError: PropTypes.bool.isRequired,
  onLoad: PropTypes.func.isRequired,
  onError: PropTypes.func.isRequired,
};

export default CardImage;