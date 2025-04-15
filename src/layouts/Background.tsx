"use client";

import { useTheme } from "next-themes";
import { Toolbar } from "./Toolbar";
import ActivityBar from "./Activitybar";

export default function Background(props: any) {
  const theme = useTheme();

  return (
    <div className="relative h-screen w-screen overflow-hidden">
      <div className="relative flex flex-row w-full h-full bg-background">
        <ActivityBar />
        <div role="Sidebar" className="flex flex-col h-full w-full  ">
          <div className="flex-1">
            <Toolbar />
          </div>
          <div className="relative flex flex-grow-0 flex-shrink-0 ">
            {props.children}
          </div>
          <div className="flex-1">Hi</div>
        </div>
      </div>
    </div>
  );
}
