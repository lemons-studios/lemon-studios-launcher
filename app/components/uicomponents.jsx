import "./uicomponents.css";
export function Switch({ props }) {
	return (
		<label class="switch">
			<input
				type="checkbox"
				{...props}
			/>
			<span class="slider"></span>
		</label>
	);
}
