const {Schema, model} = require('mongoose');

const TeacherSchema = Schema({
    name: {required: true, type: String},
    depart: {required: true, type: String},
    student: {type: Schema.Types.ObjectId, ref: "student"}
}) 
const Teacher = model('teacher', TeacherSchema);
module.exports = Teacher;