const sql = require('./src/users/model/connection');
const csv = require('./src/csv/controller/csv');


module.exports = (req, res, next) => {
    let originalUrl = req.originalUrl;
    console.log('===================================');

    console.log(`\n\n \t 192.168.0.173:8090${originalUrl} \t ${req.method}`);
    // let id=req.params.id;
    let token = req.headers.authorization;
    //login page and register page 

    if (originalUrl == '/user/login' || originalUrl == '/user' || originalUrl.includes('/download/')) {
        next()
    } else {

        //query
        sql.query(`select loginid from UserSession where token='${token}'`, (err, result) => {
            if (result == 0) {
                console.log("token invalid");
                res.send("token invalid");
                return;
            }
            if (result) {
                let loginid = result.pop().loginid;
                console.log(loginid)

                //query
                sql.query(`select email,role from Users where id='${loginid}'`, (err, result) => {

                    if (result) {
                        let Userdetail=result.pop()
                        let leo=Userdetail
                        let role = Userdetail.role
                        console.log(role)
                        let id = req.params;
                        // console.log(id);

                        if (role == 'teacher') {
                            if ((originalUrl.substr(0,22) == "/studentattendanceinfo" && req.method == 'GET') ||
                                (originalUrl.substr(0,19) == '/student/attendance' && req.method == 'POST') ||
                                (originalUrl == '/studentattendance1' && req.method == 'GET') ||
                                (originalUrl.substr(0,26) == '/studentsattendance/update' && req.method == 'PATCH') ||
                                (originalUrl.substr(0,11) == '/stu/delete' && req.method == 'DELETE') ||
                                (originalUrl == '/student' && req.method == 'POST') ||
                                (originalUrl == '/student1' && req.method == 'GET') ||
                                (originalUrl.substr(0,12) == '/studentinfo' && req.method == 'POST') ||
                                (originalUrl.substr(0,16) == '/Students/update' && req.method == 'PATCH')||
                                (originalUrl.substr(0,16) == '/Students/delete' && req.method == 'DELETE')||
                                (originalUrl == "/class/all" && req.method== 'GET') ||
                                (originalUrl == '/logout' && req.method == 'GET'))

                                next();
                            
                            else {
                                res.send("cannot access this page");
                            }

                        } else if (role == "principal") {

                            if (!(originalUrl == '/get' || originalUrl == '/getuser' || originalUrl == '/delete/:id'))
                                next()
                            else {
                                res.send("You are not access this page");
                            }
                        } else if (role == "admin") {

                            next()
                        } else {
                            res.send("User not invalid");
                        }
                    }
                })

            } else {
                res.send("Unvalid Token");
            }
        })
    }

}