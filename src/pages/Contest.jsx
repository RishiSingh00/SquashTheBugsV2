import { ClockIcon } from "@heroicons/react/24/outline";
import { useState, useEffect } from "react";
import CodeEditor from "../components/CodeEditor";
import { onValue, ref, getDatabase, off, get,set } from "firebase/database";
import { useGlobalState } from "../components/GlobalStateProvider";
import { useNavigate } from "react-router-dom";
export default function Contest() {
  const [questions, setQuestions] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const { globalState } = useGlobalState();
  const [timer, setTimer] = useState(null); // Timer duration in seconds
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const db = getDatabase();
    const language = globalState.language;
    const contestId = globalState.contestId;  
  
    const questionsRef = ref(db, `Contest/${contestId}/${language}/Questions`);
    get(questionsRef)
      .then((snapshot) => {
        const data = snapshot.val();
        if (data) {
          setQuestions(data);
          console.log("Questions fetched successfully");
        }
      })
      .catch((error) => {
        console.error("Error fetching questions:", error);
      });

      const timerRef = ref(db, `Contest/${contestId}/timer`);

      // Fetch the timer value once when the component mounts
      get(timerRef)
        .then((snapshot) => {
          const timerValue = snapshot.val();
          if (timerValue) {
            setTimer(timerValue*60); // Update the timer state with the fetched value
            console.log("Timer fetched successfully:", timerValue);
          }
        })
        .catch((error) => {
          console.error("Error fetching timer:", error);
        });

  }, [globalState.contestId, globalState.language]); // Only fetch questions when these dependencies change
  
  // Timer to auto-submit
  useEffect(() => {
    const interval = setInterval(() => {
      if (timer > 0 && !isSubmitting) {
        setTimer((prevTimer) => prevTimer - 1);
      } else if (timer === 0 && !isSubmitting)  {
        // Auto-submit when timer reaches zero
        
        handleAutoSubmit();
      }
    }, 1000); // 1000 milliseconds = 1 second
  
    // Clean up function to remove the interval when component unmounts
    return () => {
      clearInterval(interval);
    };
  }, [timer, isSubmitting]);
  

  const handleNumberClick = (index) => {
    setActiveIndex(index);
  };

  const handleAutoSubmit = () => {
    setIsSubmitting(true);
    // Call function to store data in Firebase
    submitDataToFirebase();
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    // Call function to store data in Firebase
    submitDataToFirebase();
  };

  const submitDataToFirebase = () => {
    const db = getDatabase();
    const contestId = globalState.contestId;
    const mobileNumber = globalState.mobilenum;
  
    // Map questions array to the desired format
   // Map questions array to the desired format
const formattedQuestions = questions.map((question) => {
  if (question && question.code) {
    return {
      name: question.name,
      code: question.code.replace(/\n/g, '\\n'),
      // Add other properties if needed
    };
  } else {
    return null; // Return null for undefined or null values
  }
}).filter(Boolean); // Filter out null values from the mapped array

  
    // const data = {
    //   Question: formattedQuestions,
    //   // Add other data as needed
    // };
  
    set(ref(db, `Users/${contestId}/${mobileNumber}/Questions`), formattedQuestions)
      .then(() => {
        console.log("Data submitted successfully");
        setIsSubmitting(true);
        setQuestions([]);
        navigate('/thankyou');
      })
      .catch((error) => {
        console.error("Error submitting data:", error);
      });
  };

  
   // Convert timer to hours and minutes
   const hours = Math.floor(timer / 3600);
   const minutes = Math.floor((timer % 3600) / 60);
   const sec = timer%60;

  return (
    <div className="h-full w-full flex bg-primary">
      <div className="w-[6%] h-full flex items-center justify-between border-b  border-secondary p-2   ">
        <div className=" h-full w-full flex items-center  bg-boxbg rounded border border-secondary py-4 flex-col overflow-auto space-y-2  scrollbar-thin scrollbar-thumb-custom scrollbar-thumb-primary  scrollbar-track-secondary">
          {/* Number buttons */}
          {questions.map((_, index) => (
            <button
              key={index+1}
              className={`px-2 py-2 rounded ${activeIndex === index ? "bg-blue-500 text-white" : "text-white"}`}
              onClick={() => handleNumberClick(index)}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>

      <div className="w-[95%]  h-full  p-2  flex flex-col ">
        <div className="h-14  flex flex-row  w-full mb-2    overflow-auto scrollbar-thin scrollbar-thumb-custom scrollbar-thumb-primary  scrollbar-track-secondary">
          <pre className="text-wrap p-2 bg-boxbg rounded border border-secondary text-white  w-[80%]">
            Que {activeIndex + 1}. {questions[activeIndex]?.name}
          </pre>
          <div className="flex items-center justify-center ml-2  p-2 bg-boxbg rounded border border-secondary text-white  w-[10%]">
            <div>
              <ClockIcon className="h-6 w-6 text-white" />
            </div>
            <div className="text-white ml-1 text-lg">{hours}:{minutes < 10 ? `0${minutes}` : minutes}:{sec < 10 ? `0${sec}` : sec}</div>
          </div>
          <button
            className="flex items-center justify-center ml-2  p-2 bg-boxbg rounded border border-secondary text-white hover:bg-primary w-[10%]"
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            Submit
          </button>
        </div>

        <div className="bg-boxbg rounded border border-secondary h-full w-full overflow-auto scrollbar-thin scrollbar-thumb-custom scrollbar-thumb-primary  scrollbar-track-secondary">
          <CodeEditor code={(questions[activeIndex]?.code || '').replace(/\\n/g, '\n')}
                     updateQuestion={setQuestions} // Pass the callback function
                     currIndex={activeIndex}

          />
        </div>
      </div>
    </div>
  );
}
