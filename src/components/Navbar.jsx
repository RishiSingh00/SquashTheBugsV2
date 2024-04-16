import { Bars3Icon, ClockIcon } from "@heroicons/react/24/outline"; // Importing HeroIcons
import { useGlobalState } from "./GlobalStateProvider";
import { useEffect, useState } from "react";

export default function Navbar() {
  const { globalState } = useGlobalState();
  const [hasName, setHasName] = useState(null); // Declare hasName using useState

  useEffect(() => {
    // Update hasName when globalState.username changes
    setHasName(globalState.username);
    console.log(hasName);
  }, [globalState.username]);

  return (
    <div className="flex  w-full  items-center justify-between h-16 bg-[#06090C] border-b border-secondary">
      <div className="ml-8 text-white text-lg">
        {hasName && <span>👋 Hi, {hasName} </span>}
      </div>
      <div className="text-white text-xl font-semibold">
        SANKALAN '24 | SQUASH THE <span className="text-red font-semibold text-2xl">Bugs</span>
      </div>
      <div></div>
    </div>
  );
}
