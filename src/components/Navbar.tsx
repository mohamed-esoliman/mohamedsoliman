"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useTheme } from "@/hooks/useTheme";
import { useScrollspy } from "@/hooks/useScrollspy";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { MoonIcon, SunIcon, HamburgerMenuIcon, Cross1Icon, CalendarIcon } from "@radix-ui/react-icons";

const navItems = [
  { name: "Home", href: "#hero" },
  { name: "About", href: "#about" },
  { name: "Experience", href: "#experience" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
  { name: "Beyond Code", href: "/under-construction" },
];

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const activeId = useScrollspy(
    navItems.map((item) => item?.href || ''),
    { offset: 200 }
  );

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "py-4 bg-background/80 backdrop-blur-md shadow-sm"
          : "py-6 bg-transparent"
      )}
    >
      <div className="container flex items-center justify-between">
        <Link
          href="/"
          className="text-xl font-bold tracking-tight hover:text-primary transition-colors"
        >
          Mohamed Soliman
        </Link>

        <div className="md:hidden flex items-center space-x-4">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
            aria-label="Toggle theme"
          >
            {theme === "light" ? <MoonIcon /> : <SunIcon />}
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <Cross1Icon /> : <HamburgerMenuIcon />}
          </button>
        </div>

        <nav className="hidden md:flex items-center space-x-1">
          <ul className="flex space-x-1">
            {navItems.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={cn(
                    "px-3 py-2 rounded-md text-sm font-medium transition-colors relative",
                    activeId === item.href.substring(1)
                      ? "text-primary"
                      : "hover:text-primary"
                  )}
                >
                  {item.name}
                  {activeId === item.href.substring(1) && (
                    <motion.span
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                      layoutId="navbar-indicator"
                      transition={{ type: "spring", duration: 0.6 }}
                    />
                  )}
                </Link>
              </li>
            ))}
          </ul>
          <button
            onClick={toggleTheme}
            className="ml-4 p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
            aria-label="Toggle theme"
          >
            {theme === "light" ? <MoonIcon /> : <SunIcon />}
          </button>
          <a
            href="https://calendly.com/mohamedsoliman"
            target="_blank"
            rel="noopener noreferrer"
            className="ml-4 px-4 py-2 rounded-md bg-primary text-white hover:bg-primary/90 transition-colors inline-flex items-center"
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            Schedule Meeting
          </a>
        </nav>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2 }}
          className="md:hidden absolute top-full left-0 right-0 bg-background/95 backdrop-blur-md shadow-md p-4"
        >
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={cn(
                    "block px-4 py-2 rounded-md text-sm font-medium transition-colors",
                    activeId === item.href.substring(1)
                      ? "bg-primary/10 text-primary"
                      : "hover:bg-primary/5 hover:text-primary"
                  )}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              </li>
            ))}
            <li>
              <a
                href="https://calendly.com/mohamedsoliman"
                target="_blank"
                rel="noopener noreferrer"
                className="block px-4 py-2 rounded-md text-sm font-medium bg-primary text-white hover:bg-primary/90 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Schedule Meeting
              </a>
            </li>
          </ul>
        </motion.div>
      )}
    </header>
  );
};

export default Navbar; 