module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("user", {
    nim: {
      type: Sequelize.INTEGER(20),
    },
    username: {
      type: Sequelize.STRING,
    },
    password: {
      type: Sequelize.STRING,
    },
    published: {
      type: Sequelize.BOOLEAN,
    },
  });

  return User;
};
