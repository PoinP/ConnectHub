export function Avatar({ src, alt = "", className }) {
    return (
      <img
        className={`contact-avatar ${className}`}
        src={src || "./avatar-default.png"}
        alt={alt}
      />
    );
}