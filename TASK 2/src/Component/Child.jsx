import React from "react";
import PropTypes from "prop-types";

// 🧒 Child Component
const Child = React.memo(function Child({ todos }) {   //React.memo(...): A Higher-Order Component (HOC) that memoizes the component.

                                                       // It prevents the component from re-rendering unless the todos prop has changed.
  console.log("Child component rendered");

  return (
    <div className="child">
        
      <h3>Todo List</h3>
      <ul>
        {todos.map((todo, index) => (
          <li key={index}>{todo}</li>
        ))}
      </ul>
    </div>
  );
});

Child.displayName = "Child";

Child.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Child;