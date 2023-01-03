
const User = require('../model/users');
const sql = require('../model/connection');
const bcrypt = require('bcrypt');


exports.newuser = (async (req, res) => {

  // Validate request
  if (!req.body.phone) {
    res.status(400).send({
      message: "Mobile number required!"
    });
    return;
  }
  try {

    var Value = req.body.password;
    const salt = await bcrypt.genSalt(5);
    Value = await bcrypt.hash(Value, salt);
  }
  catch {
    console.log("error");
  }
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  var user = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    phone: req.body.phone,
    email: req.body.email,
    password:Value ,
    gender: req.body.gender,
    dob: req.body.dob,
    role: req.body.role,
    address1: req.body.address1,
    address2: req.body.address2,
    city: req.body.city,
    state: req.body.state,
    pincode: req.body.pincode,
    status: req.body.status,
    token:req.body.token || false
  });


  User.create(user, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the users."
      });
    else res.send(data);
  });
})

//get one user with token
exports.getone=(req,res)=>{
  if (!req.body.token) {
    res.status(400).send({
      message: "Please add the Token!"
    });
  }
   
   User.getone(req.body.token,res)
}

//get user with id

exports.oneuser=(req,res)=>{
  if (!req.body) {
    res.status(400).send({
      message: "Please add the Token!"
    });
  }
  User.oneuser(req.params.id,res)
}



exports.login = async(req, res) => {

 (User.login(req.body,res))
}


exports.getall = (req, res) => {
   User.get((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "some error occured while creating the users."
      });
    else res.send(data)
  });
};

exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  User.update(
    req.params.id,
    req.body,
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Users with id `
          });
        } else {
          res.status(500).send({
            message: "Error updating Users with id "
          });
        }
      } else res.send(data);
    }
  );
};

//delete method
exports.delete = (req, res) => {
  User.remove(req.params.id, (err, data) => {
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

// User Logout
exports.logout = (req, res) => {
  // console.log(token);
  User.logout(req.body.token,(err, data) => {

    if (err){
      res.status(500).send({
        message:
          err.message || "Some error occurred while updating the User."
      });
    }
    else res.send(data);
  });
};

exports.role=(req,res)=>{
  User.role(req.params.role,res)
}

