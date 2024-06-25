import { MaterialSymbol } from "react-material-symbols";
import { PureButton } from "./PureButton";

export function MaterialButton({
  icon, fill = false, disabled = false, grade = "inherit", size = "inherit", color = "inherit", as = "span", className = "", style = {}, onClick
}) {
  return (
    <PureButton disabled={disabled} style={style} onClick={onClick} className={className}>
      <MaterialSymbol
        icon={icon}
        fill={fill}
        grade={grade}
        size={size}
        color={color}
        as={as} />
    </PureButton>
  );
}
