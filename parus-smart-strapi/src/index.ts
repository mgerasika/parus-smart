const moduleAlias = require('module-alias');

//
// Register alias
//
moduleAlias.addAlias('@src', __dirname + '../../src');

/* eslint-disable @typescript-eslint/explicit-function-return-type */

export default {
    /**
     * An asynchronous register function that runs before
     * your application is initialized.
     *
     * This gives you an opportunity to extend code.
     */
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    register(/*{ strapi }*/) {},

    /**
     * An asynchronous bootstrap function that runs before
     * your application gets started.
     *
     * This gives you an opportunity to set up your data model,
     * run jobs, or perform some special logic.
     */
    bootstrap(app: any): void {
        const { strapi } = app;
        const b = false;
        if (b) {
            importArticles(strapi, require('./backup/article.json'));
            importFaq(strapi, require('./backup/faq.json'));
            importPage(strapi, require('./backup/page.json'));
            importGTables(strapi, require('./backup/g-table-config.json'));
        }
    },
};

function importArticles(strapi: any, items: any) {
    console.log('import articles = ', items);
    items.data.forEach((article: any) => {
        strapi.services['api::article.article'].create({
            data: {
                ...article.attributes,
            },
        });
    });
}

function importGTables(strapi: any, items: any) {
    console.log('import gtables = ', items);
    items.forEach((gtable: any) => {
        strapi.services['api::g-table-config.g-table-config'].create({
            data: {
                ...gtable,
            },
        });
    });
}

function importFaq(strapi: any, items: any) {
    console.log('import faq', items);
    items.data.forEach((article: any) => {
        strapi.services['api::faq.faq'].create({
            data: {
                ...article.attributes,
            },
        });
    });
}

function importPage(strapi: any, items: any) {
    console.log('import page', items);
    items.data.forEach((page: any) => {
        strapi.services['api::page.page'].create({
            data: {
                ...page.attributes,
            },
        });
    });
}
