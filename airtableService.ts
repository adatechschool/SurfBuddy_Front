// src/services/airtableService.ts
import axios from 'axios'; // Librairie qui permet de faire des appels API
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

const airtableService = {
  // Récupérer toutes les destinations
  async getAllDestinations(): Promise<AirtableRecord[]> {
    const response = await axios.get<AirtableResponse>(API_URL, { headers });
    return response.data.records;
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
  }
};

export default airtableService;
export type { AirtableRecord };
