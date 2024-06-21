import { MaterialSymbol } from "react-material-symbols";
import { PureButton } from "./PureButton";

export function MaterialButton({
  icon, fill = false, weight = "inherit", grade = "inherit", size = "inherit", color = "inherit", as = "span", className = "", style = {},
}) {
  return (
    <PureButton style={style} className={className}>
      <MaterialSymbol
        icon={icon}
        fill={fill}
        weight={weight}
        grade={grade}
        size={size}
        color={color}
        as={as} />
    </PureButton>
  );
}
