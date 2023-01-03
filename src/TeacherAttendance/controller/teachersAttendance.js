const TeachersAttendance = require('../model/teachersAttendance');
const sql = require('../model/connection');


exports.newuser = ((req, res) => {
   

  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }
  var teachersAttendance = new TeachersAttendance({
    id:req.body.id,
    userid: req.body.classid,
    status: req.body.status,
    date: req.body.date,
    createdat: req.body.createdat || false
  });


  TeachersAttendance.create(req.body,res)
  //    (err, data) => {
  //   if (err)
  //     res.status(500).send({
  //       message:
  //         err.message || "Some error occurred while creating the users."
  //     });
  //   else res.send(data);
  // });
})

exports.teachersid = ((req, res) => {
  TeachersAttendance.teachersid(req.params.id,res)
}); 

exports.allupdate = ((req, res) => {
  TeachersAttendance.allupdate(req.body,res)
}); 

exports.teacherattendance = ((req, res) => {
  TeachersAttendance.teacherattendance(req.params.id,res)
}); 

exports.teachers = ((req, res) => {
  TeachersAttendance.teachers(req,res)
}); 


exports.getall = ((req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  TeachersAttendance.get((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "some error occured while creating the users."
      });
    else res.send(data)
  });
});

//patch method update the file
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);

  TeachersAttendance.updateById(
    req.params.id,
    new TeachersAttendance(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found user with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating user with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

//delete method
exports.delete = (req, res) => {
    TeachersAttendance.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found User with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete User with id " + req.params.id
        });
      }
    } else res.send({ message: `User was deleted successfully!` });
  });
};


