import { MaterialSymbol } from "react-material-symbols";
import { PureButton } from "./PureButton";

export function MaterialButton({
  icon, fill = false, weight = "inherit", grade = "inherit", size = "inherit", color = "inherit", as = "span", className = "", style = {}, onClick
}) {
  return (
    <PureButton style={style} onClick={onClick} className={className}>
      <MaterialSymbol
        icon={icon}
        fill={fill}
        size={size}
        as={as} />
    </PureButton>
  );
}
