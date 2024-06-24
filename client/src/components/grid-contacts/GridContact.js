import { Avatar } from "../Avatar";
import { HorziontalBorder } from "../HorizontalBorder";

export function GridContact({ contact, onSelectContact }) {
    const { name, avatar, details } = contact;
    const { first, last } = name;
    const phoneNumber = details.phone[0].content;

    function handleSelectContact() {
        const newSelection = { ...contact };
        onSelectContact(newSelection);
    }

    return (
        <>
            <li className="grid-contact" onClick={handleSelectContact}>
                <div className="grid-image-container">
                    <Avatar className="grid-image" src={avatar} alt="Profile Picture"/>
                </div>
                <div className="grid-contact-detials">
                    <span className="grid-contact-name">{`${first} ${last}`}</span>
                    <span className="grid-contact-phone">{phoneNumber}</span>
                </div>
            </li>
            <HorziontalBorder className="grid-bot-border"/>
        </>
    );
}
