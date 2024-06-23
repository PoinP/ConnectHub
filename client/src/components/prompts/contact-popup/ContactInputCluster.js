import { MaterialButton } from "../../MaterialButton";
import { ContactInput } from "./ContactInput";
import { ContactSelectInput } from "./ContactSelectInput";

export function ContactInputCluster({
  id,
  type = "text",
  icon,
  placeholder,
  value,
  options,
  onInput,
  onDelete,
  onSelect,
}) {
  const {_, detail, content} = value;
  return (
    <div className="input-cluster" key={id}>
      {id !== 0 && (
        <MaterialButton
          size={18}
          style={{ marginLeft: "auto" }}
          icon="close"
          onClick={() => onDelete(id)}
        />
      )}
      <ContactInput
        icon={icon}
        type={type}
        value={content}
        placeholder={placeholder}
        onChange={(e) => onInput(e, id)}
      />
      <ContactSelectInput value={detail} options={options} className="last-category-input" onSelect={(e) => onSelect(e, id)} />
    </div>
  );
}
