const express = require('express');
const path = require('path');
const { Sequelize, DataTypes } = require('sequelize');

const app = express();

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './home.html'));
});

// Option 3: Passing parameters separately (other dialects)
const sequelize = new Sequelize('todo_db', 'root', '', {
  host: 'localhost',
  dialect: 'mysql'
});

const Todo = sequelize.define('Todo', {
  // Model attributes are defined here
  todoName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  done: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  }
});

(async () => {
  try {
    await Todo.sync({ force: true });
    console.log('Todo has been created successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();

app.listen(4000, () => {
  console.log(`app is running on http://localhost:4000`);
})