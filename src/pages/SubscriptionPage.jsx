import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faCheck, faCrown, faGem, faArrowLeft, 
  faCircleNotch, faCheckCircle, faQrcode, faShieldHeart, 
  faUserPlus, faStar, faLocationDot,
  faCloudRain, faSun, faCloud
} from '@fortawesome/free-solid-svg-icons';

import backgroundLogin from '../assets/background-login.png'; 
import minhaLogo from '../assets/Logo.png'; 

import { useAuth, useToast } from '../hooks';
import { useWeather } from '../hooks/useWeather';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';

const plans = [
  { 
    id: 'free', 
    name: 'Experience', 
    price: '0,00', 
    icon: faStar, 
    features: ['Qualidade SD', '1 Tela', 'Com Anúncios'],
    cta: 'Começar Agora'
  },
  { 
    id: 'premium', 
    name: 'Ultra Premium', 
    price: '59,90', 
    icon: faCrown, 
    features: ['4K + HDR Ultra', '4 Telas', 'Sem Anúncios'], 
    recommended: true,
    cta: 'Selecionar Ultra'
  },
  { 
    id: 'family', 
    name: 'Família', 
    price: '89,90', 
    icon: faGem, 
    features: ['Tudo do Ultra', '6 Telas', 'Suporte VIP'],
    cta: 'Selecionar Família'
  },
];

