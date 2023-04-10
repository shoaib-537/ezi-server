const { adminModel } = require("../models");
const { studentModel } = require("../models");

const addAdmin = (body) => {
  const doc = new adminModel(body);
  const query = { _id: doc._id }; // : is same as =
  return adminModel.findOneAndUpdate(query, doc, {
    upsert: true,
    new: true,
  });
};

const updateAdmin = (body) => {
  const query = { _id: body._id };
  return adminModel.findOneAndUpdate(query, body, {
    new: true,
  });
};

// const deleteAdmin = (filter) => {
//     return adminModel.findOneAndDelete(filter);

// };

const getAdmin = (filter) => {
  return adminModel.findOne(filter);
};

const getAttendance = () => {
  return studentModel.find({}, "fullname, presence");
};

const getLeaves = () => {
  return studentModel.find({}, "fullname, leave");
};

const deletePresence = (filter) => {
  return adminModel.findOneAndDelete(filter);
};

const updatePresence = (filter) => {
    const query = { _id: body._id };
    return adminModel.findOneAndUpdate(query, body, {
      new: true,
    });
};

const changeLeaveStatus = (filter) => {
    const query = { _id: body._id };
  return adminModel.findOneAndUpdate(query, body, {
    new: true,
  });
};

module.exports = {
  addAdmin,
  updateAdmin,
  getAdmin,
  getAttendance,
  changeLeaveStatus,
  deletePresence,
  getLeaves,
  updatePresence
};
