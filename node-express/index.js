const express = require("express");
const http = require("http");
const morgan = require("morgan");


const bodyParser = require("body-parser");
// when a request is received the data is passed through those parsers before hitting the actual service.

const dishRouter = require('../node-express/public/routes/dishRouter'); //giving path to the dishRouter
const promoRouter = require('../node-express/public/routes/promoRouter');
const leaderRouter = require('../node-express/public/routes/leaderRouter');
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

app.use('/dishes/:dishId', dishRouter);
//Any request coming through the /dishes/:dishId end-point will be handled by dishRouter

app.use('/promotions', promoRouter);
app.use('/promotions/:promoId',promoRouter);

app.use('/leaders', leaderRouter);
app.use('/leaders/:leaderId',leaderRouter);

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
