import { useState } from "react";
import { Button } from "../../Button";
import { HorziontalBorder } from "../../HorizontalBorder";
import "../prompts.css"
import "./contact-popup.css"
import { ContactInput } from "./ContactInput"
import { ContactSelectInput } from "./ContactSelectInput";
import { MaterialButton } from "../../MaterialButton";
import { ContactInputCluster } from "./ContactInputCluster";
import { PureButton } from "../../PureButton";

function ContactElementBreak() {
    return <div style={{ margin: "10px 0" }} />;
}

const phoneLabels = ["Mobile", "Work", "Home", "Main", "Work fax", "Home fax", "Pager", "Other"];
const emailLabels = ["Home", "Work", "Other"];
const dateLabels = ["Anniversary", "Birthday", "Other", "No Label"]

function getDefault(type) {
    return {
        type,
        detail: "",
        content: "",
    }
}

const phonesMap = new Map();
phonesMap.set(0, getDefault("phone"));

const emailsMap = new Map();
emailsMap.set(0, getDefault("email"));

const datesMap = new Map();
datesMap.set(0, getDefault("event"));

function handleDynamicInput(e, id, type, items, count, limit, setItems, setCount) {
    const shouldAddNewInput = (id + 1 === count && items.size !== limit);
    setItems(items => {
        items.set(id, {...items.get(id), content: e.target.value});

        if (shouldAddNewInput) {
            items.set(count, getDefault(type));
        }
            
        return new Map(items);
    })

    if (shouldAddNewInput) {
        setCount(count => count + 1);
    }
}

function handleDynamicLabel(e, id, setItems, newType) {
    setItems(items => {
        const newItems = {...items.get(id), detail: e.target.value};

        if (newType) {
            newItems.type = newType;
        }

        items.set(id, newItems);
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

export function NewContactPopup() {
    const [selectedImage, setSelectedImage] = useState(null)

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");

    const [phones, setPhones] = useState(phonesMap)
    const [phonesCount, setPhonesCount] = useState(1);

    const [emails, setEmails] = useState(emailsMap)
    const [emailsCount, setEmailsCount] = useState(1);

    const [dates, setDates] = useState(datesMap)
    const [datesCount, setDatesCount] = useState(1);

    const [relationship, setRelationship] = useState("");
    const [nickname, setNickname] = useState("");

    function handlePhoneInput(e, id) {
        handleDynamicInput(e, id, "phone", phones, phonesCount, 10, setPhones, setPhonesCount);
    }

    function handlePhoneLabel(e, id) {
        handleDynamicLabel(e, id, setPhones);
    }

    function handleDeletePhoneInput(id) {
        handleDynamicDeletion(id, setPhones, setPhonesCount);
    }

    function handleEmailInput(e, id) {
        handleDynamicInput(e, id, "email", emails, emailsCount, 10, setEmails, setEmailsCount);
    }

    function handleEmailLabel(e, id) {
        handleDynamicLabel(e, id, setEmails);
    }

    function handleDeleteEmailInput(id) {
        handleDynamicDeletion(id, setEmails, setEmailsCount);
    }

    function handleDateInput(e, id) {
        handleDynamicInput(e, id, "event", dates, datesCount, 3, setDates, setDatesCount);
    }

    function handleDateLabel(e, id) {
        const value = e.target.value;
        const newType = value === "Birthday" ? "cake" : "event";

        handleDynamicLabel(e, id, setDates, newType);
    }

    function handleDeleteDateInput(id) {
        handleDynamicDeletion(id, setDates, setDatesCount);
    }

    return (
      <section className="background">
        <section className="prompt">
          <h4 class="prompt-header">Create a contact</h4>
          <label className="file-upload" htmlFor="avatar-upload">
            <img className="avatar" src={selectedImage ? URL.createObjectURL(selectedImage) : "./avatar-default.png"} alt="avatar" />
            <span className="pure-button" onClick={() => {}} style={{marginTop: "6px"}}>Choose a photo</span>
          </label>
          <input id="avatar-upload" type="file" accept="image/png, image/jpeg, image/gif" onChange={(e) => setSelectedImage(e.target.files[0])} />
          <ContactInput 
            icon="person" 
            value={firstName}
            placeholder="First name" 
            onChange={(e) => setFirstName(e.target.value)}
          />
          <ContactInput
            className="last-category-input"
            value={lastName}
            placeholder="Last name"
            onChange={(e) => setLastName(e.target.value)}
          />
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
            />
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
            <Button>Save</Button>
            <Button>Cancel</Button>
          </div>
        </section>
      </section>
    );
}