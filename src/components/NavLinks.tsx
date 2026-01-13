import { useRef } from "react";
import { NavLink } from "react-router-dom";
import { navItems } from "../consts";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

type NavProps = {
  onClick?: () => void;
  className?: string;
  isMobile?: boolean;
  open?: boolean;
};

export default function NavLinks({
  onClick,
  className,
  isMobile = false,
  open,
}: NavProps) {
  const listRef = useRef<HTMLUListElement>(null);

  useGSAP(
    () => {
      if (isMobile && !open) return;
      const animation = isMobile
        ? {
            x: -40,
            y: 0,
            stagger: 0.15,
            duration: 0.5,
            ease: "power3.out",
          }
        : {
            x: 0,
            y: -10,
            stagger: 0.2,
            duration: 0.8,
            ease: "back.out(1.2)",
          };

      gsap.from(".nav-item", {
        ...animation,
        opacity: 0,
      });
    },
    {
      scope: listRef,
      dependencies: isMobile ? [open] : [],
      revertOnUpdate: true,
    }
  );

  return (
    <ul ref={listRef} className={`gap-4 ${className}`}>
      {navItems.map((i) => (
        <li key={i.path} className="nav-item">
          <NavLink
            to={i.path}
            onClick={onClick}
            className={({ isActive }) =>
              isActive ? "flex-col-center menu-active-gradient" : ""
            }
          >
            {i.label}
          </NavLink>
        </li>
      ))}
    </ul>
  );
}
