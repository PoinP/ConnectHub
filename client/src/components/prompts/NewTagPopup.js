import { Button } from "../Button";
import "./prompts.css";

import { useState } from "react";

export function NewTagPopup({ selectedContact, onContactEdit, onSetPopup, onCreateTag }) {
  const [tag, setTag] = useState("");
  const [focused, setFocused] = useState(false);

  function handleAddTag() {
    onSetPopup(false);

    if (!tag) return;

    onCreateTag(tag);
    
    if (!selectedContact) return;

    if (!selectedContact.tags) {
      selectedContact.tags = [];
    }

    const foundTagIndex = selectedContact.tags.findIndex((t) => t === tag);

    if (foundTagIndex !== -1) {
      return;
    }

    const editedContact = { ...selectedContact };
    editedContact.tags.push(tag);
    onContactEdit(editedContact);
    onSetPopup(false);
  }

  return (
    <div
      className="background"
      onClick={() => {
        onSetPopup(false);
      }}
    >
      <div className="prompt" onClick={(e) => e.stopPropagation()}>
        <h4 className="prompt-header">Create a tag</h4>
        <form className="prompt-form" onSubmit={handleAddTag}>
          <input
            className={`text-input ${focused && "text-input-focused"}`}
            type="text"
            onChange={(e) => setTag(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
          ></input>
          <div className="button-layout">
            <Button onClick={() => handleAddTag()}>
              Save
            </Button>
            <Button onClick={() => onSetPopup(false)}>
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
