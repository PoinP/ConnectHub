import { MaterialButton } from "../MaterialButton";

export function NavItem({
  icon,
  fill = false,
  size = 28,
  isActive = false,
  isDisabled = false,
  className = "",
  children,
  onClick
}) {
  return (
    <div className={`nav-item ${!isDisabled && "mat-button"} nav-item-text  ${isActive && "mat-button-active"}`} onClick={onClick}>
      <MaterialButton
        className={className}
        icon={icon}
        fill={fill}
        size={size}
        color={isDisabled ? "#808080" : "inherit"}
        disabled={isDisabled}
      />
      {children}
    </div>
  );
}
