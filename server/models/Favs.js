const {Schema, model} = require('mongoose');

const favsSchema = new Schema({
    owner: {type: Types.ObjectId, ref: 'User'},
    label: {type: String, required: true},
    ingredients: [{ quantity: String, measure: String, food: String, weight: Number }],
    source: {type: String},
    url: {type: String},
    imgUrl: {type: String},
    nutrients: {calories: Number, totalWeight: Number, ENERC_KCAL: Number, FAT: Number, FASAT: Number, CHOLE: Number, NA: Number, K: Number, CHOCDF: Number, FIBTG: Number, SUGAR: Number, PROCNT: Number, VITA_RAE: Number, VITC: Number, CA: Number, FE: Number},
    cuisineType: {type: String},
    mealType: {type: String}
});

module.exports = model('Favs', favsSchema);