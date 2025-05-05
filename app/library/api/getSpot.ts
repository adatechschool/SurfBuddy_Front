// lib/api/getSpots.ts
export const getSpots = async (search: string) => {
    try {
      const response = await fetch(`https://ton-api.com/spots?q=${encodeURIComponent(search)}`, {
        headers: {
          Authorization: 'patwEzaJQQaVEgpF5.420e28af30c5e495f54abf9996e03dc48217ea99edfde35e0078de97e63aff7b',
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        throw new Error('Erreur API');
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Erreur de requête :', error);
      return [];
    }
  };
  