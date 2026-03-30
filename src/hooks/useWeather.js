import { useState, useEffect } from 'react';

export const useWeather = () => {
  const [weather, setWeather] = useState({ 
    temp: null, 
    condition: 'Limpo', 
    city: 'Carregando...', 
    loading: true 
  });
  
  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

  useEffect(() => {
    const fetchWeather = async (lat, lon) => {
      try {
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=pt_br`
        );
        const data = await res.json();
        
        // Mapeamento mais semântico para o seu Branding
        const mainCondition = data.weather[0].main;
        let mappedCondition = 'Limpo';

        if (['Rain', 'Drizzle', 'Thunderstorm'].includes(mainCondition)) {
          mappedCondition = 'Chuva';
        } else if (mainCondition === 'Clouds') {
          mappedCondition = 'Nuvens';
        }

        setWeather({
          temp: Math.round(data.main.temp),
          condition: mappedCondition,
          city: data.name, // 📍 Aqui pegamos o nome real da cidade
          description: data.weather[0].description,
          loading: false
        });
      } catch (err) {
        console.error("Erro ao buscar clima:", err);
        setWeather(prev => ({ 
          ...prev, 
          city: 'São Paulo', // Fallback de nome caso a API falhe
          loading: false 
        }));
      }
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => fetchWeather(pos.coords.latitude, pos.coords.longitude),
        () => fetchWeather(-23.5505, -46.6333) // Fallback SP coordenadas exatas
      );
    } else {
      fetchWeather(-23.5505, -46.6333);
    }
  }, [API_KEY]);

  return weather;
};