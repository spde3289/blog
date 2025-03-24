"use client";

import { motion } from "framer-motion";
import { ReactNode, useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface ModalProps {
  id?: string;
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const ProjectModal = ({ isOpen, onClose, children, id }: ModalProps) => {
  const [modalRoot, setModalRoot] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setModalRoot(document.getElementById("modal-root"));

    if (isOpen) {
      const scrollbarWidth =
        window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    } else {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    }

    return () => {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    };
  }, [isOpen]);

  if (!isOpen || !modalRoot) return null;

  return createPortal(
    <motion.div
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-start justify-center overflow-y-auto py-20 "
      onClick={onClose} // 배경 클릭 시 닫기
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onAnimationComplete={() => {
        console.log("asdasd");
      }}
    >
      <motion.div
        layoutId={id}
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.5, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-white dark:bg-neutral-900 p-6 rounded-lg shadow-lg w-full max-w-[768px]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4">{children}</div>
        <button
          className="w-full bg-red-500 text-white py-2 rounded-lg mt-2"
          onClick={onClose}
        >
          닫기
        </button>
      </motion.div>
    </motion.div>,
    modalRoot
  );
};

export default ProjectModal;
