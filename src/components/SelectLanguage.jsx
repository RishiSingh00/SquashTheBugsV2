import { useState } from "react";
const Language = [
  { id: 1, name: "Java" },
  { id: 2, name: "C++" },
  { id: 3, name: "Python" },
];
export default function SelectLanguage({setLanguage}) {
  const handleClick = (currentLanguage) => {
    setLanguage(currentLanguage)
  };
  return (
    <div className="h-full bg-boxbg border flex flex-col border-secondary rounded p-2 overflow-auto">
      <div className="pl-2">
        <p className="text-white text-lg">Select any Language</p>
      </div>
      <div className="space-y-1  pr-6 w-full p-2 overflow-auto space-y-2 scrollbar-thin scrollbar-thumb-custom scrollbar-thumb-primary  scrollbar-track-secondary ">
        {Language.map((lang) => (
          <SelectLanguageItem
            key={lang.id}
            name={lang.name}
            onClick={() => handleClick(lang.name)}
          />
        ))}
      </div>
    </div>
  );
}

function SelectLanguageItem({ name, onClick }) {
  
  
  return (
    <div
      onClick={onClick}
      className="w-full pl-6 h-11  bg-primary rounded-full flex justify-between ${isClicked ? 'bg-green' : 'bg-primary'} hover:bg-green items-center"
    >
      <div className="text-white ">{name}</div>
    </div>
  );
}
