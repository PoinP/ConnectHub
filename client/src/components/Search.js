import { useId, useState } from "react";
import { MaterialSymbol } from "react-material-symbols";
import { MaterialButton } from "./MaterialButton";
import { useDebouncedCallback } from 'use-debounce';

export function Search({
  placeholder = "Search",
  size = 12,
  fontSize = 18,
  className = "",
  onSearch,
  onSelectCreateContact,
}) {
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);

  const searchID = useId();

  const debounced = useDebouncedCallback(onSearch, 500);

  function handleOnChange(e) {
    setQuery(e.target.value);
    debounced(e.target.value.toLowerCase());
  }

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
          onChange={handleOnChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />
        {query && (
          <button
            className={`pure-button ${!query ? "hidden" : ""}`}
            onClick={() => {
              setQuery("");
              onSearch("");
            }}
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
