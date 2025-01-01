'use client';
import { useEffect } from 'react';
import { gsap } from 'gsap';

const Footer = () => {

  useEffect(() => {
    gsap.from(".footer-content", {
      opacity: 0,
      y: 20,
      duration: 1,
      stagger: 0.2,
      ease: "power4.out",
    });
  }, []);

  return (
    <footer className="bg-gray-800 text-white py-12">
      <div className="container mx-auto px-6 w-[90%]">
        <div className="footer-content flex flex-wrap md:flex-row w-full justify-between items-start gap-8">
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold">TaxWise</h3>
            <p className="text-sm">
              Your trusted partner in investment strategies,<br /> offering expert guidance for financial growth.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-gray-400">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="hover:text-gray-400">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="hover:text-gray-400">
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
          </div>

          <div className="space-y-6">
            <h4 className="font-semibold">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="/" className="hover:text-gray-400">About Us</a></li>
              <li><a href="/" className="hover:text-gray-400">Services</a></li>
              <li><a href="/" className="hover:text-gray-400">Contact</a></li>
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="font-semibold">Newsletter</h4>
            <p className="text-sm">
              Stay updated with our latest financial tips and strategies.
            </p>
            <form className="flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-2 w-full rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-r-md hover:bg-blue-600 focus:outline-none"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="mt-12 text-center text-sm">
          <p>&copy; 2024 DevDeities. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;