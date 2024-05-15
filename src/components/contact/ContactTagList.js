import { ContactTag } from "./ContactTag";

export function ContactTagList({ tags }) {
  return (
    <div className="contact-tag-list">
      {tags.map((tag) => (
        <ContactTag>{tag}</ContactTag>
      ))}
    </div>
  );
}
