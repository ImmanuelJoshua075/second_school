module.exports = app => {
  const classes= require("../controller/classes");

  app.get('/class/all',classes.showall);

 app.post('/class/assign',classes.newclass);

//id is used for body
 app.post('/classinfo',classes.classinfo);
 
 //view by id
 app.get('/class/:id',classes.classid);

 app.patch('/classes/update/:id',classes.update);
  
 app.delete('/classes/delete/:id',classes.delete);

 app.get('/classStudents/:id',classes.classStudents);

}