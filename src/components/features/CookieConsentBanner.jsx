/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCookieBite, faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import Button from '../ui/Button'; // Usando o nosso componente de botão consistente

const CookieConsentBanner = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  // Efeito para verificar se o consentimento já foi dado
  useEffect(() => {
    const consentGiven = localStorage.getItem('cookie_consent');
    if (!consentGiven) {
      const timer = setTimeout(() => setIsVisible(true), 2000); // Aparece após 2 segundos
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAcceptAll = () => {
    const consentData = {
      necessary: true,
      analytics: true,
      marketing: true,
      preferences: true,
      timestamp: new Date().toISOString()
    };
    localStorage.setItem('cookie_consent', JSON.stringify(consentData));
    setIsVisible(false);
  };
  
  const handleRejectAll = () => {
    const consentData = {
      necessary: true, // Cookies necessários são sempre aceites
      analytics: false,
      marketing: false,
      preferences: false,
      timestamp: new Date().toISOString()
    };
    localStorage.setItem('cookie_consent', JSON.stringify(consentData));
    setIsVisible(false);
  };


  if (!isVisible) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Preferências de Cookies"
      className={`fixed bottom-0 left-0 right-0 z-50 p-4 transition-transform duration-500 ease-in-out ${
        isVisible ? 'translate-y-0' : 'translate-y-full'
      }`}
    >
      <div className="max-w-4xl mx-auto bg-secondary/80 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl overflow-hidden">
        <div className="p-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <FontAwesomeIcon icon={faCookieBite} className="text-primary text-3xl flex-shrink-0" />
            <div className="flex-grow">
              <h2 className="text-lg font-bold text-text-light">O seu conforto, a sua privacidade</h2>
              <p className="text-sm text-text-muted mt-1">
                Usamos cookies para otimizar a sua experiência e analisar o tráfego. Você pode aceitar todos ou personalizar as suas preferências.
              </p>
            </div>
            {/* MELHORIA: Ações principais simplificadas para uma decisão rápida */}
            <div className="flex-shrink-0 flex items-center gap-3 w-full sm:w-auto">
              <Button variant="secondary" onClick={() => setIsExpanded(!isExpanded)} className="w-full sm:w-auto">
                Personalizar
                <FontAwesomeIcon icon={isExpanded ? faChevronUp : faChevronDown} className="ml-2 h-3 w-3" />
              </Button>
              <Button variant="primary" onClick={handleAcceptAll} className="w-full sm:w-auto">
                Aceitar
              </Button>
            </div>
          </div>
          
          {/* MELHORIA: Detalhes expansíveis para não sobrecarregar a UI inicial */}
          {isExpanded && (
            <div className="mt-6 border-t border-white/10 pt-6">
               <p className="text-sm text-text-muted mb-4">Rejeitar os cookies opcionais pode afetar a sua experiência. Os cookies essenciais não podem ser desativados.</p>
               <div className="flex flex-col sm:flex-row gap-3">
                 {/* As suas opções detalhadas de antes poderiam ir aqui */}
                 <Button variant="secondary" onClick={handleRejectAll} className="w-full sm:w-auto">
                    Rejeitar Opcionais
                 </Button>
                 {/* O botão "Salvar" só faria sentido se houvesse checkboxes aqui */}
               </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CookieConsentBanner;

