import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    View, SafeAreaView, FlatList, TextInput
} from 'react-native';
import Contacts from 'react-native-contacts';
import ListItem from './ListItem';
import { listContacts } from '../../action/contactDetailAction';
import styles from '../../styles/styles.js';

class SearchContact extends Component {
    constructor(props) {
        super(props);
        this.getAllContacts();
        //this.loadContacts();
    }

    async getAllContacts() {
        Contacts.getAll().then(contacts => {
            contacts.sort(
                (a, b) =>
                    a.givenName.toLowerCase() > b.givenName.toLowerCase(),
            );
            this.props.listContacts(contacts);
        })
    }
    async loadContacts() {
        Contacts.getAll().then(err, contacts => {
            contacts.sort(
                (a, b) =>
                    a.givenName.toLowerCase() > b.givenName.toLowerCase(),
            );
            console.log('contacts -> ', contacts);
            if (err && err === 'denied') {
                alert('Permission to access contacts was denied');
                console.warn('Permission to access contacts was denied');
            } else {
                this.props.listContacts(contacts);
                console.log('contacts', contacts);
            }
        });
    };

    search = (text) => {
        const phoneNumberRegex =
            /\b[\+]?[(]?[0-9]{2,6}[)]?[-\s\.]?[-\s\/\.0-9]{3,15}\b/m;
        if (text === '' || text === null) {
            //loadContacts();
            this.getAllContacts();
        } else if (phoneNumberRegex.test(text)) {
            Contacts.getContactsByPhoneNumber(text).then(contacts => {
                /*contacts.sort(
                    (a, b) =>
                        a.givenName.toLowerCase() > b.givenName.toLowerCase(),
                );*/
                this.props.listContacts(contacts);
                console.log('contacts', contacts);
            });
        } else {
            Contacts.getContactsMatchingString(text).then(contacts => {
                /*contacts.sort(
                    (a, b) =>
                        a.givenName.toLowerCase() > b.givenName.toLowerCase(),
                );*/
                this.props.listContacts(contacts);
                console.log('contacts', contacts);
            });
        }
    }

    openContact = (contact) => {
        console.log(JSON.stringify(contact));
        Contacts.openExistingContact(contact, () => { });
    };

    startChat = (contact) => {
        this.props.navigation.navigate('Chat', { name: contact.displayName });
    }
    render() {
        return (
            <SafeAreaView style={styles.safeAreaContainer}>
                <View>
                    <TextInput
                        onChangeText={this.search}
                        placeholder="Search"
                        style={styles.searchBar}
                    />
                    <FlatList
                        data={this.props.contacts}
                        renderItem={(contact) => {
                            {
                                console.log('contact -> ' + JSON.stringify(contact));
                            }
                            return (
                                <ListItem
                                    key={contact.item.recordID}
                                    item={contact.item}
                                    onPress={this.startChat}
                                />
                            );
                        }}
                        keyExtractor={(item) => item.recordID}
                    />
                </View>
            </SafeAreaView>
        )
    }

}
const mapStateToProps = (state) => {
    return {
        contacts: state.contactDetail.contacts
    }
};
const mapDispatchToProps = (dispatch) => {
    return {
        listContacts: (contacts) => {
            dispatch(listContacts(contacts))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchContact);