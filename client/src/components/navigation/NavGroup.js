import { HorziontalBorder } from "../HorizontalBorder";
import "./nav.css";

export function NavGroup({ title, className = "", showHorizBorder = true, children }) {
  const titleStyles = {
    textAlign: "center",
    marginBottom: "0.5rem",
    alignSelf: "center",
  };

  return (
    <section className={`nav-group ${className}`}>
      {title && <h1 style={titleStyles}>{title}</h1>}
      {showHorizBorder && <HorziontalBorder />}
      {children}
      {showHorizBorder && <HorziontalBorder />}
    </section>
  );
}
