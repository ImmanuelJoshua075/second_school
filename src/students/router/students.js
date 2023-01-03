
module.exports = app => {
     const students = require("../controller/students")

    app.post('/student/register',students.newuser);
 
    app.get('/student1',students.getall);

    app.get('/student/class/:classid',students.classid);

    app.get('/studentinfo/:id',students.studentinfo);

    app.patch('/Students/update/:id',students.update);
  
    app.delete('/Students/delete/:id',students.delete);

   }