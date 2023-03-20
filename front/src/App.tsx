import React, {useEffect, useState} from 'react';
import './assets/style/app.styles.scss';
import Header from "src/components/Header/Header";
import ToDoList from "src/components/ToDoList/ToDoList";
import {Todo} from "src/App.types";

function App() {
  const localTodos: Todo[] | null = JSON.parse(localStorage.getItem('todos') as string);
  const [todos, setTodos] = useState<Todo[]>(localTodos ? localTodos : []);
  const [sortedTodos, setSortedTodos] = useState<Todo[]>([]);
  const [sort, setSort] = useState<'up' | 'down'>('up');

  function addTodo(todo: string){
    const newTodo = {
      id: todos.length ? todos[todos.length - 1].id + 1 : 1,
      todoName: todo,
      done: false,
      createdAt: new Date().toISOString()
    }
    setTodos((prev) => [...prev, newTodo]);
  }

  function deleteTodo(todoId: number){
    const newTodo = todos.filter((todo) => {
      return todo.id !== todoId;
    });
    setTodos(newTodo);
  }

  function updateTodo(todo: Todo){
    const updateIndex = todos.findIndex((item) => {
      return item.id === todo.id;
    })
    const newTodo = [...todos];
    newTodo[updateIndex].todoName = todo.todoName;
    newTodo[updateIndex].done = todo.done;
    setTodos(newTodo);
  }

  const handleSort = () => {
    if(sort === 'down') {
      const cloneTodo = [...todos];
      const newTodo = cloneTodo.sort((a, b) => {
        if(a.createdAt < b.createdAt) {
          return 1;
        }
        if(a.createdAt > b.createdAt){
          return -1;
        }
        return 0;
      });
      setSortedTodos(newTodo);
    }
    if(sort === 'up') {
      const cloneTodo = [...todos];
      const newTodo = cloneTodo.sort((a, b) => {
        if(a.createdAt < b.createdAt) {
          return -1;
        }
        if(a.createdAt > b.createdAt){
          return 1;
        }
        return 0;
      });
      setSortedTodos(newTodo);
    }
  }


  useEffect(() => {
    handleSort();
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [sort, todos]);


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
