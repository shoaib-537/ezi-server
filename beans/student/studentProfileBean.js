const {profileController} = require('../../controllers');

const addProfile = async (body) => {
  try {
    const result = await profileController.addPicture(body);
    // const mailOption = { to: result.client.email, Subject: 'Account Activation', html: '' };
    return { result };
  } catch (error) {
    return Promise.reject(error);
  }
};
 const updateProfile =async (body) => {
  try {
      const result = await profileController.updateProfile(body);
      return result;
  }catch(error){

    return Promise.reject(error)
  }
 }

 const deleteProfile = (filter) => {
     return profileController.deleteProfile(filter);
 }

 const getProfile = (filter) =>{
  return profileController.getProfile(filter);
 }

//  const getClientAllDocuments = (filter) =>{
//   return documentsController.getAllDocuments(filter);
//  }

module.exports = {addProfile,deleteProfile,getProfile, updateProfile};