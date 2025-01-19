import { getAllPosts } from "@/lib/markdown";
import { FaBirthdayCake, FaGithubSquare } from "react-icons/fa";
import { MdLocationPin, MdOutlineAlternateEmail } from "react-icons/md";

const AboutPage = () => {
  const allPosts = getAllPosts();
  return (
    <div className="w-11/12 sm:w-5/6 lg:w-4/6 mx-auto flex flex-col gap-12 ">
      <section>
        <h1 className="text-3xl md:text-4xl text-black font-bold mb-4">
          안녕하세요 개발자 김지훈 입니다.
        </h1>
        <div className="">
          <p className="text-lg md:text-xl mb-2">
            여러 서비스에서 겪은 문제와 해결방법에 대해 기록하며 여러 개발 관련
            주제를 다룹니다.
          </p>
          <p className="text-lg md:text-xl  ">
            저는 개발을 하며 다양한 문제를 겪고 이를 해결해 나가면서
            성장해왔습니다. <br />
            문제 해결에 있어 가장 중요한 점은 원인 분석과 단계적인 접근이라고
            생각하며 에러 메시지가 주는 단서의 중요성을 알고있습니다. 이
            블로그에는 그동안의 경험과 성장 과정을 담았으니 흥미롭게 지켜봐
            주세요.
          </p>
        </div>
      </section>
      <section className="">
        <h2 className="text-2xl mb-4 text-[#1f1f1f]">운영중인 서비스</h2>
        <div className="flex  flex-wrap gap-10 lg:gap-32 text-xl">
          <div>
            <h3 className="mb-2">웹</h3>
            <div className="border-l-2 border-gray-300 pl-6 ">
              <p className="mb-1">
                <a
                  target="_blank"
                  className="group"
                  href="https://www.maple-helper.com/"
                >
                  메이플 헬퍼{" "}
                  <span className="group-hover:text-gray-500 transition-colors ">
                    이동하기
                  </span>
                </a>
              </p>
              <p>
                <a
                  target="_blank"
                  className="group"
                  href="https://www.live-support.shop/"
                >
                  라이브 쳇{" "}
                  <span className="group-hover:text-gray-500 transition-colors ">
                    이동하기
                  </span>
                </a>
              </p>
            </div>
          </div>
          <div>
            <h3 className="mb-2 ">디스코드 봇</h3>
            <div className="border-l-2 border-gray-300 pl-6 ">
              <p className="mb-1 ">
                <a
                  className="group"
                  href="https://discord.com/oauth2/authorize?client_id=1202787148999163965&permissions=8&integration_type=0&scope=bot"
                >
                  몬스터헌터 봇{" "}
                  <span className="group-hover:text-gray-500 transition-colors ">
                    이용하기
                  </span>
                </a>
              </p>
              <p>
                <a
                  className="group"
                  href="https://discord.com/oauth2/authorize?client_id=1147940307145609287&permissions=8&scope=bot"
                >
                  메이플 봇{" "}
                  <span className="group-hover:text-gray-500 transition-colors ">
                    이용하기
                  </span>
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className=" ">
        <h2 className="text-2xl mb-4 text-[#1f1f1f]">사용 기술</h2>
        <div className="flex flex-wrap gap-10 lg:gap-32">
          <div className="">
            <h3 className="mb-2 ">프로그래밍 언어</h3>
            <div className="border-l-2 border-gray-300 pl-6">
              <ul className="list-disc ml-3 space-y-2 ">
                <li className="list-disc">javaScript</li>
                <li className="list-disc">TypeScript</li>
              </ul>
            </div>
          </div>
          <div className="">
            <h3 className="mb-2 ">라이브러리/프레임워크</h3>
            <div className="border-l-2 border-gray-300 pl-6">
              <ul className="list-disc ml-3 space-y-2 ">
                <li className="list-disc">react</li>
                <li className="list-disc">Next.js</li>
              </ul>
            </div>
          </div>
          <div className="">
            <h3 className="mb-2 ">디자인 및 협업 도구</h3>
            <div className="border-l-2 border-gray-300 pl-6">
              <ul className="list-disc ml-3 space-y-2 ">
                <li className="list-disc">Notion</li>
                <li className="list-disc">Figma</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      <section className=" ">
        <h2 className="text-2xl mb-4 text-[#1f1f1f]">개인정보</h2>
        <div className="flex gap-2 flex-col border-l-2 border-gray-300 pl-6">
          <p className="  font-medium flex items-center  ">
            <MdLocationPin className="mt-1 mr-2" /> gyeonggi-do, Korea
          </p>
          <p className="  font-medium flex items-center  ">
            <FaBirthdayCake className="mt-1 mr-2" />
            1998.11.08
          </p>
          <a
            target="_blank"
            href="https://github.com/spde3289"
            className=" hover:text-gray-500 font-medium flex items-center cursor-pointer transition-colors "
          >
            <FaGithubSquare className="mt-1 mr-2" />
            https://github.com/spde3289
          </a>
          <a
            target="_blank"
            href="mailto:myer100756@gmail.com"
            className=" hover:text-gray-500 font-medium flex items-center cursor-pointer transition-colors "
          >
            <MdOutlineAlternateEmail className="mt-2 mr-2" />
            myer100756@gmail.com
          </a>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
