/**
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/* eslint-disable camelcase */

// [START sheets_quickstart]
import { google } from 'googleapis';
import { ENV } from '../constants/env.constant';
import { EGTableMonth } from '../enums/gtable-month.enum';
import { IGoogleAuthInfo } from '../interfaces/google-auth-info.interface';
import { IQueryResult } from '../interfaces/query-result.interface';

// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];

/**
 * Reads previously authorized credentials from the save file.
 *
 * @return {Promise<OAuth2Client|null>}
 */
// async function loadSavedCredentialsIfExist() {
//   try {
//     const content = await fs.readFile(TOKEN_PATH);
//     const credentials = JSON.parse(content);
//     return google.auth.fromJSON(credentials);
//   } catch (err) {
//     return null;
//   }
// }

/**
 * Serializes credentials to a file comptible with GoogleAUth.fromJSON.
 *
 * @param {OAuth2Client} client
 * @return {Promise<void>}
 */
// async function saveCredentials(client: any) {
//   //   const content = await fs.readFile(CREDENTIALS_PATH);
//   console.log("saveCredentials", TOKEN_PATH);
//   const content = ENV.GOOGLE_API_CRED;
//   const keys = JSON.parse(content);
//   const key = keys.installed || keys.web;
//   const payload = JSON.stringify({
//     type: "authorized_user",
//     client_id: key.client_id,
//     client_secret: key.client_secret,
//     refresh_token: client.credentials.refresh_token,
//   });
//   await fs.writeFile(TOKEN_PATH, payload);
// }

/**
 * Load or request or authorization to call APIs.
 *
 */
let AUTH_INFO: any = undefined;
async function authorizeAsync({ reinitialize }: { reinitialize: boolean }): Promise<IQueryResult<IGoogleAuthInfo>> {
    if (!reinitialize) {
        if (AUTH_INFO) {
            return Promise.resolve({ data: AUTH_INFO });
        }
    }
    try {
        const client = await new google.auth.GoogleAuth({
            scopes: SCOPES,
            credentials: JSON.parse(ENV.GOOGLE_API_CRED),
        });
        console.log('authorized');
        AUTH_INFO = client;
        return { data: client };
    } catch ({ error }) {
        return { error: error as any };
    }
}

async function getValuesAsync({
    spreadsheetId,
    tabName,
    range,
    auth,
}: {
    spreadsheetId: string;
    range: string;
    tabName: string;
    month: EGTableMonth;
    auth: IGoogleAuthInfo;
}): Promise<IQueryResult> {
    const sheets = google.sheets({ version: 'v4', auth } as any);

    try {
        const res = await sheets.spreadsheets.values.get({
            spreadsheetId,
            range: `${tabName}!${range}`,
        });
        return { data: res.data.values };
    } catch (error) {
        return { error };
    }
}

async function writeValuesAsync({
    auth,
    value,
    tabName,
    spreadsheetId,
    excelRowIndex,
    columnName,
}: {
    spreadsheetId: string;
    month: EGTableMonth;
    tabName: string;
    value: string;
    excelRowIndex: number;
    auth: IGoogleAuthInfo;
    columnName: string;
}): Promise<IQueryResult> {
    const sheets = google.sheets({ version: 'v4', auth } as any);

    const resource = {
        values: [[value.toString()]],
    };
    try {
        const column = `${tabName}!${columnName}${+excelRowIndex}:${columnName}${+excelRowIndex}`;
        const result = await sheets.spreadsheets.values.update({
            spreadsheetId,
            range: column, //`${column}:${column}`,
            valueInputOption: 'USER_ENTERED',
            resource,
        } as any);

        return { data: result };
    } catch (error) {
        return { error };
    }
}

export const googleApi = {
    authorizeAsync,
    getValuesAsync,
    writeValuesAsync,
};
// authorizeAsync().then(writeValuesAsync).catch(console.error);
// authorize().then(getValues).catch(console.error);
// [END sheets_quickstart]
