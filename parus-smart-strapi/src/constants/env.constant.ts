require('dotenv').config();
export const ENV = {
    FRONTEND_URL: 'http://parus-smart.site/',
    VIBER_PROXY_TOKEN: Buffer.from(process.env.VIBER_PROXY_TOKEN || ''),
    VIBER_PROXY_SERVER_URL: Buffer.from(process.env.VIBER_PROXY_SERVER_URL || ''),
    DEBUG_VIBER_SERVER_URL: Buffer.from(process.env.DEBUG_VIBER_SERVER_URL || ''),
    GOOGLE_API_CRED: Buffer.from(process.env.GOOGLE_API_CRED || '', 'base64').toString('ascii'),
};
console.log('ENV=', ENV);
