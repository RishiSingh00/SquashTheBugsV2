import Avatar from "boring-avatars";
import { useEffect, useState } from "react";
import { getDatabase, ref, off, onValue } from "firebase/database";
import { useGlobalState } from "./GlobalStateProvider";

export default function Lobby() {
  const [users, setUsers] = useState([]);
  const { globalState } = useGlobalState();

  useEffect(() => {
    let contestUsersRef;
  
    const db = getDatabase();
    const contestId = globalState.contestId;
  
    if (contestId) {
      contestUsersRef = ref(db, `Users/${contestId}`);
  
      const unsubscribe = onValue(contestUsersRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          setUsers(data);
        }
      });
  
      return () => {
        // Detach the listener when the component unmounts or contestId becomes falsy
        // if (contestUsersRef) {
        //   off(unsubscribe);
        // }
      };
    } else {
      // Detach the listener when contestId becomes falsy
      setUsers([]);
    }
  }, [globalState.contestId]);
  

  return (
    <div className="h-full w-full flex-col rounded p-2 flex bg-boxbg border border-secondary ">
      <div className="space-y-2 w-full p-2 overflow-auto scrollbar-thin scrollbar-thumb-custom scrollbar-thumb-primary scrollbar-track-secondary">
        {Object.entries(users).map(([mobileNumber, userData]) => (
          <LobbyItem key={mobileNumber} name={userData.name} />
        ))}
      </div>
      <div className="p-2">
        <p className="text-white">
          🤩{Object.keys(users).length} players joined...
        </p>
      </div>
      {/* Other content */}
    </div>
  );
}

function LobbyItem({ name }) {
  const getRandomVariant = () => {
    const words = ["marble", "beam", "pixel", "sunset", "ring", "bauhaus"];
    const randomIndex = Math.floor(Math.random() * words.length);
    return words[randomIndex];
  };

  return (
    <div className="w-full h-12 bg-primary rounded-full flex items-center">
      <div className="overflow-hidden rounded-full w-8 h-8 ml-2 mr-2  ">
        <Avatar
          size={30}
          name={name}
          variant={getRandomVariant()}
          colors={["#264653", "#2a9d8f", "#e9c46a", "#f4a261", "#e76f51"]}
        />
        ;
      </div>
      <div className="text-white">{name}</div>
    </div>
  );
}
