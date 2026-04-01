import React from "react";

interface ButtonProps {
  textColor: string;
  bgColor: string;
  text: string;
  start: () => void;
}

const Button: React.FC<ButtonProps> = ({ textColor, bgColor, text, start }) => {
    console.log("Button props:", { textColor, bgColor, text });
  return (
    <button
      className={`w-full ${bgColor} ${textColor} py-2 px-4 rounded-md h-[46px] cursor-pointer`}
      onClick={start}
    >
      {text}
    </button>
  );
};

export default Button;