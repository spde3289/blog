import fs from "fs";
import path from "path";

/** 디렉터리가 없으면 재귀적으로 생성 */
export const ensureDir = (dir: string) => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
};

/** 경로가 디렉터리인지 확인 */
export const isDirectory = (p: string) =>
  fs.existsSync(p) && fs.statSync(p).isDirectory();

/** 경로가 파일인지 확인 */
export const isFile = (p: string) =>
  fs.existsSync(p) && fs.statSync(p).isFile();

/** 디렉터리 내 항목(파일+폴더) 목록 반환 */
export const listDir = (dir: string) => fs.readdirSync(dir);

/** 디렉터리 내 폴더 목록 반환 */
export const listDirs = (dir: string) =>
  listDir(dir).filter((name) => isDirectory(path.join(dir, name)));

/** 지정 확장자 파일만 필터링 (대소문자 무시) */
export const listFilesByExt = (dir: string, ext: string) =>
  listDir(dir).filter((f) => f.toLowerCase().endsWith(ext.toLowerCase()));

/** UTF-8로 파일 저장 (경로 자동 생성) */
export const writeFileUtf8 = (filePath: string, data: string) => {
  ensureDir(path.dirname(filePath));
  fs.writeFileSync(filePath, data, "utf8");
};
