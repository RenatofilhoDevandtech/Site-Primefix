import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCookieBite, faChevronDown, faChevronUp, faShieldHalved } from '@fortawesome/free-solid-svg-icons';
import Button from '../ui/Button'; 

const CookieConsentBanner = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const consentGiven = localStorage.getItem('cookie_consent');
    if (!consentGiven) {
      const timer = setTimeout(() => setIsVisible(true), 1500); 
      return () => clearTimeout(timer);
    }
  }, []);

  const saveConsent = (data) => {
    localStorage.setItem('cookie_consent', JSON.stringify({
      ...data,
      timestamp: new Date().toISOString()
    }));
    setIsVisible(false);
  };

  const handleAcceptAll = () => {
    saveConsent({ necessary: true, analytics: true, marketing: true, preferences: true });
  };
  
  const handleRejectAll = () => {
    saveConsent({ necessary: true, analytics: false, marketing: false, preferences: false });
  };

  if (!isVisible) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      className="fixed bottom-0 md:bottom-6 left-0 right-0 z-[100] px-0 md:px-4 animate-in slide-in-from-bottom duration-700"
    >
      <div className="max-w-5xl mx-auto bg-black/90 md:bg-pr-black/80 backdrop-blur-3xl border-t md:border border-white/10 md:rounded-[40px] shadow-[0_-20px_80px_rgba(0,0,0,0.8)] overflow-hidden">
        <div className="p-6 md:p-10">
          <div className="flex flex-col lg:flex-row items-center lg:items-center gap-6 md:gap-8">
            
            {/* Ícone Estilizado - Escondido em telas muito pequenas para focar no texto */}
            <div className="hidden sm:flex w-14 h-14 rounded-3xl bg-pr-cyan/10 items-center justify-center flex-shrink-0 border border-pr-cyan/20">
              <FontAwesomeIcon icon={faCookieBite} className="text-pr-cyan text-2xl drop-shadow-[0_0_8px_rgba(0,242,254,0.5)]" />
            </div>

            <div className="flex-grow text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-start gap-2 mb-2">
                 <h2 className="text-[9px] md:text-[11px] uppercase tracking-[4px] text-pr-cyan font-black opacity-80">
                  Privacidade & Dados
                </h2>
                <div className="h-[1px] w-8 bg-pr-cyan/30 hidden md:block"></div>
              </div>
              <h3 className="text-base md:text-xl font-light text-white tracking-tight leading-snug">
                Para a <span className="font-bold">Cresce Ai</span> brilhar, precisamos de cookies. <br className="hidden md:block" />
                <span className="text-white/40 text-sm md:text-lg italic">Sua experiência é nossa prioridade.</span>
              </h3>
            </div>

            {/* Ações Rápidas - Empilhadas no Mobile, Lado a Lado no Desktop */}
            <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto">
              <button 
                onClick={() => setIsExpanded(!isExpanded)}
                className="order-3 sm:order-1 text-[10px] uppercase tracking-[2px] text-white/30 hover:text-pr-cyan transition-all py-2"
              >
                {isExpanded ? 'Ver menos' : 'Personalizar'}
                <FontAwesomeIcon icon={isExpanded ? faChevronUp : faChevronDown} className="ml-2 opacity-50" />
              </button>
              
              <Button 
                variant="secondary" 
                onClick={handleRejectAll}
                className="order-2 sm:order-2 w-full sm:w-auto text-[10px] uppercase tracking-[2px] border-white/5 bg-white/5 hover:bg-white/10 px-6 h-12 rounded-2xl md:rounded-full"
              >
                Apenas Essenciais
              </Button>

              <Button 
                variant="primary" 
                onClick={handleAcceptAll}
                className="order-1 sm:order-3 w-full sm:w-auto text-[10px] uppercase tracking-[2px] bg-pr-cyan text-pr-black font-black px-10 h-12 rounded-2xl md:rounded-full shadow-[0_0_30px_rgba(0,242,254,0.3)] active:scale-95 transition-transform"
              >
                Aceitar Experiência
              </Button>
            </div>
          </div>
          
          {/* Detalhes Expansíveis - Melhor legibilidade no mobile */}
          {isExpanded && (
            <div className="mt-8 pt-8 border-t border-white/5 grid grid-cols-1 md:grid-cols-3 gap-8 animate-in fade-in slide-in-from-top-4 duration-500">
                <div className="space-y-3">
                   <div className="flex items-center gap-2">
                     <div className="w-1.5 h-1.5 rounded-full bg-pr-cyan"></div>
                     <h4 className="text-xs text-white font-bold tracking-widest uppercase">Essenciais</h4>
                   </div>
                   <p className="text-[11px] text-white/50 leading-relaxed">Garantem que você possa logar e acessar seus filmes com segurança total.</p>
                </div>
                <div className="space-y-3">
                   <div className="flex items-center gap-2">
                     <div className="w-1.5 h-1.5 rounded-full bg-white/30"></div>
                     <h4 className="text-xs text-white font-bold tracking-widest uppercase">Analytics</h4>
                   </div>
                   <p className="text-[11px] text-white/50 leading-relaxed">Nos ajuda a entender quais conteúdos a comunidade da Cresce Ai mais ama.</p>
                </div>
                <div className="flex items-center justify-center md:justify-end">
                   <div className="flex items-center gap-3 px-4 py-2 bg-white/5 rounded-xl border border-white/5 text-[10px] text-pr-cyan uppercase tracking-[2px] font-bold">
                     <FontAwesomeIcon icon={faShieldHalved} className="animate-pulse" />
                     <span>Secure Cloud</span>
                   </div>
                </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CookieConsentBanner;