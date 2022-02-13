import {
  Box,
  Center,
  Heading,
  Radio,
  RadioGroup,
  SimpleGrid,
  useRadioGroup,
} from "@chakra-ui/react";
import { useState, useContext } from "react";
import ShortUniqueId from "short-unique-id";
import { RadioPill } from "components/myButtons/radioPills";

import { CATEGORIES } from "utils/constants";
import { PostAdContext } from "providers/postAdProvider";

function CategoryForm() {
  const uid = new ShortUniqueId({ length: 5 });

  const { selectedCategoryState } = useContext(PostAdContext);
  const [selectedCategory, setSelectedCategory] = selectedCategoryState;
  const { getRootProps, getRadioProps } = useRadioGroup({
    name: "Ad-Category",
    defaultValue: selectedCategory,
    onChange: setSelectedCategory,
  });

  const group = getRootProps();

  return (
    <Box w="50" h="85%" overflowY="auto" px={4} pt={2}>
      <SimpleGrid {...group} columns={[2, 3, 4]} gap={4}>
        {CATEGORIES.map((catogory) => (
          <Box display="flex" key={uid()} flexDirection="column">
            <Heading key={uid()} size="sm">
              {Object.keys(catogory)[0]}
            </Heading>
            <Box display="flex" flexDirection="column" fontSize={10}>
              {Object.values(catogory)[0].map((value) => {
                const radio = getRadioProps({ value });
                return (
                  <RadioPill key={uid()} {...radio}>
                    {value}
                  </RadioPill>
                );
              })}
            </Box>
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
}

export default CategoryForm;
