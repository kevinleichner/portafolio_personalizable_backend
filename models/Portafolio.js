const { Schema, model } = require('mongoose');

const PortafolioSchema = Schema({
    config: {
        type: Object,
        required: true
    },
    usuario: {
        type: Schema.Types.ObjectId, //El uid del usuario
        ref: 'Usuario',
        required: true
    }
});

PortafolioSchema.method('toJSON', function(){
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
})

module.exports = model('Portafolio', PortafolioSchema);