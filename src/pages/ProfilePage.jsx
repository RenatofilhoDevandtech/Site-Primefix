import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUser,
  faArrowLeft,
  faBell,
  faShield,
  faTrash,
  faSignOutAlt
} from '@fortawesome/free-solid-svg-icons';

// Importação centralizada via Barrel File
import { useAuth, useToast } from '../hooks'; 

import Button from '../components/ui/Button';
import Input from '../components/ui/Input';

const ProfilePage = () => {
  const { user, logout, updateUser } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [notifications, setNotifications] = useState({
    newReleases: true,
    recommendations: true,
    weeklyDigest: false,
    marketing: false
  });

  const [isLoading, setIsLoading] = useState(false);

  // Sincronização de dados do usuário
  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        name: user.name,
        email: user.email
      }));
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleNotificationChange = (key) => {
    setNotifications(prev => ({ ...prev, [key]: !prev[key] }));
    showToast('Preferência atualizada', 'info');
  };

  // --- LÓGICA DE SAÍDA (LOGOUT) ---
  const handleLogout = async () => {
    try {
      await logout();
      showToast('Sessão encerrada. Até logo!', 'info');
      navigate('/login'); // Redireciona para a tela de login premium
    } catch (error) {
      showToast('Erro ao sair. Tente novamente.', 'error');
    }
  };

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (updateUser) {
        await updateUser({ name: formData.name, email: formData.email });
      }
      showToast('Perfil atualizado com sucesso!', 'success');
    } catch (error) {
      showToast('Erro ao atualizar perfil', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (formData.newPassword !== formData.confirmPassword) {
      showToast('As senhas não coincidem', 'error');
      return;
    }
    setIsLoading(true);
    // Simulação de troca de senha
    setTimeout(() => {
      showToast('Senha alterada com sucesso!', 'success');
      setFormData(prev => ({
        ...prev,
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      }));
      setIsLoading(false);
    }, 1000);
  };

  const handleDeleteAccount = () => {
    if (window.confirm('Tem certeza que deseja excluir sua conta? Esta ação não pode ser desfeita.')) {
      showToast('Conta excluída com sucesso', 'info');
      logout();
      navigate('/login');
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-pr-black flex items-center justify-center">
        <Button onClick={() => navigate('/login')} className="rounded-full px-8 border border-pr-cyan/30 text-pr-cyan text-[10px] uppercase tracking-[3px]">
          Identificar-se
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-pr-black text-white pb-24 font-sans selection:bg-pr-cyan/30">
      
      {/* Header: Design Minimalista com Respiro */}
      <header className="bg-gradient-to-r from-pr-cyan/10 via-transparent to-transparent border-b border-white/5">
        <div className="max-w-5xl mx-auto px-6 pt-20 pb-12">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-3 text-pr-gray-light hover:text-white transition-all text-[11px] mb-12 group opacity-60 hover:opacity-100 uppercase tracking-[4px]"
          >
            <FontAwesomeIcon icon={faArrowLeft} className="group-hover:-translate-x-1 transition-transform" />
            Voltar para a Galeria
          </button>

          <div className="flex items-center gap-8 animate-in fade-in duration-700">
            <div className="w-24 h-24 bg-transparent border border-pr-cyan/20 text-pr-cyan rounded-full flex items-center justify-center text-4xl font-extralight shadow-[0_0_30px_rgba(0,242,254,0.05)]">
              {user.name?.charAt(0).toUpperCase()}
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-extralight tracking-tight text-white">
                Minhas <span className="text-pr-cyan/80 font-light">Configurações</span>
              </h1>
              <p className="text-pr-gray-light text-[10px] mt-3 font-medium tracking-[5px] uppercase opacity-40">
                Experiência de Membro Prime
              </p>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-6 mt-16">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-20">
          
          {/* Menu Lateral */}
          <aside className="lg:col-span-1 flex flex-col gap-2">
            {[
              { id: 'profile', icon: faUser, label: 'Perfil' },
              { id: 'security', icon: faShield, label: 'Segurança' },
              { id: 'notifications', icon: faBell, label: 'Avisos' }
            ].map((item) => (
              <a 
                key={item.id}
                href={`#${item.id}`} 
                className="flex items-center gap-4 px-5 py-4 text-pr-gray-light hover:text-white hover:bg-white/[0.03] rounded-2xl transition-all text-[10px] border-l-2 border-transparent hover:border-pr-cyan/40 tracking-[3px] uppercase"
              >
                <FontAwesomeIcon icon={item.icon} className="text-[10px] opacity-40" />
                {item.label}
              </a>
            ))}

            <button 
              onClick={handleLogout}
              className="mt-12 flex items-center gap-4 px-5 py-4 text-red-500/50 hover:text-red-500 hover:bg-red-500/5 rounded-2xl transition-all text-[10px] border-l-2 border-transparent hover:border-red-500/40 tracking-[3px] uppercase font-bold"
            >
              <FontAwesomeIcon icon={faSignOutAlt} className="text-[10px]" />
              Encerrar Sessão
            </button>
          </aside>

          {/* Área de Conteúdo */}
          <main className="lg:col-span-3 space-y-20">
            
            {/* Seção Dados */}
            <section id="profile" className="bg-white/[0.01] p-12 rounded-[40px] border border-white/[0.04] backdrop-blur-xl">
              <div className="flex items-center gap-4 mb-12">
                <div className="w-[1px] h-8 bg-pr-cyan/30"></div>
                <h2 className="text-[11px] font-medium uppercase tracking-[4px] text-white/60">Credenciais de Acesso</h2>
              </div>
              
              <form onSubmit={handleSaveProfile} className="space-y-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="space-y-4">
                    <label className="text-[9px] uppercase tracking-[3px] text-white/30 ml-1">Nome de Exibição</label>
                    <Input name="name" value={formData.name} onChange={handleInputChange} className="bg-transparent border-white/5 text-sm h-14 focus:border-pr-cyan/30 transition-all rounded-2xl" />
                  </div>
                  <div className="space-y-4">
                    <label className="text-[9px] uppercase tracking-[3px] text-white/30 ml-1">E-mail de Contato</label>
                    <Input name="email" type="email" value={formData.email} onChange={handleInputChange} className="bg-transparent border-white/5 text-sm h-14 focus:border-pr-cyan/30 transition-all rounded-2xl" />
                  </div>
                </div>
                <Button type="submit" disabled={isLoading} className="text-[10px] uppercase tracking-[3px] py-4 px-10 rounded-full border border-pr-cyan/20 bg-transparent text-pr-cyan hover:bg-pr-cyan hover:text-pr-black transition-all duration-700 shadow-none font-bold">
                  {isLoading ? 'Sincronizando...' : 'Atualizar Identidade'}
                </Button>
              </form>
            </section>

            {/* Seção Segurança */}
            <section id="security" className="bg-white/[0.01] p-12 rounded-[40px] border border-white/[0.04]">
              <div className="flex items-center gap-4 mb-12">
                <div className="w-[1px] h-8 bg-pr-cyan/30"></div>
                <h2 className="text-[11px] font-medium uppercase tracking-[4px] text-white/60">Privacidade</h2>
              </div>
              <form onSubmit={handleChangePassword} className="space-y-10">
                <div className="space-y-4 max-w-sm">
                    <label className="text-[9px] uppercase tracking-[3px] text-white/30 ml-1 font-semibold">Chave de Segurança Atual</label>
                    <Input name="currentPassword" type="password" placeholder="••••••••" className="bg-transparent border-white/5 text-sm h-14 rounded-2xl" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="space-y-4">
                    <label className="text-[9px] uppercase tracking-[3px] text-white/30 ml-1">Nova Chave</label>
                    <Input name="newPassword" type="password" className="bg-transparent border-white/5 text-sm h-14 rounded-2xl" />
                  </div>
                  <div className="space-y-4">
                    <label className="text-[9px] uppercase tracking-[3px] text-white/30 ml-1">Confirmar Nova Chave</label>
                    <Input name="confirmPassword" type="password" className="bg-transparent border-white/5 text-sm h-14 rounded-2xl" />
                  </div>
                </div>
                <Button variant="secondary" className="text-[10px] uppercase tracking-[3px] py-4 px-10 rounded-full border border-white/5 hover:bg-white/5 text-white/50 hover:text-white transition-all duration-700 shadow-none">
                  Redefinir Acesso
                </Button>
              </form>
            </section>

            {/* Seção Notificações */}
            <section id="notifications" className="bg-white/[0.01] p-12 rounded-[40px] border border-white/[0.04]">
              <div className="flex items-center gap-4 mb-12">
                <div className="w-[1px] h-8 bg-pr-cyan/30"></div>
                <h2 className="text-[11px] font-medium uppercase tracking-[4px] text-white/60">Preferências</h2>
              </div>
              <div className="space-y-10">
                {[
                  { key: 'newReleases', label: 'Estreias Exclusivas', desc: 'Alertas sobre filmes e séries adicionados à galeria.' },
                  { key: 'recommendations', label: 'Curadoria IA', desc: 'Conteúdo baseado no seu perfil de espectador.' }
                ].map((item) => (
                  <div key={item.key} className="flex items-center justify-between group">
                    <div>
                      <p className="text-sm font-light text-white/90 tracking-wide mb-1">{item.label}</p>
                      <p className="text-[9px] text-white/20 uppercase tracking-[3px] leading-relaxed">{item.desc}</p>
                    </div>
                    <button 
                      onClick={() => handleNotificationChange(item.key)}
                      className={`w-12 h-6 rounded-full transition-all duration-700 relative ${notifications[item.key] ? 'bg-pr-cyan/20' : 'bg-white/5 border border-white/10'}`}
                    >
                      <div className={`absolute top-1.5 w-3 h-3 rounded-full transition-all duration-700 ${notifications[item.key] ? 'right-2 bg-pr-cyan shadow-[0_0_12px_rgba(0,242,254,0.6)]' : 'left-2 bg-white/10'}`}></div>
                    </button>
                  </div>
                ))}
              </div>
            </section>

            {/* Danger Zone: Minimalista Extremo */}
            <div className="pt-24 flex flex-col items-center border-t border-white/[0.02]">
              <button 
                onClick={handleDeleteAccount}
                className="group flex flex-col items-center gap-5 opacity-20 hover:opacity-100 transition-all duration-1000"
              >
                <span className="text-[8px] uppercase tracking-[6px] text-white/60">Zona de Desativação</span>
                <div className="flex items-center gap-6">
                  <div className="w-16 h-[1px] bg-white/10 group-hover:bg-red-500/30 transition-all"></div>
                  <FontAwesomeIcon icon={faTrash} className="text-[10px] text-white/20 group-hover:text-red-500" />
                  <div className="w-16 h-[1px] bg-white/10 group-hover:bg-red-500/30 transition-all"></div>
                </div>
                <span className="text-[9px] uppercase tracking-[3px] text-red-500/0 group-hover:text-red-500 transition-all">Excluir Conta Permanentemente</span>
              </button>
            </div>

          </main>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;