import { footerSection, socialLinks } from "../../consts";

export default function Footer() {
  return (
    <footer className="footer bg-footer">
      <div className="container mx-auto p-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          <section className="lg:col-span-2 lg:pr-10">
            <header>
              <h3>
                <span className="footer-typo-logo">Burma</span>{" "}
                <span className="footer-typo-logo">Cine</span>
              </h3>
            </header>
            <p className="mt-6 text-[0.875rem]">
              Your premier destination for cinematic excellence. Bringing you
              the best of Burmese cinema with unparalleled quality and service.
            </p>

            <nav className="mt-6">
              <div className="flex gap-4">
                {socialLinks.map((i) => (
                  <a
                    key={i.label}
                    href={i.href}
                    className="btn btn-ghost btn-circle w-12 h-12 media-bg hover:text-primary-content transition-colors"
                  >
                    <img
                      src={i.icon}
                      alt={i.label}
                      className="w-5 h-5 object-cover invert"
                    />
                  </a>
                ))}
              </div>
            </nav>
          </section>

          {footerSection.map((i) => (
            <section key={i.title}>
              <header>
                <h4 className="footer-title">{i.title}</h4>
              </header>
              <nav className="mt-4">
                <ul className="space-y-2">
                  {i.links.map((l) => (
                    <li key={l}>
                      <a
                        href="#"
                        className="group relative py-1 transition-colors duration-300 hover:text-primary-co"
                      >
                        <span className="relative">{l}</span>
                        <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-primary-co group-hover:w-full group-hover:left-0 transition-all duration-300 ease-out"></span>
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </section>
          ))}
        </div>

        <div className="text-center w-full mt-4">
          <div className="w-full h-0.5 bg-linear-to-r from-transparent via-primary-co/70 to-transparent" />
          <p className="mt-4">
            © {new Date().getFullYear()} Burma Cine. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
