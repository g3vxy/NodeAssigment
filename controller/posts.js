import express from "express";

const postRouter = express.Router();

postRouter.get("/posts", (req, res) => {
  res.render("posts/list");
});

postRouter.get("/posts/create/", (req, res) => {
  res.render("posts/create");
});

postRouter.post("/posts/create/", (req, res) => {
  console.log(req.body);
  res.redirect("/posts/");
});

export default postRouter;
