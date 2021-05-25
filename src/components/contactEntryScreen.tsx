import React, {useContext} from 'react';
import {Contact} from '../models/contact';
import {useHistory} from 'react-router-dom';
import styled from 'styled-components';
import OpEnum from '../models/OpEnum';
import {ContactsDispatch} from '../App';

const CenterContainer = styled.div`
  display: grid;
  place-items: center;
  height: 70vh;
`

const EditContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  border-radius: 8px;
  margin: 1rem;
  width: 29rem;
  padding: 1rem;
  background-color: #c2d6c2;

  h1 {
    margin: 0;
  }
`

const EntryRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  width: 100%;
`

const ButtonRow = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: baseline;
  width: 100%;
`

const EditButton = styled.button`
  background-color: ${(props: { confirm?: boolean }) => !props.confirm ? "hsl(356deg 70% 42% / 85%)" : "hsl(112deg 49% 29% / 80%)"};
  width: 6rem;
  padding: 5px 0;
  border-radius: 8px;
  color: white;
  cursor: pointer;
  border: 1px solid transparent;
  margin-top: 1rem;

  &:active {
    background-color: ${(props: { confirm?: boolean }) => !props.confirm ? "hsl(356deg 70% 42%)" : "hsl(112deg 49% 29%)"};
  }

  &:focus {
    background-color: ${(props: { confirm?: boolean }) => !props.confirm ? "hsl(356deg 70% 42%)" : "hsl(112deg 49% 29%)"};
    border: 1px solid black;
  }
`

const EditInput = styled.input`
  width: 20rem;
  height: 2rem;
  margin-top: 1rem;
  font-size: 1rem;
  border-top: none;
  border-right: none;
  border-left: none;
  border-radius: 8px;
  padding-left: 1rem;
`

const ContactEntryScreen = (props: { contact: Contact | null, operation: OpEnum }) => {

    const history = useHistory();
    const dispatch = useContext(ContactsDispatch).updateContacts;
    let newFirstName: string = '';
    let newLastName: string = '';
    let newPhoneNumber: string = '';
    let newEmail: string = '';

    const onContactFieldChange = (event: { target: { value: string | null } }, fieldToChange: string) => {
        const newValue = event.target.value === null ? '' : event.target.value;
        switch (fieldToChange) {
            case 'firstName':
                newFirstName = newValue;
                break;
            case 'lastName':
                newLastName = newValue;
                break;
            case 'phoneNumber':
                newPhoneNumber = newValue;
                break;
            case 'emailAddress':
                newEmail = newValue;
                break;
        }
    }

    const onCancel = () => {
        history.push({
            pathname: '/'
        })
    }

    const onConfirm = () => {
        const newContact: Contact = {
            id: props.contact ? props.contact.id : null, // null on add new contact
            firstName: newFirstName,
            lastName: newLastName,
            phoneNumber: newPhoneNumber,
            emailAddress: newEmail
        }
        dispatch({actionType: props.operation, selectedContact: newContact});
        history.push({
            pathname: '/',
        })
    }

    return (
        <CenterContainer>
            <EditContainer>
                <h1>{props.contact ? 'Edit Contact' : 'Add Contact'}</h1>
                <EntryRow>
                    <span>First Name</span>
                    <EditInput placeholder={props.contact ? props.contact.firstName : 'First Name'}
                               onChange={(e) => onContactFieldChange(e, 'firstName')}/>
                </EntryRow>
                <EntryRow>
                    <span>Last Name</span>
                    <EditInput placeholder={props.contact ? props.contact.lastName : 'Last Name'}
                               onChange={(e) => onContactFieldChange(e, 'lastName')}/>
                </EntryRow>
                <EntryRow>
                    <span>Phone Number</span>
                    <EditInput placeholder={props.contact ? props.contact.phoneNumber : 'Phone Number'}
                               onChange={(e) => onContactFieldChange(e, 'phoneNumber')}/>
                </EntryRow>
                <EntryRow>
                    <span>Email</span>
                    <EditInput placeholder={props.contact ? props.contact.emailAddress : 'Email'}
                               onChange={(e) => onContactFieldChange(e, 'emailAddress')}/>
                </EntryRow>
                <ButtonRow>
                    <EditButton onClick={onCancel}>Cancel</EditButton>
                    <EditButton confirm onClick={onConfirm}>Confirm</EditButton>
                </ButtonRow>
            </EditContainer>
        </CenterContainer>
    )
}

export default ContactEntryScreen;
