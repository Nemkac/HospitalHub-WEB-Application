export interface Complaint{
    id: number;
    fromUser: string;
    date: Date;
    text: string;
    reply: string;
    onCompany: boolean;
    onAdministrator: boolean;
}