const {Schema, model} = require('mongoose');
const ObjectId = Schema.Types.ObjectId;


const schema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    phone: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    
    providers: [
        {
            type: ObjectId,
            uniqueItems: true,
            ref: 'Provider'
        }
    ]
});


module.exports = {
    schema,
    model: model('Client', schema)
}
