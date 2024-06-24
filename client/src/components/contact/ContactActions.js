import { MaterialButton } from "../MaterialButton";

export function ContactActions({ id, size = 38, onSelectContact, onEditContact, onDeleteContact }) {
  function handleDeleteContact() {
    onDeleteContact(id);
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

      <MaterialButton className="mat-button" icon="star" size={size} />
      <MaterialButton className="mat-button" icon="edit" size={size} onClick={() => onEditContact(true)} />
      <MaterialButton className="mat-button" icon="delete" size={size} onClick={handleDeleteContact} />
    </section>
  );
}
