export function ContactHeader({ contact }) {
  return (
    <section className="contact-header">
      <img src={contact.avatar} alt="text" />
      <h4 className="contact-name">{contact.name}</h4>
    </section>
  );
}
