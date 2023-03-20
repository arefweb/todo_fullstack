import React, {useEffect, useState} from 'react';
import './assets/style/app.styles.scss';
import Header from "src/components/Header/Header";
import ToDoList from "src/components/ToDoList/ToDoList";
import {Todo} from "src/App.types";
import {TodoService} from "./services";

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [sortedTodos, setSortedTodos] = useState<Todo[]>([]);
  const [sort, setSort] = useState<'asc' | 'desc'>('asc');

  function addTodo(todo: string){
    const newTodo = {
      id: todos.length ? todos[todos.length - 1].id + 1 : 1,
      todoName: todo,
      done: false,
      // createdAt: new Date().toISOString()
    }
    TodoService.createTodo(newTodo).then((resp) => {
      if(resp.status === 201) {
        setTodos((prev) => [...prev, resp.data.payload]);
      }
    })
  }

  function deleteTodo(todoId: number){
    TodoService.deleteTodo(todoId).then((resp) => {
      if(resp.status === 200){
        const newTodo = todos.filter((todo) => {
          return todo.id !== resp.data.payload.id;
        });
        setTodos(newTodo);
      }
    })
  }

  function updateTodo(todo: Todo){
    const updateIndex = todos.findIndex((item) => {
      return item.id === todo.id;
    })
    const toUpdate = {
      todoName: todo.todoName,
      done: todo.done
    }
    TodoService.updateTodo(todo.id, toUpdate).then((resp) => {
      const newTodo = [...todos];
      newTodo[updateIndex].todoName = resp.data.payload.todoName;
      newTodo[updateIndex].done = resp.data.payload.done;
      setTodos(newTodo);
    });
  }

  const handleSort = () => {
    TodoService.getTodos(sort).then((resp) => {
      setSortedTodos(resp.data);
    });
  }

  useEffect(() => {
    handleSort();
  }, [sort, todos]);

  useEffect(() => {
    TodoService.getTodos(sort).then((resp) => {
      setTodos(resp.data);
    })
  }, []);

  return (
    <div>
      <Header addTodo={addTodo} />
      <ToDoList
        todos={sortedTodos}
        deleteTodo={deleteTodo}
        updateTodo={updateTodo}
        sort={sort}
        setSort={setSort}
      />
    </div>
  );
}

export default App;
