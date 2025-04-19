import React from "react";
import Link from "next/link";
import { socials } from "@/data/socials";
import { GitHubLogoIcon, LinkedInLogoIcon } from "@radix-ui/react-icons";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-10 bg-card/50 border-t">
      <div className="container">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex flex-col items-center md:items-start">
            <Link
              href="/"
              className="text-lg font-semibold tracking-tight hover:text-primary transition-colors"
            >
              Mohamed Soliman
            </Link>
            <p className="text-sm opacity-70">
              Computer Science + Mathematics Student
            </p>
          </div>

          <div className="flex space-x-6 items-center">
            <a
              href={socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full hover:bg-card transition-colors"
              aria-label="GitHub"
            >
              <GitHubLogoIcon className="h-5 w-5" />
            </a>
            <a
              href={socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full hover:bg-card transition-colors"
              aria-label="LinkedIn"
            >
              <LinkedInLogoIcon className="h-5 w-5" />
            </a>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t flex flex-col md:flex-row justify-between items-center gap-4 text-sm opacity-70">
          <p>© {currentYear} Mohamed Soliman. All rights reserved.</p>
          <nav>
            <ul className="flex flex-wrap gap-6">
              <li>
                <Link href="/" className="hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/beyond"
                  className="hover:text-primary transition-colors"
                >
                  Beyond Code
                </Link>
              </li>
              <li>
                <a
                  href="#contact"
                  className="hover:text-primary transition-colors"
                >
                  Contact
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 