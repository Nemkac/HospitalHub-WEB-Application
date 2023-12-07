export interface Complaint{
    id: number;
    date: Date;
    text: string;
    reply: string;
    onCompany: boolean;
    onAdministrator: boolean;
}