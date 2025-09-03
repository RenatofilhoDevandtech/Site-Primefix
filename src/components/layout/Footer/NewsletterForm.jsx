import { useState } from 'react';

const NewsletterForm = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // 'idle', 'loading', 'success'

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email || status === 'loading') return;

    setStatus('loading');
    // Simula uma chamada de API
    setTimeout(() => {
      console.log(`Email submetido: ${email}`);
      setStatus('success');
      setTimeout(() => setStatus('idle'), 3000); // Reseta o formulário após 3s
    }, 1500);
  };

  return (
    <div>
      <h4 className="text-lg text-pr-gray-light font-semibold mb-3">Inscreva-se na nossa newsletter</h4>
      <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2">
        <input
          type="email"
          placeholder="Seu e-mail"
          className="px-4 py-2 bg-pr-black/30 border border-pr-border rounded-md text-white focus:outline-none focus:ring-2 focus:ring-pr-cyan flex-grow disabled:opacity-50"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={status === 'loading' || status === 'success'}
        />
        <button
          type="submit"
          className="px-4 py-2 bg-pr-cyan text-pr-black font-medium rounded-md hover:bg-pr-cyan/90 transition-colors disabled:bg-pr-gray disabled:cursor-not-allowed w-full sm:w-auto"
          disabled={status === 'loading' || status === 'success'}
        >
          {status === 'loading' && 'Enviando...'}
          {status === 'success' && 'Inscrito!'}
          {status === 'idle' && 'Inscrever'}
        </button>
      </form>
    </div>
  );
};

export default NewsletterForm;