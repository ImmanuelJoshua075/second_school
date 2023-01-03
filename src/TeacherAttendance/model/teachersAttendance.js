
const sql=require('../model/connection');
const teachersAttendance = require('../routes/teachersAttendance');

var TeachersAttendance= function(TeachersAttendance) {
  this.id= TeachersAttendance.id;
  this.userid= TeachersAttendance.userid;
  this.status=TeachersAttendance.status;
  this.date=TeachersAttendance.date;
  this.createdat=TeachersAttendance.createdat || false
};


TeachersAttendance.teacherattendance=(id,res)=>{
  // let id=req.params.id;
  console.log(id);
  sql.query(`select * from TeacherAttendance where userid='${id}'`,(err,result)=>{
    if(err){
      console.log("error: ", err);
      result(err, null);
      return;
    }
    else{
      console.log(result);
      data1=result.pop();
      let userid=data1.userid;
      console.log(userid)
      sql.query(`select*from Users where id='${userid}'`,(err,result)=>{
        if(err){
          console.log("error: ", err);
          // result(err, null);
          return;
        }
        else{
        
          data1.userid=result.pop();
          res.send(data1);
          console.log(data1);
        }
      })
    }
  })
}

TeachersAttendance.teachers=(req,res)=>{
  sql.query("select*from Users where role='teacher' limit 5",(err,data)=>{
    if(err){
      res.send(err);
      console.log("error ",+ err);
      return;
    }
    console.log(data);
    res.send(data);
  });
}

TeachersAttendance.teachersid=(id,res)=>{
  sql.query(`select * from TeacherAttendance where userid='${id}'`,(err,result)=>{
    if(err){
      console.log("error: ", err);
          result(err, null);
          return;
    }
    else{
      res.send(result);
      console.log(result);
    }
  })

}

TeachersAttendance.create = (data, res) => {

  const value = JSON.parse(JSON.stringify(data));

  console.log(value[0]['userid']);//answer

  for (var i = 0; i < value.length; i++) {
    // console.log(value[i]['userid']);

    sql.query(`INSERT INTO TeacherAttendance(userid,status,date) values ('${value[i]['userid']}','${value[i]['status']}','${value[i]['date']}')`)
  }
    if (value==0) {
      res.send("error");
    } else {
      res.send(value);
    }
  }

  TeachersAttendance.allupdate=(data,res)=>{
 
    const value = JSON.parse(JSON.stringify(data));

    for (var i = 0; i < value.length; i++) {
      sql.query(`Update TeacherAttendance (id,userid,status,date) values ('${value[i]['id']}','${value[i]['userid']}','${value[i]['status']}','${value[i]['date']}')`)
    }
      if (value ==0) {
        res.send("error");
      } else {
        res.send(value);
        console.log("Successfully Update");
      }
    }
  


  TeachersAttendance.get = ( result) => {
      let query = "SELECT * FROM TeacherAttendance";
    
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

  
    TeachersAttendance.updateById = (id, TeacherAttendance, result) => {
      sql.query(
        "UPDATE TeacherAttendance SET id= ?,  userid= ?, status= ?,date=?,createdat=? WHERE id= ?",
        [TeacherAttendance.id, TeacherAttendance.userid,TeacherAttendance.status,TeacherAttendance.date,TeacherAttendance.createdat, id],
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
    
          console.log("updated TeachersAttendance: ", { id: id, ...TeachersAttendance });
          result(null, { id: id, ...TeachersAttendance });
        }
      );
    };

    TeachersAttendance.remove = (id, result) => {
      sql.query("DELETE FROM TeacherAttendance WHERE id = ?", id, (err, res) => {
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
  
  
    
   


module.exports=TeachersAttendance;
