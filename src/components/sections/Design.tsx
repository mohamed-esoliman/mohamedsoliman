"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Image from "next/image";
import { designIntro, designProjects } from "@/data/design";
import { ChevronLeftIcon, ChevronRightIcon, Cross1Icon } from "@radix-ui/react-icons";

const Design = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [activeProject, setActiveProject] = useState(0);
  const [viewingImage, setViewingImage] = useState<string | null>(null);

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

  const handlePrevious = () => {
    setActiveProject(
      (prev) => (prev - 1 + designProjects.length) % designProjects.length
    );
  };

  const handleNext = () => {
    setActiveProject((prev) => (prev + 1) % designProjects.length);
  };

  return (
    <section id="design" className="py-20">
      <div className="container">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="max-w-4xl mx-auto"
        >
          <motion.div variants={itemVariants}>
            <h2 className="text-3xl font-bold mb-8 text-center">Design</h2>
          </motion.div>

          <motion.p
            variants={itemVariants}
            className="text-center text-lg mb-12 max-w-2xl mx-auto"
          >
            {designIntro}
          </motion.p>

          <motion.div variants={itemVariants} className="relative">
            <div className="bg-card rounded-lg p-6 shadow-sm">
              <div className="mb-6">
                <h3 className="text-2xl font-semibold mb-2">
                  {designProjects[activeProject].title}
                </h3>
                <p className="text-sm md:text-base opacity-80">
                  {designProjects[activeProject].description}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {designProjects[activeProject].images.map((image, index) => (
                  <div
                    key={index}
                    className="relative aspect-square rounded-md overflow-hidden cursor-pointer hover:scale-[1.02] transition-transform"
                    onClick={() => setViewingImage(image)}
                  >
                    <Image
                      src={image}
                      alt={`${designProjects[activeProject].title} - Image ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>

              <div className="flex justify-between mt-8">
                <button
                  onClick={handlePrevious}
                  className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
                  aria-label="Previous project"
                >
                  <ChevronLeftIcon className="h-5 w-5" />
                </button>
                <div className="flex space-x-2">
                  {designProjects.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveProject(index)}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        index === activeProject
                          ? "bg-primary"
                          : "bg-gray-300 dark:bg-gray-700"
                      }`}
                      aria-label={`Go to project ${index + 1}`}
                    />
                  ))}
                </div>
                <button
                  onClick={handleNext}
                  className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
                  aria-label="Next project"
                >
                  <ChevronRightIcon className="h-5 w-5" />
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Image Lightbox */}
      {viewingImage && (
        <div
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={() => setViewingImage(null)}
        >
          <button
            className="absolute top-4 right-4 p-2 bg-black/50 rounded-full text-white"
            onClick={() => setViewingImage(null)}
          >
            <Cross1Icon className="h-6 w-6" />
          </button>
          <div className="relative w-full max-w-4xl h-[80vh]">
            <Image
              src={viewingImage}
              alt="Enlarged view"
              fill
              className="object-contain"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default Design; 