import { ContactElement } from "./ContactElement";
import { ContactTagList } from "./ContactTagList";
import { PureButton } from "../PureButton";

export function ContactTags({ tags, onSetTags, onSetPopup }) {
  return (
    <div className="contact-sub-details">
      <h1 className="info-header">Tags</h1>
      <ContactElement
        className="clickable mat-button"
        icon="label"
        onClick={() => onSetPopup(true)}
      >
        <PureButton>Add Tag</PureButton>
      </ContactElement>
      {tags && <ContactTagList tags={tags} onSetTags={onSetTags} />}
    </div>
  );
}
