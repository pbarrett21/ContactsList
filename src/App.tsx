import React, {Dispatch, ReducerAction, useReducer} from 'react';
import ContactsList from './components/contactsList';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import EditContact from './components/editContact';
import AddContact from './components/addContact';
import InitialContactData from './resources/initialContactData';
import {Contact} from './models/contact';
import OpEnum from './models/OpEnum';

type Action = {
    actionType: OpEnum,
    selectedContact: Contact
}

const initialState: Contact[] = InitialContactData;

const reducer = (state: Contact[], action: Action): Contact[] => {
    switch (action.actionType) {
        case OpEnum.ADD:
            const idPool = state.map(contact => contact.id !== null ? contact.id : 0);
            const newId = idPool.length > 0 ? Math.max(...idPool) + 1 : 0;
            const newContact = {...action.selectedContact, id: newId}
            state.push(newContact);
            return state;
        case OpEnum.EDIT:
            const contactToChangeIndex = state.findIndex(contact => contact.id === action.selectedContact.id);
            state[contactToChangeIndex] = action.selectedContact;
            return state;
        case OpEnum.DELETE:
            const contactToDeleteIndex = state.findIndex(contact => contact.id === action.selectedContact.id);
            state.splice(contactToDeleteIndex, 1);
            return state;
        default:
            throw new Error();
    }
}

const defaultValue: {
    allContacts: Contact[],
    updateContacts: React.Dispatch<ReducerAction<(prevState: Contact[], action: Action) => {}>>
} = {allContacts: InitialContactData, updateContacts: () => {}};

export const ContactsDispatch = React.createContext(defaultValue);


function App() {
    const [allContacts, updateContacts]: [Contact[], Dispatch<Action>] = useReducer(reducer, initialState);
    const value = {allContacts, updateContacts};

    return (
        <ContactsDispatch.Provider value={value}>
            <Router>
                <Switch>
                    <Route exact path="/">
                        <ContactsList contactsData={allContacts}/>
                    </Route>
                    <Route exact path="/edit">
                        <EditContact/>
                    </Route>
                    <Route exact path="/add">
                        <AddContact/>
                    </Route>
                </Switch>
            </Router>
        </ContactsDispatch.Provider>
    );
}

export default App;
