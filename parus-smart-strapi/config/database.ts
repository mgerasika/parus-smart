// eslint-disable-next-line @typescript-eslint/no-unused-vars
const path = require('path');

// module.exports = ({ env }) => ({
//   connection: {
//     client: 'sqlite',
//     connection: {
//       filename: path.join(__dirname, '..', env('DATABASE_FILENAME', '.tmp/data.db')),
//     },
//     useNullAsDefault: true,
//   },
// });

// strapi-api/config/database.js
module.exports = ({ env }: { env: any }): any => ({
    connection: {
        client: 'postgres',
        connection: {
            host: env('DATABASE_HOST'),
            port: env.int('DATABASE_PORT'),
            database: env('DATABASE_NAME'),
            user: env('DATABASE_USERNAME'),
            password: env('DATABASE_PASSWORD'),
            schema: env('DATABASE_SCHEMA', 'public'), // Not required
            // ssl: {
            //   rejectUnauthorized: env.bool('DATABASE_SSL_SELF', false), // For self-signed certificates
            // },
        },
        debug: false,
    },
});
