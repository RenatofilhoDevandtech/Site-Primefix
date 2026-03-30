import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Navigation, Pagination } from 'swiper/modules';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faInfoCircle, faPlus, faVolumeMute, faVolumeUp } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const HeroCarousel = ({ movies, onAddToList }) => {
  const navigate = useNavigate();
  const [isMuted, setIsMuted] = useState(true);

  if (!movies || movies.length === 0) return null;

  return (
    <section className="relative h-screen w-full bg-pr-black overflow-hidden group">
      <Swiper
        modules={[Autoplay, EffectFade, Navigation, Pagination]}
        effect="fade"
        speed={1000}
        loop={true}
        autoplay={{ delay: 8000, disableOnInteraction: false }}
        pagination={{ clickable: true, dynamicBullets: true }}
        navigation={{
          nextEl: '.swiper-button-next-custom',
          prevEl: '.swiper-button-prev-custom',
        }}
        className="h-full w-full"
      >
        {movies.slice(0, 6).map((movie) => (
          <SwiperSlide key={movie.id} className="relative">
            {/* Background Imersivo */}
            <div className="absolute inset-0">
              <img 
                src={movie.backdropUrl} 
                alt={movie.title}
                loading="eager"
                className="w-full h-full object-cover object-top transform scale-105 animate-slow-zoom"
              />
              {/* Overlays de Cinema */}
              <div className="absolute inset-0 bg-gradient-to-r from-pr-black via-pr-black/40 to-transparent z-10" />
              <div className="absolute inset-0 bg-gradient-to-t from-pr-black via-transparent to-transparent z-10" />
            </div>

            {/* Conteúdo do Filme */}
            <div className="relative z-20 h-full flex flex-col justify-center px-6 md:px-16 lg:px-24">
              <div className="max-w-4xl space-y-6 animate-fade-in-up">
                
                <div className="flex items-center gap-3">
                   <span className="bg-pr-cyan text-pr-black text-[10px] font-black px-2 py-1 rounded-sm uppercase tracking-tighter shadow-cyan-glow">
                     Destaque Primeflix
                   </span>
                   <span className="text-white/70 text-sm font-bold">
                     ⭐ {movie.vote_average?.toFixed(1)} Rating
                   </span>
                </div>

                <h2 className="text-5xl md:text-8xl font-black text-white uppercase tracking-tighter leading-[0.8] drop-shadow-2xl">
                  {movie.title}
                </h2>

                <p className="hidden md:block text-pr-gray-light text-lg md:text-xl max-w-2xl line-clamp-3 font-medium opacity-90">
                  {movie.overview}
                </p>

                {/* Botões de Ação */}
                <div className="flex items-center gap-4 pt-4">
                  <button 
                    onClick={() => navigate(`/movie/${movie.id}`)}
                    className="flex items-center gap-3 px-8 py-4 bg-white text-pr-black font-black rounded-xl hover:bg-pr-cyan transition-all duration-300 transform hover:scale-105 shadow-xl"
                  >
                    <FontAwesomeIcon icon={faPlay} />
                    ASSISTIR AGORA
                  </button>

                  <button 
                    onClick={() => navigate(`/movie/${movie.id}`)}
                    className="flex items-center gap-3 px-8 py-4 bg-black/40 text-white font-black rounded-xl backdrop-blur-md border border-white/20 hover:bg-white/10 transition-all duration-300"
                  >
                    <FontAwesomeIcon icon={faInfoCircle} />
                    DETALHES
                  </button>

                  <button 
                    onClick={() => onAddToList(movie)}
                    className="w-14 h-14 flex items-center justify-center rounded-full bg-white/10 text-white border border-white/20 hover:bg-pr-cyan hover:text-pr-black transition-all duration-500"
                  >
                    <FontAwesomeIcon icon={faPlus} size="lg" />
                  </button>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Controles Customizados (Aparecem no Hover) */}
      <div className="absolute bottom-10 right-10 z-30 flex items-center gap-6">
         {/* Mute Button */}
         <button 
           onClick={() => setIsMuted(!isMuted)}
           className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-pr-cyan hover:text-pr-black transition-all"
         >
           <FontAwesomeIcon icon={isMuted ? faVolumeMute : faVolumeUp} />
         </button>
      </div>

      {/* Estilização das Bullets do Swiper */}
      <style>{`
        .swiper-pagination-bullet { background: white !important; opacity: 0.3; width: 12px; height: 12px; }
        .swiper-pagination-bullet-active { background: #00F2FE !important; opacity: 1; width: 30px; border-radius: 6px; }
      `}</style>
    </section>
  );
};

export default HeroCarousel;