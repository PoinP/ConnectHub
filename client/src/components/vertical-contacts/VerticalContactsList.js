import { VerticalContact } from "./VerticalContact";

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
