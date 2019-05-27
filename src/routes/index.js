var express = require("express");
var router = express.Router();

const Item = require("./../models/Item");

/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("index", { title: "Express" });
});

router.post("/create", (req, res) => {
  if (!req.body || !req.body.itemName) {
    res.json({ message: "error" });
    return;
  }

  new Item({ name: req.body.itemName })
    .save()
    .then(item => {
      res.json(item);
    })
    .catch(err => {
      console.error(err);
      res.json({ message: "error" });
    });

  // res.json({ message: "create" });
});

router.get("/retrieve", (req, res) => {
  Item.find({})
    .then(items => {
      res.json(items);
    })
    .catch(err => {
      console.error(err);
      res.json({ message: "error" });
    });

  // res.json({ message: "retrieve" });
});

router.post("/update", (req, res) => {
  if (!req.body || !req.body.oldName || !req.body.newName) {
    res.json({ message: "error" });
    return;
  }

  const updatedItem = {};
  updatedItem.name = req.body.newName;
  if (req.body.quantity) {
    updatedItem.quantity = req.body.quantity;
  }

  Item.findOneAndUpdate({ name: req.body.oldName }, updatedItem, {
    new: true,
    upsert: false
  })
    .then(newItem => {
      res.json(newItem);
    })
    .catch(err => {
      console.error(err);
      res.json({ message: "error" });
    });
  // res.json({ message: "update" });
});

router.post("/delete", (req, res) => {
  if (!req.body || !req.body.itemName) {
    res.json({ message: "error" });
    return;
  }

  Item.findOneAndDelete({ name: req.body.itemName })
    .then(result => {
      res.json(result);
    })
    .catch(err => {
      console.error(err);
      res.json({ message: "error" });
    });
  // res.json({ message: "delete" });
});

module.exports = router;
