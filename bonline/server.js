var express = require('express');
var cookieParser = require('cookie-parser'); //cookies for login
var app = express();
var bodyParser = require('body-parser'); //something about doing post
var path = require('path');
var mysql = require('mysql');
const { time } = require('console');
const { title } = require('process');
//const { response } = require('express'); //bug from the IDE. when you see those burn them with fire
//const { response } = require('express'); //bug from the IDE. when you see those burn them with fire
var theJson;
var theUsers; //downloaded data of all the users. useful for usermanadement like login. 
var msg;
var admin = false;
var loginvar = false;

//===================== Page Generation ================================
function pageGenerator(pagename, req, res, pgloging = false, pgadmin = false, pgname="A user"){
    var title = "";
    if(pagename == "index"){
        title = "Bonline";
    } else {
        title = pagename;
    }
    msg1="";
    msg1 = msg1 + "<head>";
    msg1 = msg1 + "<title>Welcome to " + title + "</title>";
    msg1 = msg1 + '<LINK href="style.css" rel="stylesheet" type="text/css">';
    msg1 = msg1 + "</head>";
    msg1 = msg1 + "<h1>Welcome to the " + title + "</h1>";
    text1 = menuGenerator(pagename, req, res, pgloging, pgadmin, pgname);
    msg1 = msg1 + text1;
    msg1 = msg1 + '</body></html>';
    return msg1;
}

//generates the links automatically.
function menuGenerator(pagename, req, res, pgloging, pgadmin, pgname){
    msg2="";
    msg2 = msg2 + "<p>";
    if((req.cookies.loggedin == 'true') || pgloging){
        msg2 = msg2 + "Welcome " + pgname + "! ";
        if((req.cookies.isadmin == 'true') || pgadmin){
            //do admin stuff
            if(pagename == "adminpanel"){
                msg2 = msg2 + '|<a href="/dashboard.html">dashboard</a>|';
            } else {
                msg2 = msg2 + '|<a href="/adminpanel.html">adminpanel</a>|';
            }
            msg2 = msg2 + '|<a href="/index.html">Homepage</a>||<a href="/logout.html">logout</a>|';
            
            if(pagename == "adminpanel"){
                msg2 = msg2 + '|<a href="/createuser.html">create a user</a>|';
                msg2 = msg2 + '|<a href="/edituser.html">edit a user</a>|';
                msg2 = msg2 + '|<a href="/deleteuser.html">Delete a user</a>|';
            } else {
                msg2 = msg2 + '|<a href="/createitem.html">create an item</a>|';
                msg2 = msg2 + '|<a href="/edititem.html">edit an item</a>|';
                msg2 = msg2 + '|<a href="/deleteitem.html">delete an item</a>|';
            }
            
        } else {
            //do dashboard stuff
            msg2 = msg2 + '|<a href="/index.html">Homepage</a>||<a href="/logout.html">logout</a>|';
            msg2 = msg2 + '|<a href="/createitem.html">create an item</a>|';
            msg2 = msg2 + '|<a href="/edititem.html">edit an item</a>|';
            msg2 = msg2 + '|<a href="/deleteitem.html">delete an item</a>|';
        }
    } else {
        msg2 = msg2 + '|<a href="/login.html">Login</a>||<a href="/registration.html">Register</a>|';
    }
    msg2 = msg2 + "</p>";
    return msg2;
}

//activate cookies in the system
app.use(cookieParser());

// Create application/x-www-form-urlencoded parser  
var urlencodedParser = bodyParser.urlencoded({ extended: false }) 

// testpage
app.get('/test', function(req, res) {
    loadUsersDb(dbcon);
    //console.log("sup!");
    console.log(req.cookies);

    //utilizing the cookies for the loggin system.
    if(req.cookies.loggedin == 'true'){
        loginvar = true;
    }

    //using a 10 secons interval. it continuesly in a loop.
    //setInterval(sendResponseDb, 10000, dbcon);

    //what is used for the index page
    //res.sendFile(path.join(__dirname + '/index.html'));

    //what we are trying to implement.
    msg = pageGenerator("index", req, res);
    res.write(msg);
});


