import React, { Component } from "react";
import styles from "./Form.module.css";
import PropTypes from "prop-types";

class Form extends Component {
  state = {
    name: "",
    number: "",
  };
  handleChange = (e) => {
    const { name, value } = e.currentTarget;

    this.setState({ [name]: value });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.onSubmit(this.state);
    this.reset();
  };

  reset = () => {
    // console.log("reset is working");
    this.setState({ name: "", number: "" });
  };

  render() {
    const { name, number } = this.state;
    return (
      <form className={styles.addForm} onSubmit={this.handleSubmit}>
        <label>
          Name
          <input
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Имя может состоять только из букв, апострофа, тире и пробелов. Например Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan и т. п."
            value={name}
            required
            onChange={this.handleChange}
          />
        </label>
        <label>
          Number
          <input
            type="tel"
            onChange={this.handleChange}
            value={number}
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Номер телефона должен состоять цифр и может содержать пробелы, тире, круглые скобки и может начинаться с +"
            required
          />
        </label>
        <button type="submit">Add</button>
      </form>
    );
  }
}

Form.propTypes = {
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
};
export default Form;
