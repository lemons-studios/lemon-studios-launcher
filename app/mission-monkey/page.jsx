import Sidebar from "../components/sidebar";

export default function MissionMonkey() {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <img
        src="/mission-monkey.png"
        width={128}
        style={{
          mixBlendMode: "luminosity",
          filter: "contrast(0.6) brightness(0.3)",
        }}
      />
      <p className="opacity-30 font-medium text-2xl">Mission: Monkey</p>
    </div>
  );
}
