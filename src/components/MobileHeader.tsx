import type { Dispatch, SetStateAction } from "react";
import DarkLightToggle from "./DarkLightToggle";

type Props = {
  isSidePanelOpen: boolean;
  setIsSidePanelOpen: Dispatch<SetStateAction<boolean>>;
};

const MobileHeader = ({ setIsSidePanelOpen, isSidePanelOpen }: Props) => {
  return (
    <div
      className={`flex justify-between w-full h-16 p-2 top-0 sticky z-1004 bg-background xs:hidden ${isSidePanelOpen ? "hidden" : "block"}`}
    >
      <button onClick={() => setIsSidePanelOpen(true)}>
        <img
          src="burger-bar.png"
          className="size-6 dark:invert ml-auto mr-10 lg:hidden"
        />
      </button>
      <DarkLightToggle />
    </div>
  );
};

export default MobileHeader;
