const express = require("express");
const bodyParser = require("body-parser");
const dishRouter = express.Router(undefined); // To enable express dishRouter as an express Router

dishRouter.use(bodyParser.json());
dishRouter
  .route("/") //takes end point as a parameter
  .all((req, res, next) => {
    // the parameter "/dishes" is the end-point
    // For all the requests, app.all gets executed first (no-matter what the method (get,put,post) is)

    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain"); //setting the content-type to plain text

    next(); //deeni tharvatha oche functions ki parameters ni modify chesi pamputhadi
  })
  .get((res, req, next) => {
    // this app.get gets executed right after app.all because of next()
    res.end("Will send all the dishes to you!"); // res.end doesnt set any content-type
  })

  .post((res, req, next) => {
    res.end(
      "Will add the dish: " +
      req.body.name + // req.body will give access to the info inside
        " with details: " +
        req.body.description
    );
  })

  .put((req, res, next) => {
    res.statusCode = 403;
    res.end("PUT operation not supported on /dishes");
  })
  .delete((req, res, next) => {
    res.end("Deleting all dishes");
  });

// we wrote these methods separately in the index.js file,
// but using the route method, we can actually combine these methods together
// all these methods are chained together

//---------------------------------------------------------------------------------------------------------------------

// For the dishes/:dishId endpoint
dishRouter
  .route("/")
  .get((req, res, next) => {
    res.end("Will send details of the dish: " + req.params.dishId + " to you!");
    //req.params is for accessing the dish Id
  })
  .post((req, res, next) => {
    res.statusCode = 403;
    res.end("POST operation not supported on /dishes/" + req.params.dishId);
    //:dishId and req.params.dishId should match correctly
    // it doesn't make sense to do a post on a specific dish ID, because you're not trying to, add a new dish
  })
  .put((req, res, next) => {
    res.write("Updating the dish: " + req.params.dishId + "\n"); // used to add a reply message to the reply
    res.end(
      "Will update the dish: " +
        req.body.name +
        " with details: " +
        req.body.description
    );
  })
  .delete((req, res, next) => {
    res.end("Deleting dish: " + req.params.dishId);
  });

module.exports = dishRouter;