// viewed at http://localhost:8080
app.get('/', function(req, res) {
    loadUsersDb(dbcon);
    //console.log("sup!");
    console.log(req.cookies);

    //utilizing the cookies for the loggin system.
    if(req.cookies.loggedin == 'true'){
        loginvar = true;
    }

    //using a 10 secons interval. it continuesly in a loop.
    //setInterval(sendResponseDb, 10000, dbcon);

    //res.sendFile(path.join(__dirname + '/index.html'));

    //what we are trying to implement.
    msg = pageGenerator("index", req, res);
    res.write(msg);
});

app.get('/index.html', function(req, res) {
    loadUsersDb(dbcon);
    //console.log("sup!");
    console.log(req.cookies);
    //utilizing the cookies for the loggin system.
    if(req.cookies.loggedin == 'true'){
        loginvar = true;
    }
    //using a 10 secons interval. it continuesly in a loop.
    //setInterval(sendResponseDb, 10000, dbcon);

    //res.sendFile(path.join(__dirname + '/index.html'));

    //what we are trying to implement.
    msg = pageGenerator("index", req, res);
    res.write(msg);
    loginvar = false;
});

app.get('/index', function(req, res) {
    loadUsersDb(dbcon);
    //console.log("sup!");
    console.log(req.cookies);
    //utilizing the cookies for the loggin system.
    if(req.cookies.loggedin == 'true'){
        loginvar = true;
    }
    //using a 10 secons interval. it continuesly in a loop.
    //setInterval(sendResponseDb, 10000, dbcon);

    //res.sendFile(path.join(__dirname + '/index.html'));

    //what we are trying to implement.
    msg = pageGenerator("index", req, res);
    res.write(msg);
    loginvar = false;
});

//file already exists. Got deactivated because we will use the static files from publix.
//Style.css in the route can go, but it will remain for future testing and debugging.
/*
app.get('/style.css', function(req, res) {
    res.sendFile(path.join(__dirname + '/style.css'));
});
*/

//===================== ADMIN PANEL ======================================
// ==================== GET ADMIN PANEL ==================================

//GET for adminpanel.html
app.get('/adminpanel.html', function(req, res) {
    loadUsersDb(dbcon);
    //console.log('A message through console log');
    console.log(req.cookies);
    //utilizing the cookies for the loggin system.
    if(req.cookies.loggedin == 'true'){
        loginvar = true;
    }
    if(req.cookies.loggedin == 'true'){
        if(req.cookies.isadmin == 'true'){
            //res.sendFile(path.join(__dirname + '/adminpanel.html'));
            //what we are trying to implement.
    msg = pageGenerator("adminpanel", req, res);
    res.write(msg);
        } else {
            //what we are trying to implement.
    msg = pageGenerator("dashboard", req, res);
    res.write(msg);
            //res.sendFile(path.join(__dirname + '/dashboard.html'));
        }
    } else {
        //res.sendFile(path.join(__dirname + '/index.html'));
        //what we are trying to implement.
    msg = pageGenerator("index", req, res);
    res.write(msg);
    }
    loginvar = false; 
}
);


//GET for adminpanel
app.get('/adminpanel', function(req, res) {
    loadUsersDb(dbcon);
    console.log('A message through console log');
    console.log(req.cookies);
    //utilizing the cookies for the loggin system.
    if(req.cookies.loggedin == 'true'){
        loginvar = true;
    }
    if(req.cookies.loggedin == 'true'){
        if(req.cookies.isadmin == 'true'){
            //res.sendFile(path.join(__dirname + '/adminpanel.html'));
            //what we are trying to implement.
    msg = pageGenerator("adminpanel", req, res);
    res.write(msg);
        } else {
            //what we are trying to implement.
    msg = pageGenerator("dashboard", req, res);
    res.write(msg);
            //res.sendFile(path.join(__dirname + '/dashboard.html'));
        }
    } else {
        //res.sendFile(path.join(__dirname + '/index.html'));
        //what we are trying to implement.
    msg = pageGenerator("index", req, res);
    res.write(msg);
    }
    loginvar = false;
});


