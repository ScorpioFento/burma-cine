"use client";
import React from "react";

type ButtonProps = {
  onClick?: () => void;
  className?: string;
  children: React.ReactNode;
};

export default function Button({
  onClick,
  className = "",
  children,
}: ButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`hover:bg-primary ${className}`}
    >
      {children}
    </button>
  );
}





