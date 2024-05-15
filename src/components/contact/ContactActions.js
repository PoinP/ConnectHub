import { MaterialButton } from "../MaterialButton";

export function ContactActions({ size = 38 }) {
  return (
    <form className="contact-actions">
      <MaterialButton
        style={{ marginRight: "auto" }}
        icon="keyboard_backspace"
        size={size} />

      <MaterialButton icon="star" size={size} />
      <MaterialButton icon="edit" size={size} />
      <MaterialButton icon="delete" size={size} />
    </form>
  );
}
