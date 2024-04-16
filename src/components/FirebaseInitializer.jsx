import React, { useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';

const FirebaseInitializer = () => {
  useEffect(() => {
    // Your web app's Firebase configuration
    const firebaseConfig = {
        apiKey: "AIzaSyBsMMUKgzz3qlcrZUPUTDTKDmw1LDxqrec",
        authDomain: "squashthebugs-d35e1.firebaseapp.com",
        projectId: "squashthebugs-d35e1",
        storageBucket: "squashthebugs-d35e1.appspot.com",
        messagingSenderId: "582736515873",
        appId: "1:582736515873:web:d8d939e03bdac7c4a86460",
        measurementId: "G-KPX7CH671V"
    };

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const analytics = getAnalytics(app);

    // Clean up function
    return () => {
      // Clean up Firebase resources if needed
    };
  }, []); // Empty dependency array ensures the effect runs only once on mount

  return null; // This component doesn't render anything
};

export default FirebaseInitializer;
