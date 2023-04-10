const { query } = require('express');
const express = require('express');
const router = express.Router();
const {studentController} = require('../controllers');

/* GET users listing. */ // Our first REST API
router.get('/', async function(req, res, next) {
  const query = req.query;  
  console.log(query);
  try {
    const result = await studentController.getAllStudents(query);
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post('/', async function(req, res, next) {
  const body = req.body;
  try {
    const result = await studentController.addStudent(body);
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
    const result = await studentController.updateStudent(body);
    res.status(200).send(result);
  } catch (error) { 
    res.status(500).send(error);
  }
});
//Send Leave to admin  or mark absent/persent only once
router.post('/updateStatus', async function(req, res, next) {
  const body = req.body;
  try {
    var result;
    if(body.leave){ result = await studentController.updateStudent(body);}
    if(body.presence){
      const checkFirst = await studentController.findById({id:req.user._id},"presence").exec();
      if(checkFirst.presence){
        for(let obj of checkFirst.presence){
          if(obj.date == body.presence.date){
            return res.status(201).send({msg: "Already marked !"});
          }
        }
         result = await studentController.updateStudent(body);
      }
      if(checkFirst.presence.date == body.presence.date){}
    }
    else{
      result = await studentController.updateStudent(body);
    }
    res.status(200).send(result);
  } catch (error) { 
    res.status(500).send(error);
  }
});

// router.delete('/:id' , async function(req,res,next){
//   const id = req.params.id
//   try{
//     const filter = {_id : id}  //filters and find where id = to this and then delete
//     const result = await studentController.(filter);
//     res.status(200).send("Deleted Successfully" );

//   } catch (error) {
//     res.status(500).send(error);

//   }

// });

module.exports = router;
