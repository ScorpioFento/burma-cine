import React, { forwardRef } from "react";

type ButtonProps = {
  onClick?: () => void;
  className?: string;
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ onClick, className = "", children, type = "button" }, ref) => {
    return (
      <button
        ref={ref}
        type={type}
        onClick={onClick}
        className={`btn ${className}`}
      >
        {children}
      </button>
    );
  }
);

export default Button;
