import React, { Component, useState } from "react";
import PropTypes from "prop-types";

const GenericInput = ({ error, isFocused, ...restProps }) => (
  <>
    <input
      id="input"
      {...restProps}
      style={error && isFocused ? { background: "red" } : {}}
    />
    {console.log(error, isFocused, restProps )}
    {error && isFocused && <label htmlFor="input">some error message</label>}
  </>
);

export default class AddTodo extends Component {
  state = {
    value: '',
    isFocused: false
  }
  onSubmitHandler(event, inputHook) {
    return () => {
      event.preventDefault();
      if (inputHook.value().trim()) {
        this.props.onCreateMethod(inputHook.value());
        inputHook.clear();
      }
    }
  }
  //this.state = {date: new Date()}; начальное состояние дейта в стейте
  get inputProps() {
    const { value, isFocused } = this.state;
  
    const error = value.length < 3;
  
    return {
      bind: {
        value, //ключ совпадает со значением, поэтому можно писать только значение
        error,
        isFocused: isFocused,
        onChange: (event) => this.setState({ value: event.target.value }),
        onFocus: () => this.setState({ isFocused: true }), // focus
        onBlur: () => this.setState({ isFocused: false }), // unfocus
      },
      clear: () => this.setState({ value: '' }),
      value: () => value,
    };
  }
  render() {
    return (
      <form style={{ marginBottom: "1rem" }} onSubmit={this.onSubmitHandler(this.inputProps)}>
        <GenericInput {...this.inputProps.bind} />
        <button type="submit"> Add todo </button>{" "}
      </form>
      )
  }
}
