import { FaFacebook, FaYoutube, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { SiTiktok } from "react-icons/si";

const navigation = {
  solutions: [
    { name: "Marketing", href: "#" },
    { name: "Analytics", href: "#" },
    { name: "Automation", href: "#" },
    { name: "Commerce", href: "#" },
    { name: "Insights", href: "#" },
  ],
  support: [
    { name: "Submit ticket", href: "#" },
    { name: "Documentation", href: "#" },
    { name: "Guides", href: "#" },
    { name: "Cookie Policy", href: "#" },
    { name: "Privacy Policy", href: "#" },
    { name: "Payments, fees and refunds", href: "#" },
    { name: "Shipping methods", href: "#" },
    { name: "Contact us", href: "#" },
  ],
  company: [
    { name: "About", href: "#" },
    { name: "Blog", href: "#" },
    { name: "Legal office", href: "#" },
  ],
  legal: [
    { name: "Terms of service", href: "#" },
    { name: "Privacy policy", href: "#" },
    { name: "License", href: "#" },
  ],
};

export default function Footer() {
  return (
    <footer className="relative z-20 mt-auto w-full border-t border-blue-100 bg-white/95 backdrop-blur">
      <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6">
        <div className="grid gap-8 lg:grid-cols-[1fr_2fr]">
          <div>
            <img alt="CardCorp" src="/MARCO.svg" className="h-12 w-12" />
            <p className="mt-4 text-sm/6 text-gray-600">
              Seguici sui nostri socials
            </p>
            <div className="mt-5 flex flex-wrap gap-4">
              <a
                href="https://x.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 text-blue-700 hover:text-gray-800"
              >
                <span className="sr-only">X</span>
                <FaXTwitter size={24} />
              </a>
              <a
                href="https://www.facebook.com/login"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 text-blue-700 hover:text-gray-800"
              >
                <span className="sr-only">Facebook</span>
                <FaFacebook size={24} />
              </a>
              <a
                href="https://www.youtube.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 text-blue-700 hover:text-gray-800"
              >
                <span className="sr-only">YouTube</span>
                <FaYoutube size={24} />
              </a>
              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 text-blue-700 hover:text-gray-800"
              >
                <span className="sr-only">Instagram</span>
                <FaInstagram size={24} />
              </a>
              <a
                href="https://www.tiktok.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 text-blue-700 hover:text-gray-800"
              >
                <span className="sr-only">TikTok</span>
                <SiTiktok size={24} />
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            <div>
              <div>
                <h3 className="text-sm/6 font-semibold text-blue-700">
                  Solutions
                </h3>
                <ul role="list" className="mt-4 space-y-3">
                  {navigation.solutions.map((item) => (
                    <li key={item.name}>
                      <a
                        href={item.href}
                        className="text-sm/6 text-gray-600 hover:text-gray-900"
                      >
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div>
              <div>
                <h3 className="text-sm/6 font-semibold text-blue-700">
                  Support
                </h3>
                <ul role="list" className="mt-4 space-y-3">
                  {navigation.support.map((item) => (
                    <li key={item.name}>
                      <a
                        href={item.href}
                        className="text-sm/6 text-gray-600 hover:text-gray-900"
                      >
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div>
              <div>
                <h3 className="text-sm/6 font-semibold text-blue-700">
                  Company
                </h3>
                <ul role="list" className="mt-4 space-y-3">
                  {navigation.company.map((item) => (
                    <li key={item.name}>
                      <a
                        href={item.href}
                        className="text-sm/6 text-gray-600 hover:text-gray-900"
                      >
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div>
              <div>
                <h3 className="text-sm/6 font-semibold text-blue-700">Legal</h3>
                <ul role="list" className="mt-4 space-y-3">
                  {navigation.legal.map((item) => (
                    <li key={item.name}>
                      <a
                        href={item.href}
                        className="text-sm/6 text-gray-600 hover:text-gray-900"
                      >
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
