const {Schema, model} = require('mongoose');

const schema = new Schema({
    name: {
        type: String,
        unique: true,
        required: true
    }
});


module.exports = {
    schema,
    model: model('Provider', schema)
};
