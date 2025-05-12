import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export default function Button({ children, className = "", ...props }: ButtonProps) {
  return (
    <button
      className={`bg-[#64D61D] hover:bg-[#53b81a] text-white font-bold py-3 px-8 rounded-full shadow-lg text-lg transition ${className}`}
      {...props}
    >
      {children}
    </button>
  );
} 