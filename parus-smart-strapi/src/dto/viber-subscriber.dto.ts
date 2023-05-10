export interface IViberSubscriberDto {
    id: string;
    viber_id: string;
    full_name: string;
    avatar: string;
    phone_number: string;
    personal_number: string;
}

export const createViberSubscriberDto = (item: any): IViberSubscriberDto => {
    return {
        ...item,
    };
};
