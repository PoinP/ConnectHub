import { GridContact } from "./GridContact";

export function GridContactsList({ contacts, onSelectContact }) {
    return (
        <div className="grid-contact-container grid-contact-list">
            {contacts.map((contact) => (
                <GridContact contact={contact} onSelectContact={onSelectContact} />
            ))}
        </div>
    );
}
