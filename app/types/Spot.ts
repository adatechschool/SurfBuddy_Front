export interface Spot {
  id: bigint;
  spot_name: string;
  city?: string;
  country?: string;
  difficulty?: string;
  description?: string;
  spot_picture?: string;
  spotPictureUrl?: string;
  latitude?: number;
  longitude?: number;
  seasonbegin?:Date;
  seasonend?:Date;
}

