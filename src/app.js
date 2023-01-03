const express = require("express");
const cors = require('cors');
const middleware = require('../my-middleware');

const mail=require('../src/csv/controller/veg')

const app = express();

app.use(cors({origin: "*",}))

app.use(express.json());

// app.use(middleware);

//user routes
require('./users/routes/users')(app);

//classes routeS
require('./classes/routes/classes')(app);

//students routes
require('./students/router/students')(app);

//student attendance routes
require('./studentsAttendance/routes/studentsAttendance')(app);

//Teacher Attendance Route
require('./TeacherAttendance/routes/teachersAttendance')(app);

// require('./csv/routes/csv');

require('./csv/routes/report')(app);

app.use('/download',mail)


app.listen(8090, () => {
  console.log(`Server Started at 8090`);
});
