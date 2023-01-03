
const sql = require('../model/connection');
const classes = require('../routes/classes');

var Class = function (Class) {
  // this.id = Class.id;
  this.name = Class.name;
  this.classTeacher = Class.classTeacher || false
};

Class.create = (data,res) => {

console.log(data.classTeacher);
var cname=data.name;
var sanjiti=data.classTeacher;

sql.query(`select id from Users where firstName='${sanjiti}'`,(err,result)=>{
  console.log(result);
  if (err) throw err;
  var leo=result.pop().id
  console.log(cname);

  sql.query(`Insert into Classes (name,classTeacher) values('${cname}','${leo}')`,(err, result) => {
    if (err) {
      console.log(result);
      console.log("error: ", err);
      res.send("error")
      // result(err, null);
      return;
    }
    console.log(result);
    res.send(data)

  });
});
};

Class.classinfo = (req, res) => {
  // let name=classes.name;
  let name = req.name;
  console.log(name);
  sql.query(`select*from Classes where name='${name}'`, (err, result) => {
    if (err) {
      console.log("error: ", err);
      // result(err, null);
      return;
    }
    else {
      data1 = result.pop();
      let id = (data1).id
      console.log(data1.classteacher)
      sql.query(`select*from Users where id='${id}'`, (err, result) => {
        if (err) {
          console.log("error: ", err);
          // result(err, null);
          return;
        }
        else {
          data1.classteacher= result.pop();
          console.log(data1);
          res.send(data1);
        }
        // data.po
       
        console.log(data1);
      })
    }
  })
}

Class.get = (result) => {
  let query = "SELECT name,(SELECT firstName FROM Users WHERE Users.id = Classes.classTeacher) AS classTeacher,id FROM Classes;";

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
   console.log("students: ", res);
    result(null, 
    res.map(data=>{
      return {
        classTeacher:data.classTeacher,
        classId:data.id,
        name:data.name
      }
    }));
  });
};

Class.classid=(id,res)=>{
  console.log(id);
  sql.query(`select*from Classes where name='${id}'`,(err,result)=>{
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    else{
      res.send(result);
      console.log(result);
    }
  })
}


Class.updateById = (id, Classes, result) => {
  sql.query(
    "UPDATE Classes SET id= ?,  name= ?,classteacher=?,createdat=? WHERE id= ?",
    [Classes.id, Classes.name, Classes.classteacher, Classes.createdat, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated Job: ", { id: id, ...Classes });
      result(null, { id: id, ...Classes });
    }
  );
};

Class.remove = (id, result) => {
  sql.query("DELETE FROM Classes WHERE id = ?", id, (err, res) => {
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

Class.classStudents=(id,res)=>{
  sql.query(`select*from Students where classid='${id}'`,(err,result)=>{
    if(err){
      res.send('something went wrong');
      console.log(err);
    }
    else{
      res.send(result);
      console.log(result);
    }
  })
}



module.exports = Class;
