const sql = require('../model/connection');

var StudentsAttendance = function (StudentsAttendance) {
  this.id = StudentsAttendance.id;
  this.classid = StudentsAttendance.classid;
  this.studentid = StudentsAttendance.studentid;
  this.status = StudentsAttendance.status;
  this.date = StudentsAttendance.date;
  this.createdat = StudentsAttendance.createdat || false

}

StudentsAttendance.studentattendance = (id, res) => {

  sql.query(`select * from StudentAttendance where id='${id}'`, (err, result) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    else {
      data1 = result.pop()
      let classid = data1.classid;
      sql.query(`select * from Classes where name='${classid}'`, (err, result) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }
        else {

          data1.classid = result.pop();
          let studentid = data1.studentid
          console.log(studentid);

          sql.query(`select*from Students where id='${studentid}'`, (err, result) => {
            if (err) {
              console.log("error: ", err);
              result(null, err);
              return;
            }
            else {
              data1.studentid = result.pop();
              res.send(data1);
            }
          })
        }
      })
    }
  })
}

StudentsAttendance.get = (result) => {

  let query = "SELECT classid,(SELECT firstname FROM Students WHERE Students.id = StudentAttendance.studentid) AS studentid,status,date FROM StudentAttendance";

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

StudentsAttendance.create = (data, id, res) => {

  console.log("Request data:");


  console.log(data);
  console.log(id);

  const value = JSON.parse(JSON.stringify(data));

  console.log(value[0]['classid']);//answer

  var su = value.length;
  for (var i = 0; i < value.length; i++) {
    // console.log(value[i]['classid']);

    sql.query(`INSERT  INTO StudentAttendance(classid,studentid,status,date) values ('${value[i]['classid']}','${value[i]['studentid']}','${value[i]['status']}','${value[i]['date']}')`)
  }
  if (value == 0) {
    res.send("error");
  } else {
    res.send(value);
  }
  // sql.query(`SELECT * FROM StudentAttendance ORDER BY id DESC LIMIT ` + `${su}`, (err, result) => {

  // })

};

StudentsAttendance.updateById = (id, StudentAttendance, result) => {
  sql.query(
    "UPDATE StudentAttendance SET id= ?,  classid= ?, studentid= ?,status=?,date=? WHERE id= ?",
    [StudentAttendance.id, StudentAttendance.classid, StudentAttendance.studentid, StudentAttendance.status, StudentAttendance.date, id],
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

      console.log("updated Job: ", { id: id, ...StudentAttendance });
      result(null, { id: id, ...StudentAttendance });
    }
  );
};

StudentsAttendance.remove = (id, result) => {
  sql.query("DELETE FROM StudentAttendance WHERE id = ?", id, (err, res) => {
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


module.exports = StudentsAttendance;
