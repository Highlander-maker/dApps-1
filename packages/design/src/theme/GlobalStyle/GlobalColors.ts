import { createGlobalStyle } from "styled-components";

export const GlobalColors = createGlobalStyle`
  :root {
    --color-black: #080606;
    --color-gray-light: #f2f2f2;
    --color-red: #eb5757;
    --color-green: #27ae60;
    --color-blue: #2f80ed;
    --color-blue-light: #1890ff;
    --color-coral: #f0827dff;
    --color-coral-light: #4eedf7;
    --color-ki: #4eedf7;
    --color-text: #ffffff;

    --color-primary: var(--color-text);
    --button-color: var(--color-ki);
    --text-color: var(--color-text);
    --heading-color: var(--color-text);
    --form-error: var(--color-text);
  }
`;
