import "@/styles/home.css";
import HistorySection from "./_components/HistorySection";
import InterviewSection from "./_components/InterviewSection";
import LendingSection from "./_components/LendingSection";
import ProjectSection from "./_components/ProjectSection";
import SkillSection from "./_components/SkillSection";

const Home = () => {
  return (
    <>
      <main className="min-h-screen bg-[#121212] text-white selection:bg-neutral-700 selection:text-white">
        <LendingSection />
        <div className="max-w-6xl mx-auto px-6 space-y-32 pb-32">
          <SkillSection />
          <ProjectSection />
          <InterviewSection />
          <HistorySection />
        </div>
      </main>
    </>
  );
};

export default Home;
