import styled from "styled-components";
import content from "@/pages/postPageInfo/postInfo";
import { PieChart, Pie, ResponsiveContainer } from "recharts";

export const options = {
  title: "태그별 게시글 개수",
};

interface PieChartInterface {
  [key: string]: number;
}

const About = () => {
  const result: PieChartInterface = {};
  const data: any[] = [];

  content.forEach((x) => {
    result[x.category] = (result[x.category] || 0) + 1;
  });

  for (const arr in result) {
    data.push({"name": arr, "value": result[arr]});
  }
  console.log(data, result);
  return (
    <AboutMain>
      <AboutMe>
        <h2 className='title'>About Me</h2>
        이곳에 저의 성장과정과 근황을 올리려고 합니다.
        <br />
        개발블로그를 시작한 김지훈 이라고 합니다.
        <br />
      </AboutMe>
      <PieChart width={600} height={600}>
        <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={250} fill="#8884d8" />
      </PieChart>
    </AboutMain>
  );
};

const AboutMain = styled.main`
  margin: 0 auto;
  height: 68vh;
  width: 1000px;
  padding-top: 80px;
  .title {
    margin-bottom: 15px;
    font-size: 24px;
  }
`;

const AboutMe = styled.p`
  padding: 15px;
`;

/* const TimeLineSection = styled.div`
  margin-top: 50px;
  padding: 15px;
`;

const TimeLine = styled.div`
  display: flex;
  padding-bottom: 10px;
  &:before {
    content: "";
    height: 10px;
    width: 10px;
    align-self: center;
    border: 1.5px solid #828282;
    border-radius: 10px;
    transform: translatex(-50%);
  }
`; */

export default About;
