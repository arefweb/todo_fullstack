const { DataTypes } = require("sequelize");

module.exports = (seqConnection) => {
  return seqConnection.define('Todo', {
    todoName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    done: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
  });
};
