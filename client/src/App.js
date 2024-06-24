import { useState } from "react";
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

export let contactsList = [
  {
    id: 1,
    avatar: "https://i.pravatar.cc/1200?u=118836",
    isFavorite: true,
    name: {
      first: "Ivan",
      last: "Ivanov"
    },
    details: {
      phone: [
        {
          type: "phone",
          detail: "Home",
          content: "+359892532378",
        },
        {
          type: "phone",
          detail: "Work",
          content: "+359896218726",
        },
      ],
      mail: [
        {
          type: "mail",
          detail: "Personal",
          content: "vankata_kk@abv.bg",
        },
        {
          type: "mail",
          detail: "Personal",
          content: "vankata_we12@gmail.com",
        },
        {
          type: "mail",
          detail: "Personal",
          content: "XXivanchoXX@abv.bg",
        },
        {
          type: "mail",
          detail: "Personal",
          content: "vanio_99@gmail.com",
        },
        {
          type: "mail",
          detail: "Personal",
          content: "ivan.i@protonmail.com",
        },
        {
          type: "mail",
          detail: "Work",
          content: "ivan.ivanov@sofia-uni.bg",
        },
      ],
    },
    info: {
      date: [
        {
          type: "cake",
          detail: "Birthday",
          content: "2002-03-12",
        },
      ],
      relationship: [
        {
          type: "workspaces",
          detail: "Relationship",
          content: "Brother",
        },
      ],
      nickname: [
        {
          type: "person",
          detail: "Nickname",
          content: "The One",
        },
      ],
    },
    tags: ["Family", "Friends"],
  },
  {
    id: 2,
    avatar: "https://i.pravatar.cc/1200?u=118866",
    isFavorite: false,
    name: {
      first: "Kristina",
      last: "Koleva"
    },
    details: {
      phone: [
        {
          type: "phone",
          detail: "Home",
          content: "+359892531425",
        },
      ],
    },
    info: {
      date: [
        {
          type: "event",
          detail: "Anniversary",
          content: "2019-06-20",
        },
      ],
    },
    tags: ["Family", "Friends"],
  },
  {
    id: 3,
    avatar: "https://i.pravatar.cc/1200?u=114836",
    isFavorite: true,
    name: {
      first: "Georgi",
      last: "Ivanov"
    },
    details: {
      phone: [
        {
          type: "phone",
          detail: "Home",
          content: "+359892531425",
        },
      ],
    },
    info: {},
    tags: ["Close Friends", "Classmate"],
  }
];

contactsList = contactsList.sort((a, b) => 
          `${a.name.first} ${a.name.second}`.localeCompare(
          `${b.name.first} ${b.name.second}`));

const favoriteContacts = contactsList.filter(contact => contact.isFavorite);

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [contacts, setContacts] = useState(contactsList);
  const [selectedContact, setSelectedContact] = useState(null);
  
  const [newTagPopup, setNewTagPopup] = useState(false);

  const [contactPopup, setContactPopup] = useState(false);
  const [shouldEditContact, setShouldEditContact] = useState(false);

  const [activeTab, setActiveTab] = useState("contacts");

  function handleContactAdd(contact) {
    setContacts(contacts => {
      const newContacts = [...contacts, contact];
      return newContacts.sort((a, b) => 
        `${a.name.first} ${a.name.second}`.localeCompare(
        `${b.name.first} ${b.name.second}`));
    });

    setSelectedContact(contact);
  }

  function handleContactEdit(contact) {
    setContacts(contacts => {
      const newContacts = [...contacts];
      const contactIndex = newContacts.findIndex((c) => c.id === contact.id);

      if (contactIndex === -1) return;

      newContacts[contactIndex] = contact;
      setSelectedContact(contact);
      setShouldEditContact(false);
      
      return newContacts;
    });
  }

  function handleContactDelete(contactId) {
    setContacts(contacts => contacts.filter(({id}) => id !== contactId))
  }

  function handleEditContactPrompt(status) {
    setContactPopup(status);
    setShouldEditContact(status);
  }

  function handleSelectContacts() {
    setContacts(contactsList);
    setSelectedContact(null);
    setActiveTab("contacts");
  }

  function handleSelectFavorites() {
    setContacts(favoriteContacts);
    setSelectedContact(null);
    setActiveTab("favorites");
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
              onClick={handleSelectContacts}
            />
            <NavItem
              icon="stars"
              size={58}
              isActive={activeTab === "favorites"}
              onClick={handleSelectFavorites}
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
