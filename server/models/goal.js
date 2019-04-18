const mongoose = require('mongoose') 
const Schema = mongoose.Schema

const goalSchema = new Schema({
    name: {
        type: String,
        unique: true, 
        required: true
    },
    cost: {
        type: Number,
        required: true 
    },
    current: {
        type: Number,
        default: 0
    },
    monthlySavings: {
        type: Number,
        default: 0
    },
    dateAdded: {
        type: Date,
        default: Date.now
    },
    description: {
        type: String
    },
    image: {
        type: String
    }
})

const model = mongoose.model('goal', goalSchema)

module.exports = model