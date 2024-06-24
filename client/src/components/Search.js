import { useId, useState } from "react";
import { MaterialSymbol } from "react-material-symbols";
import { MaterialButton } from "./MaterialButton";

export function Search({
  placeholder = "Search",
  size = 12,
  fontSize = 18,
  className = "",
  onSelectCreateContact,
}) {
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);

  const searchID = useId();

  return (
    <section style={{ fontSize: { fontSize } }} className={className}>
      <MaterialButton className="mat-button" style={{marginRight: "4px"}} icon="add" size={fontSize * 1.5} onClick={() => onSelectCreateContact(true)}/>
      <form className={`search-input ${focused && "search-input-focused"}`}>
        <label htmlFor={searchID} style={{ display: "none" }}>
          Search Input
        </label>
        <input
          id={searchID}
          className="search-input-field"
          type="text"
          size={size}
          value={query}
          placeholder={placeholder}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />
        {query && (
          <button
            className={`pure-button ${!query ? "hidden" : ""}`}
            onClick={() => setQuery("")}
          >
            <MaterialSymbol icon="close" size={fontSize} />
          </button>
        )}
        <MaterialButton icon="search" size={fontSize} />
      </form>
    </section>
  );
}

export default Search;
