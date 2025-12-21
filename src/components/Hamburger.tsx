type HamburgerProps = {
  open: boolean;
  setOpen: (value: boolean) => void;
};

export default function Hamburger({ open, setOpen }: HamburgerProps) {
  return (
    <button
      onClick={() => setOpen(!open)}
      className="flex flex-col justify-between w-8 h-6 md:hidden"
    >
   
      <span
        className={`
          h-1 my-0.5 rounded-md bg-white transition-all duration-300 ease-in-out
          ${open ? "w-7 rotate-45 translate-y-2" : "w-7"}
        `}
      />

     
      <span
        className={`
          h-1 my-0.5 rounded-md bg-white transition-all duration-500 ease-in-out
          ${open ? "w-7 opacity-0" : "w-5"}
        `}
      />

     
      <span
        className={`
          h-1 my-0.5 rounded-md bg-white transition-all duration-300 ease-in-out
          ${open ? "w-7 -rotate-45 -translate-y-2" : "w-4"}
        `}
      />
    </button>
  );
}
