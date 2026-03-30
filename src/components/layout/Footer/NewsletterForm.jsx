import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faCheckCircle, faSpinner } from '@fortawesome/free-solid-svg-icons';

const NewsletterForm = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // 'idle', 'loading', 'success'

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email || status === 'loading') return;

    setStatus('loading');
    // Simula a experiência de API da Cresce Ai
    setTimeout(() => {
      setStatus('success');
      setEmail(''); // Limpa o campo
      setTimeout(() => setStatus('idle'), 4000); 
    }, 1500);
  };

  return (
    <div className="w-full flex flex-col items-center md:items-start">
      <h4 className="text-[10px] uppercase tracking-[4px] text-pr-cyan font-black mb-3 opacity-80 text-center md:text-left">
        Exclusive Insights
      </h4>
      <p className="text-sm text-pr-gray-light mb-6 text-center md:text-left max-w-xs">
        Receba novidades da <span className="text-white font-bold">Cresce Ai</span> e ofertas premium.
      </p>

      <form onSubmit={handleSubscribe} className="w-full flex flex-col sm:flex-row gap-3">
        <div className="relative flex-grow group">
          <input
            type="email"
            placeholder="Seu melhor e-mail"
            className="w-full px-5 py-3.5 bg-white/[0.03] border border-white/10 rounded-2xl text-white placeholder:text-white/20 focus:outline-none focus:border-pr-cyan/50 focus:bg-white/[0.07] transition-all duration-300 disabled:opacity-50"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={status === 'loading' || status === 'success'}
          />
        </div>

        <button
          type="submit"
          className={`relative px-8 py-3.5 rounded-2xl font-black uppercase tracking-[2px] text-[10px] transition-all duration-500 overflow-hidden min-w-[140px]
            ${status === 'success' 
              ? 'bg-green-500 text-white' 
              : 'bg-pr-cyan text-pr-black hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(0,242,254,0.2)] hover:shadow-[0_0_30px_rgba(0,242,254,0.4)]'
            }
            disabled:opacity-70 disabled:cursor-not-allowed`}
          disabled={status === 'loading' || status === 'success'}
        >
          <div className="flex items-center justify-center gap-2">
            {status === 'loading' && (
              <>
                <FontAwesomeIcon icon={faSpinner} className="animate-spin" />
                <span>Processando</span>
              </>
            )}
            {status === 'success' && (
              <>
                <FontAwesomeIcon icon={faCheckCircle} />
                <span>Inscrito</span>
              </>
            )}
            {status === 'idle' && (
              <>
                <span>Inscrever</span>
                <FontAwesomeIcon icon={faPaperPlane} className="text-[9px] opacity-50" />
              </>
            )}
          </div>
        </button>
      </form>
      
      {status === 'success' && (
        <p className="mt-3 text-[10px] text-green-400 animate-pulse uppercase tracking-widest font-bold">
          Bem-vindo ao ecossistema premium!
        </p>
      )}
    </div>
  );
};

export default NewsletterForm;