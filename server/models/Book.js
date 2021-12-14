const {Schema, model} = require('mongoose');

const bookSchema = new Schema({
    owner: {type: Types.ObjectId, ref: 'User'},
    label: {type: String, required: true},
    ingredients: [{ quantity: String, measure: String, food: String }],
    steps: {type: Array},
    ready: {type: Number},
    servings: {type: Number},
    notes: {type: String}
});

module.exports = model('Book', bookSchema);