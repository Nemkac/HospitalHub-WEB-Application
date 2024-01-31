export interface Complaint{
    id: number;
    fromUser: string;
    date: Date;
    text: string;
    reply: string;
    replyDate: Date;
    repliedBy: string;
    onCompany: boolean;
    onAdministrator: boolean;
}