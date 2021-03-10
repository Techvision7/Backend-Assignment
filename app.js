const Express = require("express");
const BodyParser = require("Body-Parser");


//creating express app
const app = Express();

app.use(BodyParser.json());
app.use(BodyParser.urlencoded({extended : true}));
var datbase, collection;

//connecting to Databasse
const db = require("./app/models");
db.mongoose
.connect(db.url, {
	useNewUrlParser: true,
	useUnifiedTopology: true
})
.then(() => {
	console.log("connected to the Databasse!");
})
.catch(err => {
	console.log("Cannot connect to the Databasse!", err);
	process.exit();
});
require("./app/routes/movie.routes.js")(app);

//set port for listening
app.listen(5000, () => {
	console.log("server is running on port 5000");
});

// defining a simple route
app.get('/', (req, res) => {
	//res.send('hello world')
    res.json({ message: "Welcome"});
});


