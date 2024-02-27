export default function MissionMonkey() {
	return (
		<div className="flex flex-col justify-center items-center gap-4 w-full min-h-full fade-in">
			<img src="/mission-monkey.png" width={128} />
			<p className="font-medium text-4xl potra">Mission: Monkey</p>
			<button className="flex flex-row justify-center items-center bg-green-500 hover:bg-green-600 pt-1 rounded w-28 h-10 font-bold text-white transition-colors">
				Play
			</button>
		</div>
	);
}
