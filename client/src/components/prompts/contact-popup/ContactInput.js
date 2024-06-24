import { MaterialSymbol } from "react-material-symbols";

export function ContactInput({
  icon = "", size = 42, style = {}, className, children, type = "text", value, placeholder, onChange
}) {
  const materialStyle = {
    visibility: `${icon ? "visible" : "hidden"}`,
    marginRight: "6px"
  };

  icon = icon || "mail"; // Doesn't matter what the icon will be!

  return (
    <section style={style} className={`contact-input-container ${className}`}>
      <MaterialSymbol style={materialStyle} icon={icon} size={size} />
      <input className="contact-input" value={value} type={type} placeholder={placeholder} onChange={onChange}/>
      {children}
    </section>
  );
}
