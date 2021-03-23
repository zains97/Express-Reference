//Importing nexessary things for expresss
const express = require("express");
const path = require("path");
const logger = require("./middleware/logger");
const port = process.env.PORT || 5000;
const exphbs = require("express-handlebars");
const members = require("./Members");

const app = express();

//Init middleware
//app.use(logger);

//Handelbars middleware
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

//Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) =>
  res.render("index", {
    passedInData: "Members App",
    members,
  })
);

//Set a static folder
app.use(express.static(path.join(__dirname, "public")));

//Members api routes
app.use("/api/members", require("./routes/api/members"));

app.listen(port, () => console.log(`App is running on port: ${port}`));
