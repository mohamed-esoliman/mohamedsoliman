"use client";

import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { bio, timeline } from "@/data/about";

const About = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

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

  return (
    <section id="about" className="py-20 bg-card/30">
      <div className="container">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="max-w-4xl mx-auto"
        >
          <motion.div variants={itemVariants}>
            <h2 className="text-3xl font-bold mb-8 text-center">About Me</h2>
          </motion.div>

          <motion.div variants={itemVariants} className="mb-12">
            <p className="text-lg leading-relaxed text-center">{bio.intro}</p>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h3 className="text-xl font-semibold mb-6 text-center">My Journey</h3>
          </motion.div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-primary/30" />

            {/* Timeline items */}
            {timeline.map((item, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className={`flex mb-8 relative ${
                  index % 2 === 0 ? "md:flex-row-reverse" : ""
                }`}
              >
                <div className="flex-1" />
                <div className="absolute left-1/2 transform -translate-x-1/2 -mt-1 w-4 h-4 rounded-full bg-primary z-10" />
                <div
                  className={`flex-1 ${
                    index % 2 === 0 ? "md:text-right md:pr-8" : "md:pl-8"
                  }`}
                >
                  <div
                    className={`bg-card p-4 rounded-lg shadow-sm border-l-4 border-primary md:border-l-0 ${
                      index % 2 === 0 ? "md:border-r-4" : "md:border-l-4"
                    }`}
                  >
                    <span className="text-primary font-medium block mb-1">
                      {item.date}
                    </span>
                    <h4 className="font-semibold">{item.title}</h4>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About; 