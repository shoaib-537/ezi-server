const {profileModel} = require('../models');

const addPicture = (body) => {

    const doc = new profileModel(body);
    const query = {_id : doc._id};
    return profileModel.findOneAndUpdate(query,doc,{
    upsert : true,
    new : true
    }).populate('student');
       };

const updateProfile = (body) => {

    const query = {_id : body._id};
    return profileModel.findOneAndUpdate(query,body,{
    new : true
    });
        };

const deleteProfile = (filter) => {
    return profileModel.deleteOne(filter);
};

const getProfile = (filter) => {
    return profileModel.findOne(filter);
};


module.exports = {
addPicture,
deleteProfile,
getProfile,
updateProfile

};
