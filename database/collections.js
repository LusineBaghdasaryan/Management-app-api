const Client = require('./models/Client');
const Provider = require('./models/Provider');

const models = {
    Client: Client.model,
    Provider: Provider.model
};

const schemas = {
    Client: Client.schema,
    Provider: Provider.schema
};

module.exports = {models, schemas};
