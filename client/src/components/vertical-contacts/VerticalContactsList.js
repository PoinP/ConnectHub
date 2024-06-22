import { VerticalContact } from "./VerticalContact";
import "./vertical-contacts.css"

export function VerticalContactsList({ contacts, selectedContact, onSelectContact }) {
  return (
    <ul className="vert-contacts-list">
      {contacts.map((contact) => (
        <VerticalContact
          key={contact.id}
          contact={contact}
          selectedContact={selectedContact}
          onSelectContact={onSelectContact} />
      ))}
    </ul>
  );
}
