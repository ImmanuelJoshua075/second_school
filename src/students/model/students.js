const sql = require('./connection')

var Students = function (Students) {
  this.id = Students.id;
  this.firstName = Students.firstName;
  this.lastName = Students.lastName;
  this.classid = Students.classid;
  this.dob = Students.dob;
  this.fathername = Students.fathername;
  this.mothername = Students.mothername;
  this.address1 = Students.address1;
  this.address2 = Students.address2;
  this.city = Students.city;
  this.state = Students.state;
  this.pincode = Students.pincode || false
};

Students.create = (id,students,res) => {

  const {firstName,lastName,dob,fathername,mothername,address1,address2,city,state,pincode}=students;

  insertquery=`INSERT INTO Students (firstName,lastName,classid,dob,fathername,mothername,address1,address2,city,state,pincode) values('${students.firstName}','${students.lastName}','${id}','${students.dob}','${students.fathername}','${students.mothername}','${students.address1}','${students.address2}','${students.city}','${students.state}','${students.pincode}')`

  sql.query(insertquery, (err, result) => {
    if (err) {
      console.log("error: ", err);
      return;
    }
    console.log("create the new user: ", {students});
    res.send(students)
  });
};

Students.studentinfo = (id, res) => {
  // let id = req.params.id;
  console.log(id);
  sql.query(`select*from Students where id='${id}'`, (err, result) => {
    if (err) {
      console.log("error: ", err);
      res.send("Not a student id");
      // result(err, null);
      return;
    }
    if(result==0){
      res.send("Not a student id");
    }
    else {
      // data1 = result.pop();
      console.log(result);
      let Data = result.pop()
      let classid = (Data).classid;
      console.log(classid);
      sql.query(`select * from Classes where name='${classid}'`, (err, result) => {
        if (err) {
          console.log("error: ", err);
          result(err, null);
          return;
        }
        else {
          Data.classid = result.pop()
          console.log(Data);
          res.send(Data);
        }
      })
    }
  })
}

Students.classid=(classid,res)=>{
sql.query(`SELECT * FROM Students WHERE classid='${classid}' ORDER BY id ASC`,(err,result)=>{   //select *from Students where classid='${classid}'
  if(err){
    console.log("errror");
    res.send(err)
  }
  else{
    console.log(result);
    res.send(result)
  }
})
}

Students.get = (result) => {
  let query = "SELECT * FROM Students";

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("students: ", res);
    result(null, res);
  });
};

Students.updateById = (id, Students, result) => {
  sql.query(
    "UPDATE Students SET id=?, firstname = ?, lastname = ?,  classid = ?,  dob = ?, fathername = ?, mothername = ?, address1 = ?, address2 = ?, city = ?, state = ?, pincode = ?, createdat = ? WHERE id = ?",
    [Students.id, Students.firstname, Students.lastname, Students.classid, Students.dob, Students.fathername, Students.mothername, Students.address1, Students.address2, Students.city, Students.state, Students.pincode, Students.createdat, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Job with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated Job: ", { id: id, ...Students });
      result(null, { id: id, ...Students });
    }
  );
};

Students.remove = (id, result) => {
  sql.query("DELETE FROM Students WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Tutorial with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("delete User with id: ", id);
    result(null, res);
  });
};



module.exports = Students;