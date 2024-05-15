import { useState } from "react";
import Search from "./components/Search.js";

import { Logo } from "./components/Logo.js";
import { Main } from "./components/Main.js";
import { NavBar } from "./components/NavBar.js";

import { VerticalContacts } from "./components/vertical-contacts/VerticalContacts.js";
import { VerticalContactsList } from "./components/vertical-contacts/VerticalContactsList.js";

import { ContactActions } from "./components/contact/ContactActions.js";
import { ContactHeader } from "./components/contact/ContactHeader.js";
import { ContactDetails } from "./components/contact/ContactDetails.js";
import { ContactInfo } from "./components/contact/ContactInfo.js";
import { ContactTags } from "./components/contact/ContactTags.js";
import { Contact } from "./components/contact/Contact.js";

export const contactsList = [
  {
    id: 1,
    avatar: "https://i.pravatar.cc/120?u=118836",
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
          content: "vankata_we12@gmail.com",
        },
        {
          type: "mail",
          detail: "Work",
          content: "ivan.ivanov@sofia-uni.bg",
        },
      ],
    },
    info: {
      birthDay: [
        {
          type: "cake",
          detail: "Birthday",
          content: "12.03.2002",
        },
      ],
      relationShip: [
        {
          type: "workspaces",
          detail: "Relationship",
          content: "Brother",
        },
      ],
    },
    tags: ["Family", "Friends"],
  },
  {
    id: 2,
    avatar: "https://i.pravatar.cc/120?u=118866",
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
    avatar: "https://i.pravatar.cc/120?u=114836",
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
  const [selectedContact, setSelectedContact] = useState(null);

  return (
    <section className="page">
      <NavBar>
        <Logo></Logo>
      </NavBar>
      <Main>
        <VerticalContacts>
          <Search size={20} />
          <VerticalContactsList
            contacts={contactsList}
            selectedContact={selectedContact}
            onSelectContact={setSelectedContact}
          />
        </VerticalContacts>
        {selectedContact && (
          <Contact>
            <ContactActions />
            <ContactHeader contact={selectedContact} />
            <ContactDetails>
              {selectedContact.details && (
                <ContactInfo
                  header={"Details"}
                  category={selectedContact.details}
                />
              )}
              {selectedContact.tags && (
                <ContactTags tags={selectedContact.tags} />
              )}
              {selectedContact.info && (
                <ContactInfo header={"Info"} category={selectedContact.info} />
              )}
            </ContactDetails>
          </Contact>
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
