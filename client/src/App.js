import { useState } from "react";
import Search from "./components/Search.js";

import { Logo } from "./components/Logo.js";
import { Main } from "./components/Main.js";
import { NavBar } from "./components/NavBar.js";

import { VerticalContacts } from "./components/vertical-contacts/VerticalContacts.js";
import { VerticalContactsList } from "./components/vertical-contacts/VerticalContactsList.js";

import { Contact } from "./components/contact/Contact.js";

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
          content: "The One"
        }
      ]
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
  const [contacts, setContacts] = useState(contactsList)
  const [selectedContact, setSelectedContact] = useState(null);

  function handleContactEdit(contact) {
    const newContacts = [...contacts];
    const contactIndex = newContacts.findIndex(c => c.id === contact.id);
    
    if (contactIndex === -1)
      return;

    newContacts[contactIndex] = contact;
    setContacts(newContacts);
    setSelectedContact(contact);
  }


  return (
    <section className="page">
      <NavBar>
        <Logo></Logo>
      </NavBar>
      <Main>
        <VerticalContacts>
          <Search size={20} className="search-area"/>
          <VerticalContactsList
            contacts={contacts}
            selectedContact={selectedContact}
            onSelectContact={setSelectedContact}
          />
        </VerticalContacts>
        {selectedContact && (
          <Contact contact={selectedContact} onContactEdit={handleContactEdit}/>            
        )}
      </Main>
    </section>
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
