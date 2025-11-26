export default interface ProjectDataInterface {
  title: string;
  date: string;
  types: string[];
  stack: {
    src: string;
    alt: string;
  }[];
  discription: string[];
  img: {
    src: string;
    alt: string;
    options?: {
      [key: string]: string | boolean;
    };
  };
}
