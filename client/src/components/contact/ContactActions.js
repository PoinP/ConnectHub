import { MaterialSymbol } from "react-material-symbols";
import { MaterialButton } from "../MaterialButton";

export function ContactActions({ size = 38, contact, onFavoriteContact, onSelectContact, onEditContact, onDeleteContact }) {
  function handleDeleteContact() {
    onDeleteContact(contact.id);
    onSelectContact(null);
  }

  return (
    <section className="contact-actions">
      <MaterialButton
        className="mat-button"
        style={{ marginRight: "auto" }}
        icon="keyboard_backspace"
        size={size}
        onClick={() => onSelectContact(null)}
      />
      <MaterialButton
        className="mat-button"
        fill={contact.isFavorite}
        grade={0}
        icon="star"
        size={size}
        onClick={() => onFavoriteContact(contact)}
      />
      <MaterialButton
        className="mat-button"
        icon="edit"
        size={size}
        onClick={() => onEditContact(true)}
      />
      <MaterialButton
        className="mat-button"
        icon="delete"
        size={size}
        onClick={handleDeleteContact}
      />
    </section>
  );
}
