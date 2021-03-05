//const mysql = require('mysql');
//var theJson;
//var msg;

function validateEmail(email) 
    {
        var regx = /\S+@\S+\.\S+/;
        return regx.test(email);
    }


function validateForm() {
  var username = document.forms["theForm"]["username"].value;
  var password = document.forms["theForm"]["firstname"].password;
    var firstname = document.forms["theForm"]["firstname"].value;
    var lastname = document.forms["theForm"]["lastname"].value;
    var email = document.forms["theForm"]["email"].value;
    var telephone = document.forms["theForm"]["telephone"].value;
    if (username == "") {
      alert("username must be filled out");
      return false;
    } else if (password == "") {
        alert("password must be filled out");
        return false;
    } else if (firstname == "") {
      alert("First Name must be filled out");
      return false;
  } else if (lastname == "") {
      alert("Last Name must be filled out");
      return false;
  } else if (email == "") {
        alert("Email must be filled out");
        return false;
    } else if (telephone == "") {
        alert("Telephone must be filled out");
        return false;
    } else {
        if (!validateEmail(email)) {
            alert("Not an email");
            return false;
          } 
        if (isNaN(telephone)) {
              alert("Telphone needs to be a number");
              return false;
          }
        alert("That is a very valid submission");
        return true;
    }
  }

//================ MySQL Connection ===============================
//Don't forget the require('mysql'); in the beginning.
const dbcon = mysql.createConnection({
	host: "den1.mysql5.gear.host",
	user: "xtracker",
	password: "Kt4j_?V18w076",
	database: "xtracker"
	});

    dbcon.connect(function(err) {
        if (err) throw err;
        console.log("Connected!");
        var sql = "INSERT INTO usersss (username, password, email, telephone) VALUES ('" + firstname + lastname + "','" 
        + password + "','" + email + "', '" + telephone + "')";
        dbcon.query(sql, function (err, result) {
          if (err) throw err;
          console.log("1 record inserted");
        });
      });
	