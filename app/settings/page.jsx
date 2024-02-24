import { Switch } from "../components/uicomponents";

export default function Settings() {
  return (
    <div className="flex flex-col w-full h-full gap-4">
      <div>
        {[
          {
            name: "Recieve beta updates",
            description: "Beta versions may be unstable",
            type: "toggle",
          },
          {
            name: "Keep launcher open",
            description: "Keep launcher open after launching the game",
            type: "toggle",
          },
        ].map((e, i) => (
          <div
            key={i}
            className={
              (i > 0 ? "border-t border-[#fff2] mt-4 pt-4 " : "") +
              "flex justify-between items-center"
            }
          >
            <div>
              <p className="font-medium">{e.name}</p>
              <p className="text-sm">{e.description}</p>
            </div>

            <Switch />
          </div>
        ))}
      </div>
    </div>
  );
}
