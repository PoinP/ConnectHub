import "./grid-contacts.css";

import Search from "../Search";

export function GridContacts({ children }) {
  return (
      <section class="grid-container">
        { children }
      </section>
  );
}

export function GridContactsList({ contacts, onSelectContact }) {
  return (
    <div className="grid-contact-container grid-contact-list">
      {contacts.map((contact) => (
        <GridContact contact={contact} onSelectContact={onSelectContact} />
      ))}
    </div>
  );
}

function GridContact({ contact, onSelectContact }) {
  const { id, name, avatar, details } = contact;
  const phoneNumber = details.phone[0].content;

  function handleSelectContact() {
    const newSelection = { ...contact };
    onSelectContact(newSelection);
  }

  return (
    <>
        <li className="grid-contact" onClick={handleSelectContact}>
        <div className="grid-image-container">
            <img className="grid-image" src={avatar} alt="person" />
        </div>
        <div className="grid-contact-detials">
            <span className="grid-contact-name">{name}</span>
            <span className="grid-contact-phone">{phoneNumber}</span>
        </div>
        </li>
        <div className="horiz-bot-border grid-bot-border"></div>
    </>
  );
}
