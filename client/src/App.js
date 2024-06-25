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
import { fetchData, fetchFormData, fetchQueryData } from "./services/FetchData.js";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [contacts, setContacts] = useState([]);
  const [tags, setTags] = useState([]);

  const [selectedContact, setSelectedContact] = useState(null);
  
  const [newTagPopup, setNewTagPopup] = useState(false);

  const [contactPopup, setContactPopup] = useState(false);
  const [shouldEditContact, setShouldEditContact] = useState(false);

  const [activeTab, setActiveTab] = useState("contacts");
  const [filter, setFilter] = useState(null);

  function handleContactAdd(contact, avatarBlob) {
    const formData = new FormData();
    formData.append("contact", JSON.stringify(contact));
    formData.append("avatar", avatarBlob);

    fetchFormData("contact", "POST", formData)
      .then(res => res.json())
      .then(contact => {
        setSelectedContact(contact);
        loadContacts();
      })
      .catch((err) => console.log("Couldn't add a new contact!", err)); //TODO ErrorPage?
  }

  function handleContactEdit(contact, avatarBlob) {
    const formData = new FormData();
    formData.append("contact", JSON.stringify(contact))
    formData.append("avatar", avatarBlob);

    fetchFormData("contact", "PUT", formData)
      .then((res) => res.json())
      .then((contact) => {
        setSelectedContact(contact);
        loadContacts();

        setShouldEditContact(false);
      })
      .catch((err) => console.log("Couldn't edit contact!", err));

        // setContacts((contacts) => {
        //   const newContacts = [...contacts];
        //   const contactIndex = newContacts.findIndex((c) => c.id === contact.id);

        //   if (contactIndex === -1) return;

        //   newContacts[contactIndex] = contact;
        //   setSelectedContact(contact);
        //   setShouldEditContact(false);

        //   return newContacts;
        // });
  }

  function handleContactDelete(contactId) {
    fetchData("contact", "DELETE", { id: contactId })
      .then(() => {
        setSelectedContact(null)
        loadContacts()
      })
      .catch((err) => console.log("Couldn't delete contact", err));
  }

  function handleCreateContactPrompt(status) {
    setContactPopup(status);
    setShouldEditContact(!status);
  }

  function handleEditContactPrompt(status) {
    setContactPopup(status);
    setShouldEditContact(status);
  }

  function handleSelectTab(tab, filter = null) {
    setActiveTab(tab);
    setFilter(filter);
    setSelectedContact(null);
    loadContacts();
  }

  function handleFavoriteContact(contact) {
    handleContactEdit({...contact, isFavorite: !contact.isFavorite});
  }

  function loadContacts() {
    fetchData(activeTab, "GET")
      .then((res) => res.json())
      .then((contacts) => setContacts(contacts))
      .catch((error) => "Error when fetching contacts...");
  }

  function loadTags() {
    fetchData("tags", "GET")
    .then(res => res.json())
    .then(tags => setTags(tags))
    .catch(err => console.log("Couldn't fetch tags!", err));
  }

  function handleSearch(query) {
    if (!query) {
      loadContacts();
      return;
    }
    
    const objQuery = { query };
    if (filter) {
      objQuery.tabFilter = filter;
    }

    fetchQueryData("search", "GET", objQuery)
    .then(res => res.json())
    .then(contacts => {
      setContacts(contacts);
    })
    .catch((err) => console.log("Error searching!", err))
  }

  function constructTagTab(label) {
    return `contacts-tag?label=${label}`;
  }

  function handleCreateTag(label) {
    fetchData("tag", "POST", { label });
    loadTags();
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
    fetchData("tags", "GET")
    .then(res => res.json())
    .then(tags => setTags(tags))
    .catch(err => console.log("Couldn't fetch tags!", err));

    fetchData(activeTab, "GET")
    .then(res => res.json())
    .then(contacts => setContacts(contacts))
    .catch(err => console.log("Couldn't fetch contacts: ", err)) //TODO Error pages!
  }, [activeTab]);

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
          onCreateTag={handleCreateTag}
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
              onClick={() => handleSelectTab("contacts")}
            />
            <NavItem
              icon="stars"
              size={58}
              isActive={activeTab === "favorite-contacts"}
              onClick={() => handleSelectTab("favorite-contacts", "favorites")}
            />
            <NavItem icon="build_circle" size={58} />
            <NavItem icon="delete_history" size={58} />
          </NavGroup>
          <NavGroup className="tag-nav-group" title="Tags">
            <NavItem icon="new_label" onClick={() => setNewTagPopup(true)}>
              Add Tag
            </NavItem>
            {tags.map((tag, idx) => (
              <NavItem
                key={idx}
                icon="label"
                isActive={activeTab === constructTagTab(tag.label)}
                onClick={() =>
                  handleSelectTab(constructTagTab(tag.label), tag.label)
                }
              >
                <span>{tag.label}</span>
              </NavItem>
            ))}
          </NavGroup>
          <NavGroup className="settings-nav-group" showHorizBorder={false}>
            <NavItem icon="manage_accounts" fill={true} size={28} />
            <NavItem
              icon="logout"
              fill={true}
              size={28}
              onClick={() => setIsLoggedIn(false)}
            />
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
                  onSearch={handleSearch}
                  onSelectCreateContact={handleCreateContactPrompt}
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
                onSearch={handleSearch}
                onSelectCreateContact={handleCreateContactPrompt}
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

export default App;
