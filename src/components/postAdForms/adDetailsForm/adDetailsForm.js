import { useEffect } from "react";
import { Box, Center, Heading, Text } from "@chakra-ui/react";
import { PostAdContext } from "providers/postAdProvider";
import { useContext } from "react";

import { DynamicForm } from "./adDetailsForm.utils";

function AdDetailsForm() {
  const { dynamicFormState: [dynamicFormValue], handleSetFormValues } = useContext(PostAdContext);

  return (
    <Box w="50" h="85%" overflowY="auto" px={4} pt={2}>
      <DynamicForm fieldsArray={dynamicFormValue} handleInputChange={handleSetFormValues} />
    </Box>
  );
}

export default AdDetailsForm;
