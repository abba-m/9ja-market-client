import { Box, useRadio } from "@chakra-ui/react";

export const RadioPill = (props) => {
  const { getInputProps, getCheckboxProps } = useRadio(props);

  const input = getInputProps();
  const checkbox = getCheckboxProps();

  return (
    <Box as="label">
      <input {...input} />
      <Box
        {...checkbox}
        cursor="pointer"
        borderWidth="1px"
        borderRadius="20px"
        borderColor="primary"
        boxShadow="sm"
        w="fit-content"
        _checked={{
          bg: "primary",
          color: "white",
        }}
        mx={1}
        my={1}
        px={2}
        py={1}>
        {props.children}
      </Box>
    </Box>
  );
};

//export default RadioPill;
