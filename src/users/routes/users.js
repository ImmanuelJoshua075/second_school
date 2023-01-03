
module.exports = app => {
  const User = require("../controller/users")
  const Server = require("../controller/mail")

      app.post('/user',User.newuser);

      app.get('/getuser',User.getone);  //token use get user

      app.post('/user/login',User.login);

      app.get('/get',User.getall);  //all users show

      app.get('/logout',User.logout);

      app.get('/getuser/:id',User.oneuser);  //one user get by id

      app.patch('/update/:id',User.update);

      app.delete('/delete/:id',User.delete);

      app.get('/role/:role',User.role);


//mail

app.get ('/mail/alluser',Server.newuser);






}