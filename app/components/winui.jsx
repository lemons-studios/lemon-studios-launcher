import { CheckboxChecked20Filled } from "@fluentui/react-icons";
import { useState } from "react";
import "./checkbox.css";

export function Checkbox(props) {
	const [checked, setChecked] = useState(false);
	return (
		<div
			style={{
				borderColor: checked ? "transparent" : "#8883"
			}}
			className="w-5 h-5 border rounded-md"
		>
			<button
				style={{
					color: props.color,
					background: checked ? props.color : "transparent"
				}}
				className="winui-checkbox w-5 h-5 rounded-md"
				onClick={() => {
					setChecked(!checked);
				}}
			>
				<div
					style={{
						display: checked ? "" : "none"
					}}
					className="winui-checkbox-checkmark w-5 h-5"
				>
					<CheckboxChecked20Filled
						style={{
							color: props.color
						}}
						className="bg-[#fff] -mt-1 scale-[1.4]"
					/>
				</div>
			</button>
		</div>
	);
}
