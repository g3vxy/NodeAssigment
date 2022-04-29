import "dotenv/config";
import express from "express";
import { engine } from "express-handlebars";

const app = express();

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./views");

const PORT = process.env.PORT || 8001;

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/posts", (req, res) => {
  res.render("posts");
});

app.listen(PORT, function () {
  console.log(`Listening on http://0.0.0.0:${PORT}`);
});
