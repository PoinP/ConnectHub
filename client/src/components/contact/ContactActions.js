import { MaterialButton } from "../MaterialButton";

export function ContactActions({ size = 38, onSelectContact }) {
  return (
    <form className="contact-actions">
      <MaterialButton
        className="mat-button"
        style={{ marginRight: "auto" }}
        icon="keyboard_backspace"
        size={size}
        onClick={() => onSelectContact(null)}
      />

      <MaterialButton className="mat-button" icon="star" size={size} />
      <MaterialButton className="mat-button" icon="edit" size={size} />
      <MaterialButton className="mat-button" icon="delete" size={size} />
    </form>
  );
}
