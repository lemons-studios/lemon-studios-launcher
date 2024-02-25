"use client";
import { useCallback, useEffect, useState } from "react";
import { Switch } from "../components/uicomponents";

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
        <div className="flex flex-col w-full h-full gap-4 slide-in">
          <div>
            {[
              {
                name: "Recieve beta updates",
                id: "beta-updates",
                description: "Beta versions may be unstable",
                type: "toggle",
              },
              {
                name: "Keep launcher open",
                id: "keep-open",
                description: "Keep launcher open after launching the game",
                type: "toggle",
              },
            ].map((e, i) => (
              <div key={i}>
                <SettingsItem
                  index={i}
                  name={e.name}
                  description={e.description}
                  id={e.id}
                  type={e.type}
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
      <div>
        <p className="font-medium">{props.name}</p>
        <p className="text-sm">{props.description}</p>
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
