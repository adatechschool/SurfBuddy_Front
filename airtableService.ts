// src/services/airtableService.ts
import axios from 'axios';
import { AIRTABLE_API_TOKEN } from '@env';

// Définition des types
interface SurfDestinationFields {
  Name?: string;
  Country?: string;
  Description?: string;
  DifficultyLevel?: string;
  BestSeason?: string;
  WaveType?: string;
  Photos?: Array<{ url: string }>;
  Address?: string;
  "Surf Break"?: string[];
  [key: string]: any;
}

interface AirtableRecord {
  id: string;
  fields: SurfDestinationFields;
  createdTime: string;
}

interface AirtableResponse {
  records: AirtableRecord[];
  offset?: string;
}

// Configuration de base
const API_URL = 'https://api.airtable.com/v0/appTZF7inuXmhGrik/Surf%20Destinations';
const headers = {
  Authorization: `Bearer ${AIRTABLE_API_TOKEN}`,
  'Content-Type': 'application/json',
};

// Fonction pour faire une recherche (déplacée à l'intérieur de l'objet)
const getSpots = async (search: string): Promise<AirtableRecord[]> => {
  if (!search || search.trim() === '') {
    return airtableService.getAllDestinations();
  }
  
  const searchTerm = search.toLowerCase().trim();
  
  // ATTENTION: Utilisons seulement les champs qui existent certainement dans votre base Airtable
  // D'après l'erreur, il semble que les noms des champs soient peut-être différents
  // ou que certains champs n'existent pas
  const filterFormula = `OR(
    SEARCH(LOWER("${searchTerm}"), LOWER(IF({"Surf Break"}="", "", {"Surf Break"}))),
    SEARCH(LOWER("${searchTerm}"), LOWER(IF({Address}="", "", {Address})))
  )`;

  try {
    console.log("Recherche avec le terme:", searchTerm);
    
    // Essayons d'abord de récupérer tous les enregistrements pour examiner la structure
    const allRecords = await airtableService.getAllDestinations();
    
    if (allRecords.length > 0) {
      console.log("Structure du premier enregistrement:", 
        Object.keys(allRecords[0].fields).join(", "));
    }
    
    // Puis effectuons la recherche
    const response = await axios.get<AirtableResponse>(API_URL, {
      headers,
      params: {
        // En cas d'erreur de formule, récupérons simplement tous les enregistrements
        // et filtrons-les manuellement
        maxRecords: 100,
      },
    });
    
    // Filtrage manuel côté client
    const filteredRecords = response.data.records.filter(record => {
      const fields = record.fields;
      const searchInField = (fieldValue: any): boolean => {
        if (!fieldValue) return false;
        if (typeof fieldValue === 'string') {
          return fieldValue.toLowerCase().includes(searchTerm);
        }
        if (Array.isArray(fieldValue)) {
          return fieldValue.some(v => 
            typeof v === 'string' && v.toLowerCase().includes(searchTerm)
          );
        }
        return false;
      };
      
      // Recherche dans tous les champs disponibles
      return Object.values(fields).some(searchInField);
    });
    
    console.log(`Nombre de résultats trouvés: ${filteredRecords.length}`);
    return filteredRecords;
  } catch (error) {
    console.error("Erreur lors de la recherche:", error);
    if (axios.isAxiosError(error)) {
      console.error("Détails de l'erreur Axios:", error.response?.data || error.message);
    }
    
    // En cas d'erreur, récupérons tous les enregistrements et filtrons-les manuellement
    try {
      const allRecords = await airtableService.getAllDestinations();
      const filteredRecords = allRecords.filter(record => {
        return Object.values(record.fields).some(value => {
          if (typeof value === 'string') {
            return value.toLowerCase().includes(searchTerm);
          }
          if (Array.isArray(value)) {
            return value.some(v => 
              typeof v === 'string' && v.toLowerCase().includes(searchTerm)
            );
          }
          return false;
        });
      });
      
      console.log(`Après filtrage manuel, nombre de résultats: ${filteredRecords.length}`);
      return filteredRecords;
    } catch (fallbackError) {
      console.error("Échec du plan de secours:", fallbackError);
      return [];
    }
  }
};

const airtableService = {
  // Récupérer toutes les destinations
  async getAllDestinations(): Promise<AirtableRecord[]> {
    try {
      const response = await axios.get<AirtableResponse>(API_URL, { headers });
      
      // Debug : afficher la structure du premier enregistrement
      if (response.data.records.length > 0) {
        console.log("Champs disponibles dans la base:", 
          Object.keys(response.data.records[0].fields).join(", "));
      }
      
      return response.data.records;
    } catch (error) {
      console.error("Erreur lors de la récupération des données:", error);
      return [];
    }
  },

  // Ajouter une nouvelle destination
  async addDestination(fields: SurfDestinationFields): Promise<AirtableRecord> {
    const response = await axios.post<{ id: string; fields: SurfDestinationFields; createdTime: string }>(
      API_URL,
      { fields },
      { headers }
    );
    return response.data;
  },

  // Modifier une destination existante
  async updateDestination(id: string, fields: Partial<SurfDestinationFields>): Promise<AirtableRecord> {
    const response = await axios.patch<{ id: string; fields: SurfDestinationFields; createdTime: string }>(
      `${API_URL}/${id}`,
      { fields },
      { headers }
    );
    return response.data;
  },

  // Supprimer une destination
  async deleteDestination(id: string): Promise<void> {
    await axios.delete(`${API_URL}/${id}`, { headers });
  },
  
  // Ajout de la fonction getSpots à l'objet airtableService
  getSpots
};

export default airtableService;
export type { AirtableRecord };