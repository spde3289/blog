import "styled-components";
import { light, dark } from "./theme";

declare module "styled-components" {
  export interface DefaultTheme {
    light: { [key in Color]: string };
    dark: { [key in Color]: string };
  }
}
