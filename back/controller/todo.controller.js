const seqModel = require('../model');
const Todo = seqModel.todo;

module.exports.createTodo = (req, res) => {
  const { todoName, done, id} = req.body;
  if (!todoName) {
    return res.status(400).json({ message: "send required fields"});
  }
  Todo.create({
    ...(id && {id: id}),
    todoName: todoName,
    done: done
  }).then((newTodo) => {
    if(newTodo) {
      res.status(201).json({message: "Todo added successfully", payload: newTodo});
    }
  }).catch(error => {
    return res.status(500).send(error);
  })
}

module.exports.getTodos = (req, res) => {
  const sort = req.query.sort;
  Todo.findAll({
    order: [
      ['createdAt', `${sort ? sort.toUpperCase() : "ASC"}`]
    ]
  }).then((todos) => {
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
    todo.destroy().then(resp => {
      res.json({message: "Deleted Successfully!", payload: resp})
    })
  }).catch((error) => {
    res.status(404).json(error);
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
    }).then((resp) => {
      res.json({message: "Updated Successfully!", payload: resp});
    })
  }).catch((error) => {
    res.status(500).json(error);
  })
}