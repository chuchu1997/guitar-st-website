"use client"
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer
      className="
        bg-gradient-to-tr from-yellow-400 via-yellow-600 to-amber-900
        text-white
        pt-12 pb-8
        px-6
      "
      aria-label="Site Footer"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12">
        {/* Company Info */}
        <div className="space-y-4">
          <h2 className="text-xl font-extrabold tracking-wide uppercase">WeatherVista</h2>
          <p className="text-yellow-200 max-w-xs">
            Bringing you real-time weather forecasts with style and precision. Stay prepared, stay informed.
          </p>
          <div className="flex space-x-4 mt-4">
            <a
              href="https://twitter.com"
              aria-label="Twitter"
              className="hover:text-yellow-300 transition-colors duration-300"
            >
              <span className="material-icons" aria-hidden="true" style={{ fontSize: 28 }}>
                twitter
              </span>
            </a>
            <a
              href="https://facebook.com"
              aria-label="Facebook"
              className="hover:text-yellow-300 transition-colors duration-300"
            >
              <span className="material-icons" aria-hidden="true" style={{ fontSize: 28 }}>
                facebook
              </span>
            </a>
            <a
              href="https://instagram.com"
              aria-label="Instagram"
              className="hover:text-yellow-300 transition-colors duration-300"
            >
              <span className="material-icons" aria-hidden="true" style={{ fontSize: 28 }}>
                instagram
              </span>
            </a>
            <a
              href="https://linkedin.com"
              aria-label="LinkedIn"
              className="hover:text-yellow-300 transition-colors duration-300"
            >
              <span className="material-icons" aria-hidden="true" style={{ fontSize: 28 }}>
                linkedin
              </span>
            </a>
          </div>
        </div>

        {/* Navigation Links */}
        <nav aria-label="Footer Navigation" className="space-y-4">
          <h2 className="text-lg font-semibold tracking-wide uppercase text-yellow-200">Explore</h2>
          <ul className="space-y-2">
            <li>
              <a
                href="/about"
                className="hover:text-yellow-300 transition-colors duration-300"
              >
                About Us
              </a>
            </li>
            <li>
              <a
                href="/blog"
                className="hover:text-yellow-300 transition-colors duration-300"
              >
                Blog
              </a>
            </li>
            <li>
              <a
                href="/careers"
                className="hover:text-yellow-300 transition-colors duration-300"
              >
                Careers
              </a>
            </li>
            <li>
              <a
                href="/contact"
                className="hover:text-yellow-300 transition-colors duration-300"
              >
                Contact
              </a>
            </li>
          </ul>
        </nav>

        {/* Resources Links */}
        <nav aria-label="Footer Resources" className="space-y-4">
          <h2 className="text-lg font-semibold tracking-wide uppercase text-yellow-200">Resources</h2>
          <ul className="space-y-2">
            <li>
              <a
                href="/help-center"
                className="hover:text-yellow-300 transition-colors duration-300"
              >
                Help Center
              </a>
            </li>
            <li>
              <a
                href="/privacy-policy"
                className="hover:text-yellow-300 transition-colors duration-300"
              >
                Privacy Policy
              </a>
            </li>
            <li>
              <a
                href="/terms-of-service"
                className="hover:text-yellow-300 transition-colors duration-300"
              >
                Terms of Service
              </a>
            </li>
            <li>
              <a
                href="/status"
                className="hover:text-yellow-300 transition-colors duration-300"
              >
                System Status
              </a>
            </li>
          </ul>
        </nav>

        {/* Contact and Newsletter */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold tracking-wide uppercase text-yellow-200">
            Contact & More
          </h2>
          <address className="not-italic space-y-1 text-yellow-100">
            <p>123 Weather Lane</p>
            <p>Sunnyville, CA 90210</p>
            <p>Phone: <a href="tel:+1234567890" className="hover:text-yellow-300">+1 (234) 567-890</a></p>
            <p>Email: <a href="mailto:support@weathervista.com" className="hover:text-yellow-300">support@weathervista.com</a></p>
          </address>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex flex-col space-y-3"
            aria-label="Newsletter subscription form"
          >
            <label htmlFor="email" className="sr-only">
              Email address
            </label>
            <input
              id="email"
              type="email"
              placeholder="Subscribe to our newsletter"
              required
              className="
                px-3 py-2 rounded-md text-black focus:outline-none
                focus:ring-2 focus:ring-yellow-400 focus:ring-offset-1
                placeholder-yellow-600
              "
            />
            <button
              type="submit"
              className="
                bg-yellow-500 hover:bg-yellow-600 text-black font-semibold
                py-2 rounded-md transition-colors duration-300
                focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-1
              "
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Footer Bottom Bar */}
      <div
        className="mt-12 border-t border-yellow-700 pt-6 text-yellow-300 text-sm text-center select-none"
        aria-label="Footer copyright"
      >
        &copy; {new Date().getFullYear()} WeatherVista, Inc. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;

