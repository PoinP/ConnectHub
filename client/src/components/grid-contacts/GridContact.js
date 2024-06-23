import { HorziontalBorder } from "../HorizontalBorder";

export function GridContact({ contact, onSelectContact }) {
    const { name, avatar, details } = contact;
    const phoneNumber = details.phone[0].content;

    function handleSelectContact() {
        const newSelection = { ...contact };
        onSelectContact(newSelection);
    }

    return (
        <>
            <li className="grid-contact" onClick={handleSelectContact}>
                <div className="grid-image-container">
                    <img className="grid-image" src={avatar} alt="person" />
                </div>
                <div className="grid-contact-detials">
                    <span className="grid-contact-name">{name}</span>
                    <span className="grid-contact-phone">{phoneNumber}</span>
                </div>
            </li>
            <HorziontalBorder className="grid-bot-border"/>
        </>
    );
}
