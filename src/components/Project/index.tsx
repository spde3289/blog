"use client";

import Modal from "@/components/Modal"; // 모달 컴포넌트 불러오기
import { ProjectType } from "@/data/project";
import Image from "next/image";
import { useState } from "react";

interface ProjectProps {
  project: ProjectType;
}

const Project = ({ project }: ProjectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div
      style={
        project.img
          ? {}
          : { padding: "12px 0", justifyContent: "space-between" }
      }
      className="group relative h-72 pb-3 overflow-hidden flex flex-col justify-between border rounded-xl bg-box"
    >
      {/* 프로젝트 이미지 */}
      {project.img && (
        <div className="relative w-full h-full mb-2">
          <Image
            unoptimized
            fill
            src={project.img}
            className="object-cover"
            alt="대표 캐릭터 이미지"
            priority
          />
        </div>
      )}
      <div className="px-2 transition-opacity duration-300 ">
        <h2 className="font-bold text-xl mb-1">{project.title}</h2>
        <p className="text-base w-full break-keep mb-4">
          {project.description}
        </p>
      </div>
      <div className="px-2 flex gap-2 transition-opacity duration-300 ">
        {project.tags.map((tag) => (
          <div
            className="flex items-center justify-center text-xs bg-slate-200 px-1 py-0.5 rounded"
            key={tag}
          >
            {tag}
          </div>
        ))}
      </div>
      <div className="absolute inset-0 bg-black bg-opacity-80 flex flex-col items-center justify-center gap-4 transition-opacity duration-300 opacity-0 group-hover:opacity-100">
        <button
          onClick={() => setIsOpen(true)}
          className="px-4 py-2 bg-white text-black rounded-lg font-semibold"
        >
          자세히 보기
        </button>
        {project.href && (
          <a
            target="_blank"
            href={project.href}
            // onClick={() => console.log("바로가기")}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg font-semibold"
          >
            바로가기
          </a>
        )}
      </div>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        {project.contents}
      </Modal>
    </div>
  );
};

export default Project;
