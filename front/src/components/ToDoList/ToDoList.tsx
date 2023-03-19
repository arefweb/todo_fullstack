import React, {Dispatch, SetStateAction} from 'react';
import ToDoCard from "src/components/ToDoCard/ToDoCard";
import "./_ToDoList.scss";
import {ReactComponent as SortDown} from "src/assets/images/sortDown.svg";
import {ReactComponent as SortUp} from "src/assets/images/sortUp.svg";
import {Todo} from "src/App.types";

interface IToDoList {
  todos: Todo[];
  deleteTodo: (todo: number) => void;
  updateTodo: (todo: Todo) => void;
  sort: 'up' | 'down';
  setSort: Dispatch<SetStateAction<"up" | "down">>;
}

const ToDoList = ({todos, deleteTodo, updateTodo, sort, setSort}: IToDoList) => {
  return (
    <div className="ToDoList">
      <div className="ToDoList_sortBox">
        <button className="ToDoList_sortBox-btn"
           onClick={() => setSort((prev) => prev === "up" ? "down" : "up" )}
        >
          {sort === 'up' && <SortUp />}
          {sort === 'down' && <SortDown />}
        </button>
      </div>
      {!todos.length && (
        <div className="ToDoList_noContent">
          <h3>Add some ToDos to show up here!</h3>
        </div>
      )}
      {todos.map((todo) => {
        return <ToDoCard key={todo.id} todo={todo} deleteTodo={deleteTodo} updateTodo={updateTodo} />;
      })}
    </div>
  )
}

export default ToDoList;