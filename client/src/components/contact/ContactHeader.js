import { Avatar } from "../Avatar";

export function ContactHeader({ contact }) {
  const { first, last } = contact.name;

  return (
    <section className="contact-header">
      <Avatar src={contact.avatar} alt="Profile Picture"/>
      <h4 className="contact-name">{`${first} ${last}`}</h4>
    </section>
  );
}
