const LoadingSkeleton = () => {
  // Array para simular as fileiras de filmes
  const rows = [...Array(3)]; 
  const cardsPerRow = [...Array(6)];

  return (
    <div className="min-h-screen bg-pr-black overflow-hidden">
      
      {/* 1. Hero Carousel Skeleton (O Banner Principal) */}
      <div className="relative h-[70vh] w-full bg-pr-gray-dark/20 overflow-hidden">
        {/* Efeito de Shimmer no Banner */}
        <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>
        
        {/* Simulação de conteúdo do Hero (Título e Botões) */}
        <div className="absolute bottom-20 left-8 md:left-16 space-y-4">
          <div className="h-12 w-64 md:w-96 bg-white/5 rounded-2xl"></div>
          <div className="h-6 w-48 md:w-64 bg-white/5 rounded-xl"></div>
          <div className="flex gap-4 pt-4">
            <div className="h-12 w-32 bg-pr-cyan/10 rounded-full border border-pr-cyan/20"></div>
            <div className="h-12 w-12 bg-white/5 rounded-full"></div>
          </div>
        </div>
      </div>
      
      {/* 2. Listas de Conteúdo (Fileiras) */}
      <div className="py-12 space-y-16">
        {rows.map((_, index) => (
          <div key={index} className="space-y-6">
            
            {/* Título da Categoria */}
            <div className="flex items-center gap-3 ml-8 md:ml-16">
              <div className="h-6 w-1 bg-pr-cyan rounded-full shadow-[0_0_10px_#00ffff]"></div>
              <div className="h-6 w-40 bg-white/5 rounded-lg"></div>
            </div>

            {/* Container de Cards */}
            <div className="flex gap-5 px-8 md:px-16 overflow-hidden">
              {cardsPerRow.map((_, cardIndex) => (
                <div 
                  key={cardIndex} 
                  className="relative flex-shrink-0 w-40 md:w-48 aspect-[2/3] bg-white/5 rounded-2xl border border-white/5 overflow-hidden"
                >
                  {/* Brilho Shimmer em cada Card */}
                  <div className="absolute inset-0 -translate-x-full animate-[shimmer_2.5s_infinite] bg-gradient-to-r from-transparent via-pr-cyan/5 to-transparent"></div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LoadingSkeleton;