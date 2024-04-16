import { useNavigate } from "react-router-dom";
import { set, ref, getDatabase } from "firebase/database";

import Lobby from "../components/Lobby";
import SelectLanguage from "../components/SelectLanguage";
import { useState } from "react";
import { useGlobalState } from "../components/GlobalStateProvider";
export default function Instructions() {
  
  const [language, setLanguage] = useState('');
  return (
    <div className="flex p-4 items-center justify-between h-screen w-full bg-primary">
      <div className="w-3/4 bg-boxbg border border-secondary h-full rounded ">
        <Instruction language={language} />
      </div>
      <div className="w-1/4 pl-4 h-full flex flex-col space-y-2 ">
        <div className="h-1/3 w-full">
          <SelectLanguage setLanguage={setLanguage} />
        </div>
        <div className="h-2/3 w-full">
          <Lobby />
        </div>
      </div>
    </div>
  );
}

function Instruction({language}) {
  const navigate = useNavigate();
  const { globalState, setGlobalState } = useGlobalState();

  const handleNextClick = () => {
    const db = getDatabase();
    const mobileNumber = globalState.mobilenum;
    const contestCode = globalState.contestId;
    if(language){
      set(ref(db, `Users/${contestCode}/${mobileNumber}/language`), language)
      .then(() => {
        // Navigate to the "/contest" route
        setGlobalState(prevState => ({
          ...prevState,
          language:language
        }));
        
        navigate("/contest");
      })
      .catch((error) => {
        console.error("Error updating language:", error);
      });
    }
    // Update the language in the database
    
  };
  return (
    <div className="w-full h-full p-4 ">
      <h1 className="text-xl text-white  mb-4">Instructions</h1>
      <div className="overflow-auto h-[85%] mb-2 scrollbar-thin scrollbar-thumb-custom scrollbar-thumb-primary  scrollbar-track-secondary">
        <article className="text-wrap border-y rounded border-secondary ml-4 space-y-2  ">
        <div className="text-white">
  <p>
    1. Select a language to identify bugs in. If none is selected within the given time, the default language will be chosen automatically.
    <br />
    2. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec faucibus ante eget ligula aliquet, at fermentum nunc finibus.
    <br />
    3. Sed consectetur justo ac erat efficitur, et consectetur neque tincidunt.
    <br />
    3.1. Sub-instruction 1: Sub-instructions are indented for clarity.
    <br />
    3.2. Sub-instruction 2: They provide additional details or steps related to the main instructions.
    <br />
    4. Vivamus tempor odio at erat finibus, a vestibulum ex dapibus. Integer ut feugiat ante.
    <br />
    5. Phasellus fermentum, nunc nec posuere efficitur, enim tortor vestibulum odio, nec pharetra ligula magna id nunc.
    <br />
    6. Fusce scelerisque diam ac felis pharetra, sit amet viverra ligula sodales.
    <br />
    7. Proin sit amet dolor a arcu varius vulputate. Integer vel elit non nulla efficitur posuere.
    <br />
    8. Nulla facilisi. Cras non diam condimentum, volutpat sapien sed, vestibulum purus.
    <br />
    9. Praesent at lectus ultricies, congue sapien nec, ultricies felis.
    <br />
    10. Duis nec est dapibus, malesuada sapien et, vehicula orci.
    <br />
    11. Morbi ornare nisl nec libero convallis, sit amet luctus felis mollis.
    <br />
    12. Nulla facilisi. Integer in tortor vel mi venenatis fermentum.
    <br />
    13. Donec maximus sapien sed velit dapibus, a consectetur ante condimentum.
    <br />
    14. Fusce a justo ac mi tincidunt ultricies at ut erat.
    <br />
    15. Pellentesque in arcu vitae enim fringilla viverra nec sed neque.
    <br />
    16. Aliquam erat volutpat. Phasellus nec nisi non lorem fringilla posuere.
    <br />
    17. Maecenas suscipit elit sed quam dapibus interdum.
    <br />
    18. Sed sit amet risus et sem auctor fermentum. Cras eget diam vitae orci auctor eleifend.
    <br />
    19. Vivamus vel turpis a lectus dignissim rhoncus ac sed lacus.
    <br />
    20. Integer quis dolor nec elit vehicula commodo.
  </p>
</div>
          {/* Add more dummy instructions as needed */}
        </article>
      </div>
      <div className="flex justify-center">

        <button
          id="next"
          className="p-2 border border-secondary rounded hover:bg-primary text-white"
          onClick={handleNextClick}
        >
          {language} {language&&("|")} Next 
        </button>
      </div>
    </div>
  );
}
