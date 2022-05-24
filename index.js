const express = require("express");
const ejsLayouts = require("express-ejs-layouts");
// const fs = require("fs");
const methodOverride = require("method-override");
//creating an instance of an express app
const app = express();
// set EJS as the view engine
app.set("view engine", "ejs");

app.use(ejsLayouts);

app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));

app.use("/dinosaurs", require("./controllers/dinosaurs"));

app.use(
  "/prehistoric_creatures",
  require("./controllers/prehistoric_creatures.js")
);

app.get("/", (req, res) => {
  res.render("home.ejs");
});

//index route
app.listen(3002, () => {
  console.log("cruddy dinos on port 3002");
});
