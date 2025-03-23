"use client";
import { motion } from "framer-motion";
import { ReactNode } from "react";

interface HomeSectionProps {
  title: string;
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
      className={`${className}`}
    >
      <h2 className="text-4xl font-black text-black pb-[2rem]">{title}</h2>
      {children}
    </motion.section>
  );
};

export default HomeSection;
