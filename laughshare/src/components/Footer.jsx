import React from "react";
import { FaGithub } from "react-icons/fa";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-yellow-100 text-center py-4 mt-8 border-t">
      <p className="text-sm text-gray-600 mb-2">
        © {currentYear} LaughShare. All rights reserved.
      </p>
      <a
        href="https://github.com/james-paul25"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center text-gray-700 hover:text-black transition"
      >
        <FaGithub className="mr-1 w-5 h-5" />
        <span>View my GitHub</span>
      </a>
    </footer>
  );
}
