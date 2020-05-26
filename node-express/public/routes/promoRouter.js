const express = require("express");
const bodyParser = require("body-parser");
const promoRouter = express.Router(undefined); // To enable express promoRouter as an express Router

promoRouter.use(bodyParser.json());
promoRouter
  .route("/") //takes end point as a parameter
  .all((req, res, next) => {
    // the parameter "/promotions" is the end-point
    // For all the requests, app.all gets executed first (no-matter what the method (get,put,post) is)

    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain"); //setting the content-type to plain text

    next(); //deeni tharvatha oche functions ki parameters ni modify chesi pamputhadi
  })
  .get((res, req, next) => {
    // this app.get gets executed right after app.all because of next()
    res.end("Will send all the promotions to you!"); // res.end doesnt set any content-type
  })

  .post((res, req, next) => {
    res.end(
      "Will add the promotion: " +
      req.body.name + // req.body will give access to the info inside
        " with details: " +
        req.body.description
    );
  })

  .put((req, res, next) => {
    res.statusCode = 403;
    res.end("PUT operation not supported on /promotions");
  })
  .delete((req, res, next) => {
    res.end("Deleting all promotions");
  });

promoRouter
  .route("/")
  .get((req, res, next) => {
    res.end(
      "Will send details of the promotion: " + req.params.promoId + " to you!"
    );
    //req.params is for accessing the promo Id
  })
  .post((req, res, next) => {
    res.statusCode = 403;
    res.end(
      "POST operation not supported on /promotions/" + req.params.promoId
    );
    //:leaderId and req.params.leaderId should match correctly
    // it doesn't make sense to do a post on a specific leader ID, because you're not trying to, add a new promotion
  })
  .put((req, res, next) => {
    res.write("Updating the promotion: " + req.params.promoId + "\n"); // used to add a reply message to the reply
    res.end(
      "Will update the promotion: " +
        req.body.name +
        " with details: " +
        req.body.description
    );
  })
  .delete((req, res, next) => {
    res.end("Deleting promotion: " + req.params.promoId);
  });

module.exports = promoRouter;
