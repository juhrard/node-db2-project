const express = require("express");

const router = express.Router();

const db = require("../data/dbConfig.js");

router.get("/", (req, res) => {
  db.select("*")
    .from('cars')
    .then(cars => {
      console.log(cars)
      res.status(200).json(cars);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ error: "failed to get the list of cars" });
    });
});

router.get("/:id", (req, res) => {
  getById(req.params.id)
    .then(car => {
      res.status(200).json(car);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ error: "failed to get the car" });
    });
});

router.post("/", (req, res) => {
  console.log(req.body);
  db("cars")
    .insert(req.body, "id")
    .then(ids => {
      return getById(ids[0]).then(inserted => {
        res.status(201).json(inserted);
      });
    })
    .catch(error => {
      console.log(error);

      res.status(500).json({ error: "failed to add the car" });
    });
});

router.put("/:id", (req, res) => {
  const id = req.params.id;
  db("cars")
    .where({ id })
    .update(req.body)
    .then(count => {
      return getById(id).then(car => {
        res.status(200).json(car);
      });
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ error: "failed to update the car" });
    });
});

router.delete("/:id", (req, res) => {
  const id = req.params.id;
  db("cars")
    .where({ id })
    .del()
    .then(count => {
      res.status(200).json(count);
    })
    .catch(error => {
      console.log(error);

      res.status(500).json({ error: "failed to remove the car" });
    });
});

module.exports = router;

function getById(id) {
  return db("cars")
    .where({ id })
    .first();
}