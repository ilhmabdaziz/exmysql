const db = require("../models");
const Post = db.posts;
const Op = db.Sequelize.Op;

// Create
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty",
    });
    return;
  }

  // Create Post
  const post = {
    title: req.body.title,
    description: req.body.description,
    published: req.body.published ? req.body.published : false,
  };

  // Save Post in the database
  Post.create(post)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.satatus(500).send({
        message: err.message || "Some error occurred while creating the post",
      });
    });
};

// Retrieve all
exports.findAll = (req, res) => {};

// Find a single
exports.findOne = (req, res) => {};

// Update a Post with ID
exports.update = (req, res) => {};

// Delete a Post
exports.delete = (req, res) => {};

// Delete All Posts
exports.deleteAll = (req, res) => {};

// Find all published
exports.findAllPublished = (req, res) => {};
