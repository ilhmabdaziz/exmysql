const db = require("../models");
const User = db.users;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
  if (!req.body.nim || !req.body.username) {
    res.status(400).send({
      message: "nim and username can not be empty",
    });
    return;
  }

  const data = {
    nim: req.body.nim,
    username: req.body.username,
    password: req.body.password ? req.body.password : "123",
    published: req.body.published ? req.body.published : false,
  };

  User.create(data)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the user",
      });
    });
};

exports.findAll = (req, res) => {
  const username = req.query.username;
  let condition = username
    ? { username: { [Op.like]: `%${username}%` } }
    : null;

  User.findAll({ where: condition })
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while find user",
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  User.findByPk(id)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error retrieving user with id=" + id,
      });
    });
};

exports.update = (req, res) => {
  const id = req.params.id;

  User.update(req.body, { where: { id: id } })
    .then((result) => {
      if (result == 1) {
        res.send({
          message: "User was updated successfully",
        });
      } else {
        res.send({
          message: `Cannot update user with id=${id}`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating user with id" + id,
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  User.destroy({ where: { id: id } })
    .then((result) => {
      if (result == 1) {
        res.send({
          message: `User with id=${id} has been successfully deleted`,
        });
      } else {
        res.send({
          message: `Cannot delete user with id=${id}`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Could not delete user with id=" + id,
      });
    });
};

exports.deleteAll = (req, res) => {
  User.destroy({ where: {}, truncate: true })
    .then((result) => {
      res.send({
        message: `${result} user were deleted successfully`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while removing all posts",
      });
    });
};

exports.findAllPublished = (req, res) => {
  User.findAll({ where: { published: true } })
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.meessage || "Some error occured retrieving users",
      });
    });
};
