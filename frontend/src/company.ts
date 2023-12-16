import { Equipment } from 'src/Equipment';
import { CompanyAdministrator } from './app/models/CompanyAdministrator';
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
    companyAdministrators : CompanyAdministrator[];
    openingTime: string;
    closingTime: string;
}

