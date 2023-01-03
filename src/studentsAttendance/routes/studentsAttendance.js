
module.exports = app => {
    const StudentsAttendance = require("../controller/studentsAttendance")

    app.get('/studentattendance1',StudentsAttendance.getall);
  
    app.post('/student/attendance/',StudentsAttendance.newuser);

    app.get('/studentattendanceinfo/:id',StudentsAttendance.studentattendance);

    app.patch('/studentsattendance/update/:id',StudentsAttendance.update);
  
    app.delete('/stu/delete/:id',StudentsAttendance.delete);


    // app.patch('/stu/updateall',StudentsAttendance.allupdate);
  }