//===================== DASHBOARD ======================================
// ==================== GET DASHBOARD ==================================

//GET for dashboard.html
app.get('/dashboard.html', function(req, res) {
    console.log(req.cookies);
    //utilizing the cookies for the loggin system.
    if(req.cookies.loggedin == 'true'){
        loginvar = true;
    }
    if(req.cookies.loggedin == 'true'){
        //res.sendFile(path.join(__dirname + '/dashboard.html'));
        //what we are trying to implement.
    msg = pageGenerator("dashboard", req, res);
    res.write(msg);
    } else {
        //res.sendFile(path.join(__dirname + '/index.html'));
        //what we are trying to implement.
    msg = pageGenerator("index", req, res);
    res.write(msg);
    }

    loginvar = false;
});


//GET for dashboard
app.get('/dashboard', function(req, res) {
    console.log(req.cookies);
    //utilizing the cookies for the loggin system.
    if(req.cookies.loggedin == 'true'){
        loginvar = true;
    }
    if(req.cookies.loggedin == 'true'){
        //res.sendFile(path.join(__dirname + '/dashboard.html'));
        //what we are trying to implement.
    msg = pageGenerator("dashboard", req, res);
    res.write(msg);
    } else {
        //res.sendFile(path.join(__dirname + '/index.html'));
        //what we are trying to implement.
    msg = pageGenerator("index", req, res);
    res.write(msg);
    }

    loginvar = false;
});


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
    //res.sendFile(path.join(__dirname + '/index.html')); 

    //what we are trying to implement.
    msg = pageGenerator("index", req, res);
    res.write(msg);
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
    //res.sendFile(path.join(__dirname + '/index.html')); 

    //what we are trying to implement.
    msg = pageGenerator("index", req, res);
    res.write(msg);

 });

//===================== LOGIN ======================================
// ==================== GET LOGIN ==================================

//The html page for login.html for when "/login" is requested
app.get('/login', function(req, res) {
    loadUsersDb(dbcon);
    res.sendFile(path.join(__dirname + '/login.html'));
});


//The html page for registration.html for when "/login.html" is requested
app.get('/login.html', function(req, res) {
    loadUsersDb(dbcon);
    res.sendFile(path.join(__dirname + '/login.html'));
});


