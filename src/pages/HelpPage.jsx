import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faPlayCircle, faPlus, 
  faChevronDown, faChevronUp, faEnvelope, faQuestionCircle 
} from '@fortawesome/free-solid-svg-icons';

const HelpPage = () => {
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    // pt-32 para compensar o Header fixo e manter a unidade visual
    <div className="min-h-screen bg-pr-black text-white pt-32 pb-20 selection:bg-pr-cyan selection:text-pr-black">
      <div className="max-w-4xl mx-auto px-6">
        
        {/* HEADER PADRONIZADO */}
        <header className="text-center mb-20">
          <div className="inline-block p-4 rounded-3xl bg-pr-cyan/5 border border-pr-cyan/10 mb-6">
            <FontAwesomeIcon icon={faQuestionCircle} className="text-pr-cyan text-5xl opacity-80" />
          </div>
          <h1 className="text-5xl font-black tracking-tighter uppercase">
            CENTRAL DE <span className="text-pr-cyan">AJUDA</span>
          </h1>
          <p className="text-pr-gray-light mt-4 uppercase text-xs font-bold tracking-[0.2em] opacity-60">
            Suporte técnico e guia de navegação Siteprime
          </p>
        </header>

        <div className="grid gap-12">
          
          {/* Seção: Como aproveitar */}
          <HelpSection title="EXPERIÊNCIA CINEMATOGRÁFICA" icon={faPlayCircle}>
            <p className="mb-8 opacity-80 leading-relaxed">
              Explore o catálogo global alimentado pela tecnologia TMDB. Cada título oferece uma experiência completa de metadados.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FeatureCard 
                icon={faPlayCircle} 
                title="PREVIEW OFICIAL" 
                desc="Assista trailers em alta definição antes de iniciar sua sessão." 
              />
              <FeatureCard 
                icon={faPlus} 
                title="LISTA EXCLUSIVA" 
                desc="Salve títulos instantaneamente na sua curadoria pessoal." 
              />
            </div>
          </HelpSection>

          {/* Seção: FAQ ESTILIZADA */}
          <section className="bg-pr-gray-dark/10 border border-white/5 p-10 rounded-[2.5rem] backdrop-blur-md">
            <h2 className="text-xl font-black text-white mb-8 uppercase tracking-widest flex items-center gap-3">
              <span className="text-pr-cyan text-sm">01.</span> DÚVIDAS FREQUENTES
            </h2>
            
            <div className="divide-y divide-white/5">
              <FaqItem 
                isOpen={openFaq === 0} 
                onClick={() => toggleFaq(0)}
                question="O SITEPRIME É UM SERVIÇO DE STREAMING?"
                answer="Somos uma plataforma de curadoria e gerenciamento de listas. Utilizamos a API do TMDB para fornecer trailers e informações, mas não hospedamos os arquivos de vídeo dos filmes."
              />
              <FaqItem 
                isOpen={openFaq === 1} 
                onClick={() => toggleFaq(1)}
                question="COMO FUNCIONA A SINCRONIZAÇÃO?"
                answer="Sua lista é salva localmente ou em sua conta, permitindo que você gerencie seu progresso e preferências em tempo real."
              />
            </div>
          </section>

          {/* Call to Action - Botão Arredondado Padrão */}
          <section className="text-center py-16 bg-pr-gray-dark/5 rounded-[3rem] border border-white/5 relative overflow-hidden">
            <div className="absolute inset-0 bg-pr-cyan/5 blur-3xl rounded-full -top-20" />
            <div className="relative z-10">
              <h2 className="text-2xl font-black mb-2 text-white uppercase tracking-tighter">AINDA PRECISA DE SUPORTE?</h2>
              <p className="text-pr-gray-light mb-10 text-sm uppercase tracking-widest opacity-60">Nossa equipe está disponível para contato direto.</p>
              <a
                href="/contact"
                className="inline-flex items-center gap-3 bg-pr-cyan text-pr-black font-black py-4 px-10 rounded-full hover:bg-white transition-all shadow-lg shadow-pr-cyan/20 uppercase tracking-tighter"
              >
                <FontAwesomeIcon icon={faEnvelope} />
                ENVIAR MENSAGEM
              </a>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

// Componentes Auxiliares Padronizados
const HelpSection = ({ title, icon, children }) => (
  <section className="bg-pr-gray-dark/10 border border-white/5 p-10 rounded-[2.5rem] backdrop-blur-md shadow-2xl">
    <h2 className="text-xl font-black text-white mb-8 uppercase tracking-widest flex items-center gap-3">
      <FontAwesomeIcon icon={icon} className="text-pr-cyan" /> {title}
    </h2>
    <div className="text-pr-gray-light leading-relaxed">
      {children}
    </div>
  </section>
);

const FeatureCard = ({ icon, title, desc }) => (
  <div className="bg-white/5 p-6 rounded-3xl hover:bg-white/10 transition-colors border border-white/5 group">
    <div className="flex items-center gap-3 mb-3">
      <FontAwesomeIcon icon={icon} className="text-pr-cyan group-hover:scale-110 transition-transform" />
      <h3 className="font-black text-white uppercase text-xs tracking-widest">{title}</h3>
    </div>
    <p className="text-[11px] text-pr-gray leading-relaxed font-bold uppercase opacity-60 tracking-wider">{desc}</p>
  </div>
);

const FaqItem = ({ question, answer, isOpen, onClick }) => (
  <div className="py-2">
    <button 
      onClick={onClick}
      className="w-full py-5 flex justify-between items-center text-left hover:text-pr-cyan transition-colors group"
    >
      <span className="font-black text-xs tracking-[0.15em] text-white/90 group-hover:text-pr-cyan transition-colors">{question}</span>
      <FontAwesomeIcon icon={isOpen ? faChevronUp : faChevronDown} className={`text-[10px] transition-transform ${isOpen ? 'text-pr-cyan' : 'opacity-30'}`} />
    </button>
    <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-40 pb-6' : 'max-h-0'}`}>
      <p className="text-sm text-pr-gray-light leading-relaxed font-medium">{answer}</p>
    </div>
  </div>
);

export default HelpPage;