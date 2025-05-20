import axios from 'axios'; // Librairie qui permet de faire des appels API
export interface Spot {
  id: number;
  spot_name: string;
  difficulty: any; // Vous pouvez typer plus précisément selon votre enum
  country: string;
  city: string;
  spot_picture?: string; // String base64 ou null
  latitude?: number | string; // Ajouté pour la map
  longitude?: number | string; // Ajouté pour la map
  season_begin?: string;
  season_end?: string;
  spot_type?: any;
  users_id?: number;
  
  // Propriétés optionnelles pour compatibilité
  spotPictureUrl?: string; // Si vous l'utilisez encore quelque part
}

export interface Spot_details {
  id: number;
  details: Spot;
  createdTime: string;
  }

  const headers = {
  'Content-Type': 'application/json',
};
   // Ajouter cette méthode à votre objet BDD
  const SpotService = {
    getSpotById: async (id: string): Promise<Spot_details | null> => {
    try {
      const response = await axios.get(`http://192.168.12.202:8000/${id}`, { headers });
      return response.data;
    } catch (error) {
      console.error("Erreur lors de la récupération du spot par ID:", error);
      return null;
    }
  }
}
export default SpotService; 