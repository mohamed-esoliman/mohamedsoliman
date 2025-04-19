"use client";

import React, { useState, FormEvent } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Button } from "@/components/ui/button";
import { contact } from "@/data/contact";
import { socials } from "@/data/socials";
import { GitHubLogoIcon, LinkedInLogoIcon, EnvelopeClosedIcon, FileTextIcon } from "@radix-ui/react-icons";
import dynamic from 'next/dynamic';

const CalendlyButton = dynamic(
  () => import('react-calendly').then((mod) => {
    const { PopupButton } = mod;
    const CalendlyPopupButton = ({ url }: { url: string }) => (
      <PopupButton
        url={url}
        rootElement={document.body}
        text="📅 Schedule a Call"
        className="inline-flex items-center gap-2 rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
      />
    );
    CalendlyPopupButton.displayName = 'CalendlyPopupButton';
    return CalendlyPopupButton;
  }),
  { ssr: false }
);

const Contact = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formError, setFormError] = useState("");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormError("");

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setIsSubmitted(true);
      setFormState({ name: "", email: "", message: "" });
    } catch (error) {
      setFormError("There was an error sending your message. Please try again.\n\nError: " + error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20">
      <div className="container">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="max-w-4xl mx-auto"
        >
          <motion.div variants={itemVariants} className="mb-12">
            <h2 className="text-3xl font-bold mb-4 text-center">Get In Touch</h2>
            <p className="text-center max-w-xl mx-auto">
              Have a question or want to work together? Fill out the form below or
              reach out through any of my social platforms.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <motion.div variants={itemVariants}>
              {isSubmitted ? (
                <div className="bg-primary/10 rounded-lg p-8 text-center">
                  <h3 className="text-xl font-semibold mb-2">Thank You!</h3>
                  {/* eslint-disable-next-line react/no-unescaped-entities */}
                  <p className="mb-4">Your message has been sent. I'll get back to you as soon as possible.</p>
                  <Button
                    onClick={() => setIsSubmitted(false)}
                    variant="outline"
                  >
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium mb-1"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formState.name}
                      onChange={handleChange}
                      className="w-full p-3 rounded-md border bg-card/50 focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium mb-1"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formState.email}
                      onChange={handleChange}
                      className="w-full p-3 rounded-md border bg-card/50 focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium mb-1"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      required
                      value={formState.message}
                      onChange={handleChange}
                      className="w-full p-3 rounded-md border bg-card/50 focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  {formError && (
                    <p className="text-red-500 text-sm">{formError}</p>
                  )}
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full"
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              )}
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-4">Connect</h3>
                <ul className="space-y-3">
                  <li>
                    <a
                      href={`mailto:${contact.email}`}
                      className="flex items-center gap-3 hover:text-primary transition-colors"
                    >
                      <EnvelopeClosedIcon className="h-5 w-5" />
                      <span>{contact.email}</span>
                    </a>
                  </li>
                  <li>
                    <a
                      href={socials.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 hover:text-primary transition-colors"
                    >
                      <GitHubLogoIcon className="h-5 w-5" />
                      <span>GitHub</span>
                    </a>
                  </li>
                  <li>
                    <a
                      href={socials.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 hover:text-primary transition-colors"
                    >
                      <LinkedInLogoIcon className="h-5 w-5" />
                      <span>LinkedIn</span>
                    </a>
                  </li>
                  <li>
                    <a
                      href={contact.resume}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 hover:text-primary transition-colors"
                    >
                      <FileTextIcon className="h-5 w-5" />
                      <span>Resume</span>
                    </a>
                  </li>
                </ul>
              </div>

              <div className="pt-6">
                <h3 className="text-xl font-semibold mb-4">Schedule a Call</h3>
                <p className="mb-4 text-sm">
                  Prefer to chat directly? Schedule a 15-minute call with me.
                </p>
                <div className="inline-flex items-center">
                  <CalendlyButton url="https://calendly.com/mohamedsoliman/15min" />
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

Contact.displayName = "Contact";

export default Contact; 