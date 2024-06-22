import "./prompts.css";

import { useState } from "react";

export function NewTagPopup({ selectedContact, onContactEdit, onSetPopup }) {
  const [tag, setTag] = useState("");
  const [focused, setFocused] = useState(false);

  function handleAddTag() {
      if (!selectedContact || !tag) return;

    if (!selectedContact.tags) {
      selectedContact.tags = [];
    }
    
    const foundTagIndex = selectedContact.tags.findIndex((t) => t === tag);
    
    if (foundTagIndex !== -1) {
        onSetPopup(false);
        return;
    }

    const editedContact = { ...selectedContact };
    editedContact.tags.push(tag);
    onContactEdit(editedContact);
    onSetPopup(false);
    return false;
  }

  return (
    <div
      class="background"
      onClick={() => {
        onSetPopup(false);
      }}
    >
      <div class="prompt" onClick={(e) => e.stopPropagation()}>
        <h4 class="prompt-header">Create a tag</h4>
        <form class="form" onSubmit={() => handleAddTag()}>
          <input
            className={`text-input ${focused ? "text-input-focused" : ""}`}
            type="text"
            onChange={(e) => setTag(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
          ></input>
          <div class="button-layout">
            <button className="prompt-button" onClick={() => handleAddTag()}>
              Save
            </button>
            <button className="prompt-button" onClick={() => onSetPopup(false)}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
