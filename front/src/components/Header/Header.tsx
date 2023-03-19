import React, {useState} from 'react';
import "./_Header.scss";

interface IHeader {
  addTodo: (todo: string) => void;
}

const Header = ({ addTodo }: IHeader) => {
  const [task, setTask] = useState("");

  return (
    <header className="AppHeader">
      <div className="AppHeader_wrapper">
        <input
          className="AppHeader_wrapper_input"
          type="text"
          onKeyUp={(e) => {
            if(e.key === "Enter"){
              addTodo(task);
              setTask("");
            }
          }}
          placeholder="Add a new todo here"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <button
          className="AppHeader_wrapper_btn"
          onClick={() => {
            addTodo(task);
            setTask("")
          }}>
        </button>
      </div>
    </header>
  )
}

export default Header;