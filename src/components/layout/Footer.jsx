import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPhone, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { linkColumns, socialLinks } from './Footer/footer.data';
import FooterLinkColumn from './Footer/FooterLinkColumn';
import NewsletterForm from './Footer/NewsletterForm';
import SocialLinks from './Footer/SocialLinks';
import BackToTopButton from './Footer/BackToTopButton';

// Importação da logo para manter a marca presente
import minhaLogo from '../../assets/Logo.png';

const Footer = () => {
  return (
    <footer className="bg-pr-black/90 text-pr-gray backdrop-blur-xl border-t border-white/5 mt-20 relative">
      <BackToTopButton />

      <div className="max-w-7xl mx-auto py-16 px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8">
          
          {/* 🚀 Coluna Principal: Cresce Ai & Newsletter */}
          <div className="lg:col-span-2 flex flex-col items-center md:items-start text-center md:text-left space-y-8">
            <div className="space-y-4">
              <img src={minhaLogo} alt="Cresce Ai" className="w-32 md:w-40 drop-shadow-[0_0_8px_rgba(0,242,254,0.3)] mx-auto md:mx-0" />
              <p className="text-pr-gray-light max-w-sm text-sm leading-relaxed">
                A convergência perfeita entre entretenimento de elite e estratégia de crescimento para sua empresa.
              </p>
            </div>
            
            <div className="w-full max-w-md">
              <NewsletterForm />
            </div>

            {/* SECÇÃO DE CONTATO - Refinada para Mobile */}
            <div className="w-full space-y-4 pt-6 border-t border-white/5 flex flex-col items-center md:items-start">
              <a href="mailto:contato@primeflix.com" className="flex items-center gap-3 hover:text-pr-cyan transition-all group">
                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-pr-cyan/20">
                  <FontAwesomeIcon icon={faEnvelope} className="text-pr-cyan text-xs" />
                </div>
                <span className="text-sm tracking-wide">contato@cresceai.com</span>
              </a>
              <a href="tel:+5511999999999" className="flex items-center gap-3 hover:text-pr-cyan transition-all group">
                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-pr-cyan/20">
                  <FontAwesomeIcon icon={faPhone} className="text-pr-cyan text-xs" />
                </div>
                <span className="text-sm tracking-wide">+55 (11) 9999-9999</span>
              </a>
              <div className="flex items-center gap-3 text-pr-gray-light">
                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center">
                  <FontAwesomeIcon icon={faMapMarkerAlt} className="text-pr-cyan text-xs" />
                </div>
                <span className="text-sm tracking-wide">São Paulo, Brasil</span>
              </div>
            </div>
          </div>

          {/* 🔗 Colunas de Links: No mobile ficam em 2 colunas para economizar espaço vertical */}
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-8 lg:contents">
            <div className="text-center md:text-left">
              <FooterLinkColumn title={linkColumns[0].title} links={linkColumns[0].links} />
            </div>
            <div className="text-center md:text-left">
              <FooterLinkColumn title={linkColumns[1].title} links={linkColumns[1].links} />
            </div>
          </div>
          
          {/* 📱 Redes Sociais e Legal */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-8">
            <FooterLinkColumn title={linkColumns[2].title} links={linkColumns[2].links} />
            <div className="pt-4">
              <SocialLinks links={socialLinks} />
            </div>
          </div>
        </div>
      </div>
      
      {/* 📜 Seção de Copyright */}
      <div className="bg-black/50 py-10 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
          <div>
            <p className="text-xs uppercase tracking-[2px] font-bold text-white/40">
              © {new Date().getFullYear()} <span className="text-pr-cyan">Cresce Ai</span> Entretenimento
            </p>
            <p className="text-[10px] text-pr-gray mt-1 uppercase tracking-widest">Premium Content Platform</p>
          </div>
          <p className="text-[10px] text-pr-gray/40 max-w-[200px] md:max-w-none">
            Projeto desenvolvido para portfólio de alta performance.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;