
export function PureButton({ className = "", style = {}, onClick, children }) {
  return (
    <button style={style} onClick={onClick} className={`pure-button ${className}`}>
      {children}
    </button>
  );
}
