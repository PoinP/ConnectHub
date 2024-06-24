import { useEffect, useState } from "react";
import { Button } from "../../Button";
import { ContactInput } from "./ContactInput"
import { ContactInputCluster } from "./ContactInputCluster";
import { Avatar } from "../../Avatar";

import "../prompts.css"
import "./contact-popup.css"

function ContactElementBreak() {
    return <div style={{ margin: "10px 0" }} />;
}

const phoneLabels = ["Mobile", "Work", "Home", "Main", "Work fax", "Home fax", "Pager", "Other"];
const emailLabels = ["Home", "Work", "Other"];
const dateLabels = ["Anniversary", "Birthday", "Other", "No Label"]

function getDefault(type, detail = "") {
    return {
        type,
        detail,
        content: "",
    }
}

const phonesMap = new Map();
phonesMap.set(0, getDefault("phone", "Mobile"));

const emailsMap = new Map();
emailsMap.set(0, getDefault("email", "Home"));

const datesMap = new Map();
datesMap.set(0, getDefault("event", "Anniversary"));

function handleDynamicInput(e, id, type, detail, items, count, limit, setItems, setCount) {
    const shouldAddNewInput = (id + 1 === count && items.size !== limit);
    setItems(items => {
        items.set(id, {...items.get(id), content: e.target.value});

        if (shouldAddNewInput) {
            items.set(count, getDefault(type, detail));
        }
            
        return new Map(items);
    })

    if (shouldAddNewInput) {
        setCount(count => count + 1);
    }
}

function handleDynamicLabel(e, id, setItems, newType) {
    setItems(items => {
        const newItem = {...items.get(id), detail: e.target.value};

        if (newType) {
            newItem.type = newType;
        }

        items.set(id, newItem);
        return new Map(items);
    })
}

function handleDynamicDeletion(id, setItems, setCount) {
    setItems(items => {
        items.delete(id);

        const mapArr = Array.from(items);
        const lastId = mapArr[mapArr.length - 1][0];
        setCount(lastId + 1);

        return new Map(items);
    })
}

function fillDynamicValues(values, setItems, setCount) {
    const map = new Map();
    values.forEach((p, idx) => {
        map.set(idx, p);
    })

    setItems(map);
    setCount(map.size);
}

function hasContent(mapValues) {
  const values = Array.from(mapValues).map(([k, v]) => v);

  for (let value of values) {
    if (value.content !== "")
      return true;
  }

  return false;
}

const requirementStarStyle = {
    marginLeft: "8px"
}

