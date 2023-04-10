const {
    usersController,
    adminController,
    studentController
} = require('../controllers');
    const {userModel} = require("../models");

const signin = async(req, res)=>{
        const user = await userModel.findOne({regNum: req.body.regNum, password: req.body.password}).exec();
        if(user){
            return res.json("Logged in");
        }
        else{
            return res.json("Invalid");
        }
};
const signup = async (body) => {
    // apply validation for users here
    
    if (!body.regNum) {
        return Promise.reject({ error: "Registration Number is required!" });
    }
    if (!body.password) {
        return Promise.reject({ error: "Password is required!" });
    }
    if (!body.userType) {
        return Promise.reject({ error: "userType is required" });
    }
    if (!body.data) { // data represents public info of the user e.g firstName ,age etc
        return Promise.reject({ error: "data is required" });
    }

    try {
        let result = null;
        const userType = body.userType;
        switch (userType) {
            case 'admin':
                // apply admin fields validation here
                
                if (!body.data.fullName){
                    return Promise.reject({error : "fullName is required"});
                }
                
                result = await adminController.addAdmin(body.data);
                break;

            case 'student':
                // apply client fields validation here
                
                if(!body.data.fullName){
                    return Promise.reject({error : "fullName is required"});
                }
                
                  
                result = await studentController.addStudent(body.data);
                break;
            default:
                return Promise.reject({ error: "userType is invalid" });
        }
        const userJson = {
            regNum: body.regNum,
            password: body.password,  // make this password encrypted
            userType: {
                kind: userType,
                item: result._id
            }
            
        };   
        const user = await usersController.addUser(userJson);
        return user;
    } catch (ex) {
        return Promise.reject({ error: ex });
    }
}


module.exports = {
    signup,
    signin
}