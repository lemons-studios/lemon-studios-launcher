"use client";
import { useCallback, useEffect, useState } from "react";
import { Switch } from "../components/uicomponents/uicomponents";
import { Beaker24Regular, Games24Regular } from "@fluentui/react-icons";

export default function Settings() {
	const [isReady, setIsReady] = useState(false);

	const checkLocalStorage = useCallback(() => {
		if (typeof localStorage === "undefined") {
			return;
		}
		setIsReady(true);
	});

	useEffect(() => {
		checkLocalStorage();
	}, [checkLocalStorage]);

	return (
		<>
			{isReady && (
				<div className="flex flex-col gap-4 w-full min-h-full fade-in">
					<div>
						{[
							{
								name: "Recieve beta updates",
								id: "beta-updates",
								description: "Beta versions may be unstable",
								type: "toggle",
								icon: Beaker24Regular,
							},
							{
								name: "Keep launcher open",
								id: "keep-open",
								description: "Keep launcher open after launching the game",
								type: "toggle",
								icon: Games24Regular,
							},
						].map((e, i) => (
							<div key={i}>
								<SettingsItem
									index={i}
									name={e.name}
									description={e.description}
									id={e.id}
									type={e.type}
									icon={e.icon}
								/>
							</div>
						))}
					</div>
				</div>
			)}
		</>
	);
}

function SettingsItem(props) {
	const [checked, setChecked] = useState(
		localStorage.getItem(props.id) == "true"
	);
	return (
		<div
			className={
				(props.index > 0 ? "border-t border-[#fff2] mt-4 pt-4 " : "") +
				"flex justify-between items-center"
			}
		>
			<div className="flex items-center gap-4">
				<props.icon />
				<div>
					<h1 className="font-medium">{props.name}</h1>
					<p className="text-[#888] text-sm">{props.description}</p>
				</div>
			</div>

			<Switch
				onChange={(ev) => {
					localStorage.setItem(props.id, ev.target.checked);
					setChecked(ev.target.checked);
				}}
				checked={checked}
			/>
		</div>
	);
}
