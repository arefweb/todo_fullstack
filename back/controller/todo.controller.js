const seqModel = require('../model');
const Todo = seqModel.todo;

module.exports.createTodo = (req, res) => {
  const { todoName, done, id} = req.body;
  if (!todoName) {
    return res.status(400).json({ message: "send required fields"});
  }
  try {
    Todo.create({
      ...(id && {id: id}),
      todoName: todoName,
      done: done
    });
    res.status(201).send("Todo added successfully");
  } catch (error) {
    return res.status(500).send(error);
  }
}

module.exports.getTodos = (req, res) => {
  Todo.findAll().then((todos) => {
    if(todos.length) {
      res.json(todos);
    } else {
      res.status(204).send({message: "no content"});
    }
  }).catch((error) => {
    res.status(500).json(error);
  });
}

module.exports.deleteTodo = (req, res) => {
  Todo.findOne({
    where: {
      id: req.params.id,
    },
  }).then((todo) => {
    if (!todo) {
      return res.status(404).json({ message: "Couldn't find todo!" });
    }
    todo.destroy();
    res.json({message: "Deleted Successfully!"})
  }).catch((error) => {
    res.status(500).json(error);
  })
}

module.exports.updateTodo = (req, res) => {
  const { todoName, done} = req.body;
  Todo.findOne({
    where: {
      id: req.params.id,
    },
  }).then((todo) => {
    if (!todo) {
      return res.status(404).json({ message: "Couldn't find todo!" });
    }
    todo.update({
      todoName: todoName,
      done: done
    })
    res.json({message: "Updated Successfully!"})
  }).catch((error) => {
    res.status(500).json(error);
  })
}