const SubscriptionPage = () => {
  const { user } = useAuth(); // Assume que retorna { user, login, register }
  const { condition, temp, city, loading } = useWeather();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [step, setStep] = useState(1); 
  const [selectedPlan, setSelectedPlan] = useState(plans[1]);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [isLoading, setIsLoading] = useState(false);

  // Determina o tipo de plano selecionado
  const isFree = selectedPlan.id === 'free';

  // Configuração dinâmica das etapas (Steppers) baseada no estado do usuário
  const stepsLabels = user 
    ? ["Planos", isFree ? "Concluir" : "Pagamento"] 
    : ["Planos", "Conta", isFree ? "Concluir" : "Pagamento"];

  const handlePlanSelection = (plan) => {
    setSelectedPlan(plan);
    const planIsFree = plan.id === 'free';

    if (user) {
      // FLUXO LOGADO: Free -> Sucesso | Pago -> Pagamento
      planIsFree ? setStep(4) : setStep(3);
    } else {
      // FLUXO DESLOGADO: Sempre vai para criação de conta primeiro
      setStep(2);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBack = () => {
    if (step === 1) {
      navigate(-1); // Volta para onde o usuário estava antes de entrar em planos
    } else if (step === 3 && user) {
      setStep(1); // Se logado, volta do pagamento direto para planos (pula conta)
    } else {
      setStep(prev => prev - 1);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const processAction = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Simulação de delay de processamento ou chamada de API
      await new Promise(resolve => setTimeout(resolve, 2000));

      if (step === 2) {
        // LÓGICA DE CRIAÇÃO DE CONTA:
        // Após registrar com sucesso, o fluxo decide o próximo passo
        if (isFree) {
          setStep(4); // Se escolheu free, vai para sucesso
          showToast("Conta criada! Bem-vindo ao plano Experience.", "success");
        } else {
          setStep(3); // Se escolheu pago, vai para pagamento
          showToast("Conta criada! Configure seu pagamento.", "info");
        }
      } else if (step === 3) {
        // LÓGICA DE PAGAMENTO:
        setStep(4);
        showToast("Assinatura confirmada! Aproveite.", "success");
      }
    } catch (error) {
      showToast("Ocorreu um erro. Tente novamente.", "error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white relative py-8 px-4 overflow-x-hidden selection:bg-pr-cyan font-sans uppercase">
      
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <img src={backgroundLogin} className="w-full h-full object-cover opacity-20 pointer-events-none" alt="" />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
      </div>

      <main className="relative z-10 max-w-6xl mx-auto">
        
        {/* BENTO HEADER */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-12 items-center">
          <div className="md:col-span-8 flex flex-col items-center md:items-start">
            <img src={minhaLogo} alt="Logo" className="w-32 mb-6 drop-shadow-[0_0_15px_rgba(0,242,254,0.3)]" />
            <nav className="flex items-center gap-4">
              {stepsLabels.map((label, idx) => {
                // Lógica visual para manter o stepper correto mesmo pulando a etapa de conta
                const isActive = step >= (user && idx === 1 ? 3 : idx + 1);
                return (
                  <div key={label} className="flex items-center gap-3">
                    <span className={`text-[10px] font-black tracking-[2px] transition-colors ${isActive ? 'text-pr-cyan' : 'text-white/20'}`}>
                      0{idx + 1}. {label}
                    </span>
                    {idx < stepsLabels.length - 1 && <div className={`w-4 h-[1px] ${isActive ? 'bg-pr-cyan' : 'bg-white/10'}`} />}
                  </div>
                );
              })}
            </nav>
          </div>

          <div className="md:col-span-4 bg-white/5 backdrop-blur-xl border border-white/10 p-4 rounded-[24px] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <FontAwesomeIcon 
                icon={condition === 'Chuva' ? faCloudRain : (condition === 'Limpo' ? faSun : faCloud)} 
                className="text-pr-cyan text-xl" 
              />
              <div className="flex flex-col">
                <span className="text-white font-black text-sm">{loading ? '--' : `${temp}°C`}</span>
                <span className="text-white/30 text-[8px] font-bold tracking-widest uppercase">
                  <FontAwesomeIcon icon={faLocationDot} className="text-[7px]" /> {city || 'Brasil'}
                </span>
              </div>
            </div>
            <p className="text-pr-cyan text-[8px] font-black uppercase text-right leading-tight">
              {isFree ? 'Teste sem limites' : 'O melhor conteúdo'}
            </p>
          </div>
        </div>

        {/* --- STEP 1: PLANOS --- */}
        {step === 1 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in zoom-in-95 duration-500">
            {plans.map((plan) => (
              <div 
                key={plan.id} 
                onClick={() => setSelectedPlan(plan)}
                className={`relative p-8 rounded-[40px] border cursor-pointer transition-all duration-500 flex flex-col justify-between ${
                  selectedPlan.id === plan.id 
                  ? 'border-pr-cyan bg-white/[0.04] shadow-[0_0_40px_rgba(0,242,254,0.1)] md:scale-105' 
                  : 'border-white/5 bg-white/[0.01] hover:border-white/10'
                }`}
              >
                {plan.recommended && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-pr-cyan text-black text-[9px] font-black px-4 py-1.5 rounded-full tracking-widest">Recomendado</div>
                )}
                <div>
                  <div className={`w-12 h-12 rounded-2xl mb-6 flex items-center justify-center text-xl transition-all ${selectedPlan.id === plan.id ? 'bg-pr-cyan text-black' : 'bg-white/5 text-pr-cyan'}`}>
                    <FontAwesomeIcon icon={plan.icon} />
                  </div>
                  <h3 className="text-xl font-black mb-1">{plan.name}</h3>
                  <div className="text-4xl font-black mb-6 text-pr-cyan font-mono">
                    {plan.price === '0,00' ? 'GRÁTIS' : `R$ ${plan.price}`}
                  </div>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map(f => (
                      <li key={f} className="flex items-center gap-3 text-white/50 text-[10px] font-bold tracking-widest">
                        <FontAwesomeIcon icon={faCheck} className="text-pr-cyan" /> {f}
                      </li>
                    ))}
                  </ul>
                </div>
                <Button onClick={() => handlePlanSelection(plan)} className={`w-full py-5 rounded-2xl font-black tracking-[3px] text-[10px] ${selectedPlan.id === plan.id ? 'bg-pr-cyan text-black' : 'bg-white/5 text-white'}`}>
                  {plan.cta}
                </Button>
              </div>
            ))}
          </div>
        )}

        {/* --- STEP 2: CADASTRO --- */}
        {step === 2 && (
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-6 animate-in slide-in-from-right-10">
            <div className="md:col-span-5 bg-white/[0.02] border border-white/5 p-10 rounded-[40px] flex flex-col justify-center">
               <FontAwesomeIcon icon={faUserPlus} className="text-pr-cyan text-4xl mb-6" />
               <h2 className="text-3xl font-black leading-none">Crie sua conta.</h2>
               <p className="text-white/40 text-[10px] font-bold tracking-widest mt-4">
                 {isFree ? 'Acesso gratuito em 1 minuto.' : `Quase lá para ser ${selectedPlan.name}.`}
               </p>
            </div>
            <form onSubmit={processAction} className="md:col-span-7 bg-[#0c0d10] p-10 rounded-[40px] border border-white/10 space-y-4">
              <Input placeholder="E-mail" className="h-16 bg-white/5 rounded-2xl" required />
              <Input type="password" placeholder="Senha" className="h-16 bg-white/5 rounded-2xl" required />
              <Button type="submit" disabled={isLoading} className="w-full bg-pr-cyan text-black font-black py-5 rounded-2xl tracking-[3px] text-[10px] shadow-lg shadow-pr-cyan/20">
                {isLoading ? <FontAwesomeIcon icon={faCircleNotch} className="animate-spin" /> : (isFree ? "Concluir Grátis" : "Próximo: Pagamento")}
              </Button>
            </form>
          </div>
        )}

        {/* --- STEP 3: PAGAMENTO --- */}
        {step === 3 && (
          <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 animate-in slide-in-from-bottom-10">
            <div className="lg:col-span-5 space-y-4">
              <div className="bg-pr-cyan/5 border border-pr-cyan/20 p-8 rounded-[40px] border-l-4 border-l-pr-cyan">
                <p className="text-[10px] font-black text-pr-cyan mb-2 tracking-[3px]">Resumo</p>
                <h4 className="text-2xl font-black">{selectedPlan.name}</h4>
                <div className="text-4xl font-black mt-2 font-mono">R$ {selectedPlan.price}</div>
              </div>
              <div className="bg-white/5 p-6 rounded-[30px] flex items-center gap-4 border border-white/10">
                <FontAwesomeIcon icon={faShieldHeart} className="text-pr-cyan text-2xl" />
                <p className="text-[9px] font-black text-white/30 tracking-[2px]">Pagamento Seguro.</p>
              </div>
            </div>
            <div className="lg:col-span-7 bg-[#0c0d10] p-10 rounded-[40px] border border-white/10">
              <div className="flex gap-2 mb-8 bg-white/5 p-1 rounded-2xl">
                <button onClick={() => setPaymentMethod('card')} className={`flex-1 py-4 rounded-xl text-[9px] font-black tracking-widest transition-all ${paymentMethod === 'card' ? 'bg-pr-cyan text-black shadow-lg' : 'text-white/20'}`}>CARTÃO</button>
                <button onClick={() => setPaymentMethod('pix')} className={`flex-1 py-4 rounded-xl text-[9px] font-black tracking-widest transition-all ${paymentMethod === 'pix' ? 'bg-pr-cyan text-black shadow-lg' : 'text-white/20'}`}>PIX</button>
              </div>
              {paymentMethod === 'card' ? (
                <form onSubmit={processAction} className="space-y-4">
                  <Input placeholder="Número do Cartão" className="h-14 bg-white/5 rounded-xl" required />
                  <div className="grid grid-cols-2 gap-4">
                    <Input placeholder="MM/AA" className="h-14 bg-white/5 rounded-xl text-center" required />
                    <Input placeholder="CVV" className="h-14 bg-white/5 rounded-xl text-center" required />
                  </div>
                  <Button type="submit" disabled={isLoading} className="w-full bg-pr-cyan text-black font-black py-5 rounded-2xl text-[10px] tracking-[3px] mt-4 shadow-xl shadow-pr-cyan/20">
                    {isLoading ? <FontAwesomeIcon icon={faCircleNotch} className="animate-spin" /> : "Finalizar Assinatura"}
                  </Button>
                </form>
              ) : (
                <div className="text-center py-6">
                  <div className="w-40 h-40 bg-white p-4 mx-auto rounded-3xl mb-6 flex items-center justify-center">
                    <FontAwesomeIcon icon={faQrcode} className="text-black text-7xl" />
                  </div>
                  <Button onClick={processAction} className="w-full bg-pr-cyan text-black font-black py-5 rounded-2xl text-[10px] tracking-[3px]">Confirmar PIX</Button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* --- STEP 4: SUCESSO --- */}
        {step === 4 && (
          <div className="max-w-2xl mx-auto text-center py-20 animate-in zoom-in-95 duration-700">
            <div className="w-24 h-24 bg-pr-cyan rounded-full mx-auto mb-10 flex items-center justify-center shadow-[0_0_50px_rgba(0,242,254,0.4)]">
              <FontAwesomeIcon icon={faCheckCircle} className="text-black text-5xl" />
            </div>
            <h2 className="text-5xl font-black tracking-tighter mb-6 leading-none">
              Seja bem-vindo, <br /> <span className="text-pr-cyan">aproveite o show.</span>
            </h2>
            <p className="text-white/40 text-[11px] font-bold tracking-[4px] leading-loose mb-10 uppercase">
              Seu plano <span className="text-white">{selectedPlan.name}</span> está ativo. <br />
              Prepare a pipoca e divirta-se.
            </p>
            <Button onClick={() => navigate('/')} className="px-16 py-6 bg-white text-black font-black tracking-[4px] text-xs rounded-full hover:bg-pr-cyan transition-all shadow-2xl">
              Entrar na Plataforma
            </Button>
          </div>
        )}

        {/* Botão Voltar Otimizado */}
        {step < 4 && (
          <div className="mt-8 flex justify-center">
            <button onClick={handleBack} className="group flex items-center gap-3 text-white/20 hover:text-pr-cyan text-[9px] font-black tracking-[3px] transition-all">
              <FontAwesomeIcon icon={faArrowLeft} className="group-hover:-translate-x-1 transition-transform" /> 
              {step === 1 ? 'Sair' : 'Voltar'}
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default SubscriptionPage;