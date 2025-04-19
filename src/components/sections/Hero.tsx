import React from "react";
import Image from "next/image";
import * as motion from "motion/react-client"
import { Button } from "@/components/ui/button";
import { socials } from "@/data/socials";
import { GitHubLogoIcon, LinkedInLogoIcon } from "@radix-ui/react-icons";

const Hero = () => {
  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center pt-20 pb-16"
    >
      <div className="container grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col space-y-6"
        >
          <div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-2">
                Mohamed Soliman
              </h1>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h2 className="text-2xl md:text-3xl text-primary font-medium mb-6">
                CS + Math Student
              </h2>
            </motion.div>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-lg max-w-md opacity-90"
            >
              Making ideas real through code, curiosity, and a little bit of chaos.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex space-x-4"
          >
            <Button asChild size="lg">
              <a href="#projects">View Projects</a>
            </Button>
            <Button asChild variant="outline" size="lg">
              <a href="#contact">Get in Touch</a>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex space-x-4 pt-4"
          >
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
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="relative w-full h-[400px] md:h-[500px] mx-auto order-first md:order-last"
        >
          <div className="absolute w-full h-full rounded-xl overflow-hidden bg-gradient-to-br from-primary/10 to-accent/10">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(var(--foreground-rgb),0.15),transparent_70%)]" />
          </div>
          <div className="relative z-10 w-full h-full flex items-center justify-center">
            <Image
              src="/images/profile.jpg"
              alt="Mohamed Soliman"
              width={400}
              height={400}
              className="rounded-xl shadow-xl"
              priority
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero; 