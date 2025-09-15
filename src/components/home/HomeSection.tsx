"use client";
import { motion } from "framer-motion";
import { ReactNode } from "react";

interface HomeSectionProps {
  title?: string;
  children: ReactNode;
  className?: string;
}

const HomeSection = ({ title, children, className }: HomeSectionProps) => {
  return (
    <motion.section
      initial={{ opacity: 0, y: -100 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      viewport={{ once: true, amount: 0.8 }}
      className={`${className} mx-auto w-full 2xl:max-w-[1152px] px-6 min-[1260px]:max-2xl:px-[168px] pb-10`}
    >
      <h2 className="text-5xl font-black title-text pb-[2rem]">{title}</h2>
      {children}
    </motion.section>
  );
};

export default HomeSection;
