import { HorziontalBorder } from "../HorizontalBorder";

export function VerticalContact({ contact, selectedContact, onSelectContact }) {
  const { id, name, avatar, details } = contact;
  const phoneNumber = details.phone[0].content;

  const isSelected = selectedContact && selectedContact.id === id;

  function handleSelectContact() {
    if (isSelected) return;

    const newSelection = { ...contact };
    onSelectContact(newSelection);
  }

  return (
    <li onClick={handleSelectContact}>
      <section
        className={`vert-contact ${isSelected ? "vert-contact-selected" : ""}`}
      >
        <img src={avatar} alt="person" />
        <aside className="vert-contact-details">
          <span className="vert-contact-name">{name}</span>
          <span className="contact-detail">{phoneNumber}</span>
        </aside>
      </section>
      <HorziontalBorder/>
    </li>
  );
}
