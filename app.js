const express = require("express");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const _ = require("lodash");
const path = require("path");
const mongoose = require("mongoose");
const nl2br = require("nl2br");

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

mongoose.connect("mongodb://localhost:27017/myJournalDB", { useNewUrlParser: true, useUnifiedTopology: true });

const postSchema = {
  title: String,
  content: String
}

const Post = mongoose.model("Post", postSchema);


app.get("/", (req, res) => {
  res.render("home");
});


app.get("/journal", (req, res) => {
  Post.find({}, (err, posts) => {
    res.render("journal", {
      postGlobal: posts
    });
  });

});

app.get("/compose", (req, res) => {
  res.render("compose");
});

app.post("/compose", (req, res) => {
  const post = new Post ({
    title: req.body.postTitle,
    content: req.body.postBody
  });

  post.save((err) => {
    if(!err) {
      res.redirect("/journal");
    }
  });

});

app.get("/journal/posts/:postId", (req, res) => {
  const requestedPostId = req.params.postId;

  Post.findOne({_id: requestedPostId}, (err, post) => {
    res.render("post", {
      title: post.title,
      body: post.content
    });
  });

});






app.listen(4000, () => {
  console.log("Server running on port 4000");
});
