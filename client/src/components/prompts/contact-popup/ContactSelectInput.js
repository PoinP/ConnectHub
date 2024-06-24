import { MaterialSymbol } from "react-material-symbols";

export function ContactSelectInput({
  icon = "", size = 42, style = {}, className, children, value, options = [], onSelect
}) {
  const materialStyle = {
    visibility: `${icon ? "visible" : "hidden"}`,
    marginRight: "6px"
  };

  icon = icon || "mail"; // Doesn't matter what the icon will be!

  return (
    <section style={style} className={`contact-input-container ${className}`}>
      <MaterialSymbol style={materialStyle} icon={icon} size={size} />
      <select value={value} className="contact-input short-contact-input " onChange={onSelect}>
        {options.map((option, idx) => 
            <option key={idx} value={option === "No Label" ? "" : option}>{option}</option>
        )}
      </select>
      {children}
    </section>
  );
}
