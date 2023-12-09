export interface Complaint{
    id: number;
    fromUser: string;
    date: Date;
    text: string;
    reply: string;
    replyDate: Date;
    onCompany: boolean;
    onAdministrator: boolean;
}