// ==================== POST LOGIN ==================================


  //it works. now it is time to use it to get the values.
  app.post('/login.html', urlencodedParser, function (req, res) {  
    //loadUsersDb(dbcon);
    // Prepare output in JSON format  
    response = {  
        username:req.body.username,
        password:req.body.password,  
    };
    //response = req.body.firstname;
    console.log(response);  
    //res.end(JSON.stringify(response));
    //res.sendFile(path.join(__dirname + '/index.html'));

    //I don't like the use of variables but for now they are practical
    //we keep them for now for reasons of compatibility
    loginvar = login(res, response.username, response.password);
    admin = isAdmin(res, response.username, response.password);

    //I don't like it this way. but otherwise we would have to have to redirect to a third page and
    //we don't have the time to implement that
    if(loginvar){
        //res.cookie('loggedin', 'true');
        if(admin){
            //res.cookie('isadmin', 'true');
            loginvar = false;
            admin = false;
            //res.sendFile(path.join(__dirname + '/adminpanel.html'));
            //what we are trying to implement.
    msg = pageGenerator("adminpanel", req, res, true, true);
    res.write(msg);
        } else {
            loginvar = false;
            admin = false;
            //res.sendFile(path.join(__dirname + '/dashboard.html'));
            //what we are trying to implement.
            msg = pageGenerator("dashboard", req, res, true, false);
            res.write(msg);
        }
    } else {
        //res.cookie('loggedin', 'false');
        loginvar = false;
        admin = false;
        res.sendFile(path.join(__dirname + '/login.html'));
    }
    
    //Doing the registration to the database
    /*
    register(dbcon, response.username, response.password, response.first_name, 
        response.last_name, response.email, response.telephone, "false");
    */

 });

  //it works. now it is time to use it to get the values.
  app.post('/login', urlencodedParser, function (req, res) {  
    //loadUsersDb(dbcon);
    // Prepare output in JSON format  
    response = {  
        username:req.body.username,
        password:req.body.password,  
    };

    //response = req.body.firstname;
    console.log(response);  
    //res.end(JSON.stringify(response));
    //res.sendFile(path.join(__dirname + '/index.html'));

    //I don't like the use of variables but for now they are practical
    //we keep them for now for reasons of compatibility
    loginvar = login(res, response.username, response.password);
    admin = isAdmin(res, response.username, response.password);

    //I don't like it this way. but otherwise we would have to have to redirect to a third page and
    //we don't have the time to implement that
    if(loginvar){
        //res.cookie('loggedin', 'true');
        if(admin){
            //res.cookie('isadmin', 'true');
            loginvar = false;
            admin = false;
            //res.sendFile(path.join(__dirname + '/adminpanel.html'));
            //what we are trying to implement.
    msg = pageGenerator("adminpanel", req, res, true, true);
    res.write(msg);
        } else {
            loginvar = false;
            admin = false;
            //res.sendFile(path.join(__dirname + '/dashboard.html'));
            //what we are trying to implement.
            msg = pageGenerator("dashboard", req, res, true, false);
            res.write(msg);
        }
    } else {
        //res.cookie('loggedin', 'false');
        loginvar = false;
        admin = false;
        res.sendFile(path.join(__dirname + '/login.html'));
    }

    //Doing the registration to the database
    /*
    register(dbcon, response.username, response.password, response.first_name, 
        response.last_name, response.email, response.telephone, "false");
    */

      
 });


 //============================ LOGIN MECHANISM ==================
 function login(res, useranme, password){
    console.log("Login(). Given Username: " + useranme + " and password: " + password);
    if(theUsers != null){
        for(x=0; x<5; x++){
            //console.log("Checking user:" + theUsers[x].username);
            if(theUsers[x].username == useranme){
                console.log("user found:" + theUsers[x].username);
                if(theUsers[x].password == password){
                    console.log("password accepted:" + theUsers[x].password);
                    res.cookie('loggedin', 'true');
                    return true;
                } else {
                    console.log("password rejected:" + theUsers[x].password);
                    res.cookie('loggedin', 'false');
                    return false;
                }
            }
        }
    }
    res.cookie('loggedin', 'false');
    return false;
 }

 function isAdmin(res, useranme, password){
    console.log("isAdmin(). Username: " + useranme + " and password: " + password);
    if(theUsers != null){
        for(x=0; x<5; x++){
            if(theUsers[x].username == useranme){
                if(theUsers[x].admin == "true"){
                    res.cookie('isadmin', 'true');
                    return true;
                } else {
                    res.cookie('isadmin', 'false');
                    return false;
                }
            }
        }
    }
    res.cookie('isadmin', 'false');
    return false;
}


//===================== LOGOUT MECHANISM ======================================
// ==================== GET LOGOUT ==================================

//When logout the system is reseted and redirects to index
app.get('/logout.html', function(req, res) {
    loadUsersDb(dbcon);
    res.cookie('loggedin', 'false');
    res.cookie('isadmin', 'false');
    loginvar = false;
    admin = false;
    res.sendFile(path.join(__dirname + '/index.html'));
});

//When logout the system is reseted and redirects to index
app.get('/logout', function(req, res) {
    loadUsersDb(dbcon);
    res.cookie('loggedin', 'false');
    res.cookie('isadmin', 'false');
    loginvar = false;
    admin = false;
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
	
	
function loadUsersDb(dbcon) {
    console.log("loading the users");
	dbcon.query('select * from usersss;', (err, result) => {
		if(err)
			throw err;
		theUsers = result;
	});

    /*
    if(theJson != null){
        msg="<table><tr><th>id</th><th>temperature</th><th>timestamp</th></tr>";
        for(x=0; x<5; x++){
            msg = msg + "<tr><td>" + theJson[x].id + "</td><td>"  + theJson[x].temperature + "</td><td>" 
            + theJson[x].timestamp + "</td></tr>";
        }
        msg = msg + "</table>";
    }
    */
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