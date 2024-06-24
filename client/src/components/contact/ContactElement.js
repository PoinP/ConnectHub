import { MaterialSymbol } from "react-material-symbols";

export function ContactElement({
  icon = "", size = 38, detail = "", className, style, children, onClick,
}) {
  const materialStyle = {
    visibility: `${icon ? "visible" : "hidden"}`,
  };

  icon = icon || "mail"; // Doesn't matter what the icon will be!

  return (
    <section style={style} className={`contact-element ${className}`} onClick={onClick}>
      <MaterialSymbol style={materialStyle} icon={icon} size={size} />
      <div className="contact-element-content">
        {children}
        <span className="contact-detail">{detail}</span>
      </div>
    </section>
  );
}
