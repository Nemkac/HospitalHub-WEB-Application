export interface MedicalEquipment {
    id: number;
    name: string;
    type: string;
    description: string;
  }
  
  export interface Company {
    id: number;
    name: string;
    city: string;
    country: string;
    avgRate: number;
    medicalEquipmentList: MedicalEquipment[];
  }
  