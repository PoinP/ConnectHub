export function Button({ onClick, style, className, children }) {    
    return (
        <button style={style} className={`button ${className}`} onClick={onClick}>
            {children}
        </button>
    )
}