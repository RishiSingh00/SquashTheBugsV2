  import { useState, useRef, useEffect } from "react";
  import { useNavigate } from "react-router-dom";
  import { getDatabase, ref, get, set } from "firebase/database";
  import { useGlobalState } from "./GlobalStateProvider";

  export default function Login() {
    const { globalState, setGlobalState } = useGlobalState();

    const [nameError, setNameError] = useState(false);
    const [mobileError, setMobileError] = useState(false);
    const [codeError, setCodeError] = useState(false);
    const nameRef = useRef(null);
    const contactNumberRef = useRef(null);
    const contestCodeRef = useRef(null);
    const navigateTo = useNavigate();

    const handleInputChange = (inputRef, errorSetter) => {
      if (inputRef.current.value.trim()) {
        errorSetter(false); // No error if input is not empty
      } else {
        errorSetter(true); // Error if input is empty
      }
    };

    const handleMobileChange = (inputRef, errorSetter) => {
      if (inputRef.current.value.length === 10) {
        errorSetter(false); // No error if mobile number is 10 digits
      } else {
        errorSetter(true); // Error if mobile number is not 10 digits
      }
    };

    const handleNextClick =  () => {
      const name = nameRef.current.value;
      const contactNumber = contactNumberRef.current.value;
      const contestCode = contestCodeRef.current.value;

      // Validate Name
      handleInputChange(nameRef, setNameError);

      // Validate Mobile Number
      handleMobileChange(contactNumberRef, setMobileError);

      // Validate Contest Code
      handleInputChange(contestCodeRef, setCodeError);

      // Proceed only if all fields are filled and there are no errors
      if (
        name &&
        contactNumber &&
        contestCode &&
        !nameError &&
        !mobileError &&
        !codeError
      ) {
        const db = getDatabase();

        // Check if the contest ID exists in the database
        const contestRef = ref(db, `Contest/${contestCode}`);
        get(contestRef)
          .then((snapshot) => {
            if (snapshot.exists()) {
              // Data to be saved in Firebase
              const userData = {
                name: name,
                questions: [], // Initially empty, to be populated later
              };

              // Path to store user data
              const userRef = ref(db, `Users/${contestCode}/${contactNumber}`);

              // Save user data to Firebase
              set(userRef, userData)
                .then(() => {
                  // Update global state after data is successfully saved to Firebase
                  setGlobalState((prevState) => ({
                    ...prevState,
                    username: name,
                    contestId: contestCode,
                    mobilenum: contactNumber,
                  }));

                  // Navigate to '/instructions' after data is successfully saved and global state is updated
                  navigateTo("/instructions");
                })
                .catch((error) => {
                  // Handle any errors that occur during saving to Firebase
                  console.error("Error saving data to Firebase:", error);
                });
            } else {
              console.error("Contest ID does not exist.");
              setCodeError(true);
              // Handle the case where the contest ID does not exist
              // For example, you can show an error message to the user
            }
          })
          .catch((error) => {
            // Handle any errors that occur while checking the contest ID
            console.error("Error checking contest ID:", error);
          });
      }
    };

    return (
      <div className="flex justify-center items-center h-[85%]">
        <div className="flex bg-primary rounded border border-secondary  w-96 h-50">
          <div className="w-3/4 p-6">
            <input
              type="text"
              className={`p-2 mb-5 rounded border ${
                nameError
                  ? "border-red  focus:border-red"
                  : "border-secondary focus:border-indigo-500"
              } bg-primary text-white placeholder-grey focus:outline-none  block w-60`}
              placeholder="Name"
              ref={nameRef}
              onChange={() => handleInputChange(nameRef, setNameError)}
            />
            <input
              type="tel"
              className={`p-2 mb-5 rounded border ${
                mobileError
                  ? "border-red focus:border-red"
                  : "border-secondary focus:border-indigo-500"
              } bg-primary text-white placeholder-grey focus:outline-none   block w-60`}
              placeholder="Contact Number"
              ref={contactNumberRef}
              onChange={() =>
                handleMobileChange(contactNumberRef, setMobileError)
              }
            />
            <input
              type="text"
              className={`p-2 rounded border ${
                codeError
                  ? "border-red focus:border-red"
                  : "border-secondary focus:border-indigo-500"
              } bg-primary text-white placeholder-grey focus:outline-none   block w-60`}
              placeholder="Contest Code"
              ref={contestCodeRef}
              onChange={() => handleInputChange(contestCodeRef, setCodeError)}
            />
          </div>
          <div
            className="w-1/4 rounded-r bg-green flex justify-center items-center hover:bg-[#004F24]"
            onClick={handleNextClick}
          >
            <span className="text-white text-lg font-semibold">NEXT</span>
          </div>
        </div>
      </div>
    );
  }
