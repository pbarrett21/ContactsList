import React from 'react';
import {useLocation} from 'react-router-dom';
import {Contact} from '../models/contact';
import ContactEntryScreen from './contactEntryScreen';
import OpEnum from '../models/OpEnum';

const EditContact = () => {
    const location = useLocation<{ contact: Contact }>();
    const contactToEdit = location.state.contact;


    return (
        <ContactEntryScreen contact={contactToEdit} operation={OpEnum.EDIT}/>
    )
}

export default EditContact;
