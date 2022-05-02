import "dotenv/config";
import express from "express";
import { engine } from "express-handlebars";
import postRouter from "./controller/posts.js";

const app = express();

app.use(
  express.urlencoded({
    extended: true,
  })
);

// Handlebar stuff.
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./views");
//

const PORT = process.env.PORT || 8001;

// Routing.
app.get("/", (req, res) => {
  res.render("home");
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.use(postRouter);
//
app.listen(PORT, function () {
  console.log(`Listening on http://0.0.0.0:${PORT}`);
});
