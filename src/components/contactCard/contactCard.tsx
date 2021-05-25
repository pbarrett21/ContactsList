import React, {useState} from 'react';
import {Contact} from '../../models/contact';
import styled from 'styled-components';
import './contact-card-styles.scss';
import {useHistory} from 'react-router-dom';

const CardContainer = styled.div`
  padding: 1rem;
  width: 20rem;
  margin-bottom: 1rem;
  border-radius: 8px;
  box-shadow: 0 8px 16px 0 rgb(0 0 0 / 8%);
  background-color: #EAFFE7;

  span {
    font-weight: 500;
    margin-right: auto;
    pointer-events: none;
  }

  svg {
    height: 1.5rem;
    justify-self: flex-end;
    pointer-events: none;
  }

  p {
    margin: .5rem 0 0 0;
  }
`

const CardTopRow = styled.div`
  display: flex;
  justify-content: space-between;
  cursor: pointer;
  align-items: center;
  height: 3rem;
`

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 1rem;
`

const CardButton = styled.button`
  background-color: ${(props: { delete?: boolean }) => props.delete ? "hsl(356deg 70% 42% / 85%)" : "hsl(112deg 49% 29% / 80%)"};
  width: 6rem;
  padding: 5px 0;
  border-radius: 8px;
  color: white;
  cursor: pointer;
  border: 1px solid transparent;

  &:active {
    background-color: ${(props: { delete?: boolean }) => props.delete ? "hsl(356deg 70% 42%)" : "hsl(112deg 49% 29%)"};
  }

  &:focus {
    background-color: ${(props: { delete?: boolean }) => props.delete ? "hsl(356deg 70% 42%)" : "hsl(112deg 49% 29%)"};
    border: 1px solid black;
  }
`

const ContactInitials = styled.div`
  height: 3rem;
  width: 3rem;
  line-height: 3rem;
  border-radius: 50%;
  font-size: 1.5rem;
  font-weight: 500;
  color: black;
  text-align: center;
  background-color: #80A68F;
  margin-right: 1rem;
  pointer-events: none;
`

const ContactCard = (props: { contact: Contact }) => {
    const [expanded, setExpanded] = useState(false);
    const cardId = `card-${props.contact.firstName}`;
    const history = useHistory();

    const toggleExpand = () => {
        const element: HTMLElement = document.getElementById(cardId) as HTMLElement;
        if (expanded) {
            if (element.classList.contains('card-expanded')) {
                element.classList.remove('card-expanded');
            }
            element.classList.toggle('card-unexpanded');
            setExpanded(false);
        } else {
            if (element.classList.contains('card-unexpanded')) {
                element.classList.remove('card-unexpanded');
            }
            element.classList.toggle('card-expanded');
            setExpanded(true);
        }
    }

    const editContact = () => {
        history.push({
            pathname: '/edit',
            state: {contact: props.contact}
        });
    }

    return (
        <CardContainer id={cardId}>
            <CardTopRow onClick={() => toggleExpand()}>
                <ContactInitials>{props.contact.firstName.charAt(0) + props.contact.lastName.charAt(0)}</ContactInitials>
                <span>{`${props.contact.firstName} ${props.contact.lastName}`}</span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/>
                </svg>
            </CardTopRow>
            {expanded ?
                <div className='card-details'>
                    <p>{props.contact.phoneNumber}</p>
                    <p>{props.contact.emailAddress}</p>
                    <ButtonContainer>
                        <CardButton onClick={editContact}>Edit</CardButton>
                        <CardButton delete>Delete</CardButton>
                    </ButtonContainer>
                </div>
                : null}
        </CardContainer>
    )
}

export default ContactCard;
