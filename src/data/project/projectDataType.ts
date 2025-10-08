export default interface ProjectDataInterface {
  title: string;
  date: string;
  types: string[];
  stack: {
    framework?: string[];
    library?: string[];
  };
  discription: string[];
  img: {
    src: string;
    alt: string;
    options?: {
      [key: string]: string | boolean;
    };
  };
}
