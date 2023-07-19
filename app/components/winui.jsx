import { CheckboxChecked20Filled } from "@fluentui/react-icons";
import { useState } from "react";
import "./checkbox.css";

export function Checkbox(props) {
	const [checked, setChecked] = useState(false);
	return (
		<div className={(checked ? "border-[#8880] " : "border-[#888a] active:opacity-40 ") + "w-5 h-5 border rounded-md hover:bg-[#8881] active:bg-[#8882]"}>
			<button
				style={{
					color: props.color,
					background: checked ? props.color : "transparent"
				}}
				className="winui-checkbox w-5 h-5 -translate-x-[1px] -translate-y-[1px] rounded-md hover:brightness-110 hover:dark:brightness-90 active:brightness-125 active:dark:brightness-75"
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
						className="bg-[#fff] dark:bg-[#222] -mt-1 scale-[1.4]"
					/>
				</div>
			</button>
		</div>
	);
}
