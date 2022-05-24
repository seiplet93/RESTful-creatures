const express = require("express");
const router = express.Router();

const fs = require("fs");

router.get("/", (req, res) => {
  let dinosaurs = fs.readFileSync("./dinosaurs.json");
  let dinoData = JSON.parse(dinosaurs);

  let nameFilter = req.query.nameFilter;
  if (nameFilter) {
    dinoData = dinoData.filter(
      (dino) => dino.name.toLowerCase() === nameFilter.toLowerCase()
    );
  }

  //   console.log(`NameFilter: ${nameFilter}`);

  res.render("dinosaurs/index.ejs", {
    myDinos: dinoData,
  });
});

router.get("/new", (req, res) => {
  res.render("dinosaurs/new.ejs");
});

// SHOW  ROUTE  (a specific route for  dinosaur)
router.get("/:id", (req, res) => {
  //get the arrayof dinos from the json
  let dinosaurs = fs.readFileSync("./dinosaurs.json");
  let dinoData = JSON.parse(dinosaurs);
  // indentify the index  of the dino in question
  let dinoIndex = req.params.id;
  console.log(`the dino you're are searching for is ${dinoIndex}`);
  console.log(dinoData[dinoIndex]);
  res.render("dinosaurs/show.ejs", { myDino: dinoData[dinoIndex] });
});

router.post("/", (req, res) => {
  let dinosaurs = fs.readFileSync("./dinosaurs.json");
  let dinoData = JSON.parse(dinosaurs);
  // add the new   dino to the array
  dinoData.push(req.body);

  //save  the dinosaurs to the JSON file
  fs.writeFileSync("./dinosaurs.json", JSON.stringify(dinoData));
  //redirect to the index route
  res.redirect("/dinosaurs");
});

// GET /dinosaurs/edit/:id -- a view of a form to edit a specific dino @ :id
router.get("/edit/:id", (req, res) => {
  //get the dino  data and render the edit form
  const dinosaurs = fs.readFileSync("./dinosaurs.json");
  const dinoData = JSON.parse(dinosaurs);

  // render edit form
  res.render("dinosaurs/edit.ejs", {
    dinoId: req.params.id,
    dino: dinoData(req.params.id),
  });
});
// PUT /dinosaurs/:id -- update a dino @ :id in the database
router.put("/:id", (req, res) => {
  // we will get the dino data from the request body
  // gett the dinos from the  dino JSON
  const dinosaurs = fs.readFileSync("./dinosaurs.json");
  const dinoData = JSON.parse(dinosaurs);
  console.log(req.params.id, req.body);
  // update the dino based  on the req.params.id and the req.body
  // req.params = which dno
  // req.body = dino data to update
  dinoData[req.params.id].name = req.body.name;
  dinoData[req.params.id].type = req.body.type;
  // write the json file
  fs.writeFileSync("./dinosaurs.json", JSON.stringify(dinoData));
  //redirect to some place that has interesting data
  res.redirect("/dinosaurs");
});

//DELETE /dinosaurs/:id -- DESTROY a dinosaur @ :id
router.delete("/:id", (req, res) => {
  // get the dinos from the dino JSON
  const dinosaurs = fs.readFileSync("./dinosaurs.json");
  const dinoData = JSON.parse(dinosaurs);

  // splice dino out of the array (index from the req.params)
  // array.splice(starting index to remove, how many elements  to remove)
  dinoData.splice(req.params.id, 1);
  // save  the dino json
  fs.writeFileSync("./dinosaurs.json", JSON.stringify(dinoData));
  // redirect to see all dinos
  res.redirect("/dinosaurs");
});
module.exports = router;
