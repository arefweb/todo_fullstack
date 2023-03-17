const seqModel = require('../model');
const Todo = seqModel.todo;

module.exports.createTodo = (req, res) => {
  const { todoName, done} = req.body;
  console.log(req.body.done);
  if (!todoName) {
    return res.status(400).json({ message: "send required fields"});
  }
  try {
    Todo.create({
      todoName: todoName,
      done: done
    });
    res.status(201).send("Todo added successfully");
  } catch (error) {
    return res.status(500).send(error);
  }
}