export interface WorkExperience {
  title: string;
  date: string;
  position: string;
  discription: string[];
}

const workExperienceItems: WorkExperience[] = [
  {
    title: "고려기연",
    date: "2016.12.12 ~ 2019.12.12",
    position: "생산/전기 (사원)",
    discription: ["글러브 박스 생산", "글러브 박스 전기"],
  },
];

export default workExperienceItems;
