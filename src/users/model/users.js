const sql = require('../model/connection');
const bcrypt = require('bcrypt');


var User = function (user) {
  this.id = user.id;
  this.firstName = user.firstName;
  this.lastName = user.lastName;
  this.phone = user.phone;
  this.email = user.email;
  this.password = user.password;
  this.gender = user.gender;
  this.dob = user.dob;
  this.role = user.role;
  this.address1 = user.address1;
  this.address2 = user.address2;
  this.city = user.city;
  this.state = user.state;
  this.pincode = user.pincode;
  this.status = user.status || false
};



// create a new user
User.create = (newuser, result) => {
  sql.query("INSERT INTO Users SET ?", newuser, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("create the new user: ", { id: res.insertId, ...newuser });
    result(null, { id: res.insertId, ...newuser });
  });
};

//token using the user get 
User.getone = (token, res) => {
  sql.query(`select loginid from UserSession where token='${token}'`, (err, result) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    if (result == 0) {
      res.send("Something is error occur");
    }
    else {
      let id = (result.pop()).loginid;

      sql.query(`select * from Users where id='${id}'`, (err, result) => {
        if (err) {
          console.log("error: ", err);
          result(err, null);
          return;
        }
        else {
          res.send(result);
          console.log(result);
        }
      });
    }
  })
}

//id using for getting the user

User.oneuser = (id, res) => {
  console.log(id);
  sql.query(`select*from Users where id='${id}'`, (err, result) => {
    if (err) {
      res.send(err);
      console.log(err);
    }
    else {
      res.send(result);
      console.log(result);
    }
  })
}


//login page 
User.login = async (data, res) => {

  let { password, email } = data;

  await sql.query(`SELECT password FROM Users WHERE email ='${email}'`, async (err, result) => {

    if (err) {
      res.send("Password is incorrect");
      console.log("error: ", err);
      result(err, null);
      return;
    }
    if (result == 0) {
      res.send("User is not correct");
    }
    else {

      const token = generateToken();

      // password compare
      // console.log(password);
      const Password = password.toString()
      const Databasepassword = (result.pop()).password;
      // console.log(Databasepassword);

      const datas = await bcrypt.compare(Password, Databasepassword)
      if (datas) {
        sql.query(`SELECT * FROM Users where email='${email}'`, (err, result) => {
          if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
          } else {
            console.log(result);
            const UserDetail = result.pop()
            let loginid = UserDetail.id;

            console.log("UserDetail", result);
            console.log(loginid)

            console.log(token);
            sql.query(`INSERT INTO UserSession(loginid, token, status) VALUES ('${loginid}','${token}', 'active')`, (err, result) => {
              if (err) {
                console.log("error: ", err);
                // result(err, null);
                res.send("error");
                return;
              }
              res.json({ users: UserDetail, token })
              return
            });
          }
        })
      } else {
        res.send("Login failed")
      }
    }

  });
}

//Token generate
function generateToken() {
  const N = 30;
  return Array(N + 1).join((Math.random().toString(36) + '00000000000000000').slice(2, 18)).slice(0, N)

}

//all users
User.get = (result) => {

  let query = "SELECT * FROM Users";

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log("Users: ", res);
    result(null, res);
  });
};

//update for users
User.update = (id, user, result) => {
  sql.query(
    "UPDATE Users SET firstName = ?, lastName = ?,phone=?,phoneCode=?,email = ?,password=?,gender=?,dob=?,role=?, address1 = ?, address2 = ?, city = ?, state = ?, pincode = ?,status = ? WHERE id = ?",
    [user.firstName, user.lastName, user.phone, user.phoneCode, user.email, user.password, user.gender, user.dob, user.role, user.address1, user.address2, user.city, user.state, user.pincode, user.status, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found User with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated user: ", { id: id, ...user });
      result(null, { id: id, ...user });
    }
  );
};

//delete for users

User.remove = (id, result) => {
  sql.query("DELETE FROM Users WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Tutorial with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("delete User with id: ", id);
    result(null, res);
  });
};


//user logout
User.logout = (token, result) => {

  console.log(token);

  sql.query(
    `UPDATE UserSession SET status = 'inactive' WHERE token = '${token}'`, (err, res) => {

      if (err) {
        console.log("error: ", err);
        // result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found User with the id
        result({ kind: "not_found" }, null);
        return;
      }
      result(null, { message: "Logged out successfully" });
    }
  );
}

User.role = (role, res) => {
  console.log(role);
  sql.query(`select *from Users where role='${role}'`, (err, data) => {
    if (err) {
      console.log("error", err);
      res.send(err);
    }
    else {
      res.send(data);
      console.log("Successfully");
    }
  });
}


module.exports = User;
