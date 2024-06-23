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

export const contactsList = [
  {
    id: 1,
    avatar: "https://i.pravatar.cc/1200?u=118836",
    name: "Ivan Ivanov",
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
      birthday: [
        {
          type: "cake",
          detail: "Birthday",
          content: "12.03.2002",
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
    name: "Kristina Koleva",
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
      anniversary: [
        {
          type: "event",
          detail: "Anniversary",
          content: "20.06.2019",
        },
      ],
    },
    tags: ["Family", "Friends"],
  },
  {
    id: 3,
    avatar: "https://i.pravatar.cc/1200?u=114836",
    name: "Georgi Ivanov",
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
  },
  {
    id: 1,
    avatar: "https://i.pravatar.cc/1200?u=118836",
    name: "Ivan Ivanov",
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
      birthday: [
        {
          type: "cake",
          detail: "Birthday",
          content: "12.03.2002",
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
    name: "Kristina Koleva",
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
      anniversary: [
        {
          type: "event",
          detail: "Anniversary",
          content: "20.06.2019",
        },
      ],
    },
    tags: ["Family", "Friends"],
  },
  {
    id: 3,
    avatar: "https://i.pravatar.cc/1200?u=114836",
    name: "Georgi Ivanov",
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
  },
  {
    id: 1,
    avatar: "https://i.pravatar.cc/1200?u=118836",
    name: "Ivan Ivanov",
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
      birthday: [
        {
          type: "cake",
          detail: "Birthday",
          content: "12.03.2002",
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
    name: "Kristina Koleva",
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
      anniversary: [
        {
          type: "event",
          detail: "Anniversary",
          content: "20.06.2019",
        },
      ],
    },
    tags: ["Family", "Friends"],
  },
  {
    id: 3,
    avatar: "https://i.pravatar.cc/1200?u=114836",
    name: "Georgi Ivanov",
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
  },
];

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [newTagPopup, setNewTagPopup] = useState(null);
  const [contacts, setContacts] = useState(contactsList);
  const [selectedContact, setSelectedContact] = useState(null);

  function handleContactEdit(contact) {
    const newContacts = [...contacts];
    const contactIndex = newContacts.findIndex((c) => c.id === contact.id);

    if (contactIndex === -1) return;

    newContacts[contactIndex] = contact;
    setContacts(newContacts);
    setSelectedContact(contact);
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
              onClick={() => setSelectedContact(null)}
            />
            <NavItem icon="stars" fill={true} size={58} />
            <NavItem icon="build_circle" fill={true} size={58} />
            <NavItem icon="delete_history" fill={true} size={58} />
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
                <Search size={vertSearch} className="search-area vert-search-area " />
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
              onSelectContact={setSelectedContact}
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
