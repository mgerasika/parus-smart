import { createViberSubscriberDto, IViberSubscriberDto } from '../dto/viber-subscriber.dto';
import { IApiResult } from '../interfaces/api-result.interface';

const useGetListAsync = async (): Promise<IApiResult<IViberSubscriberDto[]>> => {
    const res: any = await (strapi as any).service('api::viber-subscriber.viber-subscriber').find({});
    return { data: res.results.map((i: any) => createViberSubscriberDto(i)) };
};

const useGetByIdAsync = async (id: string): Promise<IApiResult<IViberSubscriberDto>> => {
    const res: any = await (strapi as any).service('api::viber-subscriber.viber-subscriber').findOne(id, { id });
    return { data: createViberSubscriberDto(res) };
};

export interface IViberSubscriberCreateArgs {
    viber_id: string;
    full_name: string;
    avatar: string;
    phone_number?: string;
    personal_number?: string;
}
const useCreateSubscriptionAsync = async (dto: IViberSubscriberCreateArgs): Promise<IApiResult<IViberSubscriberDto>> => {
    const { data: prev } = await useGetSubscriberByViberIdAsync(dto.viber_id);
    if (prev) {
        throw 'Subscription already exist with such id';
    }
    const res: any = await (strapi as any).service('api::viber-subscriber.viber-subscriber').create({ data: dto });
    return { data: createViberSubscriberDto(res) };
};

const useUpdateByViberIdAsync = async (
    viberId: string,
    dto: Partial<IViberSubscriberCreateArgs>,
): Promise<IApiResult<IViberSubscriberDto>> => {
    const { data: prev } = await useGetSubscriberByViberIdAsync(viberId);
    if (!prev) {
        throw 'Subscription not found';
    }
    const res: any = await (strapi as any).service('api::viber-subscriber.viber-subscriber').update(prev.id, { data: dto });
    console.log('update success', res);
    return { data: createViberSubscriberDto(res) };
};

const useDeleteSubscriptionAsync = async (id: string): Promise<void> => {
    await (strapi as any).service('api::viber-subscriber.viber-subscriber').delete('' as unknown as never, { id });
};

const useGetSubscriberByViberIdAsync = async (viberId: string): Promise<IApiResult<IViberSubscriberDto | undefined>> => {
    const subscribers = await useGetListAsync();
    const res = subscribers?.data?.find((f) => f.viber_id === viberId);
    return { data: res };
};

const useDeleteSubscriptionByViberIdAsync = async (viberId: string): Promise<void> => {
    const { data: subscriberInfo } = await useGetSubscriberByViberIdAsync(viberId);
    if (subscriberInfo) {
        await (strapi as any)
            .service('api::viber-subscriber.viber-subscriber')
            .delete('' as unknown as never, { id: subscriberInfo.id });
    } else {
        throw 'Subscription not found ' + viberId;
    }
};

export const viberSubscriber = {
    useGetByIdAsync,
    useGetListAsync,
    useCreateSubscriptionAsync,
    useDeleteSubscriptionAsync,
    useDeleteSubscriptionByViberIdAsync,
    useGetSubscriberByViberIdAsync,
    useUpdateByViberIdAsync,
};
