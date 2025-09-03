// URL base para todas as imagens da TMDB
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/';

// Mapeamento de tamanhos para diferentes tipos de mídia
const SIZE_OPTIMIZATIONS = {
  poster: {
    defaults: { mobile: 'w342', tablet: 'w500', desktop: 'w780' },
    aspectRatio: '2/3'
  },
  backdrop: {
    defaults: { mobile: 'w780', tablet: 'w1280', desktop: 'original' },
    aspectRatio: '16/9'
  },
  profile: {
    defaults: { mobile: 'w185', tablet: 'w342', desktop: 'w500' },
    aspectRatio: '2/3'
  },
  still: {
    defaults: { mobile: 'w300', tablet: 'w400', desktop: 'original' },
    aspectRatio: '16/9'
  }
};

// Cache para otimizar performance
const imageCache = new Map();

/**
 * Constrói a URL otimizada para uma imagem da TMDB com fallback inteligente
 * e suporte a diferentes dispositivos e tipos de mídia
 * 
 * @param {string | null | undefined} filePath - Caminho da imagem
 * @param {Object} options - Opções de otimização
 * @param {string} options.size - Tamanho específico (sobrescreve otimização responsiva)
 * @param {string} options.type - Tipo de mídia ('poster', 'backdrop', 'profile', 'still')
 * @param {boolean} options.retina - Se deve considerar displays retina
 * @param {boolean} options.webp - Forçar formato WebP (se suportado)
 * @returns {string} - URL completa otimizada ou placeholder responsivo
 */
export const buildImageUrl = (filePath, options = {}) => {
  const {
    size = null,
    type = 'poster',
    retina = false,
    webp = false
  } = options;

  // Gerar chave de cache única
  const cacheKey = `${filePath}-${size}-${type}-${retina}-${webp}`;
  
  // Verificar se resultado está em cache
  if (imageCache.has(cacheKey)) {
    return imageCache.get(cacheKey);
  }

  // Fallback inteligente para imagens ausentes
  if (!filePath || typeof filePath !== 'string' || filePath.trim() === '') {
    const placeholderUrl = generateResponsivePlaceholder(type, retina);
    imageCache.set(cacheKey, placeholderUrl);
    return placeholderUrl;
  }

  // Verificar se já é uma URL completa (evitar dupla construção)
  if (filePath.startsWith('http')) {
    imageCache.set(cacheKey, filePath);
    return filePath;
  }

  // Otimização responsiva do tamanho
  const optimizedSize = size || getResponsiveSize(type, retina);
  
  // Normalização do path
  const normalizedPath = filePath.startsWith('/') ? filePath : `/${filePath}`;
  
  // Construir URL base
  let imageUrl = `${IMAGE_BASE_URL}${optimizedSize}${normalizedPath}`;
  
  // Adicionar parâmetro de formato se WebP for suportado e solicitado
  if (webp && supportsWebP()) {
    imageUrl += '.webp';
  }
  
  // Armazenar no cache
  imageCache.set(cacheKey, imageUrl);
  
  return imageUrl;
};

/**
 * Detecta automaticamente o tipo de imagem com base no caminho do arquivo
 */
export const detectImageType = (filePath) => {
  if (!filePath) return 'poster';
  
  if (filePath.includes('backdrop')) return 'backdrop';
  if (filePath.includes('profile') || filePath.includes('avatar')) return 'profile';
  if (filePath.includes('still')) return 'still';
  
  // Padrões comuns para diferentes tipos
  if (filePath.includes('poster') || filePath.match(/\/p\/|poster/)) return 'poster';
  if (filePath.includes('backdrop') || filePath.match(/\/b\/|backdrop/)) return 'backdrop';
  if (filePath.includes('profile') || filePath.match(/\/a\/|avatar/)) return 'profile';
  
  return 'poster'; // padrão
};

/**
 * Gera um placeholder responsivo baseado no tipo de mídia
 */
const generateResponsivePlaceholder = (type, retina) => {
  // A variável aspectRatio foi removida pois não estava sendo utilizada
  const [width, height] = getPlaceholderDimensions(type, retina);
  
  // Usar serviço de placeholder mais confiável
  return `https://via.placeholder.com/${width}x${height}/1a1c22/4a5568/?text=Imagem+Indispon%C3%ADvel`;
};

/**
 * Obtém dimensões otimizadas para placeholder
 */
const getPlaceholderDimensions = (type, retina) => {
  const multiplier = retina ? 2 : 1;
  
  switch (type) {
    case 'backdrop':
      return [800 * multiplier, 450 * multiplier];
    case 'profile':
      return [300 * multiplier, 450 * multiplier];
    case 'still':
      return [400 * multiplier, 225 * multiplier];
    default: // poster
      return [500 * multiplier, 750 * multiplier];
  }
};

/**
 * Determina o tamanho responsivo baseado no tipo de dispositivo
 */
const getResponsiveSize = (type, retina) => {
  const config = SIZE_OPTIMIZATIONS[type] || SIZE_OPTIMIZATIONS.poster;
  const deviceType = getDeviceType();
  const baseSize = config.defaults[deviceType];
  
  return retina && baseSize !== 'original' ? 
    getRetinaSize(baseSize) : 
    baseSize;
};

/**
 * Detecta o tipo de dispositivo
 */
const getDeviceType = () => {
  if (typeof window === 'undefined') return 'desktop';
  
  const width = window.innerWidth;
  if (width < 768) return 'mobile';
  if (width < 1024) return 'tablet';
  return 'desktop';
};

/**
 * Obtém versão retina do tamanho quando aplicável
 */
const getRetinaSize = (baseSize) => {
  const sizeMap = {
    'w92': 'w154',
    'w154': 'w185',
    'w185': 'w342',
    'w342': 'w500',
    'w500': 'w780',
    'w780': 'w1280',
    'w1280': 'original'
  };
  
  return sizeMap[baseSize] || baseSize;
};

// Cache para verificação de suporte a WebP
let webpSupported = null;

/**
 * Detecta suporte a WebP com cache
 */
export const supportsWebP = () => {
  if (typeof window === 'undefined') return false;
  
  if (webpSupported !== null) return webpSupported;
  
  try {
    const canvas = document.createElement('canvas');
    if (canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0) {
      webpSupported = true;
    } else {
      webpSupported = false;
    }
  } catch (e) {
    webpSupported = false;
  }
  
  return webpSupported;
};

/**
 * Limpa o cache de imagens (útil para testes ou mudanças de contexto)
 */
export const clearImageCache = () => {
  imageCache.clear();
};

/**
 * Função auxiliar para pré-carregar imagens
 */
export const preloadImage = (url) => {
  return new Promise((resolve, reject) => {
    if (!url) {
      reject(new Error('URL não fornecida'));
      return;
    }
    
    const img = new Image();
    img.onload = () => resolve(url);
    img.onerror = () => reject(new Error(`Falha ao carregar imagem: ${url}`));
    img.src = url;
  });
};

/**
 * Função para verificar se uma imagem existe
 */
export const checkImageExists = async (url) => {
  try {
    const response = await fetch(url, { method: 'HEAD' });
    return response.ok;
  } catch (error) {
    return false;
  }
};