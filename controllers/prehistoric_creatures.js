const express = require("express");
const router = express.Router();

const fs = require("fs");

router.get("/", (req, res) => {
  let creatures = fs.readFileSync("./prehistoric_creatures.json");
  let creatureData = JSON.parse(creatures);
  console.log(creatureData);
  res.render("./prehistoric_creatures/creaturesIndex.ejs", {
    creatureData,
  });
});

router.get("/new", (req, res) => {
  res.render("prehistoric_creatures/new.ejs");
});

router.get("/:id", (req, res) => {
  let creatures = fs.readFileSync("./prehistoric_creatures.json");
  let creatureData = JSON.parse(creatures);

  let creatureIndex = req.params.id;
  console.log(`the creature you're are searching for is ${creatureIndex}`);
  console.log(creatureData[creatureIndex]);
  res.render("/prehistoric_creatures/show.ejs", {
    myCreature: creatureData[creatureIndex],
  });
});

router.post("/", (req, res) => {
  let creatures = fs.readFileSync("./prehistoric_creatures.json");
  let creatureData = JSON.parse(creatures);

  creatureData.push(req.body);

  fs.writeFileSync(
    "./prehistoric_creatures.json",
    JSON.stringify(creatureData)
  );

  res.redirect("/prehistoric_creatures");
});

router.put("/:id", (req, res) => {
  // we will get the dino data from the request body
  // gett the dinos from the  dino JSON
  const creatures = fs.readFileSync("./prehistoric_creatures.json");
  const creatureData = JSON.parse(creatures);
  console.log(req.params.id, req.body);
  // update the dino based  on the req.params.id and the req.body
  // req.params = which dno
  // req.body = dino data to update
  creatureData[req.params.id].name = req.body.name;
  creatureData[req.params.id].type = req.body.type;
  // write the json file
  fs.writeFileSync(
    "./prehistoric_creatures.json",
    JSON.stringify(creatureData)
  );
  //redirect to some place that has interesting data
  res.redirect("/prehistoric_creatures");
});
module.exports = router;
