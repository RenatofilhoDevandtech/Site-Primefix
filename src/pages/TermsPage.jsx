const TermsPage = () => {
  return (
    /* pt-40 aplicado aqui também para resolver o erro da imagem termo.png */
    <div className="min-h-screen bg-pr-black text-white pt-40 pb-20 selection:bg-pr-cyan selection:text-pr-black">
      <div className="max-w-4xl mx-auto px-6">
        
        <header className="mb-16 text-center">
          <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-4">
            TERMOS DE <span className="text-pr-cyan">USO</span>
          </h1>
          <div className="h-1.5 w-24 bg-pr-cyan mx-auto rounded-full shadow-[0_0_10px_rgba(0,255,255,0.5)]" />
        </header>

        <div className="space-y-12">
          {/* Introdução */}
          <section className="bg-pr-gray-dark/10 p-8 rounded-[2.5rem] border border-white/5">
            <h2 className="text-xl font-black text-white mb-6 uppercase tracking-widest">
              ACEITAÇÃO DOS TERMOS
            </h2>
            <p className="text-pr-gray-light leading-relaxed">
              Ao acessar a plataforma Siteprime, você concorda em cumprir estes termos de serviço, todas as leis e regulamentos aplicáveis. Se você não concordar com algum destes termos, está proibido de usar ou acessar este site.
            </p>
          </section>

          {/* Licença de Uso */}
          <section className="px-8">
            <h2 className="text-xl font-black text-white mb-6 uppercase tracking-widest flex items-center gap-3">
              LICENÇA DE USO
            </h2>
            <p className="text-pr-gray-light leading-relaxed mb-6">
              É concedida permissão para acessar temporariamente o catálogo para visualização pessoal e não comercial. Esta é a concessão de uma licença, não uma transferência de título e, sob esta licença, você não pode:
            </p>
            <ul className="space-y-3 font-bold uppercase text-[10px] tracking-widest text-white/70">
              <li className="flex items-start gap-2 italic-none">
                <span className="text-pr-cyan">[!]</span> MODIFICAR OU COPIAR OS MATERIAIS;
              </li>
              <li className="flex items-start gap-2 italic-none">
                <span className="text-pr-cyan">[!]</span> USAR PARA QUALQUER FINALIDADE COMERCIAL;
              </li>
              <li className="flex items-start gap-2 italic-none">
                <span className="text-pr-cyan">[!]</span> REMOVER QUALQUER DIREITO AUTORAL OU NOTA DE PROPRIEDADE.
              </li>
            </ul>
          </section>

          {/* Isenção de Responsabilidade */}
          <section className="px-8 border-l-2 border-pr-cyan/20">
            <h2 className="text-xl font-black text-white mb-6 uppercase tracking-widest">
              ISENÇÃO DE RESPONSABILIDADE
            </h2>
            <p className="text-pr-gray-light leading-relaxed">
              Os materiais no site da Siteprime são fornecidos &apos;como estão&apos;. Não oferecemos garantias de precisão absoluta, pois os dados (trailers e metadados) são provenientes de bases de dados de terceiros como o TMDB.
            </p>
          </section>

          <div className="text-center pt-20">
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-pr-gray opacity-50">
              SITEPRIME © {new Date().getFullYear()} • TODOS OS DIREITOS RESERVADOS
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsPage;