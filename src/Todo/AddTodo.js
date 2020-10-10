import React, { Component, useState } from "react";
import PropTypes from "prop-types";

const GenericInput = ({ error, isFocused, ...restProps }) => (
  <>
    <input
      id="input"
      {...restProps}
      style={error && isFocused ? { background: "red" } : {}}
    />
    {error && isFocused && <label htmlFor="input">some error message</label>}
  </>
);

export default class AddTodo extends Component {
  state = {
    value: '',
    isFocused: false
  }

  onSubmitHandler(event, inputProps) {
    console.log(event)
    return () => {
      event.preventDefault();
      if (inputProps.value().trim()) {
        this.props.onCreateMethod(inputProps.value());
        inputProps.clear();
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
        onFocus: () => this.setState({ isFocused: true }),
        onBlur: () => this.setState({ isFocused: false }),
      },
      clear: () => this.setState({ value: '' }),
      value: () => value,
    };
  }
  render() {
    return (
      <form style={{ marginBottom: "1rem" }} onSubmit={(event) => this.onSubmitHandler(event, this.inputProps)}>
        <GenericInput {...this.inputProps.bind} />
        <button type="submit"> Add todo </button>{" "}
      </form>
      )
  }
}
