import { ContactElement } from "./ContactElement";

export function ContactElementInfo({ data }) {
  return (
    <>
      {data.map((element, idx) => (
        <ContactElement
          icon={idx === 0 ? element.type : ""}
          detail={element.detail}
        >
          {element.content}
        </ContactElement>
      ))}
    </>
  );
}
