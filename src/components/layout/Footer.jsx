import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPhone, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { linkColumns, socialLinks } from './Footer/footer.data';
import FooterLinkColumn from './Footer/FooterLinkColumn';
import NewsletterForm from './Footer/NewsletterForm';
import SocialLinks from './Footer/SocialLinks';
import BackToTopButton from './Footer/BackToTopButton';

const Footer = () => {
  return (
    <footer className="bg-pr-gray-dark/80 text-pr-gray backdrop-blur-lg border-t border-pr-border mt-16 relative">
      <BackToTopButton />

      <div className="max-w-7xl mx-auto py-12 px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
        {/* Coluna Principal */}
        <div className="lg:col-span-2 space-y-6">
          <div>
            <h3 className="text-2xl font-bold text-pr-cyan mb-4">PRIMEFLIX</h3>
            <p className="text-pr-gray-light max-w-md">
              A melhor plataforma de streaming com conteúdo exclusivo e qualidade premium.
            </p>
          </div>
          <NewsletterForm />
          {/* SECÇÃO DE CONTATO ADICIONADA AQUI */}
          <div className="space-y-2 pt-4 border-t border-pr-border/20">
             <div className="flex items-center gap-2 hover:text-pr-cyan transition-colors">
               <FontAwesomeIcon icon={faEnvelope} className="text-pr-cyan" />
               <span>contato@primeflix.com</span>
             </div>
             <div className="flex items-center gap-2 hover:text-pr-cyan transition-colors">
               <FontAwesomeIcon icon={faPhone} className="text-pr-cyan" />
               <span>+55 (11) 9999-9999</span>
             </div>
             <div className="flex items-center gap-2 hover:text-pr-cyan transition-colors">
               <FontAwesomeIcon icon={faMapMarkerAlt} className="text-pr-cyan" />
               <span>São Paulo, Brasil</span>
             </div>
           </div>
        </div>

        {/* Colunas de Links Dinâmicas */}
        <FooterLinkColumn title={linkColumns[0].title} links={linkColumns[0].links} />
        <FooterLinkColumn title={linkColumns[1].title} links={linkColumns[1].links} />
        
        {/* Coluna Legal e Redes Sociais */}
        <div>
          <FooterLinkColumn title={linkColumns[2].title} links={linkColumns[2].links} />
          <div className="mt-8">
            <SocialLinks links={socialLinks} />
          </div>
        </div>
      </div>
      
      {/* Seção de Copyright */}
      <div className="max-w-7xl mx-auto text-center mt-8 border-t border-pr-border pt-8 pb-8 px-6">
        <p className="text-sm">© {new Date().getFullYear()} Primeflix. Todos os direitos reservados.</p>
        <p className="text-xs text-pr-gray mt-2">Este é um projeto fictício para fins de portfólio.</p>
      </div>
    </footer>
  );
};

export default Footer;