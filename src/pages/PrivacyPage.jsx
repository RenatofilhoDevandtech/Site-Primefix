const PrivacyPage = () => {
  return (
    /* pt-40 garante que o título apareça totalmente abaixo do Header fixo */
    <div className="min-h-screen bg-pr-black text-white pt-40 pb-20 selection:bg-pr-cyan selection:text-pr-black">
      <div className="max-w-4xl mx-auto px-6">
        
        <header className="mb-16 text-center">
          <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-4">
            POLÍTICA DE <span className="text-pr-cyan">PRIVACIDADE</span>
          </h1>
          <div className="h-1.5 w-24 bg-pr-cyan mx-auto rounded-full shadow-[0_0_10px_rgba(0,255,255,0.5)]" />
        </header>

        <div className="space-y-12">
          {/* Seção 01 */}
          <section className="bg-pr-gray-dark/10 p-8 rounded-[2.5rem] border border-white/5 backdrop-blur-sm">
            <h2 className="text-xl font-black text-white mb-6 uppercase tracking-widest flex items-center gap-3">
              <span className="text-pr-cyan text-sm">01.</span> COLETA DE DADOS
            </h2>
            <p className="text-pr-gray-light leading-relaxed mb-6">
              Coletamos informações que você nos fornece diretamente ao interagir com a plataforma, como criação de conta e curadoria de listas.
            </p>
            <ul className="space-y-4 font-bold uppercase text-[10px] tracking-[0.2em] text-white/60">
              <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 bg-pr-cyan rounded-full" /> IDENTIFICAÇÃO PESSOAL (E-MAIL)</li>
              <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 bg-pr-cyan rounded-full" /> HISTÓRICO DE INTERAÇÃO NO CATÁLOGO</li>
              <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 bg-pr-cyan rounded-full" /> DADOS TÉCNICOS DE ACESSO</li>
            </ul>
          </section>

          {/* Seção 02 */}
          <section className="px-8 border-l-2 border-pr-cyan/20">
            <h2 className="text-xl font-black text-white mb-6 uppercase tracking-widest flex items-center gap-3">
              <span className="text-pr-cyan text-sm">02.</span> FINALIDADE DO USO
            </h2>
            <p className="text-pr-gray-light leading-relaxed">
              Os dados são utilizados exclusivamente para o aprimoramento da interface Siteprime, personalização de recomendações e segurança da infraestrutura. Não comercializamos dados com terceiros.
            </p>
          </section>

          {/* Seção 03 */}
          <section className="px-8 border-l-2 border-pr-cyan/20">
            <h2 className="text-xl font-black text-white mb-6 uppercase tracking-widest flex items-center gap-3">
              <span className="text-pr-cyan text-sm">03.</span> PROTEÇÃO E CRIPTOGRAFIA
            </h2>
            <p className="text-pr-gray-light leading-relaxed">
              Implementamos protocolos de segurança robustos para garantir que sua lista e suas preferências permaneçam privadas e protegidas contra acessos não autorizados.
            </p>
          </section>

          {/* Rodapé da Página */}
          <div className="text-center pt-20 border-t border-white/5">
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-pr-gray opacity-50">
              ÚLTIMA ATUALIZAÇÃO: {new Date().toLocaleDateString('pt-BR')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPage;