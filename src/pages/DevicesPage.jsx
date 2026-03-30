import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faDesktop,
  faMobileAlt,
  faTv,
  faTabletAlt,
  faDownload,
  faGlobe,
  faShieldAlt,
  faSync
} from '@fortawesome/free-solid-svg-icons';
import {
  faChrome,
  faSafari,
  faFirefox,
  faEdge,
  faApple,
  faAndroid
} from '@fortawesome/free-brands-svg-icons';

const DevicesPage = () => {
  const [activeTab, setActiveTab] = useState('browsers');

  const browsers = [
    {
      name: 'Google Chrome',
      icon: faChrome,
      version: 'Versão 90+',
      status: 'recommended',
      notes: 'Experiência completa e otimizada'
    },
    {
      name: 'Mozilla Firefox',
      icon: faFirefox,
      version: 'Versão 88+',
      status: 'supported',
      notes: 'Compatível com todas as funcionalidades'
    },
    {
      name: 'Safari',
      icon: faSafari,
      version: 'Versão 14+',
      status: 'supported',
      notes: 'Compatível em macOS e iOS'
    },
    {
      name: 'Microsoft Edge',
      icon: faEdge,
      version: 'Versão 90+',
      status: 'supported',
      notes: 'Baseado em Chromium, experiência similar ao Chrome'
    }
  ];

  const devices = [
    {
      category: 'Smartphones',
      icon: faMobileAlt,
      items: [
        { name: 'iPhone', os: 'iOS 14+', status: 'supported' },
        { name: 'Android', os: 'Android 8+', status: 'supported' }
      ]
    },
    {
      category: 'Tablets',
      icon: faTabletAlt,
      items: [
        { name: 'iPad', os: 'iPadOS 14+', status: 'supported' },
        { name: 'Android Tablets', os: 'Android 8+', status: 'supported' }
      ]
    },
    {
      category: 'Computadores',
      icon: faDesktop,
      items: [
        { name: 'Windows', os: 'Windows 10+', status: 'supported' },
        { name: 'macOS', os: 'macOS 11+', status: 'supported' },
        { name: 'Linux', os: 'Ubuntu 18.04+', status: 'supported' }
      ]
    },
    {
      category: 'Smart TVs',
      icon: faTv,
      items: [
        { name: 'Samsung Tizen', os: 'Tizen 5+', status: 'coming-soon' },
        { name: 'LG webOS', os: 'webOS 4+', status: 'coming-soon' },
        { name: 'Android TV', os: 'Android 8+', status: 'coming-soon' }
      ]
    }
  ];

  const apps = [
    {
      platform: 'iOS',
      icon: faApple,
      status: 'coming-soon',
      description: 'App nativo para iPhone e iPad'
    },
    {
      platform: 'Android',
      icon: faAndroid,
      status: 'coming-soon',
      description: 'App nativo para dispositivos Android'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'recommended':
        return 'text-green-400 bg-green-400/10 border-green-400/20';
      case 'supported':
        return 'text-pr-cyan bg-pr-cyan/10 border-pr-cyan/20';
      case 'coming-soon':
        return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20';
      default:
        return 'text-pr-gray bg-pr-gray/10 border-pr-gray/20';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'recommended':
        return 'RECOMENDADO';
      case 'supported':
        return 'SUPORTADO';
      case 'coming-soon':
        return 'EM BREVE';
      default:
        return 'NÃO SUPORTADO';
    }
  };

  return (
    <div className="min-h-screen bg-pr-black text-white pt-32 pb-20 selection:bg-pr-cyan selection:text-pr-black">
      <div className="max-w-6xl mx-auto px-6">

        {/* HEADER */}
        <header className="text-center mb-16">
          <div className="inline-block p-4 rounded-3xl bg-pr-cyan/5 border border-pr-cyan/10 mb-6">
            <FontAwesomeIcon icon={faDesktop} className="text-pr-cyan text-5xl opacity-80" />
          </div>
          <h1 className="text-5xl font-black tracking-tighter uppercase">
            DISPOSITIVOS <span className="text-pr-cyan">COMPATÍVEIS</span>
          </h1>
          <p className="text-pr-gray-light mt-4 uppercase text-xs font-bold tracking-[0.2em] opacity-60">
            Acesse o Siteprime de qualquer lugar, a qualquer momento
          </p>
        </header>

        {/* TABS */}
        <div className="flex justify-center mb-12">
          <div className="bg-pr-gray-dark/20 p-1 rounded-2xl border border-white/5 backdrop-blur-sm">
            {[
              { id: 'browsers', label: 'NAVEGADORES', icon: faGlobe },
              { id: 'devices', label: 'DISPOSITIVOS', icon: faDesktop },
              { id: 'apps', label: 'APPS', icon: faDownload }
            ].map((tab) => (
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

          {/* NAVEGADORES */}
          {activeTab === 'browsers' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {browsers.map((browser) => (
                <div
                  key={browser.name}
                  className={`p-6 rounded-2xl border backdrop-blur-sm ${getStatusColor(browser.status)}`}
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
                      <FontAwesomeIcon icon={browser.icon} className="text-2xl" />
                    </div>
                    <div>
                      <h3 className="font-black text-white uppercase text-lg tracking-[0.1em]">
                        {browser.name}
                      </h3>
                      <span className={`text-xs font-black uppercase tracking-[0.1em] px-2 py-1 rounded-full ${getStatusColor(browser.status)}`}>
                        {getStatusText(browser.status)}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-white/80 mb-2">{browser.version}</p>
                  <p className="text-xs text-white/60">{browser.notes}</p>
                </div>
              ))}
            </div>
          )}

          {/* DISPOSITIVOS */}
          {activeTab === 'devices' && (
            <div className="space-y-8">
              {devices.map((category) => (
                <div key={category.category} className="bg-pr-gray-dark/20 p-8 rounded-3xl border border-white/5 backdrop-blur-sm">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-pr-cyan/10 rounded-xl flex items-center justify-center border border-pr-cyan/20">
                      <FontAwesomeIcon icon={category.icon} className="text-pr-cyan text-xl" />
                    </div>
                    <h3 className="text-2xl font-black uppercase tracking-widest">
                      {category.category}
                    </h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {category.items.map((device) => (
                      <div
                        key={device.name}
                        className={`p-4 rounded-xl border ${getStatusColor(device.status)}`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-black text-white uppercase text-sm tracking-[0.1em]">
                            {device.name}
                          </h4>
                          <span className={`text-xs font-black uppercase tracking-[0.1em] px-2 py-1 rounded-full ${getStatusColor(device.status)}`}>
                            {getStatusText(device.status)}
                          </span>
                        </div>
                        <p className="text-xs text-white/60">{device.os}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* APPS */}
          {activeTab === 'apps' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {apps.map((app) => (
                <div
                  key={app.platform}
                  className={`p-8 rounded-3xl border backdrop-blur-sm ${getStatusColor(app.status)}`}
                >
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center">
                      <FontAwesomeIcon icon={app.icon} className="text-3xl" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-black uppercase tracking-widest">
                        {app.platform}
                      </h3>
                      <span className={`text-sm font-black uppercase tracking-[0.1em] px-3 py-1 rounded-full ${getStatusColor(app.status)}`}>
                        {getStatusText(app.status)}
                      </span>
                    </div>
                  </div>
                  <p className="text-white/80 leading-relaxed">{app.description}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* INFORMAÇÕES GERAIS */}
        <div className="mt-16 bg-pr-cyan/5 border border-pr-cyan/20 p-8 rounded-3xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex items-start gap-4">
              <FontAwesomeIcon icon={faShieldAlt} className="text-pr-cyan text-2xl mt-1" />
              <div>
                <h3 className="font-black text-pr-cyan uppercase text-sm tracking-[0.1em] mb-2">
                  SEGURANÇA E PRIVACIDADE
                </h3>
                <p className="text-sm text-pr-gray-light leading-relaxed">
                  Todos os dispositivos suportados utilizam conexões HTTPS criptografadas e seguem nossas políticas de privacidade.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <FontAwesomeIcon icon={faSync} className="text-pr-cyan text-2xl mt-1" />
              <div>
                <h3 className="font-black text-pr-cyan uppercase text-sm tracking-[0.1em] mb-2">
                  SINCRONIZAÇÃO AUTOMÁTICA
                </h3>
                <p className="text-sm text-pr-gray-light leading-relaxed">
                  Sua lista pessoal e preferências são sincronizadas automaticamente em todos os dispositivos compatíveis.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CALL TO ACTION */}
        <div className="mt-12 text-center">
          <h3 className="text-2xl font-black uppercase tracking-widest mb-4">
            PRONTO PARA COMEÇAR?
          </h3>
          <p className="text-pr-gray-light mb-8 leading-relaxed">
            Acesse o Siteprime agora mesmo no seu dispositivo preferido e aproveite todo o catálogo.
          </p>
          <a
            href="/"
            className="inline-block bg-pr-cyan text-pr-black font-black py-4 px-12 rounded-xl hover:bg-white transition-all shadow-lg shadow-pr-cyan/20 uppercase tracking-[0.1em]"
          >
            Explorar Catálogo
          </a>
        </div>
      </div>
    </div>
  );
};

export default DevicesPage;