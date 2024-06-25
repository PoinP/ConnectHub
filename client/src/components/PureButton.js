
export function PureButton({ disabled = false, className = "", style = {}, onClick, children }) {
  return (
    <button disabled={disabled} style={style} onClick={onClick} className={`pure-button ${disabled && "non-clickable"} ${className}`}>
      {children}
    </button>
  );
}
