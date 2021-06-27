import React, { Component } from "react";
import Form from "./components/Form/Form";
import styles from "./components/container.module.css";
import shortid from "shortid";
import ContactsList from "./components/ContactList/ContactList";
import Filter from "./components/Filter/Filter";

import "./App.css";

class App extends Component {
  state = {
    contacts: [],
    filter: "",
  };

  componentDidMount() {
    const contacts = localStorage.getItem("contacts");

    const parsedContacts = JSON.parse(contacts);
    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
      // console.log(this.state);
    }
  }
  componentDidUpdate(prevState) {
    const nextContacts = this.state.contacts;
    const prevContacts = prevState.contacts;
    if (nextContacts !== prevContacts) {
      localStorage.setItem("contacts", JSON.stringify(nextContacts));
    }
  }

  addContact = ({ name, number }) => {
    if (this.state.contacts.find((contact) => contact.name === name)) {
      alert(`${name}  is alredy in contacts`);
      return;
    }

    const contact = {
      id: shortid.generate(),
      name,
      number,
    };
    this.setState(({ contacts }) => ({
      contacts: [contact, ...contacts],
    }));
  };

  deleteContact = (contactId) => {
    this.setState((prevState) => ({
      contacts: prevState.contacts.filter(
        (contact) => contact.id !== contactId
      ),
    }));
  };

  changeFilter = (e) => {
    this.setState({ filter: e.currentTarget.value });
  };
  getVisibleContacts = () => {
    const { filter, contacts } = this.state;
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };
  render() {
    // const { contacts } = this.state;
    const visibleContact = this.getVisibleContacts();
    return (
      <section className={styles.container}>
        <h1>Phonebook</h1>
        <Form onSubmit={this.addContact} />
        <h2>Contact List</h2>

        <Filter value={this.state.filter} onChange={this.changeFilter} />
        <ContactsList
          contacts={visibleContact}
          onDeleteContact={this.deleteContact}
        />
      </section>
    );
  }
}

export default App;