export function ContactPopup({ contact, onAddContact, onEditContact, onSetPopup }) {
    const [imageBlob, setImageBlob] = useState(null);
    const [selectedImage, setSelectedImage] = useState("");

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");

    const [phones, setPhones] = useState(new Map(phonesMap))
    const [phonesCount, setPhonesCount] = useState(1);

    const [emails, setEmails] = useState(new Map(emailsMap))
    const [emailsCount, setEmailsCount] = useState(1);

    const [dates, setDates] = useState(new Map(datesMap))
    const [datesCount, setDatesCount] = useState(1);

    const [relationship, setRelationship] = useState("");
    const [nickname, setNickname] = useState("");

    const [tags, setTags] = useState("");

    // Fill exisitng contact info
    useEffect(() => {
      if (!contact)
        return;

      const { avatar, name, details, info, tags } = contact;

      setSelectedImage(avatar);

      setFirstName(name.first);
      setLastName(name.last);

      if (details) {
        if (details.phone) {
          fillDynamicValues(details.phone, setPhones, setPhonesCount);
        }

        if (details.mail) {
          fillDynamicValues(details.mail, setEmails, setEmailsCount);
        }
      }

      if (info) {
        if (info.date) {
          fillDynamicValues(info.date, setDates, setDatesCount);
        }

        if (info.relationship) {
          setRelationship(info.relationship[0].content);
        }

        if (info.nickname) {
          setNickname(info.nickname[0].content);
        }

        if (tags) {
          setTags(tags);
        }
      }
    }, [contact]);

    function handlePhoneInput(e, id) {
        handleDynamicInput(e, id, "phone", "Mobile", phones, phonesCount, 10, setPhones, setPhonesCount);
    }

    function handlePhoneLabel(e, id) {
        handleDynamicLabel(e, id, setPhones);
    }

    function handleDeletePhoneInput(id) {
        handleDynamicDeletion(id, setPhones, setPhonesCount);
    }

    function handleEmailInput(e, id) {
        handleDynamicInput(e, id, "email", "Home", emails, emailsCount, 10, setEmails, setEmailsCount);
    }

    function handleEmailLabel(e, id) {
        handleDynamicLabel(e, id, setEmails);
    }

    function handleDeleteEmailInput(id) {
        handleDynamicDeletion(id, setEmails, setEmailsCount);
    }

    function handleDateInput(e, id) {
        handleDynamicInput(e, id, "event", "Anniversary", dates, datesCount, 3, setDates, setDatesCount);
    }

    function handleDateLabel(e, id) {
        const value = e.target.value;
        const newType = value === "Birthday" ? "cake" : "event";

        handleDynamicLabel(e, id, setDates, newType);
    }

    function handleDeleteDateInput(id) {
        handleDynamicDeletion(id, setDates, setDatesCount);
    }

    function handleSelectAvatar(e) {
      setImageBlob(blob => {
        const currBlob = e.target.files[0] || blob;
        setSelectedImage(currBlob ? URL.createObjectURL(currBlob) : null)
        return currBlob;
      });
    }

    function handleCreateContact() {
      if (!firstName || !lastName || !hasContent(phones)) return;

      const newContact = {
        id: contact ? contact.id : -1,
        avatar: selectedImage,
        name: {
          first: firstName,
          last: lastName
        },
        details: {
          phone:
            Array.from(phones)
            .map(([_, value]) => value)
            .filter(value =>value.content),
          mail:
            Array.from(emails)
            .map(([_, value]) => value)
            .filter(value =>value.content)
        },
        info: {},
        tags: tags
      };

      if (dates.size > 0) {
        const values = Array.from(dates).map(([_, value]) => value);
        const filteredValues = values.filter(value => value.content);

        if (filteredValues.length > 0)
            newContact.info.date = filteredValues;
      }

      if (relationship) {
        newContact.info.relationship = [
          {
            type: "workspaces",
            detail: "Relationship",
            content: relationship,
          },
        ];
      }

      if (nickname) {
        newContact.info.nickname = [
          {
            type: "person",
            detail: "Nickname",
            content: nickname,
          },
        ];
      }
      
      if (contact) {
        onEditContact(newContact);
      } else {
        onAddContact(newContact);
      }

      onSetPopup(false);
    }

    return (
      <section className="background" onClick={() => onSetPopup(false)}>
        <section className="prompt" onClick={(e) => e.stopPropagation()}>
          <h4 class="prompt-header">{`${contact ? "Edit" : "Create"} a contact`}</h4>
          <label className="file-upload" htmlFor="avatar-upload">
            <Avatar src={selectedImage || null} alt="ProfilePicture"/>
            <span className="pure-button" onClick={null} style={{marginTop: "6px"}}>Choose a photo</span>
          </label>
          <input id="avatar-upload" type="file" accept="image/png, image/jpeg, image/gif" onChange={handleSelectAvatar} />
          <ContactInput 
            icon="person" 
            value={firstName}
            placeholder="First name" 
            onChange={(e) => setFirstName(e.target.value)}
          ><span style={requirementStarStyle}>*</span></ContactInput>
          <ContactInput
            className="last-category-input"
            value={lastName}
            placeholder="Last name"
            onChange={(e) => setLastName(e.target.value)}
          ><span style={requirementStarStyle}>*</span></ContactInput>
          <ContactElementBreak />

          {Array.from(phones).map(([key, value]) => (
            <ContactInputCluster
              id={key}
              icon="phone"
              placeholder="Phone Number"
              value={value}
              options={phoneLabels}
              onInput={handlePhoneInput}
              onDelete={handleDeletePhoneInput}
              onSelect={handlePhoneLabel}
            >{key === 0 && <span style={requirementStarStyle}>*</span>}</ContactInputCluster>
          ))}
          <ContactElementBreak />

          {Array.from(emails).map(([key, value]) => (
            <ContactInputCluster
              id={key}
              icon="email"
              placeholder="Email"
              value={value}
              options={emailLabels}
              onInput={handleEmailInput}
              onDelete={handleDeleteEmailInput}
              onSelect={handleEmailLabel}
            />
          ))}
          <ContactElementBreak />

          {Array.from(dates).map(([key, value]) => (
            <ContactInputCluster
              id={key}
              type="date"
              icon={value.type}
              placeholder="Event"
              value={value}
              options={dateLabels}
              onInput={handleDateInput}
              onDelete={handleDeleteDateInput}
              onSelect={handleDateLabel}
            />
          ))}
          <ContactElementBreak />

          <ContactInput icon="workspaces" value={relationship} placeholder="Relationship" onChange={(e) => setRelationship(e.target.value)}/>
          <ContactElementBreak />
          <ContactInput icon="person" value={nickname} placeholder="Nickname" onChange={(e) => setNickname(e.target.value)}/>

          <div class="button-layout">
            <Button onClick={handleCreateContact}>Save</Button>
            <Button onClick={() => onSetPopup(false)}>Cancel</Button>
          </div>
        </section>
      </section>
    );
}