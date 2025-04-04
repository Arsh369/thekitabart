import React from 'react'
import footerLogo  from "../assets/thekitabart.jpg"

import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa"

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-10 px-4">
      {/* Top Section */}
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        {/* Left Side - Logo and Nav */}
        <div className="md:w-1/2 w-full">
          <img src={footerLogo} alt="Logo" className="mb-5 w-36 ml-[1/2] rounded-full" />
          <p className="mb-4">
            Your trusted source for books and reading. Discover a world of knowledge and inspiration with The Kitab Art.
          </p>
          <p>Owner: Maninder Singh</p>
          <p>Address: SHOP NO 8 Kahlon complex behind mehta sweets gali no 1 opposite punjabi university patiala 147002
          </p>
          <p>WhatsApp: 9780909697</p>
          <p>Email: Thekitabart@gmail.com</p>
        </div>

        {/* Right Side - Newsletter */}
        {/* <div className="md:w-1/2 w-full">
          <p className="mb-4">
            Subscribe to our newsletter to receive the latest updates, news, and offers!
          </p>
          <div className="flex">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 rounded-l-md text-black"
            />
            <button className="bg-primary px-6 py-2 rounded-r-md hover:bg-primary-dark">
              Subscribe
            </button>
          </div>
        </div> */}
      </div>

      {/* Bottom Section */}
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center mt-10 border-t border-gray-700 pt-6">
        {/* Left Side - Privacy Links */}
        <ul className="flex gap-6 mb-4 md:mb-0">
          <li><a href="#privacy" className="hover:text-primary">Privacy Policy</a></li>
          <li><a href="#terms" className="hover:text-primary">Terms of Service</a></li>
        </ul>

        {/* Right Side - Social Icons */}
        <div className="flex gap-6">
          <a href="https://www.facebook.com/share/1BDYtMaZxG/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" className="hover:text-primary">
            <FaFacebook size={24} />
          </a>
          {/* <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary">
            <FaTwitter size={24} />
          </a> */}
          <a href="https://www.instagram.com/book_a_kitab?igsh=MWo3c3pzNzVuNHQxMg%3D%3D&utm_source=qr" target="_blank" rel="noopener noreferrer" className="hover:text-primary">
            <FaInstagram size={24} />
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer