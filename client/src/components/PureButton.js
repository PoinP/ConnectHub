
export function PureButton({ className = "", style = {}, children }) {
  return (
    <button style={style} className={`pure-button ${className}`}>
      {children}
    </button>
  );
}
