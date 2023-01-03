const sql = require('../model/connection');
const StudentsAttendance = require('../model/studentsAttendance');

exports.newuser = ((req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  
  var studentsAttendance = new StudentsAttendance({
   id:req.body.id,
   classid:req.body.classid,
   studentid:req.body.studentid,
   status:req.body.status,
   date:req.body.date,
   createdat:req.body.createdat || false
  });

  StudentsAttendance.create(req.body,req.query.classId,(req,res))
})


exports.studentattendance = ((req, res) => {
  StudentsAttendance.studentattendance(req.params.id, res)
});


exports.getall = ((req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  StudentsAttendance.get((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "some error occured while creating the users."
      });
    else res.send(data)
  });
});

exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);

  StudentsAttendance.updateById(
    req.params.id,
    new StudentsAttendance(req.body),
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
  StudentsAttendance.remove(req.params.id, (err, data) => {
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

exports.allupdate = (req, res) => {
  StudentsAttendance.allupdate(req.body,res)
}

