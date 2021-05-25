import React, {Dispatch, ReducerAction, useReducer} from 'react';
import ContactsList from './components/contactsList';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import EditContact from './components/editContact';
import AddContact from './components/addContact';
import InitialContactData from './resources/initialContactData';
import {Contact} from './models/contact';
import OpEnum from './models/OpEnum';

type ContactState = {
    allContacts: Contact[]
}

type Action = {
    actionType: OpEnum,
    selectedContact: Contact
}

const initialState: Contact[] = InitialContactData;

const reducer = (state: Contact[], action: Action): Contact[] => {
    switch (action.actionType) {
        case OpEnum.ADD:
            state.push(action.selectedContact);
            return state;
        case OpEnum.EDIT:
            state.push(action.selectedContact);
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

    // @ts-ignore
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
