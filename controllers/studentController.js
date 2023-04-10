const {studentModel} = require('../models');

const addStudent = (body) => {
    const doc = new studentModel(body);
    const query = {_id : doc._id};
    return studentModel.findOneAndUpdate(query,doc,{
    upsert : true,
    new : true
    });
       };

const updateStudent = (body) => {
    const query = {_id : body._id};
    return studentModel.findOneAndUpdate(query,body,{
    new : true
    });
        };

// const deleteStudent = (filter) => {
//     return clientModel.deleteOne(filter);
// };

const getStudent = (filter) => {
    return studentModel.findOne(filter);
};

const getAllStudents = (filter) => {
    return studentModel.find(filter);
};

module.exports = {
addStudent,
getStudent,
getAllStudents,
updateStudent
};
