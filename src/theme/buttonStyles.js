export const ButtonStyles = {
  // style object for base or default style
  baseStyle: {},
  // styles for different sizes ("sm", "md", "lg")
  sizes: {},
  // styles for different visual variants ("outline", "solid")
  variants: {
    primary: {
      bg: "primary",
      color: "white",
      _hover: {
        bg: "#009966",
      },
    },
    primaryOutline: {
      bg: "transparent",
      border: "1px solid",
      color: "primary",
      transition: "all 300ms ease-in",
      _hover: {
        boxShadow: "md",
        transform: "scale(1.05)",
      },
    },
  },
  // default values for `size` and `variant`
  defaultProps: {},
};
