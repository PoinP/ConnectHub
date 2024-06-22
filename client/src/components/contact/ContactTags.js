import { ContactElement } from "./ContactElement";
import { ContactTagList } from "./ContactTagList";
import { PureButton } from "../PureButton";

export function ContactTags({ tags, onSetTags }) {
  return (
    <div className="contact-sub-details">
      <h1>Tags</h1>
      <ContactElement icon="sell">
        <PureButton>Add Tag</PureButton>
      </ContactElement>
      <ContactTagList tags={tags} onSetTags={onSetTags} />
    </div>
  );
}
