import Sidebar from "../components/sidebar";

export default function MissionMonkey() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 w-full h-full">
      <img src="/mission-monkey.png" width={128} />
      <p className="font-medium text-4xl potra">Mission: Monkey</p>
      <button className="flex flex-row items-center justify-center bg-green-500 hover:bg-green-600 pt-1 w-28 h-10 font-bold text-white transition-colors rounded">
        Play
      </button>
    </div>
  );
}
