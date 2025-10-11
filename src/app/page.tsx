import "@/styles/home.css";
import EducationContainer from "./_components/EducationConatiner";
import InterviewContainer from "./_components/InterviewContainer";
import ProjectPortfolioContainer from "./_components/ProjectPortfolioContainer";
import RandingContent from "./_components/RandingContent";
import StackConatiner from "./_components/StackContainer";

const Home = () => {
  return (
    <main className="flex flex-col items-center bg-gradient-to-b from-[#000000] to-[#313131] noise-before text-[#f3f3f3] pb-40 overflow-hidden">
      <RandingContent />
      <ProjectPortfolioContainer />
      <InterviewContainer />
      <EducationContainer />
      {/* <WorkExpreienceContainer /> */}
      <StackConatiner />
    </main>
  );
};

export default Home;
