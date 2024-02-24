"use client";
import {
  Dismiss16Regular,
  LineHorizontal116Regular,
  Maximize16Regular,
  SquareMultiple16Regular,
} from "@fluentui/react-icons";
import { useCallback, useEffect, useState } from "react";

export default function TitleBar() {
  const [maximized, setMaximized] = useState(null);
  const [appWindow, setAppWindow] = useState();

  // Get tauri window instance
  async function setupAppWindow() {
    const appWindow = (await import("@tauri-apps/api/window")).appWindow;
    setAppWindow(appWindow);

    // Add event listener for window maximize/minimize
    appWindow.onResized(async () => {
      setMaximized(await appWindow.isMaximized());
    });
  }
  useEffect(() => {
    setupAppWindow();
  }, []);

  return (
    <>
      <div className="w-full h-14"></div>
      <div className="top-0 left-0 absolute w-full">
        <div
          className="relative flex justify-center items-center w-full h-14"
          data-tauri-drag-region
        >
          <div className="flex gap-2">
            <img src="/lemon-studios.svg" width={20} data-tauri-drag-region />
            <p data-tauri-drag-region>Lemon Launcher</p>
          </div>
          <div className="right-0 absolute flex">
            <button
              className="flex justify-center items-center hover:bg-[#fff2] active:bg-[#fff3] w-12 h-14"
              onClick={() => appWindow.minimize()}
            >
              <LineHorizontal116Regular />
            </button>
            <button
              className="flex justify-center items-center hover:bg-[#fff2] active:bg-[#fff3] w-12 h-14"
              onClick={() => appWindow.toggleMaximize()}
            >
              {maximized ? <SquareMultiple16Regular /> : <Maximize16Regular />}
            </button>
            <button
              className="flex justify-center items-center hover:bg-[#ca3230] active:bg-[#84292c] w-12 h-14"
              onClick={() => appWindow.close()}
            >
              <Dismiss16Regular />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
