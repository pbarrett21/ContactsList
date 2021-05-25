import React from 'react';
import InitialContactData from '../resources/initialContactData';
import {Contact} from '../models/contact';
import ContactCard from './contactCard/contactCard';
import styled from 'styled-components';
import {useHistory} from "react-router-dom";

const ContactsContainer = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
  list-style: none;
  padding: 0;
  margin: 1rem;
`

const AddContactButton = styled.button`
  width: 22rem;
  height: 3rem;
  border-radius: 8px;
  box-shadow: 0 8px 16px 0 rgb(0 0 0 / 8%);
  background-color: white;
  margin: 1rem;
  font-size: 1rem;
`

const ContactsList = (props: { contactsData: Contact[] }) => {
    const history = useHistory();

    const addNewContact = () => {
        history.push('/add');
    }

    return (
        <ContactsContainer>
            <AddContactButton onClick={addNewContact}>Add Contact</AddContactButton>
            {props.contactsData.map(contact => (
                <li key={contact.id + contact.firstName}>
                    <ContactCard contact={contact}/>
                </li>
            ))}
        </ContactsContainer>
    )
}

export default ContactsList;
