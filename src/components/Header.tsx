import { useEffect, useRef, useState } from "react";
import Hamburger from "./Hamburger";
import NavLinks from "./NavLinks";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export default function Header() {
  const [open, setOpen] = useState<boolean>(false);
  const headerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (headerRef.current) {
      gsap.from(headerRef.current, {
        y: -100,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });
    }
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <header ref={headerRef}>
      <div
        className={`md:hidden transition-all duration-700 overflow-hidden bg-[#0f0f17]
    ${open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}
      >
        <div className="container mx-auto px-5">
          <NavLinks
            onClick={() => setOpen(false)}
            className="menu"
            isMobile
            open={open}
          />
        </div>
      </div>
      <nav className="container navbar mx-auto px-10">
        <div className="navbar-start gap-4">
          <Hamburger open={open} setOpen={setOpen} />
          <a href="/" className="text-xl font-bold">
            Logo
          </a>
        </div>

        <div className="navbar-center hidden md:flex">
          <NavLinks className="menu menu-horizontal space-x-4" />
        </div>

        <div className="navbar-end">
          <button className="btn btn-md">Sign in</button>
        </div>
      </nav>
    </header>
  );
}
