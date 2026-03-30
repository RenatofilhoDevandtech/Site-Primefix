import { useState, useEffect } from 'react';
import { useWeather } from '../hooks/useWeather';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWalking } from '@fortawesome/free-solid-svg-icons';

const HealthAlert = () => {
  const { condition } = useWeather();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // 7200 segundos = 2 horas
    const timer = setTimeout(() => setVisible(true), 7200000); 
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed bottom-6 left-6 z-[999] bg-pr-cyan text-pr-black p-5 rounded-3xl shadow-2xl flex items-start gap-4 animate-bounce max-w-[300px]">
      <div className="bg-black/10 p-3 rounded-2xl">
        <FontAwesomeIcon icon={faWalking} className="text-2xl" />
      </div>
      <div className="flex-1">
        <p className="text-[11px] font-black uppercase tracking-tighter leading-tight">
          Pausa para saúde! <br />
          {condition === 'Chuva' 
            ? "A chuva lá fora convida para o sofá, mas seu corpo precisa de 5 min de alongamento!" 
            : "O sol está lindo! Vá lá fora respirar um pouco antes do próximo episódio."}
        </p>
        <button onClick={() => setVisible(false)} className="mt-2 text-[9px] font-bold underline uppercase opacity-70">
          Entendido, mestre!
        </button>
      </div>
    </div>
  );
};

export default HealthAlert;