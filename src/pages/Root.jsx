import { Outlet } from "react-router-dom";
import { useState } from "react";

import Navbar from "../components/Navbar";
// import Login from "../components/Login"
import Instructions from "../pages/Instructions";
import Login from "../components/Login";
import CursorEffect from "../components/CursorEffect";

export default function RootLayout() {
  
  return (
      <div  className="  w-[100%] h-screen ">
        <Navbar />
        <div className="h-screen bg-primary relative">
            <div className="absolute inset-0 z-0 overflow-hidden">
            <CursorEffect/>
            </div>
            <div className="absolute inset-0 z-10">
                
          <Outlet/>
            </div>
        </div>
      </div>
    
  );
}
