import { MaterialButton } from "../MaterialButton";

export function ContactTag({ tag, children, onDeleteTag }) {
  return (
    <div className="contact-tag">
      {tag}
      <MaterialButton className="mat-button" icon="close" onClick={() => onDeleteTag(tag)} />
    </div>
  );
}
