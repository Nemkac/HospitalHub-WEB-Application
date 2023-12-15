import { Equipment } from 'src/Equipment';
export interface Company {
    id: number;
    name: string;
    city: string;
    country: string;
    address: string;
    latitude: number;
    longitude: number;
    description: string;
    avgRate: number;
    medicalEquipmentList: Equipment[];
}

