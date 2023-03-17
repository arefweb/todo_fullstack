const controller = require("../controller/todo.controller");

module.exports = function (app) {
  app.post('/api/addTodo', controller.createTodo);
}