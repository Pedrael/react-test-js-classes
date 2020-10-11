import React, { useState, useEffect, Component, Fragment } from "react";
import "./App.css";
import TodoList from "./Todo/TodoList";
import Context from "./context";
import AddTodo from "./Todo/AddTodo";
import Loader from "./Loader";
import Modal from "./Modal/Modal";
//деструктуризировать
export default class App extends Component {

  constructor(props) {
    super(props)
    this.state = {//когда есть конструктор лучше определять стейт в нем
      todos: [],
      usersTodo: [],
      activeUser: 'pupkin 10',
      activeUserIndex: 0,
      activeUserObject: {
        user: '',
        todos: [],
      }
    }
  }

  componentDidMount () {
    const usersTodoBuffer = []
    fetch("https://jsonplaceholder.typicode.com/todos")
      .then((response) => response.json())
      .then((todosServer) => {
        setTimeout(() => {
          for (let index = 5, indexOld = 0; index < todosServer.length; indexOld = index, index+=5) {
            usersTodoBuffer.push({
              user: `pupkin ${index}`,
              todos: todosServer.slice(indexOld, index)
            })
          }
          this.setState((state) => ({
            usersTodo: usersTodoBuffer
          }))

          this.setState((state) => ({
            activeUserIndex: state.usersTodo.findIndex((userTodo) => userTodo.user === state.activeUser)
          }))

          this.setState((state) => ({
            activeUserObject: state.usersTodo.find((userTodo) => userTodo.user === state.activeUser)
          }))
          console.log(this.state.activeUserObject);
          console.log(this.state.activeUserObject.todos);
          console.log(this.state.usersTodo);
          if(this.state.activeUserObject.todos.length === undefined) {
            return false
          }
          else return true
        }, 2000)
      })
  }
  //что такое чистая функция - функция, исход которой функционально не зависит от внешних параметров

  toggleTodo = (id, isComplete) => () => {
    this.setState((state) => {
      const { activeUserObject: {user, todos} } = state;
      console.log(`isComplete: ${isComplete}`);

      return {
        activeUserObject: {
          user,
          todos: todos.map((todo) => {
            if (todo.id === id) {
              todo.completed = isComplete; // в девмоде сестейты вызываются 2 раза, поэтому когда здесь происходило инвертирование, оно происходило взаимоисключаще, поэтому нужно передавать статичное состояние, которое мы присвоим целевому полю
            } 
            return todo;
          }),
        }
      };
    })
  };
  

  removeTodo = (id) => {
    this.setState((state) => {
    return {
      activeUserObject: {
        user: state.activeUserObject.user,
        todos: state.activeUserObject.todos.filter((todo) => todo.id !== id)
      }
    }})
  }

  addTodoMethod = (title) => {
    //при изменении состояния перерендер
    this.setState((state) => ({
      todos: state.activeUserObject.todos.concat([
        //конкатинируя массиву тудушек новое туду
        {
          title,
          id: Date.now(),
          completed: false,
        }
      ])
    }))
  };



  render() {
    return (
      <Fragment>
        <Context.Provider value={{ removeTodoMethod: this.removeTodo, toggleTodo: this.toggleTodo }}>
          <div className="wrapper">
            <h1> React tutorial </h1> <Modal />
            <AddTodo onCreateMethod={this.addTodoMethod} />{" "}
            {this.state.activeUserObject.todos.length ? (
              <TodoList
                todos={this.state.activeUserObject.todos}
              />
            ) : (
              <p> No todos! </p>
            )}{" "}
          </div>{" "}
        </Context.Provider>
      </Fragment>
    )
  }
}


/*
  render() {
    const loading = this.state.todos.length === 0;
    return (
      <Fragment>
        <Context.Provider value={{ removeTodoMethod: this.removeTodo, toggleTodo: this.toggleTodo }}>
          <div className="wrapper">
            <h1> React tutorial </h1> <Modal />
            <AddTodo onCreateMethod={this.addTodoMethod} />{" "}
            {loading && <Loader />}{" "}
            {this.state.activeUserObject.todos.length ? (
              <TodoList
                todos={this.state.activeUserObject.todos}
              />
            ) : loading ? null : (
              <p> No todos! </p>
            )}{" "}
          </div>{" "}
        </Context.Provider>
      </Fragment>
    )
  }
}
*/