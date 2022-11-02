const express = require("express");
const router = express.Router();

// add ninjas model
const Ninja = require("../models/ninja");

router.get("/", (req, res, next) => {
  // check if longitude and latitude are provided
  req.query.lng != undefined && req.query.lat != undefined
    ? // Aggregate the ninjas 10000 m  closest to the point in the query
      Ninja.aggregate([
        {
          $geoNear: {
            near: {
              type: "Point",
              coordinates: [
                parseFloat(req.query.lng),
                parseFloat(req.query.lat),
              ],
            },
            distanceField: "distance",
            maxDistance: 10000,
            spherical: true,
          },
        },
      ]).then((ninjas) => {
        res.send(ninjas);
      })
    : // Get the all the ninjas if no point specified
      Ninja.find({}).then((ninjas) => {
        res.send(ninjas);
      });
});

// add ninjas
router.post("/", (req, res, next) => {
  Ninja.create(req.body)
    .then((ninja) => {
      res.send(ninja);
    })
    .catch(next);
});

// update ninjas
router.put("/:id", (req, res, next) => {
  Ninja.findByIdAndUpdate({ _id: req.params.id }, req.body).then(() => {
    Ninja.findOne({ _id: req.params.id }).then((ninja) => {
      res.send(ninja);
    });
  });
});

// delete ninjas
router.delete("/:id", (req, res, next) => {
  Ninja.findByIdAndRemove({ _id: req.params.id }).then((ninja) => {
    res.send(ninja);
  });
});

module.exports = router;
