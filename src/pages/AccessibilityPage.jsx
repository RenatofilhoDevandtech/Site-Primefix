import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUniversalAccess,
  faEye,
  faVolumeUp,
  faMousePointer,
  faKeyboard,
  faFont,
  faCheckCircle,
  faInfoCircle,
  faExclamationTriangle
} from '@fortawesome/free-solid-svg-icons';

const AccessibilityPage = () => {
  const [activeSection, setActiveSection] = useState('overview');

  const accessibilityFeatures = [
    {
      id: 'visual',
      title: 'Acessibilidade Visual',
      icon: faEye,
      features: [
        'Alto contraste em todos os elementos',
        'Texto redimensionável sem perda de funcionalidade',
        'Suporte a leitores de tela',
        'Ícones e símbolos descritivos',
        'Cores com significado redundante'
      ]
    },
    {
      id: 'audio',
      title: 'Acessibilidade Auditiva',
      icon: faVolumeUp,
      features: [
        'Legendas em português para todo o conteúdo',
        'Descrições de áudio para conteúdo visual',
        'Controles de volume independentes',
        'Alertas visuais para notificações sonoras',
        'Compatibilidade com aparelhos auditivos'
      ]
    },
    {
      id: 'motor',
      title: 'Acessibilidade Motora',
      icon: faMousePointer,
      features: [
        'Navegação completa por teclado',
        'Controles grandes e espaçados',
        'Tempo suficiente para interações',
        'Alternativas para gestos complexos',
        'Suporte a tecnologias assistivas'
      ]
    },
    {
      id: 'cognitive',
      title: 'Acessibilidade Cognitiva',
      icon: faFont,
      features: [
        'Linguagem clara e simples',
        'Estrutura consistente de navegação',
        'Instruções passo-a-passo',
        'Possibilidade de pausar animações',
        'Conteúdo organizado logicamente'
      ]
    }
  ];

  const keyboardShortcuts = [
    { key: 'Tab', description: 'Navegar entre elementos interativos' },
    { key: 'Enter/Space', description: 'Ativar botões e links' },
    { key: 'Escape', description: 'Fechar modais e menus' },
    { key: 'Arrow Keys', description: 'Navegar em listas e carrosséis' },
    { key: 'Ctrl + /', description: 'Mostrar atalhos de teclado' }
  ];

  return (
    <div className="min-h-screen bg-pr-black text-white pt-32 pb-20 selection:bg-pr-cyan selection:text-pr-black">
      <div className="max-w-6xl mx-auto px-6">

        {/* HEADER */}
        <header className="text-center mb-16">
          <div className="inline-block p-4 rounded-3xl bg-pr-cyan/5 border border-pr-cyan/10 mb-6">
            <FontAwesomeIcon icon={faUniversalAccess} className="text-pr-cyan text-5xl opacity-80" />
          </div>
          <h1 className="text-5xl font-black tracking-tighter uppercase">
            ACESSIBILIDADE <span className="text-pr-cyan">INCLUSIVA</span>
          </h1>
          <p className="text-pr-gray-light mt-4 uppercase text-xs font-bold tracking-[0.2em] opacity-60">
            Compromisso com a experiência acessível para todos
          </p>
        </header>

        {/* TABS DE NAVEGAÇÃO */}
        <div className="flex justify-center mb-12">
          <div className="bg-pr-gray-dark/20 p-1 rounded-2xl border border-white/5 backdrop-blur-sm">
            {[
              { id: 'overview', label: 'VISÃO GERAL' },
              { id: 'features', label: 'RECURSOS' },
              { id: 'keyboard', label: 'TECLADO' },
              { id: 'contact', label: 'CONTATO' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveSection(tab.id)}
                className={`px-6 py-3 rounded-xl text-xs font-black uppercase tracking-[0.1em] transition-all ${
                  activeSection === tab.id
                    ? 'bg-pr-cyan text-pr-black shadow-lg'
                    : 'text-white/60 hover:text-white hover:bg-white/5'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* CONTEÚDO DAS SEÇÕES */}
        <div className="space-y-8">

          {/* VISÃO GERAL */}
          {activeSection === 'overview' && (
            <div className="space-y-8">
              <div className="bg-pr-gray-dark/20 p-8 rounded-3xl border border-white/5 backdrop-blur-sm">
                <h2 className="text-2xl font-black uppercase tracking-widest mb-6">
                  NOSSO COMPROMISSO
                </h2>
                <p className="text-pr-gray-light leading-relaxed mb-6">
                  No Siteprime, acreditamos que o entretenimento deve ser acessível a todos, independentemente de habilidades físicas,
                  sensoriais ou cognitivas. Seguimos as diretrizes WCAG 2.1 Nível AA e trabalhamos continuamente para melhorar
                  a experiência de todos os nossos usuários.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-pr-cyan/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <FontAwesomeIcon icon={faCheckCircle} className="text-pr-cyan text-2xl" />
                    </div>
                    <h3 className="font-black text-pr-cyan uppercase text-sm tracking-[0.1em] mb-2">
                      WCAG 2.1 AA
                    </h3>
                    <p className="text-xs text-pr-gray-light">
                      Conformidade com padrões internacionais de acessibilidade
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-pr-cyan/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <FontAwesomeIcon icon={faUniversalAccess} className="text-pr-cyan text-2xl" />
                    </div>
                    <h3 className="font-black text-pr-cyan uppercase text-sm tracking-[0.1em] mb-2">
                      INCLUSÃO TOTAL
                    </h3>
                    <p className="text-xs text-pr-gray-light">
                      Design para pessoas com diferentes necessidades
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-pr-cyan/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <FontAwesomeIcon icon={faInfoCircle} className="text-pr-cyan text-2xl" />
                    </div>
                    <h3 className="font-black text-pr-cyan uppercase text-sm tracking-[0.1em] mb-2">
                      MELHORIA CONTÍNUA
                    </h3>
                    <p className="text-xs text-pr-gray-light">
                      Atualizações regulares baseadas em feedback
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* RECURSOS DE ACESSIBILIDADE */}
          {activeSection === 'features' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {accessibilityFeatures.map((category) => (
                <div
                  key={category.id}
                  className="bg-pr-gray-dark/20 p-6 rounded-2xl border border-white/5 backdrop-blur-sm"
                >
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-pr-cyan/10 rounded-xl flex items-center justify-center border border-pr-cyan/20">
                      <FontAwesomeIcon icon={category.icon} className="text-pr-cyan text-xl" />
                    </div>
                    <h3 className="text-xl font-black uppercase tracking-widest">
                      {category.title}
                    </h3>
                  </div>
                  <ul className="space-y-3">
                    {category.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-3 text-sm text-pr-gray-light">
                        <FontAwesomeIcon icon={faCheckCircle} className="text-pr-cyan text-xs mt-0.5 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}

          {/* ATALHOS DE TECLADO */}
          {activeSection === 'keyboard' && (
            <div className="bg-pr-gray-dark/20 p-8 rounded-3xl border border-white/5 backdrop-blur-sm">
              <h2 className="text-2xl font-black uppercase tracking-widest mb-6">
                NAVEGAÇÃO POR TECLADO
              </h2>
              <p className="text-pr-gray-light mb-8 leading-relaxed">
                Navegue pela plataforma usando apenas o teclado. Todos os elementos interativos são acessíveis
                através das seguintes teclas:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {keyboardShortcuts.map((shortcut, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10"
                  >
                    <span className="font-mono text-pr-cyan font-bold">{shortcut.key}</span>
                    <span className="text-sm text-pr-gray-light flex-1 ml-4">{shortcut.description}</span>
                  </div>
                ))}
              </div>
              <div className="mt-8 p-6 bg-pr-cyan/5 border border-pr-cyan/20 rounded-2xl">
                <div className="flex items-start gap-4">
                  <FontAwesomeIcon icon={faKeyboard} className="text-pr-cyan text-xl mt-1" />
                  <div>
                    <h3 className="font-black text-pr-cyan uppercase text-sm tracking-[0.1em] mb-2">
                      DICAS DE NAVEGAÇÃO
                    </h3>
                    <ul className="text-sm text-pr-gray-light space-y-1">
                      <li>• Use Tab para mover o foco entre elementos</li>
                      <li>• Shift + Tab para voltar ao elemento anterior</li>
                      <li>• Enter ou Space para ativar botões</li>
                      <li>• Arrow Keys para navegar em listas e menus</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* CONTATO PARA QUESTÕES DE ACESSIBILIDADE */}
          {activeSection === 'contact' && (
            <div className="space-y-8">
              <div className="bg-pr-gray-dark/20 p-8 rounded-3xl border border-white/5 backdrop-blur-sm">
                <h2 className="text-2xl font-black uppercase tracking-widest mb-6">
                  RELATAR PROBLEMAS DE ACESSIBILIDADE
                </h2>
                <p className="text-pr-gray-light leading-relaxed mb-6">
                  Encontrou algum problema de acessibilidade ou tem sugestões para melhorar nossa plataforma?
                  Entre em contato conosco - sua opinião é fundamental para tornar o Siteprime mais inclusivo.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="font-black text-pr-cyan uppercase text-sm tracking-[0.1em]">
                      CANAIS DE CONTATO
                    </h3>
                    <div className="space-y-3">
                      <a
                        href="/contact"
                        className="flex items-center gap-3 text-pr-gray-light hover:text-pr-cyan transition-colors"
                      >
                        <FontAwesomeIcon icon={faUniversalAccess} />
                        <span>Formulário de Contato</span>
                      </a>
                      <a
                        href="mailto:acessibilidade@siteprime.com"
                        className="flex items-center gap-3 text-pr-gray-light hover:text-pr-cyan transition-colors"
                      >
                        <FontAwesomeIcon icon={faUniversalAccess} />
                        <span>acessibilidade@siteprime.com</span>
                      </a>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h3 className="font-black text-pr-cyan uppercase text-sm tracking-[0.1em]">
                      INFORMAÇÕES ÚTEIS
                    </h3>
                    <div className="space-y-3 text-sm text-pr-gray-light">
                      <p><strong>Resposta:</strong> Até 48 horas</p>
                      <p><strong>Idioma:</strong> Português</p>
                      <p><strong>Suporte:</strong> 24/7 para questões críticas</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-pr-cyan/5 border border-pr-cyan/20 p-6 rounded-3xl">
                <div className="flex items-start gap-4">
                  <FontAwesomeIcon icon={faExclamationTriangle} className="text-pr-cyan text-xl mt-1" />
                  <div>
                    <h3 className="font-black text-pr-cyan uppercase text-sm tracking-[0.1em] mb-2">
                      COMPROMISSO DE MELHORIA
                    </h3>
                    <p className="text-sm text-pr-gray-light leading-relaxed">
                      Analisamos todos os relatórios de acessibilidade e implementamos melhorias regularmente.
                      Seu feedback nos ajuda a criar uma experiência melhor para todos os usuários.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AccessibilityPage;