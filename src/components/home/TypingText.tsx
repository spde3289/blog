"use client";

import { motion } from "framer-motion";

const TypingText = ({
  text,
  delay = 0.05, // 글자 간 지연 시간
}: {
  text: string;
  delay?: number;
}) => {
  return (
    <h1 className="md:text-6xl font-bold flex flex-wrap mb-4">
      {text.split("").map((char, index) => (
        <motion.span
          key={char + index}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: index * delay,
            duration: 0.3,
            ease: "easeOut",
          }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
      {/* <motion.span
        className="animate-pulse"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          repeat: Infinity,
          repeatType: "reverse",
          duration: 0.5,
          delay: text.length * delay,
        }}
      >
        
      </motion.span> */}
    </h1>
  );
};

export default TypingText;
