export default {
    routes: [
        {
            method: 'GET',
            path: '/private/gtable/:id',
            handler: 'private.getGDataValues',
        },
        {
            method: 'POST',
            path: '/private/gtable/:id/set_value',
            handler: 'private.setGDataValues',
        },

        {
            method: 'GET',
            path: '/private/gtable_config',
            handler: 'private.getGTableConfigs',
        },

        {
            method: 'GET',
            path: '/private/gtable_config/:id',
            handler: 'private.getGTableConfigById',
        },

        {
            method: 'GET',
            path: '/private/gtable_all',
            handler: 'private.getAllGTable',
        },
        {
            method: 'GET',
            path: '/private/get_gdata_by_personal_number',
            handler: 'private.getGDataByPersonalNumber',
        },

        {
            method: 'POST',
            path: '/private/send_to_all_viber',
            handler: 'private.sendToAllViberClients',
        },

        {
            method: 'POST',
            path: '/private/backup_all_gdata',
            handler: 'private.backupAllGData',
        },
    ],
};
