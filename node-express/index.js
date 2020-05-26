const express = require("express");
const http = require("http");
const morgan = require("morgan");


const bodyParser = require("body-parser");
// when a request is received the data is passed through those parsers before hitting the actual service.

const dishRouter = require('.public/.routes/dishRouter'); //giving path to the dishRouter
const hostname = "localhost";
const port = 3000;

//this is important!! Don't Forget!!
const app = express();

app.use(morgan("dev"));
app.use(bodyParser.json());
// allows us to pass request of the body message which is formatted in json
// we use the body parser, what happens is that for the incoming request,
// the body of the incoming request will be parsed and then added into the req object as req.body

app.use('/dishes', dishRouter);
//Any request coming through the /dishes end-point will be handled by dishRouter


// For the dishes/:dishId endpoint
app.get("/dishes/:dishId", (req, res, next) => {
  res.end("Will send details of the dish: " + req.params.dishId + " to you!");
  //req.params is for accessing the dish Id
});

app.post("/dishes/:dishId", (req, res, next) => {
  res.statusCode = 403;
  res.end("POST operation not supported on /dishes/" + req.params.dishId);
  //:dishId and req.params.dishId should match correctly
  // it doesn't make sense to do a post on a specific dish ID, because you're not trying to, add a new dish
  
});

app.put("/dishes/:dishId", (req, res, next) => {
  res.write("Updating the dish: " + req.params.dishId + "\n"); // used to add a reply message to the reply
  res.end(
    "Will update the dish: " +
      req.body.name +
      " with details: " +
      req.body.description
  );
});

app.delete("/dishes/:dishId", (req, res, next) => {
  res.end("Deleting dish: " + req.params.dishId);
});

app.use(express.static(__dirname + "/public"));

app.use((req, res, next) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/html");
  res.end("<html><body><h1>This is an Express Server</h1></body></html>");
  next();
});

const server = http.createServer(app);

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});


// click on body here and click on raw here. And then, for the text,
// you select this to JSON so use the application JSON.
// So the content type would be application/JSON in the request that you send.
// So since this is a JSON object,
//{"name" : "test" , "description" : "test description"}
