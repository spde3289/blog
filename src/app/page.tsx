import "@/styles/home.css";
import EducationContainer from "./components/EducationConatiner";
import InterviewContainer from "./components/InterviewContainer";
import ProjectPortfolioContainer from "./components/ProjectPortfolioContainer";
import RandingContent from "./components/RandingContent";
import StackConatiner from "./components/StackContainer";
import WorkExpreienceContainer from "./components/WorkExperienceContainer";

const Home = () => {
  return (
    <main className="flex flex-col items-center bg-[#232323] bg-gradient-to-b from-[#131313] to-[#313131] noise-before text-[#f3f3f3]">
      <RandingContent />
      <ProjectPortfolioContainer />
      <InterviewContainer />
      <EducationContainer />
      <WorkExpreienceContainer />
      <StackConatiner />
    </main>
  );
};

export default Home;
