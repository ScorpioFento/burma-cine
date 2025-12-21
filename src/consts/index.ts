import { facebook, instagram, telegram } from "../assets";

export type NavItemProps = {
  path: string;
  label: string;
};

export type FooterItemProps = {
  title: string;
  links: string[];
};

export type SocialLinkProps = {
  label: string;
  href: string;
  icon: string;
};

const navItems: NavItemProps[] = [
  { path: "/", label: "Home" },
  { path: "/movies", label: "Movies" },
  { path: "/about", label: "About" },
];

const footerSection: FooterItemProps[] = [
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

const socialLinks: SocialLinkProps[] = [
  {
    label: "Facebook",
    href: "#",
    icon: facebook,
  },
  {
    label: "Instagram",
    href: "#",
    icon: instagram,
  },
  {
    label: "Telegram",
    href: "#",
    icon: telegram,
  },
];


export {
    navItems,
    footerSection,
    socialLinks
}
