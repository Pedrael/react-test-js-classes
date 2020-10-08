import React, { useState, useEffect } from "react";
import "./App.css";
import TodoList from "./Todo/TodoList";
import Context from "./context";
import AddTodo from "./Todo/AddTodo";
import Loader from "./Loader";
import Modal from "./Modal/Modal";

function App() {
  const [todos, setTodos] = useState([]);
  //useState возвращает массив из 2 элементов - 1 элемент непосредственно то, что мы записываем в состояние, а 2 - функция, через которую мы сможем реактивно изменять состояние
  //const [loading, setLoading] = useState(true);
  const loading = todos.length === 0

  useEffect(() => {
    //триггерится при каждом рендере, если изменяется список зависимостей (стейты), если передаю пустой список, то триггерится только при монтировании, если не передаю ничего, то триггерится постоянно
    fetch("https://jsonplaceholder.typicode.com/todos?_limit=5")
      .then((response) => response.json())
      .then((todosServer) => {
        setTimeout(() => {
          setTodos(todosServer);
          //setLoading(false);
        }, 2000);
      })
  }, []); //что за список зависимостей

  function toggleTodo(id) {
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          todo.completed = !todo.completed;
        }
        return todo;
      })
    );
  }

  function removeTodo(id) {
    setTodos(todos.filter((todo) => todo.id !== id));
  }

  //контекст виден вниз по дереву, начиная с компонента, в котором определен провайдер (но не виден вверх)
  //

  function addTodoMethod(title) {
    setTodos(
      todos.concat([
        {
          title,
          id: Date.now(),
          completed: false,
        },
      ])
    )
  }

  return (
    <Context.Provider value={{ removeTodoMethod: removeTodo }}>
      <div className="wrapper">
        <h1> React tutorial </h1> <Modal />
        <AddTodo onCreateMethod={addTodoMethod} /> {loading && <Loader />}{" "}
        {todos.length ? (
          <TodoList todos={todos} onToggleMethod={toggleTodo} />
        ) : loading ? null : (
          <p> No todos! </p>
        )}{" "}
      </div>{" "}
    </Context.Provider>
  );
}

export default App;
