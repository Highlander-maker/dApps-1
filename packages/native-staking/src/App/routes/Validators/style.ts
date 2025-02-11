import { Stack } from "@cosmicdapp/design";
import styled from "styled-components";

export const MainStack = styled(Stack)`
  width: 100%;

  & > * {
    --gap: var(--s5);
  }
`;

export const MenuHeader = styled.header`
  display: flex;
  justify-content: space-between;
`;

export const ValidatorStack = styled(Stack)`
  & > * {
    --gap: 0;
  }
`;

export const AprStack = styled.div`
  margin: 0;
`;

export const SubText = styled.span`
  font-size: small;
`;

export const AprText = styled.span`
  font-size: larger;
`;

export const BorderContainer = styled.div`
  --v-padding: var(--s-2);
  --border-size: 1px;

  padding-top: var(--v-padding);
  padding-bottom: var(--v-padding);

  padding-left: var(--s4);
  margin-left: calc(-1 * var(--s4));
  padding-right: var(--s4);
  margin-right: calc(-1 * var(--s4));

  margin-bottom: calc(-1 * var(--border-size));

  cursor: pointer;

  &:hover,
  &:active,
  &:focus {
    background-color: var(--color-ki);

    & * {
      color: black;
    }
  }

  &:first-child > * {
    --border-size: 0;
  }

  & > * {
    display: flex;
    justify-content: space-between;
    align-items: baseline;

    span:first-child {
      font-family: var(--ff-iceland);
      font-size: var(--s2);
    }

    span:not(:first-child) {
      font-weight: bolder;
      font-size: var(--s-1);
    }
  }

  border-top: var(--border-size) solid var(--color-primary);
  & * {
    color: white;
  }
  padding-top: var(--v-padding);
  margin-top: calc(-1 * var(--v-padding));

  
`;
