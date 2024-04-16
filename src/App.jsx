import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./pages/Root";
import Instructions from "./pages/Instructions";
import Contest from "./pages/Contest";
import Login from "./components/Login";
import ThankYou from "./components/ThankYou";
import Error404Page from "./pages/404";
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      errorElement: <Error404Page/>,
      children: [
        { index:true, element: <Login /> },

        { path: "/instructions", element: <Instructions /> },
        { path: "/contest", element: <Contest /> },
        {path:"/thankyou",element:<ThankYou/>}
      ],
    },
    
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
