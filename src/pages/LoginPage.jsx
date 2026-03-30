import { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faChevronRight, faChevronLeft, faArrowLeft,
  faCircleNotch, faCloudRain, faSun, faPlay, 
  faLocationDot, faCloud, faCircleInfo
} from '@fortawesome/free-solid-svg-icons';

// Assets e Hooks
import backgroundLogin from '../assets/background-login.png';
import minhaLogo from '../assets/Logo.png'; 
import { useAuth, useToast } from '../hooks';
import { useWeather } from '../hooks/useWeather';
import { tmdbService } from '../services/tmdbService';
import sectionData from '../data/homeSections.json';

// Componentes UI
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';

const LoginPage = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [topMovies, setTopMovies] = useState([]);
  const scrollRef = useRef(null);
  
  const { login } = useAuth();
  const { showToast } = useToast();
  const { condition, temp, city, loading: weatherLoading } = useWeather();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTopTen = async () => {
      try {
        const movies = await tmdbService.getTrendingMovies();
        setTopMovies(movies.slice(0, 10));
      } catch (err) {
        console.error("Erro ao carregar top 10", err);
      }
    };
    fetchTopTen();
  }, []);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  const getGreeting = () => {
    if (weatherLoading) return "Sincronizando satélites...";
    const cityName = city || 'sua cidade';
    if (condition === 'Chuva') return `Céu chorando em ${cityName}? Pipoca e filme sorrindo!`;
    if (condition === 'Limpo') return `Dia lindo em ${cityName}, mas o sofá é irresistível.`;
    return `O clima em ${cityName} está perfeito para dar o play.`;
  };

  const handleFinalLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const success = await login(email);
      if (success) {
        showToast(`Bem-vindo ao Universo Primeflix!`, 'success');
        navigate('/');
      } else {
        showToast('E-mail ou senha incorretos.', 'error');
      }
    } catch (error) {
      showToast('Erro de conexão.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#050505] font-sans selection:bg-pr-cyan overflow-x-hidden text-white">
      
      {/* SEÇÃO PRINCIPAL: LOGIN */}
      <section className="relative min-h-screen w-full flex flex-col items-center justify-center p-6 md:p-10">
        <div className="absolute inset-0 z-0">
          <img src={backgroundLogin} className="w-full h-full object-cover opacity-40" alt="background" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black" />
        </div>

        {/* Logo visível no Mobile */}
        <div className="relative z-30 lg:hidden mb-10 animate-in fade-in slide-in-from-top-4 duration-1000">
           <img src={minhaLogo} alt="Logo" className="w-40 drop-shadow-[0_0_15px_rgba(0,242,254,0.3)]" />
        </div>

        <main className="relative z-20 w-full max-w-[1150px] grid grid-cols-1 lg:grid-cols-12 gap-8 animate-in fade-in duration-1000">
          
          {/* LADO ESQUERDO: BENTO GRID */}
          <div className="lg:col-span-7 hidden lg:grid grid-cols-2 gap-4 content-center">
            <div className="col-span-2 mb-8">
              <img src={minhaLogo} alt="Logo" className="w-52 drop-shadow-[0_0_20px_rgba(0,242,254,0.3)]" />
            </div>

            <div className="bg-white/[0.03] backdrop-blur-md border border-white/10 p-8 rounded-[40px] flex flex-col justify-between min-h-[240px] hover:border-pr-cyan/30 transition-all shadow-2xl">
              <div className="flex justify-between items-start">
                <div className="w-14 h-14 rounded-2xl bg-pr-cyan/10 flex items-center justify-center border border-pr-cyan/20">
                  <FontAwesomeIcon icon={condition === 'Chuva' ? faCloudRain : (condition === 'Limpo' ? faSun : faCloud)} className="text-pr-cyan text-3xl" />
                </div>
                <div className="flex items-center gap-2 px-4 py-1.5 bg-pr-cyan/5 rounded-full border border-pr-cyan/20 animate-pulse">
                  <FontAwesomeIcon icon={faLocationDot} className="text-pr-cyan text-[10px]" />
                  <span className="text-white font-black text-[10px] uppercase tracking-[2px]">{weatherLoading ? 'Localizando...' : city}</span>
                </div>
              </div>
              <div>
                <h3 className="text-white font-black text-5xl tracking-tighter mb-2">{weatherLoading ? '--' : `${temp}°C`}</h3>
                <p className="text-pr-cyan text-[12px] font-black uppercase tracking-[1px] leading-relaxed max-w-[280px]">{getGreeting()}</p>
              </div>
            </div>

            <div className="bg-pr-cyan/5 border border-pr-cyan/10 p-8 rounded-[40px] flex flex-col justify-between min-h-[240px] hover:shadow-cyan-glow transition-all duration-500">
              <div className="w-12 h-12 rounded-full bg-pr-cyan flex items-center justify-center shadow-[0_0_20px_rgba(0,242,254,0.4)]">
                 <FontAwesomeIcon icon={faPlay} className="text-black text-sm" />
              </div>
              <div className="space-y-2">
                <h3 className="text-white font-black text-2xl tracking-tighter uppercase leading-none">Ultra HD 4K+</h3>
                <p className="text-white/30 text-[9px] font-black uppercase tracking-[3px]">Tecnologia imersiva Primeflix</p>
              </div>
            </div>
          </div>

          {/* LADO DIREITO: CARD DE ACESSO */}
          <div className="lg:col-span-5 flex items-center justify-center w-full">
            <div className="w-full bg-black/85 backdrop-blur-[50px] border border-white/10 p-7 md:p-12 rounded-[35px] md:rounded-[45px] shadow-[0_40px_80px_rgba(0,0,0,0.8)]">
              
              <div className="mb-6 bg-pr-cyan/10 border border-pr-cyan/20 p-4 rounded-2xl flex gap-3 items-start">
                <FontAwesomeIcon icon={faCircleInfo} className="text-pr-cyan mt-1" />
                <p className="text-[10px] text-white/70 leading-relaxed font-medium">
                  <span className="text-pr-cyan font-bold uppercase tracking-wider">Aviso:</span> Este projeto simula uma plataforma real. Os fluxos de pagamento são para testes de UX e não realizam cobranças.
                </p>
              </div>

              <header className="mb-8 text-center lg:text-left">
                <h1 className="text-3xl font-black text-white tracking-tighter uppercase">Entrar</h1>
                <div className="h-1.5 w-12 bg-pr-cyan mt-3 rounded-full mx-auto lg:mx-0 shadow-[0_0_10px_#00f2fe]" />
              </header>

              <form onSubmit={step === 1 ? (e) => { e.preventDefault(); setStep(2); } : handleFinalLogin} className="space-y-5">
                {step === 1 ? (
                  <div className="space-y-5 animate-in slide-in-from-right-6 duration-500">
                    <Input type="email" placeholder="Seu e-mail" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    <Button type="submit" className="w-full h-14 md:h-16 bg-pr-cyan text-black font-black uppercase tracking-[3px] md:tracking-[4px] text-[10px] md:text-[11px] rounded-2xl transition-transform active:scale-95 shadow-cyan-glow">
                      Próximo
                    </Button>
                    
                    <Link to="/subscribe" className="block">
                      <button type="button" className="w-full h-12 md:h-14 border border-white/10 hover:bg-white/5 text-white/70 font-bold uppercase tracking-[2px] text-[9px] md:text-[10px] rounded-2xl transition-all">
                        Criar Conta Free
                      </button>
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-5 animate-in slide-in-from-right-6 duration-500">
                    <button type="button" onClick={() => setStep(1)} className="text-white/40 text-[9px] md:text-[10px] font-black uppercase flex items-center gap-2 hover:text-white transition-colors">
                      <FontAwesomeIcon icon={faArrowLeft} /> {email}
                    </button>
                    <Input type="password" placeholder="Sua senha" value={password} onChange={(e) => setPassword(e.target.value)} autoFocus required />
                    <Button type="submit" disabled={isLoading} className="w-full h-14 md:h-16 bg-pr-cyan text-black font-black uppercase tracking-[3px] md:tracking-[4px] text-[10px] md:text-[11px] rounded-2xl shadow-cyan-glow">
                      {isLoading ? <FontAwesomeIcon icon={faCircleNotch} className="animate-spin text-lg" /> : "Acessar Universo"}
                    </Button>
                  </div>
                )}
              </form>

              <footer className="mt-8 md:mt-10 pt-6 md:pt-8 border-t border-white/5 text-center lg:text-left">
                <p className="text-white/40 text-[10px] md:text-xs font-medium">
                  Novo por aqui? 
                  <Link to="/subscribe" className="text-pr-cyan font-black ml-2 uppercase tracking-tight hover:underline">
                    Assine o Primeflix
                  </Link>
                </p>
              </footer>
            </div>
          </div>
        </main>
      </section>

      {/* SEÇÃO DESTAQUE MKT */}
      <section className="max-w-[1200px] mx-auto px-6 py-12 md:py-20 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center border-t border-white/5">
        <div className="relative group overflow-hidden rounded-[30px] md:rounded-[40px]">
          <img src={sectionData.featuredSection.image} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="Feature" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
          <div className="absolute bottom-4 right-4 md:bottom-6 md:right-6 bg-pr-cyan text-black px-4 py-2 md:px-6 md:py-3 rounded-xl md:rounded-2xl font-black text-[10px] md:text-xs uppercase tracking-widest">{sectionData.featuredSection.price}</div>
        </div>
        <div className="space-y-4 md:space-y-6 text-center md:text-left">
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase leading-none">{sectionData.featuredSection.title}</h2>
          <p className="text-white/50 text-base md:text-lg leading-relaxed">{sectionData.featuredSection.description}</p>
        </div>
      </section>

      {/* BLOCO TOP 10 E CARDS */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src={backgroundLogin} className="w-full h-full object-cover opacity-40" alt="background-bottom" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black" />
        </div>

        <div className="relative z-10">
          {/* CARROSSEL TOP 10 */}
          <section className="py-12 md:py-20 pl-6 md:pl-20 relative">
            <div className="flex items-center justify-between mb-8 pr-6 md:pr-20">
              <h2 className="text-2xl font-black uppercase tracking-tighter">Top 10 Global</h2>
              <div className="hidden md:flex gap-2">
                <button onClick={() => scroll('left')} className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-pr-cyan hover:border-pr-cyan hover:text-black transition-all">
                  <FontAwesomeIcon icon={faChevronLeft} />
                </button>
                <button onClick={() => scroll('right')} className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-pr-cyan hover:border-pr-cyan hover:text-black transition-all">
                  <FontAwesomeIcon icon={faChevronRight} />
                </button>
              </div>
            </div>
            
            <div ref={scrollRef} className="flex gap-4 md:gap-6 overflow-x-auto scrollbar-hide snap-x pr-10">
              {topMovies.map((movie, index) => (
                <div 
                  key={movie.id} 
                  className="relative flex-none w-[150px] md:w-[200px] snap-start group/item animate-fade-in transition-all duration-500 hover:-translate-y-2"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <span className="absolute -left-5 md:-left-6 bottom-[-5px] md:bottom-[-10px] text-[90px] md:text-[130px] font-black leading-none z-10 select-none transition-transform group-hover/item:scale-110" 
                        style={{ WebkitTextStroke: '1.5px #00f2fe', color: 'transparent' }}>
                    {index + 1}
                  </span>
                  <div className="ml-7 md:ml-8 overflow-hidden rounded-xl border border-white/10 group-hover/item:border-pr-cyan/50 group-hover/item:shadow-cyan-glow transition-all duration-500">
                    <img src={movie.coverUrl} className="w-full h-full object-cover transition-transform duration-700 group-hover/item:scale-110" alt={movie.title} />
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* PROMO CARDS */}
          <section className="max-w-[1200px] mx-auto px-6 py-12 md:py-20 grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {sectionData.promoCards.map((card, index) => (
              <div 
                key={card.id} 
                className="group relative aspect-[3/4] rounded-[24px] md:rounded-[32px] overflow-hidden border border-white/5 hover:border-pr-cyan/40 transition-all duration-700 hover:-translate-y-3 hover:shadow-cyan-glow animate-fade-in"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <img src={card.image} className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-all duration-700 group-hover:scale-110" alt={card.title} />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                <div className="absolute bottom-5 left-5 right-5 md:bottom-8 md:left-6 md:right-6">
                    <h3 className="text-base md:text-xl font-black uppercase tracking-tighter leading-tight group-hover:text-pr-cyan transition-colors">{card.title}</h3>
                    <p className="text-pr-cyan text-[8px] md:text-[10px] font-black mt-2 tracking-[2px] md:tracking-[3px] opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all uppercase">{card.subtitle}</p>
                </div>
              </div>
            ))}
          </section>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="max-w-[1200px] mx-auto px-6 py-12 md:py-20 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-8 md:gap-10">
        <div className="text-center md:text-left">
          <img src={minhaLogo} className="w-24 md:w-32 opacity-40 mx-auto md:mx-0 grayscale hover:grayscale-0 transition-all cursor-pointer" alt="Logo Footer" />
          <p className="text-white/20 text-[8px] mt-4 font-black uppercase tracking-[3px] md:tracking-[5px]">Plataforma Segura & Criptografada</p>
        </div>

        <div className="flex flex-col items-center md:items-end group">
          <span className="text-white/30 text-[8px] font-black uppercase tracking-[2px] mb-1">Marketing Desenvolvido por</span>
          <h4 className="text-white font-black text-xl md:text-2xl group-hover:text-pr-cyan transition-colors duration-500 uppercase tracking-widest">Renato Filho</h4>
          <p className="text-white/40 text-[9px] font-bold uppercase tracking-[1.5px]">Fullstack <span className="text-pr-cyan mx-1">|</span> By Cresce AI</p>
        </div>
      </footer>
    </div>
  );
};

export default LoginPage;