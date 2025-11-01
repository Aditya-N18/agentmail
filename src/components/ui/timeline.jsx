"use client";
import { useScroll, useTransform, motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";

export const Timeline = ({
  data
}) => {
  const ref = useRef(null);
  const containerRef = useRef(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height);
    }
  }, [ref]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <div
      className="w-full bg-dark-000 font-sans md:px-10"
      ref={containerRef}>
      <div ref={ref} className="relative max-w-7xl mx-auto pb-20">
        {data.map((item, index) => (
          <div key={index} className="flex justify-start pt-10 md:pt-40 md:gap-10">
            <div
              className="sticky flex flex-col md:flex-row z-40 items-center top-40 self-start max-w-xs lg:max-w-sm md:w-full">
              <div
                className="h-10 absolute left-3 md:left-3 w-10 rounded-full bg-dark-100 flex items-center justify-center border border-dark-200">
                <div
                  className="h-4 w-4 rounded-full bg-gold-dark border-2 border-gold-light" />
              </div>
              <h3
                className="hidden md:block text-xl md:pl-20 md:text-5xl font-bold text-white">
                {item.title}
              </h3>
            </div>

            <div className="relative pl-20 pr-4 md:pl-4 w-full">
              <h3
                className="md:hidden block text-2xl mb-4 text-left font-bold text-white">
                {item.title}
              </h3>
              <div className="relative bg-dark-100 border border-dark-200 rounded-lg p-6 md:p-8 hover:border-gold-dark/50 transition-all overflow-hidden group">
                {/* Decorative gradient background */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-gold-dark/10 to-transparent rounded-full blur-2xl opacity-50 group-hover:opacity-75 transition-opacity"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-pink-dark/10 to-transparent rounded-full blur-xl opacity-50 group-hover:opacity-75 transition-opacity"></div>
                
                {/* Content with relative z-index */}
                <div className="relative z-10 text-gray-300">{item.content}</div>
              </div>
            </div>
          </div>
        ))}
        <div
          style={{
            height: height + "px",
          }}
          className="absolute md:left-8 left-8 top-0 overflow-hidden w-[2px] bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-dark-200 to-transparent to-[99%]  [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)] ">
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0 w-[2px] bg-gradient-to-t from-gold-dark via-gold-light to-transparent from-[0%] via-[10%] rounded-full" />
        </div>
      </div>
    </div>
  );
};
