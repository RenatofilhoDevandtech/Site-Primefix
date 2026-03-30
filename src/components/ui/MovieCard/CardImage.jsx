import PropTypes from 'prop-types';

const CardImage = ({ imageUrl, alt, isLoaded, hasError, onLoad, onError }) => {
  const errorImageUrl = 'https://placehold.co/500x750/0F1115/00FFFF?text=SEM+POSTER';

  return (
    <div className="absolute inset-0 z-10 overflow-hidden">
      {/* SKELETON: Z-index 25 (Sempre no topo durante o loading) */}
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 z-25 bg-pr-gray-dark/40 backdrop-blur-sm flex items-center justify-center">
          <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-pr-cyan/10 to-transparent"></div>
        </div>
      )}
      
      {/* IMAGEM: Z-index 10 (Abaixo de todas as proteções) */}
      <img
        src={hasError ? errorImageUrl : imageUrl}
        alt={alt}
        onLoad={onLoad}
        onError={onError}
        loading="lazy"
        className={`h-full w-full object-cover transition-all duration-700 ease-out origin-center will-change-transform 
                   group-hover:scale-105
                   ${isLoaded ? 'opacity-100' : 'opacity-0 scale-95'}`} 
      />

      {/* GRADIENTE DE CONTRASTE FIXO: Z-index 15 (Protege a legibilidade básica) */}
      <div className="absolute inset-0 z-15 bg-gradient-to-t from-pr-black/80 via-transparent to-pr-black/20 opacity-100 pointer-events-none" />
    </div>
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