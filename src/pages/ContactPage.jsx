import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEnvelope,
  faPhone,
  faClock,
  faPaperPlane,
  faCheckCircle,
  faExclamationTriangle
} from '@fortawesome/free-solid-svg-icons';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulação de envio
    await new Promise(resolve => setTimeout(resolve, 2000));

    setSubmitStatus('success');
    setIsSubmitting(false);

    // Reset form after success
    setTimeout(() => {
      setFormData({ name: '', email: '', subject: '', message: '' });
      setSubmitStatus(null);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-pr-black text-white pt-32 pb-20 selection:bg-pr-cyan selection:text-pr-black">
      <div className="max-w-6xl mx-auto px-6">

        {/* HEADER */}
        <header className="text-center mb-16">
          <div className="inline-block p-4 rounded-3xl bg-pr-cyan/5 border border-pr-cyan/10 mb-6">
            <FontAwesomeIcon icon={faEnvelope} className="text-pr-cyan text-5xl opacity-80" />
          </div>
          <h1 className="text-5xl font-black tracking-tighter uppercase">
            FALE <span className="text-pr-cyan">CONOSCO</span>
          </h1>
          <p className="text-pr-gray-light mt-4 uppercase text-xs font-bold tracking-[0.2em] opacity-60">
            Suporte técnico e atendimento personalizado
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

          {/* FORMULÁRIO DE CONTATO */}
          <div className="bg-pr-gray-dark/20 p-8 rounded-3xl border border-white/5 backdrop-blur-sm">
            <h2 className="text-2xl font-black mb-6 uppercase tracking-widest">
              ENVIE SUA MENSAGEM
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-black uppercase tracking-[0.2em] text-pr-cyan mb-2">
                    Nome Completo
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-pr-gray-light focus:border-pr-cyan focus:outline-none transition-colors"
                    placeholder="Seu nome"
                  />
                </div>
                <div>
                  <label className="block text-xs font-black uppercase tracking-[0.2em] text-pr-cyan mb-2">
                    E-mail
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-pr-gray-light focus:border-pr-cyan focus:outline-none transition-colors"
                    placeholder="seu@email.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-black uppercase tracking-[0.2em] text-pr-cyan mb-2">
                  Assunto
                </label>
                <select
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-pr-cyan focus:outline-none transition-colors"
                >
                  <option value="">Selecione um assunto</option>
                  <option value="support">Suporte Técnico</option>
                  <option value="billing">Cobrança</option>
                  <option value="account">Conta</option>
                  <option value="feedback">Feedback</option>
                  <option value="other">Outro</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-black uppercase tracking-[0.2em] text-pr-cyan mb-2">
                  Mensagem
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={5}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-pr-gray-light focus:border-pr-cyan focus:outline-none transition-colors resize-none"
                  placeholder="Descreva sua dúvida ou solicitação..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-pr-cyan text-pr-black font-black py-4 px-8 rounded-xl hover:bg-white transition-all shadow-lg shadow-pr-cyan/20 uppercase tracking-[0.1em] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-pr-black border-t-transparent rounded-full animate-spin" />
                    ENVIANDO...
                  </>
                ) : (
                  <>
                    <FontAwesomeIcon icon={faPaperPlane} />
                    ENVIAR MENSAGEM
                  </>
                )}
              </button>

              {submitStatus === 'success' && (
                <div className="flex items-center gap-3 text-green-400 bg-green-400/10 border border-green-400/20 rounded-xl p-4">
                  <FontAwesomeIcon icon={faCheckCircle} />
                  <span className="text-sm font-bold">Mensagem enviada com sucesso! Responderemos em breve.</span>
                </div>
              )}
            </form>
          </div>

          {/* INFORMAÇÕES DE CONTATO */}
          <div className="space-y-6">
            <div className="bg-pr-gray-dark/20 p-8 rounded-3xl border border-white/5 backdrop-blur-sm">
              <h2 className="text-2xl font-black mb-6 uppercase tracking-widest">
                CANAIS DE ATENDIMENTO
              </h2>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-pr-cyan/10 rounded-xl flex items-center justify-center border border-pr-cyan/20">
                    <FontAwesomeIcon icon={faEnvelope} className="text-pr-cyan" />
                  </div>
                  <div>
                    <h3 className="font-black text-pr-cyan uppercase text-sm tracking-[0.1em] mb-1">E-MAIL</h3>
                    <p className="text-pr-gray-light text-sm">suporte@siteprime.com</p>
                    <p className="text-xs text-white/40 mt-1">Resposta em até 24h</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-pr-cyan/10 rounded-xl flex items-center justify-center border border-pr-cyan/20">
                    <FontAwesomeIcon icon={faPhone} className="text-pr-cyan" />
                  </div>
                  <div>
                    <h3 className="font-black text-pr-cyan uppercase text-sm tracking-[0.1em] mb-1">TELEFONE</h3>
                    <p className="text-pr-gray-light text-sm">0800 123 4567</p>
                    <p className="text-xs text-white/40 mt-1">Seg-Sex, 9h às 18h</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-pr-cyan/10 rounded-xl flex items-center justify-center border border-pr-cyan/20">
                    <FontAwesomeIcon icon={faClock} className="text-pr-cyan" />
                  </div>
                  <div>
                    <h3 className="font-black text-pr-cyan uppercase text-sm tracking-[0.1em] mb-1">HORÁRIO</h3>
                    <p className="text-pr-gray-light text-sm">Segunda a Sexta</p>
                    <p className="text-xs text-white/40 mt-1">9:00 - 18:00 (GMT-3)</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-pr-cyan/5 border border-pr-cyan/20 p-6 rounded-3xl">
              <div className="flex items-start gap-4">
                <FontAwesomeIcon icon={faExclamationTriangle} className="text-pr-cyan text-xl mt-1" />
                <div>
                  <h3 className="font-black text-pr-cyan uppercase text-sm tracking-[0.1em] mb-2">IMPORTANTE</h3>
                  <p className="text-sm text-pr-gray-light leading-relaxed">
                    Para questões relacionadas à conta ou cobrança, tenha em mãos seu e-mail de cadastro e o número do protocolo caso já tenha entrado em contato.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;