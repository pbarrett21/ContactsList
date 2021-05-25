import React from 'react';
import ContactEntryScreen from './contactEntryScreen';
import OpEnum from '../models/OpEnum';

const AddContact = () => {

    return (
        <ContactEntryScreen contact={null} operation={OpEnum.ADD}/>
    )
}

export default AddContact;
