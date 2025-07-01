
import Child from '../Component/Child';

import { useState,useMemo } from 'react';


const Parent = () => {
  const [counter, setCounter] = useState(0);
  const [input, setInput] = useState("");
  const [todoList, setTodoList] = useState(["hello"]);

  // 📌 Memoize the todoList so that its reference doesn't change unnecessarily
  const memoizedTodos = useMemo(() => {
    return todoList;
  }, [todoList]);
// const memoizedTodos =[todoList]    

  const addTodo = () => {
    if (input.trim() !== "") {
      setTodoList([...todoList, input.trim()]);
      setInput("");
    }
  };

  return (
    <div className="parent">
      <h2>Parent Component</h2>
      <p>Counter: {counter}</p>
      <button onClick={() => setCounter(counter + 1)}>Increment Counter</button>

      <div>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter todo"
        />
        <button onClick={addTodo}>Add Todo</button>
      </div>

      <Child todos={memoizedTodos} />
    </div>
  );
};

export default Parent;