import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCheckCircle,
  faExclamationTriangle,
  faTimesCircle,
  faClock,
  faGlobe,
  faRefresh
} from '@fortawesome/free-solid-svg-icons';

const StatusPage = () => {
  const [lastUpdated, setLastUpdated] = useState(new Date());

  // Simulação de status dos serviços
  const services = [
    {
      name: 'Plataforma Web',
      status: 'operational',
      description: 'Site e aplicação principal',
      uptime: '99.9%'
    },
    {
      name: 'API de Catálogo',
      status: 'operational',
      description: 'Busca e metadados de títulos',
      uptime: '99.8%'
    },
    {
      name: 'Sistema de Contas',
      status: 'operational',
      description: 'Login, cadastro e perfis',
      uptime: '99.9%'
    },
    {
      name: 'Streaming de Vídeo',
      status: 'operational',
      description: 'Reprodução de conteúdo',
      uptime: '99.7%'
    },
    {
      name: 'Recomendações',
      status: 'operational',
      description: 'Sistema de sugestões personalizadas',
      uptime: '99.5%'
    },
    {
      name: 'Pagamentos',
      status: 'operational',
      description: 'Processamento de assinaturas',
      uptime: '99.9%'
    }
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case 'operational':
        return faCheckCircle;
      case 'degraded':
        return faExclamationTriangle;
      case 'outage':
        return faTimesCircle;
      default:
        return faClock;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'operational':
        return 'text-green-400';
      case 'degraded':
        return 'text-yellow-400';
      case 'outage':
        return 'text-red-400';
      default:
        return 'text-pr-cyan';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'operational':
        return 'OPERACIONAL';
      case 'degraded':
        return 'DEGRADADO';
      case 'outage':
        return 'INDISPONÍVEL';
      default:
        return 'MANUTENÇÃO';
    }
  };

  const overallStatus = services.every(s => s.status === 'operational') ? 'operational' :
                       services.some(s => s.status === 'outage') ? 'degraded' : 'operational';

  useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdated(new Date());
    }, 60000); // Atualiza a cada minuto

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-pr-black text-white pt-32 pb-20 selection:bg-pr-cyan selection:text-pr-black">
      <div className="max-w-4xl mx-auto px-6">

        {/* HEADER */}
        <header className="text-center mb-16">
          <div className={`inline-block p-4 rounded-3xl mb-6 ${
            overallStatus === 'operational'
              ? 'bg-green-400/10 border border-green-400/20'
              : 'bg-yellow-400/10 border border-yellow-400/20'
          }`}>
            <FontAwesomeIcon
              icon={getStatusIcon(overallStatus)}
              className={`text-5xl opacity-80 ${getStatusColor(overallStatus)}`}
            />
          </div>
          <h1 className="text-5xl font-black tracking-tighter uppercase">
            STATUS DO <span className="text-pr-cyan">SERVIÇO</span>
          </h1>
          <p className="text-pr-gray-light mt-4 uppercase text-xs font-bold tracking-[0.2em] opacity-60">
            Monitoramento em tempo real da infraestrutura Siteprime
          </p>
          <p className="text-xs text-white/40 mt-2">
            Última atualização: {lastUpdated.toLocaleString('pt-BR')}
          </p>
        </header>

        {/* STATUS GERAL */}
        <div className={`p-8 rounded-3xl border backdrop-blur-sm mb-12 ${
          overallStatus === 'operational'
            ? 'bg-green-400/5 border-green-400/20'
            : 'bg-yellow-400/5 border-yellow-400/20'
        }`}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-black uppercase tracking-widest">
              STATUS GERAL
            </h2>
            <span className={`px-4 py-2 rounded-full text-xs font-black uppercase tracking-[0.1em] ${
              overallStatus === 'operational'
                ? 'bg-green-400 text-black'
                : 'bg-yellow-400 text-black'
            }`}>
              {getStatusText(overallStatus)}
            </span>
          </div>
          <p className={`text-sm leading-relaxed ${
            overallStatus === 'operational'
              ? 'text-green-200'
              : 'text-yellow-200'
          }`}>
            {overallStatus === 'operational'
              ? 'Todos os sistemas estão funcionando normalmente. Aproveite sua experiência no Siteprime!'
              : 'Alguns serviços podem apresentar lentidão. Nossa equipe está trabalhando para resolver.'
            }
          </p>
        </div>

        {/* SERVIÇOS INDIVIDUAIS */}
        <div className="space-y-4">
          <h2 className="text-2xl font-black uppercase tracking-widest mb-8">
            COMPONENTES DO SISTEMA
          </h2>

          {services.map((service) => (
            <div
              key={service.name}
              className="bg-pr-gray-dark/20 p-6 rounded-2xl border border-white/5 backdrop-blur-sm hover:border-white/10 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center border ${
                    service.status === 'operational'
                      ? 'bg-green-400/10 border-green-400/20'
                      : service.status === 'degraded'
                      ? 'bg-yellow-400/10 border-yellow-400/20'
                      : 'bg-red-400/10 border-red-400/20'
                  }`}>
                    <FontAwesomeIcon
                      icon={getStatusIcon(service.status)}
                      className={getStatusColor(service.status)}
                    />
                  </div>
                  <div>
                    <h3 className="font-black text-white uppercase text-sm tracking-[0.1em]">
                      {service.name}
                    </h3>
                    <p className="text-pr-gray-light text-xs">
                      {service.description}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`text-sm font-black uppercase tracking-[0.1em] ${getStatusColor(service.status)}`}>
                    {getStatusText(service.status)}
                  </div>
                  <div className="text-xs text-white/40">
                    {service.uptime} uptime
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* INFORMAÇÕES ADICIONAIS */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-pr-gray-dark/20 p-6 rounded-2xl border border-white/5 backdrop-blur-sm text-center">
            <FontAwesomeIcon icon={faGlobe} className="text-pr-cyan text-2xl mb-4" />
            <h3 className="font-black text-pr-cyan uppercase text-sm tracking-[0.1em] mb-2">
              COBERTURA GLOBAL
            </h3>
            <p className="text-xs text-pr-gray-light">
              Servidores distribuídos em múltiplas regiões para máxima disponibilidade.
            </p>
          </div>

          <div className="bg-pr-gray-dark/20 p-6 rounded-2xl border border-white/5 backdrop-blur-sm text-center">
            <FontAwesomeIcon icon={faRefresh} className="text-pr-cyan text-2xl mb-4" />
            <h3 className="font-black text-pr-cyan uppercase text-sm tracking-[0.1em] mb-2">
              MONITORAMENTO 24/7
            </h3>
            <p className="text-xs text-pr-gray-light">
              Equipe técnica monitora todos os sistemas continuamente.
            </p>
          </div>

          <div className="bg-pr-gray-dark/20 p-6 rounded-2xl border border-white/5 backdrop-blur-sm text-center">
            <FontAwesomeIcon icon={faClock} className="text-pr-cyan text-2xl mb-4" />
            <h3 className="font-black text-pr-cyan uppercase text-sm tracking-[0.1em] mb-2">
              SLA GARANTIDO
            </h3>
            <p className="text-xs text-pr-gray-light">
              Compromisso de 99.5% de disponibilidade em todos os serviços.
            </p>
          </div>
        </div>

        {/* CONTATO PARA INCIDENTES */}
        <div className="mt-12 bg-pr-cyan/5 border border-pr-cyan/20 p-8 rounded-3xl text-center">
          <FontAwesomeIcon icon={faExclamationTriangle} className="text-pr-cyan text-3xl mb-4" />
          <h3 className="text-xl font-black uppercase tracking-widest mb-4">
            Relatou um problema?
          </h3>
          <p className="text-pr-gray-light mb-6 leading-relaxed">
            Se você está enfrentando dificuldades não listadas acima, entre em contato com nosso suporte técnico.
          </p>
          <a
            href="/contact"
            className="inline-block bg-pr-cyan text-pr-black font-black py-3 px-8 rounded-xl hover:bg-white transition-all shadow-lg shadow-pr-cyan/20 uppercase tracking-[0.1em]"
          >
            Falar com Suporte
          </a>
        </div>
      </div>
    </div>
  );
};

export default StatusPage;