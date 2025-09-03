// A chave que usaremos para salvar a lista no localStorage.
const MY_LIST_KEY = 'primeflix-my-list';
// Limite máximo de itens na lista para evitar problemas de desempenho
const MAX_LIST_SIZE = 200;

// Exporta um objeto com todos os métodos para gerenciar o armazenamento local.
export const movieStorageService = {
  /**
   * Recupera a lista de filmes/séries do localStorage.
   * @returns {Array} - A lista salva ou um array vazio se não houver nada.
   */
  getMyList: () => {
    try {
      const storedList = localStorage.getItem(MY_LIST_KEY);
      return storedList ? JSON.parse(storedList) : [];
    } catch (error) {
      console.error("Erro ao ler 'Minha Lista' do localStorage:", error);
      return [];
    }
  },

  /**
   * Salva a lista completa no localStorage.
   * @param {Array} list - A lista a ser salva.
   * @returns {boolean} - True se salvou com sucesso, false caso contrário.
   */
  saveMyList: (list) => {
    try {
      if (list.length > MAX_LIST_SIZE) {
        console.warn(`A lista excede o tamanho máximo de ${MAX_LIST_SIZE} itens.`);
        return false;
      }
      
      const listAsString = JSON.stringify(list);
      localStorage.setItem(MY_LIST_KEY, listAsString);
      return true;
    } catch (error) {
      console.error("Erro ao salvar 'Minha Lista' no localStorage:", error);
      return false;
    }
  },

  /**
   * Adiciona um novo item à lista.
   * @param {object} item - O objeto a ser adicionado.
   * @returns {object|null} - O novo item com ID local único ou null se falhou.
   */
  addItem: (item) => {
    try {
      const currentList = movieStorageService.getMyList();
      
      // Verifica se o item já existe na lista
      if (item.id && currentList.some(i => i.id === item.id)) {
        console.warn("Item já existe na lista.");
        return null;
      }
      
      if (currentList.length >= MAX_LIST_SIZE) {
        console.warn(`A lista atingiu o limite máximo de ${MAX_LIST_SIZE} itens.`);
        return null;
      }
      
      const newItem = { 
        ...item, 
        localId: `local_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        addedAt: new Date().toISOString(),
        // Garante que campos numéricos sejam números
        vote_average: item.vote_average ? Number(item.vote_average) : null,
        runtime: item.runtime ? Number(item.runtime) : null,
        // Tipo de conteúdo (movie ou tv)
        media_type: item.media_type || 'movie'
      };
      
      const updatedList = [...currentList, newItem];
      const saved = movieStorageService.saveMyList(updatedList);
      
      return saved ? newItem : null;
    } catch (error) {
      console.error("Erro ao adicionar item à lista:", error);
      return null;
    }
  },

  /**
   * Atualiza um item existente na lista.
   * @param {object} updatedItem - O objeto com as informações atualizadas.
   * @returns {boolean} - True se atualizou com sucesso, false caso contrário.
   */
  updateItem: (updatedItem) => {
    try {
      const currentList = movieStorageService.getMyList();
      const updatedList = currentList.map((item) =>
        item.localId === updatedItem.localId ? { 
          ...updatedItem,
          addedAt: item.addedAt || new Date().toISOString(),
          vote_average: updatedItem.vote_average ? Number(updatedItem.vote_average) : null,
          runtime: updatedItem.runtime ? Number(updatedItem.runtime) : null
        } : item
      );
      
      return movieStorageService.saveMyList(updatedList);
    } catch (error) {
      console.error("Erro ao atualizar item na lista:", error);
      return false;
    }
  },

  /**
   * Remove um item da lista pelo seu ID local.
   * @param {string} localId - O ID local do item a ser removido.
   * @returns {boolean} - True se removeu com sucesso, false caso contrário.
   */
  removeItem: (localId) => {
    try {
      const currentList = movieStorageService.getMyList();
      const updatedList = currentList.filter((item) => item.localId !== localId);
      return movieStorageService.saveMyList(updatedList);
    } catch (error) {
      console.error("Erro ao remover item da lista:", error);
      return false;
    }
  },

  /**
   * Encontra um item na lista pelo seu ID local.
   * @param {string} localId - O ID local do item a ser encontrado.
   * @returns {object|undefined} - O objeto do item ou undefined se não for encontrado.
   */
  getItemById: (localId) => {
    try {
      const currentList = movieStorageService.getMyList();
      return currentList.find((item) => item.localId === localId);
    } catch (error) {
      console.error("Erro ao buscar item por ID:", error);
      return undefined;
    }
  },

  /**
   * Verifica se um item já está na lista baseado no ID do TMDB.
   * @param {number} tmdbId - O ID do item no TMDB.
   * @returns {boolean} - True se o item está na lista, false caso contrário.
   */
  isItemInList: (tmdbId) => {
    try {
      const currentList = movieStorageService.getMyList();
      return currentList.some(item => item.id === tmdbId);
    } catch (error) {
      console.error("Erro ao verificar se item está na lista:", error);
      return false;
    }
  },

  /**
   * Busca itens na lista por título (case insensitive).
   * @param {string} query - O termo de busca.
   * @returns {Array} - Array de itens que correspondem à busca.
   */
  searchItems: (query) => {
    try {
      const currentList = movieStorageService.getMyList();
      const searchTerm = query.toLowerCase();
      
      return currentList.filter(item => 
        (item.title && item.title.toLowerCase().includes(searchTerm)) ||
        (item.name && item.name.toLowerCase().includes(searchTerm))
      );
    } catch (error) {
      console.error("Erro ao buscar itens na lista:", error);
      return [];
    }
  },

  /**
   * Filtra itens por tipo (movie ou tv).
   * @param {string} type - O tipo para filtrar ('movie' ou 'tv').
   * @returns {Array} - Array de itens que pertencem ao tipo.
   */
  filterByType: (type) => {
    try {
      const currentList = movieStorageService.getMyList();
      return currentList.filter(item => item.media_type === type);
    } catch (error) {
      console.error("Erro ao filtrar itens por tipo:", error);
      return [];
    }
  },

  /**
   * Obtém estatísticas da lista.
   * @returns {object} - Estatísticas da lista.
   */
  getStats: () => {
    try {
      const currentList = movieStorageService.getMyList();
      const totalItems = currentList.length;
      
      const movies = currentList.filter(item => item.media_type === 'movie');
      const series = currentList.filter(item => item.media_type === 'tv');
      
      const totalRuntime = movies.reduce((sum, movie) => sum + (movie.runtime || 0), 0);
      
      const averageRating = totalItems > 0 
        ? currentList.reduce((sum, item) => sum + (item.vote_average || 0), 0) / totalItems 
        : 0;
      
      return {
        totalItems,
        movies: movies.length,
        series: series.length,
        totalRuntime,
        averageRating: Number(averageRating.toFixed(1))
      };
    } catch (error) {
      console.error("Erro ao obter estatísticas da lista:", error);
      return {
        totalItems: 0,
        movies: 0,
        series: 0,
        totalRuntime: 0,
        averageRating: 0
      };
    }
  }
};