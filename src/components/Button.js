export function Button({ children, type, onHandleClick, className }) {
  return (
    <button
      type={type ? type : "button"}
      className={`btn ${className || ""}`}
      onClick={() => {
        onHandleClick && onHandleClick();
      }}
    >
      {children}
    </button>
  );
}
