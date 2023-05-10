export default {
    routes: [
        {
            method: 'GET',
            path: '/viber',
            handler: 'viber.index',
            config: {
                policies: [],
                middlewares: [],
            },
        },

        {
            method: 'POST',
            path: '/viber/web_hook',
            handler: 'viber.webHook',
            config: {
                policies: [],
                middlewares: [],
            },
        },
    ],
};
