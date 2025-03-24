"use client";
import ProjectModal from "@/components/modal/ProjectModal"; // 모달 컴포넌트 불러오기
import { ProjectType } from "@/data/project";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

interface ProjectProps {
  project: ProjectType;
}

const Project = ({ project }: ProjectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        layoutId={`card-${project.title}`}
        style={project.img ? {} : { justifyContent: "space-between" }}
        className={`group w-[244px] h-72 pb-3 cursor-pointer overflow-hidden flex flex-col justify-between border rounded-xl bg-box opacity-100`}
      >
        {/* 프로젝트 이미지 */}
        {project.img && (
          <div className="w-full h-full mb-2">
            <Image
              unoptimized
              src={project.img}
              alt="대표 캐릭터 이미지"
              priority
              width={0}
              height={0}
              style={{
                width: "100%",
                height: "148px",
                objectFit: "cover",
              }}
            />
          </div>
        )}
        <div className="px-4 transition-opacity duration-300 ">
          <h2
            style={
              project.img
                ? {}
                : { marginTop: "20px", justifyContent: "space-between" }
            }
            className="font-bold text-xl mb-1"
          >
            {project.title}
          </h2>
          <p className="text-base w-full break-keep mb-4">
            {project.description}
          </p>
        </div>
        <div className="px-2 flex gap-2 transition-opacity duration-300 ">
          {project.tags.map((tag) => (
            <div
              className="flex items-center justify-center text-xs bg-white dark:bg-neutral-700/40 border border-neutral-300 dark:border-neutral-700 px-1 py-0.5 rounded"
              key={tag}
            >
              {tag}
            </div>
          ))}
        </div>

        {/* <div className="h-72 w-[242px] opacity-0 -z-1 rounded-xl fixed group-hover:z-10 group-hover:opacity-100 border bg-black bg-opacity-80 flex flex-col items-center justify-center gap-4 transition-opacity duration-300 ">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(true)}
            className="px-4 py-2 bg-white text-black rounded-lg font-semibold"
          >
            자세히 보기
          </motion.button>
          {project.href && (
            <motion.a
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              target="_blank"
              href={project.href}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg font-semibold"
            >
              바로가기
            </motion.a>
          )}
        </div> */}
      </motion.div>
      <AnimatePresence>
        <ProjectModal
          id={`card-${project.title}`}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
        >
          {project.contents}
        </ProjectModal>
      </AnimatePresence>
    </>
  );
};

export default Project;
