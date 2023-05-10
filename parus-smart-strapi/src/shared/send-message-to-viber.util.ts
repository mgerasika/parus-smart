import axios, { AxiosRequestConfig } from 'axios';
import { ENV } from '../constants/env.constant';

//  sender: {
// 	name: "John McClane",
// 	avatar: "http://avatar.example.com",
//   },
export async function sendMessageAsync(message: any): Promise<{ data?: any; error?: any }> {
    try {
        const data = await axios.post('https://chatapi.viber.com/pa/send_message', message, getAxiosConfig());
        return { data };
    } catch (error) {
        console.log('error ', JSON.stringify(error));
        return { error };
    }
}

export function getAxiosConfig(): AxiosRequestConfig {
    return {
        headers: {
            'X-Viber-Auth-Token': ENV.VIBER_PROXY_TOKEN as any,
        },
    };
}

export async function broadcastMessageAsync(message: any): Promise<{ data?: any; error?: any }> {
    try {
        const data = await axios.post('https://chatapi.viber.com/pa/broadcast_message', message, getAxiosConfig());
        return { data };
    } catch (error) {
        console.log('error ', JSON.stringify(error));
        return { error };
    }
}
