import { VIBER_LINKS } from '@src/constants/viber-links.constant';
import { IGTableValueDto } from '@src/dto/gtable-value.dto';
import { IViberSubscriberDto } from '@src/dto/viber-subscriber.dto';
import { ECounterType } from '@src/enums/counter-type.enum';
import { apiHooks } from '@src/hooks/api-hooks';
import { IApiResult } from '@src/interfaces/api-result.interface';
import { IViberRequest } from '@src/interfaces/viber-request.interface';
import { IViberSender } from '@src/interfaces/viber-sender.interface';
import { ViberServerContext } from '@src/shared/viber-server.context';
import { getViberActionId } from '@src/utils/get-viber-action-id.util';
import { StringBuilder } from '@src/utils/string-builder.util';
import { useServerEffect } from '@src/viber-components/use-server-effect.hook';
import { ViberButton } from '@src/viber-components/viber-button.component';
import { ViberKeyboard } from '@src/viber-components/viber-keyboard.component';
import { ViberMessage } from '@src/viber-components/viber-message.component';
import dayjs from 'dayjs';
import React, { useContext } from 'react';
import { EIndexAction } from './index-page.component';
dayjs.locale('ua');

interface IProps {
    request: IViberRequest;
}

enum EPersonalPageActions {
    updatePersonalNumber = 'updatePersonalNumber',
    confirmUpdatePersonalNumber = 'confirmUpdatePersonalNumber',
}

export const PersonalPage = ({ request: { actionArg, body } }: IProps): JSX.Element => {
    const context = useContext(ViberServerContext);

    const { link } = actionArg;
    let newPhoneNumber: string | undefined = '';
    if (actionArg.actionName === EIndexAction.sharePhone) {
        newPhoneNumber = body?.message.contact?.phone_number;
    }

    const [currentSubscription] = useServerEffect<IApiResult<IViberSubscriberDto | undefined> | undefined>(
        undefined,
        'currentViberSubscription',
        () => apiHooks.viberSubscriber.useGetSubscriberByViberIdAsync(body?.sender?.id || ''),
    );

    if (
        currentSubscription &&
        !currentSubscription?.data?.phone_number &&
        actionArg.actionName === EIndexAction.sharePhone
    ) {
        useServerEffect<IApiResult<IViberSubscriberDto>>(undefined, 'updateSubscription', () => {
            return apiHooks.viberSubscriber
                .useUpdateByViberIdAsync(body?.sender?.id || '', {
                    phone_number: newPhoneNumber,
                })
                .then((data) => {
                    (context as any)['currentViberSubscription'] = data;
                    return data;
                });
        });
    }

    if (
        currentSubscription &&
        actionArg.actionName === EPersonalPageActions.confirmUpdatePersonalNumber &&
        Number(body?.message.text).toString() !== 'NaN'
    ) {
        useServerEffect<IApiResult<IViberSubscriberDto>>(undefined, 'updateSubscription', () => {
            return apiHooks.viberSubscriber
                .useUpdateByViberIdAsync(body?.sender?.id || '', {
                    personal_number: body?.message.text,
                })
                .then((data) => {
                    (context as any)['currentViberSubscription'] = data;
                    return data;
                });
        });
    }

    const renderValue = ({
        title,
        sb,
        values,
        unit,
    }: {
        title: string;
        sb: StringBuilder;
        values: IGTableValueDto[];
        unit: string;
    }): void => {
        values?.forEach((value) => {
            sb.appendLine(`${title} - ${value.value} ${unit}`);
        });
    };
    if (actionArg.actionName === EPersonalPageActions.updatePersonalNumber) {
        return (
            <ViberMessage
                sender={body?.sender as IViberSender}
                text={`Ввведіть новий особовий рахунок у текстовому полі і натисніть надіслати:`}
                tracking_data={getViberActionId({ link, actionName: EPersonalPageActions.confirmUpdatePersonalNumber })}
                keyboard={
                    <ViberKeyboard>
                        <ViberButton Columns={6} Rows={1} Text="Назад" arg={{ link: VIBER_LINKS.personal }} />
                    </ViberKeyboard>
                }
            />
        );
    }

    const sb = new StringBuilder();
    sb.appendLine('Особистий кабінет ');
    if (currentSubscription?.data?.full_name) {
        sb.appendLine(currentSubscription?.data?.full_name || '');
    }
    sb.appendLine(`телефон: ${currentSubscription?.data?.phone_number || ''}`);
    sb.appendLine(`особовий рахунок: ${currentSubscription?.data?.personal_number || ''}`);
    if (!currentSubscription?.data?.personal_number) {
        sb.appendLine(`Щоб побачити історію показів потрібно добавити особистий рахунок.`);
    }

    if (currentSubscription?.data?.personal_number) {
        const [personalInfo] = useServerEffect<IApiResult<IGTableValueDto[] | undefined> | undefined>(
            undefined,
            'personalInfoValues',
            () =>
                apiHooks.gtable.useGetGTableValuesByPersonalNumberAsync({
                    personal_number: currentSubscription?.data?.personal_number || '',
                }),
        );
        if (personalInfo?.error || personalInfo?.data?.length === 0) {
            sb.appendLine('Не знайдено інформації по особовому рахунку.');
        } else {
            sb.appendLine('');
            if (personalInfo?.data?.length) {
                const groups = personalInfo?.data?.reduce((acc: any, current: IGTableValueDto) => {
                    if (!acc[current.date]) {
                        acc[current.date] = [];
                    }
                    acc[current.date].push(current);
                    return acc;
                }, {});
                console.log(groups);

                // https://developers.viber.com/docs/tools/text-formatting/
                Object.keys(groups).forEach((key) => {
                    const values: IGTableValueDto[] = groups[key];
                    sb.appendLine(
                        `*${dayjs(+key * 1000)
                            .locale('ua')
                            .format('MMMM YYYY')}*`,
                    );

                    renderValue({
                        title: 'Гаряча вода',
                        unit: 'м.куб',
                        sb,
                        values: values.filter((f) => f.counterType === ECounterType.hotWater) || [],
                    });
                    renderValue({
                        title: 'Холодна вода',
                        unit: 'м.куб',
                        sb,
                        values: values.filter((f) => f.counterType === ECounterType.coldWater) || [],
                    });
                    renderValue({
                        title: 'Опалення',
                        sb,
                        unit: 'ггкал*',
                        values: values.filter((f) => f.counterType === ECounterType.heating) || [],
                    });
                    renderValue({
                        title: 'Електрика',
                        sb,
                        unit: 'кВт',
                        values: values.filter((f) => f.counterType === ECounterType.electricity) || [],
                    });
                    sb.appendLine('');
                });
            }
        }
    }

    return (
        <ViberMessage
            sender={body?.sender as IViberSender}
            text={sb.toString()}
            keyboard={
                <ViberKeyboard>
                    <ViberButton
                        Columns={3}
                        Rows={1}
                        Text={
                            currentSubscription?.data?.personal_number
                                ? 'Змінити особовий рахунок'
                                : 'Добавити особовий рахунок'
                        }
                        arg={{ link, actionName: EPersonalPageActions.updatePersonalNumber }}
                    />
                    ,
                    <ViberButton Columns={3} Rows={1} Text="На головну" arg={{ link: VIBER_LINKS.index }} />
                </ViberKeyboard>
            }
        />
    );
};
