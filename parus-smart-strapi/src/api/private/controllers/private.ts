/**
 * A set of functions called "actions" for `example`
 */

import { ENV } from '@src/constants/env.constant';
import { EGTableMonth } from '@src/enums/gtable-month.enum';
import { apiHooks } from '@src/hooks/api-hooks';
import { IGoogleAuthInfo } from '@src/interfaces/google-auth-info.interface';
import { googleApi } from '@src/shared/google-table.util';
import { broadcastMessageAsync } from '@src/shared/send-message-to-viber.util';
import { writeToFileAsync } from '@src/utils/file-utils.util';
import { getBackupFileContentAsync, getBackupFilePath } from '@src/utils/get-backup-file-content.util';
import { parseNumber } from '@src/utils/parse-number.util';
import { getViberBigText } from '@src/viber-components/get-viber-big-text';

//https://strapi.io/blog/how-to-create-a-custom-api-endpoint-in-strapi
export default {
    getGDataValues: async (ctx: any): Promise<any> => {
        const id = ctx.params.id;
        const month = ctx.request.query.month;
        const tabName = ctx.request.query.tabName;

        if (!id) {
            ctx.body = 'Missed arg "id"';
            ctx.status = 400;
            return;
        }

        if (!tabName) {
            ctx.body = 'Missed query argument "tabName"';
            ctx.status = 400;
            return;
        }

        const { data: gtableConfig } = await apiHooks.gtableConfig.useGetGTableConfigByIdAsync(id);
        if (!gtableConfig) {
            ctx.body = 'Gtable config not found. Try another id';
            ctx.status = 400;
            return;
        }

        if (!month) {
            ctx.body = 'Missed query arg "month"';
            ctx.status = 400;
            return;
        }

        if (!Object.keys(EGTableMonth).includes(month)) {
            ctx.body = 'Wrong month should be one of the list ' + Object.keys(EGTableMonth).join(',');
            ctx.status = 400;
            return;
        }

        const { data: auth, error: authError } = await googleApi.authorizeAsync({
            reinitialize: false,
        });
        if (authError) {
            ctx.body = authError;
            ctx.status = 400;
            return;
        }
        const { data, error } = await apiHooks.gtable.useGetGTableAsync({
            auth: auth as IGoogleAuthInfo,
            config: gtableConfig,
            tabName,
            month,
        });

        if (error) {
            ctx.body = error;
            ctx.status = 400;
            return;
        }

        if (data) {
            ctx.body = data;
        }
    },

    setGDataValues: async (ctx: any): Promise<any> => {
        const id = ctx.params.id;
        const { month, personalNumber, value, tabName } = ctx.request.body;

        if (!id) {
            ctx.body = 'Missed arg "id"';
            ctx.status = 400;
            return;
        }

        if (!tabName) {
            ctx.body = 'Missed arg "tabName"';
            ctx.status = 400;
            return;
        }

        const { data: allConfigs, error: allConfigError } = await apiHooks.gtableConfig.useGetGTableConfigAsync();
        if (!allConfigs || allConfigError) {
            ctx.body = 'Gtable all configs error ' + allConfigError;
            ctx.status = 400;
            return;
        }
        const { data: config } = await apiHooks.gtableConfig.useGetGTableConfigByIdAsync(id);
        if (!config) {
            ctx.body = 'Gtable config not found. Try another id';
            ctx.status = 400;
            return;
        }

        if (!month) {
            ctx.body = 'Missed query arg "month"';
            ctx.status = 400;
            return;
        }

        if (!personalNumber) {
            ctx.body = 'Missed "personalNumber" in body';
            ctx.status = 400;
            return;
        }
        const newPersonalNumber = parseNumber(personalNumber).toString();
        if (newPersonalNumber.length < 8) {
            ctx.body = '"personalNumber" length should be min or equal 8';
            ctx.status = 400;
            return;
        }

        if (value === undefined) {
            ctx.body = 'Missed "value" in body"';
            ctx.status = 400;
            return;
        }

        try {
            if (Number(value).toString() == 'NaN') {
                ctx.body = '"value" should be number';
                ctx.status = 400;
                return;
            }
        } catch (err) {
            ctx.body = '"value" should be number"';
            ctx.status = 400;
            return;
        }

        if (!Object.keys(EGTableMonth).includes(month)) {
            ctx.body = 'Wrong month should be one of the list ' + Object.keys(EGTableMonth).join(',');
            ctx.status = 400;
            return;
        }

        const { data: auth, error: authError } = await googleApi.authorizeAsync({
            reinitialize: false,
        });
        if (authError) {
            ctx.body = authError;
            ctx.status = 400;
            return;
        }
        const { data, error } = await apiHooks.gtable.useEditValueAsync({
            auth: auth as IGoogleAuthInfo,
            personalNumber: newPersonalNumber,
            tabName,
            value,
            gtableConfig: config,
            month,
            allGtableConfigs: allConfigs,
        });
        if (error) {
            ctx.body = error;
            ctx.status = 400;
            return;
        }

        ctx.body = data;
    },

    getGTableConfigs: async (ctx: any): Promise<any> => {
        const data = await apiHooks.gtableConfig.useGetGTableConfigAsync();
        ctx.body = data;
    },

    getGTableConfigById: async (ctx: any): Promise<any> => {
        const { id } = ctx.query;
        if (!id) {
            throw 'missed query arg "id"';
        }
        const data = await apiHooks.gtableConfig.useGetGTableConfigByIdAsync(id);
        ctx.body = data;
    },

    backupAllGData: async (ctx: any): Promise<any> => {
        const backupFile = getBackupFilePath();
        const { data: gtableConfigs, error: gtableError } = await apiHooks.gtableConfig.useGetGTableConfigAsync();

        if (gtableError) {
            ctx.body = gtableError;
            ctx.status = 400;
            return;
        }
        const { data: auth, error: authError } = await googleApi.authorizeAsync({
            reinitialize: false,
        });
        if (authError) {
            ctx.body = authError;
            ctx.status = 400;
            return;
        }

        if (gtableConfigs) {
            const { data: allData, error: allDataError } = await apiHooks.gtable.useGetAllAsync({
                gtableConfigs,
                auth: auth as IGoogleAuthInfo,
            });
            if (allDataError) {
                ctx.body = allDataError;
                ctx.status = 400;
                return;
            }

            const responseStr = JSON.stringify(allData, null, 2);
            await writeToFileAsync(backupFile, responseStr);
            ctx.body = allData;
            ctx.status = 200;
        } else {
            ctx.body = 'ok';
            ctx.status = 200;
        }
    },

    getAllGTable: async (ctx: any): Promise<any> => {
        ctx.body = await getBackupFileContentAsync();
    },

    sendToAllViberClients: async (ctx: any): Promise<any> => {
        const { article_id } = ctx.request.body;

        if (!article_id) {
            ctx.body = 'Missed arg "article_id"';
            ctx.status = 400;
            return;
        }
        const { data: article } = await apiHooks.article.useGetArticleByIdAsync(article_id);
        if (!article) {
            ctx.body = 'Article not found. Try another id';
            ctx.status = 400;
            return;
        }

        const { data: subscribers } = await apiHooks.viberSubscriber.useGetListAsync();
        const viberIds = subscribers?.map((s) => s.viber_id);

        try {
            await broadcastMessageAsync({
                sender: {
                    name: 'Парус Смарт OCББ',
                },
                min_api_version: 2,
                type: 'text',
                broadcast_list: viberIds,
                text: getViberBigText({
                    id: article.id,
                    description: article.content,
                    link: `${ENV.FRONTEND_URL}#${article.id}`,
                    title: article.name,
                }),
            });
        } catch (ex) {
            ctx.body = ex;
            ctx.status = 400;
            return;
        }

        ctx.body = 'ok';
    },

    getGDataByPersonalNumber: async (ctx: any): Promise<any> => {
        const personal_number = ctx.request.query.personal_number;

        if (!personal_number) {
            ctx.body = 'Missed query arg "personal_number"';
            ctx.status = 400;
            return;
        }

        const { data, error } = await apiHooks.gtable.useGetGTableValuesByPersonalNumberAsync({ personal_number });
        if (error) {
            ctx.body = error;
            ctx.status = 400;
            return;
        }
        ctx.body = data;
    },
};
