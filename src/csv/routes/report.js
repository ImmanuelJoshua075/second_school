module.exports = app => {
    const service=require('../controller/csv');
  
  //csv routes
  
  app.get('/hello',(req,res)=>{
    service .generateCsvReportForAllUser()
   res.send("Report is send Your Mail");
  });

  app.get('/allteacher',(req,res)=>{
    service .generateCsvReportForTeachers()
   res.send("Report is send Your Mail");
  });

  app.get('/teacher/:id',(req,res)=>{
    service .generateCsvparticularteacher(req.params.id)
   res.send("Report is send Your Mail");
  });

  app.get('/principal',(req,res)=>{
    service .generateCsvReportForprincipal()
   res.send("Report is send Your Mail");
  });

  app.get('/teacherattendance/:id',(req,res)=>{
    service .generateCsvParticularTeacherAttendance(req.params.id)
   res.send("Report is send Your Mail");
  });

  app.get('/particularstudent/:id',(req,res)=>{
    service .generateCsvparticularstudent(req.params.id)
   res.send("Report is send Your Mail");
  });

  app.get('/students',(req,res)=>{
    service.allstudents(req.params.id)
   res.send("Report is send Your Mail");
  });

  app.get('/teachers/report/:userid/:from/:to',(req,res)=>{
    service.TeacherAttendance(req.params.userid,req.params.from,req.params.to)
   res.send("Report is send Your Mail");
  });


}