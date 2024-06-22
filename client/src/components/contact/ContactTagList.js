import { ContactTag } from "./ContactTag";

export function ContactTagList({ tags, onSetTags }) {
  function handleDeleteTag(tag) {
    onSetTags(tags => tags.filter(t=> t !== tag))
  }
  
  return (
    <div className="contact-tag-list">
      {tags.map((tag) => (
        <ContactTag key={tag} tag={tag} onDeleteTag={handleDeleteTag}/>
      ))}
    </div>
  );
}
