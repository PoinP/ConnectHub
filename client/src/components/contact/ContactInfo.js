import { ContactElementInfo } from "./ContactElementInfo";

function ContactElementBreak() {
  return <div style={{ margin: "10px 0" }} />;
}

export function ContactInfo({ header, category }) {
  if (!category || Object.keys(category).length === 0) return;

  return (
    <div className="contact-sub-details">
      <h1>{header}</h1>
      {Object.keys(category).map((key, idx) => (
        <>
          {idx !== 0 && <ContactElementBreak />}
          <ContactElementInfo data={category[key]} />
        </>
      ))}
    </div>
  );
}
