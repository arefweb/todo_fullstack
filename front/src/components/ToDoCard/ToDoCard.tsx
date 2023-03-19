import React, {useState} from 'react';
import "./_ToDoCard.scss";
import {ReactComponent as Edit} from "src/assets/images/edit.svg";
import {ReactComponent as Delete} from "src/assets/images/delete.svg";
import {Todo} from "src/App.types";

interface IToDoCard {
  todo: Todo;
  deleteTodo: (todo: number) => void;
  updateTodo: (todo: Todo) => void;
}

const ToDoCard = ({todo, deleteTodo, updateTodo}: IToDoCard) => {
  const [isEditing, setIsEditing] = useState(false);
  const [task, setTask] = useState<string>(todo.todoName);

  return (
    <div className="ToDoCard">
      <div className="ToDoCard_left">
        <div>
          {isEditing ?
              (
                <div>
                  <input
                    type="text"
                    placeholder="Write a todo here"
                    onKeyUp={(e) => {
                      if(e.key === "Enter"){
                        updateTodo({...todo, todoName: task});
                        setIsEditing(false);
                      }
                    }}
                    value={task}
                    onChange={(e) => setTask(e.target.value)}
                  />
                  <button onClick={() => {
                    updateTodo({...todo, todoName: task});
                    setIsEditing(false);
                  }}>
                    Save
                  </button>
                </div>
              )
            :
              (
                <h4
                  className={`ToDoCard_left-title ${todo.done && "isDone"}`}
                  onClick={() => updateTodo({...todo, done: !todo.done})}
                >
                  {todo.todoName}
                </h4>
              )
          }
        </div>
        <div>
          <span className="ToDoCard_left-time">
            {todo.createdAt && new Date(todo.createdAt).toLocaleString()}
          </span>
        </div>
      </div>
      <div className="ToDoCard_right">
        <div>
          <Edit className="ToDoCard_right-edit" onClick={() => setIsEditing(true)} />
        </div>
        <div>
          <Delete className="ToDoCard_right-delete" onClick={() => deleteTodo(todo.id)} />
        </div>
      </div>
    </div>
  )
}

export default ToDoCard;