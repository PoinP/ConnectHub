import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { Search } from "./components/Search.js";

import { Logo } from "./components/navigation/Logo.js";
import { Main } from "./components/Main.js";
import { NavBar } from "./components/navigation/NavBar.js";

import { VerticalContacts } from "./components/vertical-contacts/VerticalContacts.js";
import { VerticalContactsList } from "./components/vertical-contacts/VerticalContactsList.js";

import { GridContacts } from "./components/grid-contacts/GridContacts.js";
import { GridContactsList } from "./components/grid-contacts/GridContactsList.js";

import { Contact } from "./components/contact/Contact.js";
import { NewTagPopup } from "./components/prompts/NewTagPopup.js";
import { NavGroup } from "./components/navigation/NavGroup.js";
import { NavItem } from "./components/navigation/NavItem.js";
import { UserAccess } from "./components/user-access/UserAcess.js";
import { ContactPopup } from "./components/prompts/contact-popup/ContactPopup.js";
import { fetchData } from "./services/FetchData.js";

// const favoriteContacts = contactsList.filter(contact => contact.isFavorite);

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [contacts, setContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);
  
  const [newTagPopup, setNewTagPopup] = useState(false);

  const [contactPopup, setContactPopup] = useState(false);
  const [shouldEditContact, setShouldEditContact] = useState(false);

  const [activeTab, setActiveTab] = useState("contacts");

  function activeContactsEndPoint() {
    if (activeTab === "favorites")
      return "favorite-contacts";
    
    return "contacts";
  }

  function handleContactAdd(contact) {
    fetchData("contact", "POST", contact)
      .then(() => {
        fetchData(activeContactsEndPoint())
          .then((res) => res.json())
          .then((contacts) => {
            setContacts(contacts);
            setSelectedContact(contact);
          })
          .catch((err) => console.log("Couldn't fetch contacts!", err));
      })
      .catch((err) => console.log("Couldn't add a new contact!", err)); //TODO ErrorPage?
  }

  function handleContactEdit(contact) {
    fetchData("contact", "PUT", contact)
      .then(() => {
        fetchData(activeContactsEndPoint(), "GET")
          .then((res) => res.json())
          .then((contacts) => {
            setContacts(contacts);
            setSelectedContact(contact);
            setShouldEditContact(false);
          });

        // setContacts((contacts) => {
        //   const newContacts = [...contacts];
        //   const contactIndex = newContacts.findIndex((c) => c.id === contact.id);

        //   if (contactIndex === -1) return;

        //   newContacts[contactIndex] = contact;
        //   setSelectedContact(contact);
        //   setShouldEditContact(false);

        //   return newContacts;
        // });
      })
      .catch((err) => console.log("Couldn't edit contact!", err));
  }

  function handleContactDelete(contactId) {
    fetchData("contact", "DELETE", { id: contactId })
      .then(() => {
        fetchData(activeContactsEndPoint(), "GET")
          .then((res) => res.json())
          .then((contacts) => {
            setContacts(contacts);
            setSelectedContact(null);
          })
          .catch((err) => console.log("Couldn't fetch contacts!", err));
      })
      .catch((err) => console.log("Couldn't delete contact", err));
  }

  function handleEditContactPrompt(status) {
    setContactPopup(status);
    setShouldEditContact(status);
  }

  function handleSelectContactsTab() {
    fetchData("contacts", "GET")
      .then((res) => res.json())
      .then((contacts) => {
        setContacts(contacts);
        setSelectedContact(null);
        setActiveTab("contacts");
      })
      .catch((err) =>
        console.log("There was an error fetching contatcts!", err)
      );
  }

  function handleSelectFavoritesTab() {
    fetchData("favorite-contacts", "GET")
      .then((res) => res.json())
      .then((contacts) => {
        setContacts(contacts);
        setSelectedContact(null);
        setActiveTab("favorites");
      })
      .catch((err) =>
        console.log("There was an error fetching contatcts!", err)
      );
  }

  function handleFavoriteContact(contact) {
    handleContactEdit({...contact, isFavorite: !contact.isFavorite});
  }

  const isOnBigScreen = useMediaQuery({ query: "(max-width: 1028px)" });
  const isOnMediumScreen = useMediaQuery({ query: "(max-width: 840px)" });
  const isOnSmallScreen = useMediaQuery({ query: "(max-width: 640px)" });
  const isOnVerySmallScreen = useMediaQuery({ query: "(max-width: 475px)" });

  const gridSearch = 
        isOnVerySmallScreen ? 16
      : isOnSmallScreen ? 21
      : isOnMediumScreen ? 32
      : isOnBigScreen ? 64
      : 64;

  const vertSearch = 
        isOnSmallScreen ? 10
      : isOnMediumScreen ? 15
      : isOnBigScreen ? 20
      : 20;

  useEffect(() => {
    fetchData(activeContactsEndPoint(), "GET")
    .then(res => res.json())
    .then(contacts => setContacts(contacts))
    .catch(err => console.log("Couldn't fetch contacts: ", err)) //TODO Error pages!
  }, []);

  if (!isLoggedIn)
    return <UserAccess onFinish={setIsLoggedIn}/>

  return (
    <>
      {contactPopup && (
        <ContactPopup
          contact={shouldEditContact && selectedContact}
          onAddContact={handleContactAdd}
          onEditContact={handleContactEdit}
          onSetPopup={setContactPopup}
        />
      )}
      {newTagPopup && (
        <NewTagPopup
          selectedContact={selectedContact}
          onContactEdit={handleContactEdit}
          onSetPopup={setNewTagPopup}
        />
      )}
      <section className="page">
        <NavBar>
          <Logo></Logo>
          <NavGroup className="main-nav-group">
            <NavItem
              icon="account_circle"
              size={58}
              isActive={activeTab === "contacts"}
              onClick={handleSelectContactsTab}
            />
            <NavItem
              icon="stars"
              size={58}
              isActive={activeTab === "favorites"}
              onClick={handleSelectFavoritesTab}
            />
            <NavItem icon="build_circle" size={58} />
            <NavItem icon="delete_history" size={58} />
          </NavGroup>
          <NavGroup className="tag-nav-group" title="Tags">
            <NavItem icon="new_label">Add Tag</NavItem>
            <NavItem icon="label">Family</NavItem>
          </NavGroup>
          <NavGroup className="settings-nav-group" showHorizBorder={false}>
            <NavItem icon="manage_accounts" fill={true} size={28} />
            <NavItem icon="logout" fill={true} size={28} />
            <NavItem icon="settings" fill={true} size={28} />
          </NavGroup>
        </NavBar>
        <Main>
          {selectedContact ? (
            !isOnSmallScreen && (
              <VerticalContacts>
                <Search
                  size={vertSearch}
                  className="search-area vert-search-area "
                  onSelectCreateContact={setContactPopup}
                />
                <VerticalContactsList
                  contacts={contacts}
                  selectedContact={selectedContact}
                  onSelectContact={setSelectedContact}
                />
              </VerticalContacts>
            )
          ) : (
            <GridContacts>
              <Search
                size={gridSearch}
                className="search-area grid-search-area"
                onSelectCreateContact={setContactPopup}
              />
              <GridContactsList
                contacts={contacts}
                onSelectContact={setSelectedContact}
              />
            </GridContacts>
          )}
          {selectedContact && (
            <Contact
              contact={selectedContact}
              onSetPopup={setNewTagPopup}
              onContactEdit={handleContactEdit}
              onFavoriteContact={handleFavoriteContact}
              onSelectContact={setSelectedContact}
              onEditContact={handleEditContactPrompt}
              onDeleteContact={handleContactDelete}
            />
          )}
        </Main>
      </section>
    </>
  );
}



//Todo
// function ContactLabels() {
//   const topStyle = {
//     marginBottom: 0
//   };

//   const botStyle = {
//     marginTop: 0
//   };

//   return (
//     <div className="contact-sub-details">
//     <ContactElement icon="note" style={topStyle}>
//       <button className="pure-button">
//         Add a note
//       </button>
//     </ContactElement>
//     <textarea rows={4} cols={40} className="search-input"></textarea>
//     </div>
//   )
// }

export default App;
