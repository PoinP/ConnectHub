import { MaterialButton } from "../MaterialButton";

export function NavItem({
  icon,
  fill = false,
  size = 28,
  className = "",
  onClick,
  children,
}) {
  return (
    <div className="nav-item mat-button nav-item-text" onClick={onClick}>
      <MaterialButton
        className={className}
        icon={icon}
        fill={fill}
        size={size}
      />
      {children}
    </div>
  );
}
