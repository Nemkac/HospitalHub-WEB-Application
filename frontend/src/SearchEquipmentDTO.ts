import { Company } from './company';
import { Equipment } from './Equipment';

export interface SearchEquipmentDTO{
    equipmentDTOList : Equipment[];
    companies : Company[];
}