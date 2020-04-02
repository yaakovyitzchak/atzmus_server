var prs = require("node-html-parser").parse;
var coby = require("./COBY.js"),
	fs = require("fs")
var database = [];
var path = (
	"./database.txt"
//	"./database2.json"
);
readDatabase()
function readDatabase() {
	database = JSON.parse(
		fs.readFileSync(path)
	);
}

var colors = "green blue red purple pink cyan yellow orange black white magenta brown darkblue grey lightblue lime navy olive silver teal maroon"
var splat = colors.split(" ")
database.forEach((x, i)=>{
	x.id = id() + i
	
//	x.color = color()
	

});

function color() {
	return splat[
		Math.floor(
			Math.random() * 
			splat.length
		)
	]
}

function id() {
	return coby.mapAt(
		(Date.now()) + 
		(Math.random() * 10 )
		+ "" 
	)
}
saveDatabase()
function saveDatabase() {
	fs.writeFileSync(path, JSON.stringify(database,4 ,4 ,4));
}
coby.adanServer({
		server(q,r) {
			r.end("ASD")
		},
		port:770,
		adanFunctions:{
			ho(m,cs) {
				cs.send({
					"back": {
						m,
						other:3
					}
				})
			},
			spawn(m,cs) {
		//		m.color = color()
				database.push(m);
				setTimeout(function() {
					saveDatabase();
				}, 100)
			//	readDatabase();
		//		console.log("just wrote", m, " to ", database)
				cs.send({
					spawned: m
				});
			},
			getData(m, cs) {
				readDatabase();
		//		console.log("getting", database);
				cs.send({
					data: database
				});
			}
		},
		onOpen(wss,cs){
			cs.send({
				"back": {
					"d":123,
					other:3
				}
			})
			console.log("NEW!");
			
		}
		
})
/*
for(var i = 8888; i < 8888 + 1000; i++) {
	var d = {
				type: "domem",
				position: {
					x:0,
					y:i * 770 + 1000,
					z:0
				},
				color: "magenta"
			}
	database.push(d);
}

setTimeout(function() {
	saveDatabase();
}, 100)

*/