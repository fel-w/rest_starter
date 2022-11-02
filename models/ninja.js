const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create geo location schema
const GeoSchema = new Schema({
    type: {
        type: "String",
        default: "Point"
    },
    coordinates: {
        type: [Number],
        index: "2dsphere"
    }
})
// create ninja schema
const NinjaSchema = new Schema({
    name: {
        type: String,
        required: [true, "Name field is required!"]
    },
    rank: {
        type: String
    },
    available: {
        type: Boolean,
        default: false
    },
    geolocation: GeoSchema
});

// create ninja model
const Ninja = mongoose.model('ninja', NinjaSchema);

// export model
module.exports = Ninja;