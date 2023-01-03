
module.exports = app => {
    const service=require('../controller/csv');
  
  //csv routes
  
  app.get('/csv/user',service.generateCsvReportForAllUser);
  
  app.get('/csv/teachers',service.generateCsvReportForTeachers);
  
  app.get('/csv/principle',service.generateCsvReportForprinciple);
  
  app.get('/csv/getteacher',service.generateCsvParticularTeacher);
  
  app.get('/csv/particularteacher/:id',service.generateCsvparticularteacher);
  
  app.get('/csv/particularstudent/:id',service.generateCsvparticularstudent);
  
  app.get('/csv/allstudents',service.allstudents);
  

  }