const sql = require('../model/connection');
const Students = require('../model/students');

exports.newuser = ((req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  var students = new Students({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    classid: req.body.classid,
    dob: req.body.dob,
    fathername: req.body.fathername,
    mothername: req.body.mothername,
    address1: req.body.address1,
    address2: req.body.address2,
    city: req.body.city,
    state: req.body.state,
    pincode: req.body.pincode || false
  });


  Students.create(req.query.classid,students, (req, res))
});

exports.studentinfo = ((req, res) => {
  Students.studentinfo(req.params.id, res)
})

exports.classid = ((req, res) => {
  Students.classid(req.params.classid, res)
})

exports.getall = ((req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  Students.get((err, data) => {
    if (err) {
      res.status(500).send({ message: err.message || "some error occured the get pages" });
    }
    else res.send(data);
  })
})

exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);

  Students.updateById(
    req.params.id,
    new Students(req.body),
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
  Students.remove(req.params.id, (err, data) => {
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







