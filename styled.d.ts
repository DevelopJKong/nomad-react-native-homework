import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    bgColor: string;
    textColor: {
      white: string;
      gray: string;
      red: string;
      green: string;
    };
    fontSize: {
      small: string;
      medium: string;
    };
    contentColor: string;
  }
}
