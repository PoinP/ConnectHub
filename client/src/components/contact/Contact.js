import { ContactActions } from "./ContactActions.js";
import { ContactHeader } from "./ContactHeader.js";
import { ContactDetails } from "./ContactDetails.js";
import { ContactInfo } from "./ContactInfo.js";
import { ContactTags } from "./ContactTags.js";
import "./contact.css"

export function Contact({ contact, onSetPopup, onContactEdit, onFavoriteContact, onSelectContact, onEditContact, onDeleteContact }) {
  function setTags(tagsCallback) {
    if (!contact.tags)
      return;
    
    const editedContact = {...contact};
    editedContact.tags = tagsCallback(editedContact.tags);
    onContactEdit(editedContact);
  }
  
  return (
    <section className="contact">
      <ContactActions contact={contact} onFavoriteContact={onFavoriteContact} onSelectContact={onSelectContact} onEditContact={onEditContact} onDeleteContact={onDeleteContact}/>
      <ContactHeader contact={contact} />
      <ContactDetails>
        {contact.details && (
          <ContactInfo header={"Details"} category={contact.details} />
        )}
        <ContactTags tags={contact.tags} onSetTags={setTags} onSetPopup={onSetPopup} />
        {contact.info && (
          <ContactInfo header={"Info"} category={contact.info} />
        )}
      </ContactDetails>
    </section>
  );
}
