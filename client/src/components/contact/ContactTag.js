import { MaterialButton } from "../MaterialButton";

export function ContactTag({ tag, children, onDeleteTag }) {
  return (
    <div className="contact-tag">
      {tag}
      <MaterialButton icon="close" onClick={() => onDeleteTag(tag)} />
    </div>
  );
}
