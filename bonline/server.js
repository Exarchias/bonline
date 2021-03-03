var express = require('express');
var app = express();
var path = require('path');
const mysql = require('mysql');
var theJson;
var msg;

// viewed at http://localhost:8080
app.get('/', function(req, res) {
    //using a 10 secons interval. it continuesly in a loop.
    setInterval(sendResponseDb, 10000, dbcon);
    res.sendFile(path.join(__dirname + '/index.html'));
});

//file already exists. Got deactivated because we will use the static files from publix.
//Style.css in the route can go, but it will remain for future testing and debugging.
/*
app.get('/style.css', function(req, res) {
    res.sendFile(path.join(__dirname + '/style.css'));
});
*/

//file is created on the fly.
app.get('/data.txt', function(req, res) {
    res.send(msg)
    console.log("sending temperatures");
});

//Public folder with static files
app.use('/', express.static(path.join(__dirname, 'public')))

app.listen(8080);

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

