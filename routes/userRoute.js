const { query } = require('express');
var express = require('express');
var router = express.Router();
const {usersController} = require('../controllers');

/* GET users listing. */ // Our first REST API
router.get('/', async function(req, res, next) {
  const query = req.query;
  console.log(query);
  try {
    const result = await usersController.getAllUsers(query);
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post('/', async function(req, res, next) {
  const body = req.body;
  try {
    const result = await usersController.addUser(body);
    res.status(200).send(result);
  } catch (error) { 
    res.status(500).send(error);
  }
});
router.put('/', async function(req, res, next) {
  const body = req.body;
  if(!body._id){
    return res.status(400).send({messege : "_id is required"});
  }
  try {
    const result = await usersController.updateUser(body);
    res.status(200).send(result);
  } catch (error) { 
    res.status(500).send(error);
  }
});

router.delete('/:id' , async function(req,res,next){
  const id = req.params.id
  try{
    const filter = {_id : id}  //filters and find where id = to this and then delete
    const result = await usersController.deleteUser(filter);
    res.status(200).send("Deleted Successfully" );

  } catch (error) {
    res.status(500).send(error);

  }

});

module.exports = router;
