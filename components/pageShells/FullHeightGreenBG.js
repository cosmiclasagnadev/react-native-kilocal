import React from "react";

export const FullHeightGreenBG = ({children}) => {
  return (
    <div className="flex items-center justify-center bg-green-200 text-3xl h-screen">
      {children}
    </div>
  );
};
