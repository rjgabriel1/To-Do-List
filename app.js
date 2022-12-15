const express = require("express");
const bodyParser = require("body-parser");
const { request, response } = require("express");
const date = require(__dirname + "/date.js");
const items = [];
const workItems = [];

const app = express();
// get our app to use body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

/*
1- The page load in go to the home route --> app.get("/").
2- The list.ejs will be rendered with two variables which are:
{ kindOfDay: day, newListItems:items});
3- When a post is triggered the value of the item will be pushed to the array
items[]
4- and then the variable newListItems will content the array
5- To finish we will iterate through the array in the list.js file
to create a new listItem everytime an item is added.
*/

app.get("/", function (req, res) {
    let day = date.getDay();
  res.render("list", { listTitle: day, newListItems: items });
});

app.post("/", (request, response) => {
  let item = request.body.newItem;

  if (request.body.list === "Work") {
    workItems.push(item);
    response.redirect("/work");
  } else {
    items.push(item);
    response.redirect("/");
  }
});

app.get("/work", (request, response) => {
  response.render("list", { listTitle: "Work list", newListItems: workItems });
});

app.post("/work", (request, response) => {
  let item = request.body.newItem;
  workItems.push(item);
  response.redirect("/work");
});

app.get("/about", (request, response) => {
    response.render("about");
})

app.listen(3000, function () {
  console.log("Server started on port 3000.");
});
