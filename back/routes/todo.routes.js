const controller = require("../controller/todo.controller");

module.exports = function (app) {
  app.post('/api/addTodo', controller.createTodo);
  app.get('/api/todos', controller.getTodos);
  app.delete('/api/todo/:id', controller.deleteTodo);
  app.put('/api/todo/:id', controller.updateTodo);
}
