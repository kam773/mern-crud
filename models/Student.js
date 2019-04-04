const mongoose = require('mongoose');
const Schema = mongoose.Schema;


// Create schema
const StudentSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    dob: {
        type: String,
        required: true
    },
    hobby: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String
    }
})


module.exports = Student = mongoose.model('student', StudentSchema);