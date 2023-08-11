export default function Button({ name, id, className, children, onClick }) {
  return (
    <button
      className={"btn " + (className ? className : "btn-default")}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
