const {Schema, model} = require('mongoose');

const StudentSchema = new Schema({
    name: {required: true, type:String},
    email: {required: true, type: String},
    password: {required: true, type: String},
    phone: {required: true, type: Number}
})
const Student = model('student', StudentSchema);
module.exports = Student