import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCog,
  faUser,
  faShieldAlt,
  faBell,
  faPalette,
  faSave,
  faCheckCircle,
  faExclamationTriangle
} from '@fortawesome/free-solid-svg-icons';

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [settings, setSettings] = useState({
    profile: {
      name: 'Usuário',
      email: 'usuario@email.com',
      bio: 'Amante de filmes e séries'
    },
    notifications: {
      emailNotifications: true,
      pushNotifications: false,
      newReleases: true,
      recommendations: true,
      marketing: false
    },
    privacy: {
      profileVisibility: 'private',
      activityStatus: true,
      dataSharing: false
    },
    appearance: {
      theme: 'dark',
      language: 'pt-BR',
      fontSize: 'medium'
    }
  });
  const [saveStatus, setSaveStatus] = useState(null);

  const handleSettingChange = (category, setting, value) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [setting]: value
      }
    }));
  };

  const handleSave = async () => {
    setSaveStatus('saving');
    // Simulação de salvamento
    await new Promise(resolve => setTimeout(resolve, 1500));
    setSaveStatus('saved');
    setTimeout(() => setSaveStatus(null), 3000);
  };

  const tabs = [
    { id: 'profile', label: 'PERFIL', icon: faUser },
    { id: 'notifications', label: 'NOTIFICAÇÕES', icon: faBell },
    { id: 'privacy', label: 'PRIVACIDADE', icon: faShieldAlt },
    { id: 'appearance', label: 'APARÊNCIA', icon: faPalette }
  ];

  return (
    <div className="min-h-screen bg-pr-black text-white pt-32 pb-20 selection:bg-pr-cyan selection:text-pr-black">
      <div className="max-w-4xl mx-auto px-6">

        {/* HEADER */}
        <header className="text-center mb-16">
          <div className="inline-block p-4 rounded-3xl bg-pr-cyan/5 border border-pr-cyan/10 mb-6">
            <FontAwesomeIcon icon={faCog} className="text-pr-cyan text-5xl opacity-80" />
          </div>
          <h1 className="text-5xl font-black tracking-tighter uppercase">
            CONFIGURAÇÕES <span className="text-pr-cyan">PERSONALIZADAS</span>
          </h1>
          <p className="text-pr-gray-light mt-4 uppercase text-xs font-bold tracking-[0.2em] opacity-60">
            Personalize sua experiência no Siteprime
          </p>
        </header>

        {/* TABS */}
        <div className="flex justify-center mb-12">
          <div className="bg-pr-gray-dark/20 p-1 rounded-2xl border border-white/5 backdrop-blur-sm">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 rounded-xl text-xs font-black uppercase tracking-[0.1em] transition-all flex items-center gap-2 ${
                  activeTab === tab.id
                    ? 'bg-pr-cyan text-pr-black shadow-lg'
                    : 'text-white/60 hover:text-white hover:bg-white/5'
                }`}
              >
                <FontAwesomeIcon icon={tab.icon} />
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* CONTEÚDO DAS TABS */}
        <div className="space-y-8">

          {/* PERFIL */}
          {activeTab === 'profile' && (
            <div className="bg-pr-gray-dark/20 p-8 rounded-3xl border border-white/5 backdrop-blur-sm">
              <h2 className="text-2xl font-black uppercase tracking-widest mb-6">
                INFORMAÇÕES DO PERFIL
              </h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-xs font-black uppercase tracking-[0.2em] text-pr-cyan mb-2">
                    Nome de Exibição
                  </label>
                  <input
                    type="text"
                    value={settings.profile.name}
                    onChange={(e) => handleSettingChange('profile', 'name', e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-pr-gray-light focus:border-pr-cyan focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-black uppercase tracking-[0.2em] text-pr-cyan mb-2">
                    E-mail
                  </label>
                  <input
                    type="email"
                    value={settings.profile.email}
                    onChange={(e) => handleSettingChange('profile', 'email', e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-pr-gray-light focus:border-pr-cyan focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-black uppercase tracking-[0.2em] text-pr-cyan mb-2">
                    Biografia
                  </label>
                  <textarea
                    value={settings.profile.bio}
                    onChange={(e) => handleSettingChange('profile', 'bio', e.target.value)}
                    rows={3}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-pr-gray-light focus:border-pr-cyan focus:outline-none transition-colors resize-none"
                    placeholder="Conte um pouco sobre você..."
                  />
                </div>
              </div>
            </div>
          )}

          {/* NOTIFICAÇÕES */}
          {activeTab === 'notifications' && (
            <div className="bg-pr-gray-dark/20 p-8 rounded-3xl border border-white/5 backdrop-blur-sm">
              <h2 className="text-2xl font-black uppercase tracking-widest mb-6">
                PREFERÊNCIAS DE NOTIFICAÇÃO
              </h2>
              <div className="space-y-6">
                {[
                  { key: 'emailNotifications', label: 'Notificações por E-mail' },
                  { key: 'pushNotifications', label: 'Notificações Push' },
                  { key: 'newReleases', label: 'Novos Lançamentos' },
                  { key: 'recommendations', label: 'Recomendações Personalizadas' },
                  { key: 'marketing', label: 'Ofertas e Promoções' }
                ].map((item) => (
                  <div key={item.key} className="flex items-center justify-between">
                    <span className="text-sm font-bold uppercase tracking-[0.1em]">{item.label}</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.notifications[item.key]}
                        onChange={(e) => handleSettingChange('notifications', item.key, e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-white/20 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-pr-cyan/25 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-pr-cyan"></div>
                    </label>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* PRIVACIDADE */}
          {activeTab === 'privacy' && (
            <div className="bg-pr-gray-dark/20 p-8 rounded-3xl border border-white/5 backdrop-blur-sm">
              <h2 className="text-2xl font-black uppercase tracking-widest mb-6">
                CONFIGURAÇÕES DE PRIVACIDADE
              </h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-xs font-black uppercase tracking-[0.2em] text-pr-cyan mb-2">
                    Visibilidade do Perfil
                  </label>
                  <select
                    value={settings.privacy.profileVisibility}
                    onChange={(e) => handleSettingChange('privacy', 'profileVisibility', e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-pr-cyan focus:outline-none transition-colors"
                  >
                    <option value="public">Público</option>
                    <option value="friends">Apenas Amigos</option>
                    <option value="private">Privado</option>
                  </select>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold uppercase tracking-[0.1em]">Mostrar Status de Atividade</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.privacy.activityStatus}
                      onChange={(e) => handleSettingChange('privacy', 'activityStatus', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-white/20 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-pr-cyan/25 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-pr-cyan"></div>
                  </label>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold uppercase tracking-[0.1em]">Compartilhar Dados para Melhorias</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.privacy.dataSharing}
                      onChange={(e) => handleSettingChange('privacy', 'dataSharing', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-white/20 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-pr-cyan/25 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-pr-cyan"></div>
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* APARÊNCIA */}
          {activeTab === 'appearance' && (
            <div className="bg-pr-gray-dark/20 p-8 rounded-3xl border border-white/5 backdrop-blur-sm">
              <h2 className="text-2xl font-black uppercase tracking-widest mb-6">
                PREFERÊNCIAS DE APARÊNCIA
              </h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-xs font-black uppercase tracking-[0.2em] text-pr-cyan mb-2">
                    Tema
                  </label>
                  <select
                    value={settings.appearance.theme}
                    onChange={(e) => handleSettingChange('appearance', 'theme', e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-pr-cyan focus:outline-none transition-colors"
                  >
                    <option value="dark">Escuro</option>
                    <option value="light">Claro</option>
                    <option value="auto">Automático</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-black uppercase tracking-[0.2em] text-pr-cyan mb-2">
                    Idioma
                  </label>
                  <select
                    value={settings.appearance.language}
                    onChange={(e) => handleSettingChange('appearance', 'language', e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-pr-cyan focus:outline-none transition-colors"
                  >
                    <option value="pt-BR">Português (Brasil)</option>
                    <option value="en-US">English (US)</option>
                    <option value="es-ES">Español</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-black uppercase tracking-[0.2em] text-pr-cyan mb-2">
                    Tamanho da Fonte
                  </label>
                  <select
                    value={settings.appearance.fontSize}
                    onChange={(e) => handleSettingChange('appearance', 'fontSize', e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-pr-cyan focus:outline-none transition-colors"
                  >
                    <option value="small">Pequeno</option>
                    <option value="medium">Médio</option>
                    <option value="large">Grande</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* BOTÃO DE SALVAR */}
        <div className="mt-12 text-center">
          <button
            onClick={handleSave}
            disabled={saveStatus === 'saving'}
            className="px-12 py-4 bg-pr-cyan text-pr-black font-black tracking-[0.1em] text-sm rounded-xl hover:bg-white transition-all shadow-lg shadow-pr-cyan/20 uppercase flex items-center justify-center gap-3 mx-auto disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {saveStatus === 'saving' ? (
              <>
                <div className="w-4 h-4 border-2 border-pr-black border-t-transparent rounded-full animate-spin" />
                SALVANDO...
              </>
            ) : saveStatus === 'saved' ? (
              <>
                <FontAwesomeIcon icon={faCheckCircle} />
                SALVO COM SUCESSO
              </>
            ) : (
              <>
                <FontAwesomeIcon icon={faSave} />
                SALVAR CONFIGURAÇÕES
              </>
            )}
          </button>
        </div>

        {/* AVISO */}
        <div className="mt-8 bg-pr-cyan/5 border border-pr-cyan/20 p-6 rounded-3xl">
          <div className="flex items-start gap-4">
            <FontAwesomeIcon icon={faExclamationTriangle} className="text-pr-cyan text-xl mt-1" />
            <div>
              <h3 className="font-black text-pr-cyan uppercase text-sm tracking-[0.1em] mb-2">
                IMPORTANTE
              </h3>
              <p className="text-sm text-pr-gray-light leading-relaxed">
                Algumas alterações podem levar alguns minutos para serem aplicadas em todos os dispositivos.
                Para alterações de privacidade, recomendamos revisar nossas políticas antes de salvar.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;