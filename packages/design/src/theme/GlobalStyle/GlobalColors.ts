import { createGlobalStyle } from "styled-components";

export const GlobalColors = createGlobalStyle`
  :root {
    --color-black: #333;
    --color-gray-light: #f2f2f2;
    --color-red: #eb5757;
    --color-green: #27ae60;
    --color-blue: #2f80ed;
    --color-blue-light: #1890ff;
    --color-coral: #f0827dff;
    --color-coral-light: #f16a64;
    --color-ki: #4eedf7

    --color-primary: var(--color-#333);
    --button-color: var(--color-ki);
    --text-color: var(--color-primary);
    --heading-color: var(--color-primary);
    --form-error: var(--color-red);
  }
`;
