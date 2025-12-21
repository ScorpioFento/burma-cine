export type NavItemProps = {
  path: string;
  label: string;
};

export type FooterItemProps = {
  title: string;
  links: string[];
};

export const navItems: NavItemProps[] = [
  { path: "/", label: "Home" },
  { path: "/movies", label: "Movies" },
  { path: "/about", label: "About" },
];

export const footerSection: FooterItemProps[] = [
  {
    title: "Services",
    links: ["Branding", "Design", "Marketing", "Advertisement"],
  },
  {
    title: "Company",
    links: ["About us", "Contact", "Jobs", "Press kit"],
  },
  {
    title: "Legal",
    links: ["Terms of use", "Privacy policy", "Cookie policy"],
  },
];
