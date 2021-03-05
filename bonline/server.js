var express = require('express');
var app = express();
var bodyParser = require('body-parser'); //something about doing post
var path = require('path');
var mysql = require('mysql');
//const { response } = require('express');
var theJson;
var msg;

// Create application/x-www-form-urlencoded parser  
var urlencodedParser = bodyParser.urlencoded({ extended: false }) 

// viewed at http://localhost:8080
app.get('/', function(req, res) {
    //using a 10 secons interval. it continuesly in a loop.
    //setInterval(sendResponseDb, 10000, dbcon);
    res.sendFile(path.join(__dirname + '/index.html'));
});

//file already exists. Got deactivated because we will use the static files from publix.
//Style.css in the route can go, but it will remain for future testing and debugging.
/*
app.get('/style.css', function(req, res) {
    res.sendFile(path.join(__dirname + '/style.css'));
});
*/

//===================== REGISTRATION ======================================
// ==================== GET REGISTRATION ==================================

//The html page for registration.html for when "/registration" is requested
app.get('/registration', function(req, res) {
    res.sendFile(path.join(__dirname + '/registration.html'));
});


//The html page for registration.html for when "/registration.html" is requested
app.get('/registration.html', function(req, res) {
    res.sendFile(path.join(__dirname + '/registration.html'));
});


// ==================== POST REGISTRATION ==================================
/*
app.post('/registration',function(req,res){
    //var user_name = req.body.firstname;
    //var password = req.body.password;
    console.log("Req = "+ req);
    res.sendFile(path.join(__dirname + '/index.html'));
    //res.end("yes");
  });
  */

  //it works. now it is time to use it to get the values.
  app.post('/registration.html', urlencodedParser, function (req, res) {  
    // Prepare output in JSON format  
    response = {  
        username:req.body.username,
        first_name:req.body.firstname,  
        last_name:req.body.lastname,
        password:req.body.password,
        email:req.body.email,
        telephone:req.body.telephone  
    };
    //Doing the registration to the database
    register(dbcon, response.username, response.password, response.first_name, 
        response.last_name, response.email, response.telephone, "false");

     
   //response = req.body.firstname;
    console.log(response);  
    //res.end(JSON.stringify(response));
    res.sendFile(path.join(__dirname + '/index.html')); 
 });

  //it works. now it is time to use it to get the values.
  app.post('/registration', urlencodedParser, function (req, res) {  
    // Prepare output in JSON format  
    response = {  
        username:req.body.username,
        first_name:req.body.firstname,  
        last_name:req.body.lastname,
        password:req.body.password,
        email:req.body.email,
        telephone:req.body.telephone  
    };
    //Doing the registration to the database
    register(dbcon, response.username, response.password, response.first_name, 
        response.last_name, response.email, response.telephone, "false");

     
   //response = req.body.firstname;
    console.log(response);  
    //res.end(JSON.stringify(response));
    res.sendFile(path.join(__dirname + '/index.html')); 
 });

//===================== LOGIN ======================================
// ==================== GET LOGIN ==================================

//The html page for login.html for when "/login" is requested
app.get('/login', function(req, res) {
    res.sendFile(path.join(__dirname + '/login.html'));
});


//The html page for registration.html for when "/login.html" is requested
app.get('/login.html', function(req, res) {
    res.sendFile(path.join(__dirname + '/login.html'));
});


// ==================== POST LOGIN ==================================


  //it works. now it is time to use it to get the values.
  app.post('/login.html', urlencodedParser, function (req, res) {  
    // Prepare output in JSON format  
    response = {  
        username:req.body.username,
        password:req.body.password,  
    };
    //Doing the registration to the database
    /*
    register(dbcon, response.username, response.password, response.first_name, 
        response.last_name, response.email, response.telephone, "false");
    */

     
   //response = req.body.firstname;
    console.log(response);  
    //res.end(JSON.stringify(response));
    res.sendFile(path.join(__dirname + '/index.html')); 
 });

  //it works. now it is time to use it to get the values.
  app.post('/login', urlencodedParser, function (req, res) {  
    // Prepare output in JSON format  
    response = {  
        username:req.body.username,
        password:req.body.password,  
    };
    //Doing the registration to the database
    /*
    register(dbcon, response.username, response.password, response.first_name, 
        response.last_name, response.email, response.telephone, "false");
    */

     
   //response = req.body.firstname;
    console.log(response);  
    //res.end(JSON.stringify(response));
    res.sendFile(path.join(__dirname + '/index.html')); 
 });




//============================ OTHER SERVER THINGS ==================
//file is created on the fly.
app.get('/data.txt', function(req, res) {
    res.send(msg)
    console.log("sending temperatures");
});

//Public folder with static files
app.use('/', express.static(path.join(__dirname, 'public')))

app.listen(8080);


//================ MySQL Connection ===============================
//Don't forget the require('mysql'); in the beginning.
const dbcon = mysql.createConnection({
	host: "den1.mysql5.gear.host",
	user: "xtracker",
	password: "Kt4j_?V18w076",
	database: "xtracker"
	});
	
	
function sendResponseDb(dbcon) {
    console.log("updating the database");
	dbcon.query('select * from temperatures;', (err, result) => {
		if(err)
			throw err;
		
		
		theJson = result;
	});
    if(theJson != null){
        msg="<table><tr><th>id</th><th>temperature</th><th>timestamp</th></tr>";
        for(x=0; x<5; x++){
            msg = msg + "<tr><td>" + theJson[x].id + "</td><td>"  + theJson[x].temperature + "</td><td>" 
            + theJson[x].timestamp + "</td></tr>";
        }
        msg = msg + "</table>";
    }

}

function register(dbcon, username, password, firstname, lastname, email, telephone, admin){
    dbcon.connect(function(err) {
        if (err) throw err;
        console.log("Connected!");
        var sql = "INSERT INTO usersss (username, password, email, firstname, lastname, telephone, admin) VALUES ('" + username + "','" 
        + password + "','" + email + "','" + firstname + "','" + lastname + "', '" + telephone 
        + "','" + admin + "')";
        dbcon.query(sql, function (err, result) {
          if (err) throw err;
          console.log("1 record inserted");
        });
      });
}