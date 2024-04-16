import { useEffect } from "react";
import { useGlobalState } from "../components/GlobalStateProvider";
import { useNavigate } from "react-router-dom";

export default function ThankYou() {
  const { setGlobalState } = useGlobalState();
  const navigate = useNavigate();

  useEffect(() => {
    // Set global state to null after 5 seconds
    const timeout = setTimeout(() => {
      setGlobalState({
        username: '', // Initialize with default values
        contestId: '',
        mobilenum: '',
        language:''
      });
      // Redirect to '/'
      navigate("/");
    }, 3000);

    // Cleanup function to clear the timeout if the component unmounts
    return () => clearTimeout(timeout);
  }, [setGlobalState, navigate]);

  return (
    <div className="w-full h-full flex justify-center items-center">
      <span className="text-lg text-center text-white font-bold">
        Thanks for participating. Your response is recorded. 😊👍
      </span>{" "}
    </div>
  );
}
