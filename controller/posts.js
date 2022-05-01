import express from "express";
import { MongoClient, ObjectId } from "mongodb";

const client = new MongoClient(process.env.MONGO_URI);

const postRouter = express.Router();

postRouter.get("/posts", async (req, res) => {
  try {
    await client.connect();
    const database = client.db("absdb");
    const posts = database.collection("posts");

    const data = await posts.find({}).toArray();

    res.render("posts/list", { data });
  } finally {
    await client.close();
  }
});

postRouter.get("/posts/create/", (req, res) => {
  res.render("posts/create");
});

postRouter.post("/posts/create/", async (req, res) => {
  try {
    await client.connect();
    const database = client.db("absdb");
    const posts = database.collection("posts");

    const doc = {
      title: req.body.title,
      body: req.body.body,
    };

    const result = await posts.insertOne(doc);
    console.log(`A document was inserted with the _id: ${result.insertedId}`);
  } finally {
    await client.close();
  }
  res.redirect("/posts/");
});

postRouter.get("/posts/:id/", async (req, res) => {
  try {
    await client.connect();
    const database = client.db("absdb");
    const posts = database.collection("posts");

    const data = await posts.findOne({ _id: new ObjectId(req.params.id) });

    res.render("posts/detail", {
      data: { title: data.title, body: data.body, id: data._id.toString() },
    });
  } finally {
    await client.close();
  }
});

postRouter.get("/posts/update/:id/", async (req, res) => {
  try {
    await client.connect();
    const database = client.db("absdb");
    const posts = database.collection("posts");

    const data = await posts.findOne({ _id: new ObjectId(req.params.id) });

    res.render("posts/update", {
      data: { title: data.title, body: data.body, id: data._id.toString() },
    });
  } finally {
    await client.close();
  }
});

postRouter.post("/posts/update/:id/", async (req, res) => {
  try {
    await client.connect();
    const database = client.db("absdb");
    const posts = database.collection("posts");

    const doc = {
      title: req.body.title,
      body: req.body.body,
    };

    const result = await posts.findOneAndReplace(
      { _id: new ObjectId(req.params.id) },
      doc
    );
    console.log(`A document was replaced with the _id: ${req.params.id}`);
  } finally {
    await client.close();
  }
  res.redirect("/posts/");
});

postRouter.get("/posts/delete/:id/", async (req, res) => {
  try {
    await client.connect();
    const database = client.db("absdb");
    const posts = database.collection("posts");

    const result = await posts.findOneAndDelete({
      _id: new ObjectId(req.params.id),
    });
    console.log(`A document was deleted with the _id: ${req.params.id}`);
  } finally {
    await client.close();
  }
  res.redirect("/posts/");
});

export default postRouter;
