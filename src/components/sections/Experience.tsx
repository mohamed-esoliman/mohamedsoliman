"use client";

import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Image from "next/image";
import { experience } from "@/data/experience";

const Experience = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
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
    <section id="experience" className="py-20">
      <div className="container">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="max-w-4xl mx-auto"
        >
          <motion.div variants={itemVariants}>
            <h2 className="text-3xl font-bold mb-12 text-center">Experience</h2>
          </motion.div>

          {experience.map((job, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="mb-12 last:mb-0"
            >
              <div className="flex flex-col md:flex-row gap-6 p-6 rounded-lg bg-card hover:shadow-md transition-shadow duration-300">
                <div className="flex-shrink-0 flex items-start justify-center">
                  {job.logo ? (
                    <div className="w-16 h-16 relative overflow-hidden rounded-md">
                      <Image
                        src={job.logo}
                        alt={job.company}
                        fill
                        className="object-contain"
                      />
                    </div>
                  ) : (
                    <div className="w-16 h-16 rounded-md bg-primary/10 flex items-center justify-center text-primary font-bold text-xl">
                      {job.company.charAt(0)}
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                    <h3 className="text-xl font-bold">{job.role}</h3>
                    <span className="text-sm opacity-75">{job.period}</span>
                  </div>
                  <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-4 mb-4">
                    <span className="font-medium">{job.company}</span>
                    <span className="hidden md:inline opacity-50">•</span>
                    <span className="opacity-75">{job.location}</span>
                  </div>
                  <ul className="space-y-2 list-disc list-inside text-sm md:text-base">
                    {job.description.map((bullet, idx) => (
                      <li key={idx}>{bullet}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Experience; 