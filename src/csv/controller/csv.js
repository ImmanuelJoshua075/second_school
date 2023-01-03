const sql = require('../../users/model/connection')

const momentTime = require("moment-timezone")();
const moment = momentTime.format("YYYY-MM-DD");
// const yesterday = momentTime.subtract(1, "days").format("YYYY-MM-DD");

const path = require('path');
const veg = require('../model/events');
var events = require('events');

const commonpath = "school2/csv/"

var commonlink = "http://192.168.0.173:8090/download/";

var em = new events.EventEmitter();


const createCsvWriter = require("csv-writer").createObjectCsvWriter;

//allusers

exports.generateCsvReportForAllUser = (email) => {
    const fileName = "allusers.csv";
    let csvWriter = createCsvWriter({
        path: commonpath + fileName,
        header: [
            { id: "id", title: "ID" },
            { id: "firstName", title: "FirstName" },
            { id: "lastName", title: "LastName" },
            { id: "phone", title: "Phone" },
            { id: "phonecode", title: "PhoneCode" },
            { id: "email", title: "Email" },
            { id: "gender", title: "Gender" },
            { id: "dob", title: "Date Of Birth" },
            { id: "role", title: "Role" },
            { id: "address1", title: "Address1" },
            { id: "address2", title: "Address2" },
            { id: "city", title: "City" },
            { id: "state", title: "State" },
            { id: "pincode", title: "PinCode" },
            { id: "status", title: "Status" },
            { id: "createdat", title: "Createdat" },
        ],
    });
    sql.query("select * from Users", (err, result) => {
        csvWriter.writeRecords(result).then(() => {
            veg.emit('myevent1', commonlink + fileName, email);
            console.log("Generated");
            return "Generate Successfully"
        })
            .catch((err) => {
                console.log(err);
                return err;
            });
    })
}

//particular Teacher

exports.generateCsvparticularteacher = function (req, res,id) {

    const fileName = 'particularteacher.csv';

    let csvWriter = createCsvWriter({
        path: commonpath+fileName,
        header: [
            { id: "id", title: "ID" },
            { id: "firstName", title: "FirstName" },
            { id: "lastName", title: "LastName" },
            { id: "phone", title: "Phone" },
            { id: "phoneCode", title: "PhoneCode" },
            { id: "email", title: "Email" },
            { id: "gender", title: "Gender" },
            { id: "dob", title: "Date Of Birth" },
            { id: "role", title: "Role" },
            { id: "address1", title: "Address1" },
            { id: "address2", title: "Address2" },
            { id: "city", title: "City" },
            { id: "state", title: "State" },
            { id: "pincode", title: "PinCode" },
            { id: "status", title: "Status" },
            { id: "createdat", title: "Createdat" },
        ],
    });
    // let id = req.params.id;
    let Userquery = `select * from Users where id='${id}'`;
    sql.query(Userquery, async (err, result) => {
        await csvWriter.writeRecords(result)
        .then(() => {
            veg.emit('myevent1',commonlink + fileName);
        })
        .catch((err)=>{
            console.log(err);
            return err;
        })
    })

};


//teachers report

exports.generateCsvReportForTeachers = (req, res) => {

    const fileName='teachers.csv';

    let csvWriter = createCsvWriter({
        path: commonpath + fileName,
        header: [
            { id: "id", title: "ID" },
            { id: "firstName", title: "FirstName" },
            { id: "lastName", title: "LastName" },
            { id: "phone", title: "Phone" },
            { id: "phoneCode", title: "PhoneCode" },
            { id: "email", title: "Email" },
            { id: "gender", title: "Gender" },
            { id: "dob", title: "Date Of Birth" },
            { id: "role", title: "Role" },
            { id: "address1", title: "Address1" },
            { id: "address2", title: "Address2" },
            { id: "city", title: "City" },
            { id: "state", title: "State" },
            { id: "pincode", title: "PinCode" },
            { id: "status", title: "Status" },
            { id: "createdat", title: "Createdat" },
        ],
    });

    sql.query("select * from Users where role='teacher'", (err, result) => {
        csvWriter.writeRecords(result).then(() => {
            veg.emit('myevent1', commonlink + fileName);
        })
        .catch((err)=>{
            console.log(err);
            return err
        })

    })
};

//principle report
exports.generateCsvReportForprincipal = (req, res) => {

    const fileName='principle.csv';

    let csvWriter = createCsvWriter({
        path: "school2/csv/principle.csv",
        header: [
            { id: "id", title: "ID" },
            { id: "firstName", title: "FirstName" },
            { id: "lastName", title: "LastName" },
            { id: "phone", title: "Phone" },
            { id: "phoneCode", title: "PhoneCode" },
            { id: "email", title: "Email" },
            { id: "gender", title: "Gender" },
            { id: "dob", title: "Date Of Birth" },
            { id: "role", title: "Role" },
            { id: "address1", title: "Address1" },
            { id: "address2", title: "Address2" },
            { id: "city", title: "City" },
            { id: "state", title: "State" },
            { id: "pincode", title: "PinCode" },
            { id: "status", title: "Status" },
            { id: "createdat", title: "Createdat" },
        ],
    });

    sql.query("select * from Users where role='principal'", (err, result) => {
        csvWriter.writeRecords(result).then(()=>{
            veg.emit('myevent1', commonlink + fileName)
        })
        .catch((err)=>{
            console.log(err);
            return err;
        })
    });
};

