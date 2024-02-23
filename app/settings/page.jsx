import Sidebar from "../components/sidebar";
import { Switch } from "../components/uicomponents";

export default function Settings() {
	return (
		<div className="flex flex-col w-full h-full gap-4">
			{[
				{
					name: "Recieve beta updates",
					description: "Beta versions may be unstable",
					type: "toggle"
				},
				{
					name: "Keep launcher open",
					description: "Keep launcher open after launching the game",
					type: "toggle"
				}
			].map((e, i) => (
				<div
					key={i}
					className="flex justify-between"
				>
					<div>
						<p className="font-medium">{e.name}</p>
						<p className="text-sm">{e.description}</p>
					</div>

					<Switch />
				</div>
			))}
		</div>
	);
}
