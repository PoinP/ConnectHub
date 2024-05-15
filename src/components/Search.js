import { useId, useState } from "react";
import { MaterialSymbol } from "react-material-symbols";

function Search({
  placeholder = "Search",
  size = 12,
  fontSize = 18,
  className = "",
}) {
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);

  const searchID = useId();

  return (
    <section style={{ fontSize: { fontSize } }} className={className}>
      <form className={`search-input ${focused ? "search-input-focused" : ""}`}>
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
        <button className="pure-button">
          <MaterialSymbol icon="search" size={fontSize} />
        </button>
      </form>
    </section>
  );
}

export default Search;