exports.generateCsvParticularTeacherAttendance= (req, res,id) => {

    const fileName = 'particularteacherattendance.csv'

    let csvWriter = createCsvWriter({
        path: commonpath + fileName,
        header: [
            { id: "id", title: "ID" },
            { id: "userid", title: "UserID" },
            { id: "status", title: "Status" },
            { id: "date", title: "Date" },
            { id: "createdat", title: "Createdat" }
        ],
    });
    sql.query(`select *from TeacherAttendance where userid='${id}'`, (err, result) => {
        csvWriter.writeRecords(result).then(()=>{
            veg.emit('myevent1', commonlink + fileName) 
        })
        .catch((err)=>{
            console.log(err);
            return err
        })
    })
}


exports.generateCsvparticularstudent = (req, res,id) => {
    const fileName = 'student.csv'

    let csvWriter = createCsvWriter({
        path: commonpath + fileName,
        header: [
            { id: "id", title: "ID" },
            { id: "firstname", title: "FirstName" },
            { id: "lastname", title: "LastName" },
            { id: "classid", title: "Classid" },
            { id: "dob", title: "Dob" },
            { id: "fathername", title: "Fathername" },
            { id: "mothername", title: "Mothername" },
            { id: "address1", title: "Address1" },
            { id: "address2", title: "Address2" },
            { id: "city", title: "City" },
            { id: "state", title: "State" },
            { id: "pincode", title: "PinCode" },
            { id: "createdat", title: "Createdat" },
        ],
    });
    let Userquery = `select * from Students where id='${id}'`;
    sql.query(Userquery, (err, result) => {
        csvWriter.writeRecords(result).then(()=>{
            veg.emit('myevent1', commonlink + fileName)
        })
        .catch((err)=>{
            console.log(err);
            return err;
    })
});
}



exports.allstudents = (req, res) => {

    const fileName = 'allstudents.csv'

    let csvWriter = createCsvWriter({
        path: commonpath + fileName,
        header: [
            { id: "id", title: "ID" },
            { id: "firstname", title: "FirstName" },
            { id: "lastname", title: "LastName" },
            { id: "classid", title: "Classid" },
            { id: "dob", title: "Dob" },
            { id: "fathername", title: "Fathername" },
            { id: "mothername", title: "Mothername" },
            { id: "address1", title: "Address1" },
            { id: "address2", title: "Address2" },
            { id: "city", title: "City" },
            { id: "state", title: "State" },
            { id: "pincode", title: "PinCode" },
            { id: "createdat", title: "Createdat" },
        ],
    });
    let Userquery = "select * from Students";
    sql.query(Userquery, (err, result) => {
        csvWriter.writeRecords(result).then(()=>{
            veg.emit('myevent1', commonlink + fileName);
        })
        .catch((err)=>{
            console.log(err);
            return err
        })
    })
};

exports.studentAttendance = (classid,from,to) => {

    const fileName='studentAttendance.csv';
     

    sql.query(`SELECT * FROM StudentAttendance WHERE (createdat BETWEEN '${from}' AND '${to}') and classid='${classid}'`,(err,result)=>{
        
    if (err) throw err;
    console.log(result);

    const value=JSON.parse(JSON.stringify(result))
    console.log(value);
   

   let csvWriter=createCsvWriter({

    path:commonpath+fileName,
    header:[
        { id:"id",title:"ID"},
        {id:"classid", title:"ClassID"},
        {id:"studentid",title:"StudentID"},
        {id:"status",title:"Status"},
        {id:"date",title:"Date"},
        {id:"createdat",title:"Createdate"},
    ],
})
    csvWriter.writeRecords(value).then(()=>{
        veg.emit('myevent1', commonlink + fileName);
    })
    .catch((err)=>{
        console.log(err);
        return err
    })
})

}


exports.TeacherAttendance = (userid,from,to) => {

    const fileName='TeacherAttendance.csv';
     

    sql.query(`SELECT * FROM TeacherAttendance WHERE (createdat BETWEEN '${from}' AND '${to}') and userid='${userid}'`,(err,result)=>{
        
    if (err) throw err;

    const value=JSON.parse(JSON.stringify(result))
    console.log(value);
   

   let csvWriter=createCsvWriter({

    path:commonpath+fileName,
    header:[
        { id:"id",title:"ID"},
        {id:"userid", title:"ClassID"},
        {id:"status",title:"Status"},
        {id:"date",title:"Date"},
        {id:"createdat",title:"Createdate"},
    ],
})
    csvWriter.writeRecords(value).then(()=>{
        veg.emit('myevent1', commonlink + fileName);
    })
    .catch((err)=>{
        console.log(err);
        return err
    })
})

}