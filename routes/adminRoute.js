const { query } = require('express');
var express = require('express');
var router = express.Router();
const {adminController} = require('../controllers');

/* GET users listing. */ // Our first REST API
// router.get('/', async function(req, res, next) {
//   const query = req.query;  
//   console.log(query);
//   try {
//     const result = await adminController.getAllAdmins(query);
//     res.status(200).send(result);
//   } catch (error) {
//     res.status(500).send(error);
//   }
// });

router.post('/', async function(req, res, next) {
  const body = req.body;
  try {
    const result = await adminController.addAdmin(body);
    res.status(200).send(result);
  } catch (error) { 
    res.status(500).send(error);
  }
});
// update Admin
router.put('/', async function(req, res, next) {
  const body = req.body;
  if(!body._id){
    return res.status(400).send({messege : "_id is required"});
  }
  try {
    const result = await adminController.updateAdmin(body);
    res.status(200).send(result);
  } catch (error) { 
    res.status(500).send(error);
  }
});
// Change Leave Status
router.put('/updateLeave', async function(req, res, next) {
  const body = req.body;
  if(!body._id){
    return res.status(400).send({messege : "_id is required"});
  }
  try {
    const result = await adminController.changeLeaveStatus(body);
    res.status(200).send(result);
  } catch (error) { 
    res.status(500).send(error);
  }
});
// Update Presence
router.put('/updatePresence', async function(req, res, next) {
  const body = req.body;
  if(!body._id){
    return res.status(400).send({messege : "_id is required"});
  }
  try {
    const result = await adminController.updatePresence(body);
    res.status(200).send(result);
  } catch (error) { 
    res.status(500).send(error);
  }
});
// delete presence
router.delete('/presence/:id' , async function(req,res,next){
  const id = req.params.id
  try{
    const filter = {_id : id}  //filters and find where id = to this and then delete
    const result = await adminController.deletePresence(filter);
    res.status(200).send("Presence Deleted Successfully" );

  } catch (error) {
    res.status(500).send(error);

  }

});

module.exports = router;
