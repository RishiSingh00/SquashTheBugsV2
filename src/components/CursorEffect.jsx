import React, { useEffect } from "react";

const CursorEffect = () => {
  useEffect(() => {
    const cursor = document.querySelector('.blob');

    document.addEventListener('mousemove', function(e){
      cursor.style.transform = `translate3d(calc(${e.clientX}px - 90%), calc(${e.clientY}px - 50%), 0)`
    });

    return () => {
      // Cleanup function to remove event listener
      document.removeEventListener('mousemove', null);
    };
  }, []);

  return (
    <div className="absolute inset-0 flex  justify-center items-center pointer-events-none z-0">
      <div className="blob transform translate-x-[-50%] translate-y-[-50%]  w-[900px] h-[900px] bg-gradient-to-tr from-[#093028] from-20% to-[#237A57] filter blur-[400px] transition-all ease-out duration-450  "></div>
    </div>
  );
};

export default CursorEffect;
