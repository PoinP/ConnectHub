import { MaterialButton } from "../MaterialButton";

export function ContactTag({ children }) {
  return (
    <div className="contact-tag">
      {children}
      <MaterialButton icon="close" />
    </div>
  );
}
