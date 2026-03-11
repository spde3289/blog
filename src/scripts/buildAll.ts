import { buildAllPosts } from "./buildAllPosts";
import { buildCategoriesJson } from "./buildCategory";
import { buildSeriesJson } from "./buildSeries";

const runAllScripts = async () => {
  console.time("🚀 통합 프리빌드 총 소요 시간");

  try {
    // 4개의 독립적인 빌드 작업을 동시에 병렬로 실행! (속도 극대화)
    await Promise.all([
      buildAllPosts(),
      buildSeriesJson(),
      buildCategoriesJson(),
    ]);
  } catch (error) {
    console.error("❌ 빌드 중 에러가 발생했습니다!", error);
    process.exit(1);
  }

  console.log("\n====================================");
  console.timeEnd("🚀 통합 프리빌드 총 소요 시간");
  console.log("====================================\n");
};

runAllScripts();
