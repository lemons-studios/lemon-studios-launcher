import "./uicomponents.css";
export function Switch(props) {
  return (
    <label className="switch">
      <input type="checkbox" {...props} />
      <span className="slider"></span>
    </label>
  );
}
