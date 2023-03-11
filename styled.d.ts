import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    bgColor: string;
    color: {
      white: string;
      gray: string;
      darkGray: string;
      red: string;
      green: string;
      pink: string;
    };
    fontSize: {
      small: string;
      medium: string;
      mLarge: string;
      large: string;
    };
    contentColor: string;
    borderRadius: string;
  }
}
