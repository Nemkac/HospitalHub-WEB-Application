import { Equipment } from 'src/Equipment';
export interface Company {
    id: number;
    name: string;
    city: string;
    country: string;
    avgRate: number;  
    medicalEquipmentList: Equipment[];
}