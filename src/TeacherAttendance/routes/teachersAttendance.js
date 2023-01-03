
module.exports = app => {
    const TeacherAttendance = require("../controller/teachersAttendance");
    
    app.get('/teacherattenance',TeacherAttendance.getall);  //SHOW ALL TEACHER ATTENENDANCE LIST

    app.post('/teacherattenance/teach',TeacherAttendance.newuser); // insert bulk data 

    app.patch('/teacherattenance/updateall',TeacherAttendance.allupdate);  // update the bulk data

    app.get ('/teacherattenanceinfo/:id',TeacherAttendance.teacherattendance);   //TEACHERS ATTENDANCE INFO POST THE ID
  
    app.patch('/teacherattenance/update/:id',TeacherAttendance.update);
  
    app.delete('/teacherattenance/delete/:id',TeacherAttendance.delete);

    app.get('/user/all/Teacher',TeacherAttendance.teachers);    //TEACHERS LIST IN USER TABLE

    app.get('/teacherattenance/:id',TeacherAttendance.teachersid);   //TEACHERS ATTENDANCE VIEW BY ID IN PARAMS

  
  }