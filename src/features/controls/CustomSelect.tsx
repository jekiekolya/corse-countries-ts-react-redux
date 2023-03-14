import Select, { Props } from "react-select";
import { Region } from "types";
import styled from "styled-components";

export type CountryOption =
  | {
      label: Region;
      value: Region;
    }
  | "";

interface MySelectProps extends Props<CountryOption, false> {}

function MySelect(props: MySelectProps) {
  return <Select {...props} />;
}

interface CustomSelectStyles {
  control: (provided: any) => any;
  option: (provided: any, state: any) => any;
}

interface CustomSelectProps extends MySelectProps {
  styles?: CustomSelectStyles;
}

export const CustomSelect = styled(MySelect).attrs<CustomSelectProps>(
  ({ styles }) => ({
    styles: {
      control: (provided: any) => ({
        ...provided,
        backgroundColor: "var(--colors-ui-base)",
        color: "var(--colors-text)",
        borderRadius: "var(--radii)",
        padding: "0.25rem",
        border: "none",
        boxShadow: "var(--shadow)",
        height: "50px",
        ...(styles?.control ? styles.control(provided) : {}),
      }),
      option: (provided: any, state: any) => ({
        ...provided,
        cursor: "pointer",
        color: "var(--colors-text)",
        backgroundColor: state.isSelected
          ? "var(--colors-bg)"
          : "var(--colors-ui-base)",
        ...(styles?.option ? styles.option(provided, state) : {}),
      }),
    },
  })
)<CustomSelectProps>`
  width: 200px;
  border-radius: var(--radii);
  font-family: var(--family);
  border: none;

  & > * {
    box-shadow: var(--shadow);
  }

  & input {
    padding-left: 0.25rem;
  }

  & * {
    color: var(--colors-text) !important;
  }

  & > div[id] {
    background-color: var(--colors-ui-base);
  }
`;
