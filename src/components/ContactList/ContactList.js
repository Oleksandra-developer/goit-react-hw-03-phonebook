import React from "react";
import PropTypes from "prop-types";
import styles from "./ContactList.module.css";

const ContactsList = ({ contacts, onDeleteContact }) => {
  // console.log(contacts);
  return (
    <ul className={styles.ContactList}>
      {contacts.map(({ id, name, number }) => (
        <li key={id}>
          <p>
            {name}: {number}
          </p>
          <button
            type="button"
            className={styles.ContactsList__btn}
            onClick={() => onDeleteContact(id)}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};

ContactsList.propTypes = {
  contacts: PropTypes.array.isRequired,
  onDeleteContact: PropTypes.func,
};

export default ContactsList;
