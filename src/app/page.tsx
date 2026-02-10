import "@/styles/home.css";
import Footer from "./_components/common/Footer";
import Header from "./_components/common/Header";
import HistorySection from "./_components/HistorySection";
import InterviewSection from "./_components/InterviewSection";
import ProjectSection from "./_components/ProjectSection";
import SkillSection from "./_components/SkillSection";

const Home = () => {
  return (
    <div className="min-h-screen bg-[#121212] text-white selection:bg-neutral-700 selection:text-white">
      <Header />
      <main className="max-w-6xl mx-auto px-6 space-y-32 pb-32">
        <ProjectSection />
        <InterviewSection />
        <HistorySection />
        <SkillSection />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
