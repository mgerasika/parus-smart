console.log(process.env.NODE_ENV);
const serverUrl =
    process.env.NODE_ENV === 'development' ? process.env.NEXT_PUBLIC_SERVER_URL : process.env.NEXT_PUBLIC_RELEASE_SERVER_URL;
export const ENV = {
    SERVER_URL: serverUrl,
};

console.log('SERVER_URL', serverUrl);
