import {
  Box,
  Button,
  Divider,
  Input,
  Select,
  useBreakpointValue,
} from "@chakra-ui/react";
import { BsList, BsSearch } from "react-icons/bs";
import { CATEGORIES } from "utils/constants.utils";
import ShortUniqueId from "short-unique-id";

export default function SearchBox() {
  const uid = new ShortUniqueId({ length: 5 });
  const seearchText = useBreakpointValue({ base: <BsSearch />, md: "Search" });
  const seearchPlaceholder = useBreakpointValue({
    base: "Search...",
    md: "Find products, brands and stores...",
  });
  const hideOnMobile = useBreakpointValue({
    base: "none",
    md: "initial",
  });

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      gap={["0.2rem", "1rem"]}
      borderRadius="md"
      h="5rem"
      bg="whiteAlpha.900"
      p="4"
      width={["100%", "80%"]}
      shadow="md"
    >
      <Box display="flex" alignItems="center" gap="0.5rem">
        <BsList color="primary" size="1.5rem" display={hideOnMobile} />
        <Select placeholder="Select categories" variant="unstyled">
          {CATEGORIES.map((category) =>
            Object.values(category)[0].map((value) => (
              <option key={uid()}>{value}</option>
            ))
          )}
        </Select>
      </Box>

      <Divider orientation="vertical" />

      <Input
        type="text"
        w="60%"
        name="search-query"
        bg="#FAF3F391"
        placeholder={seearchPlaceholder}
      />
      <Button w="fit-content" bg="primary" color="white" variant="solid">
        {seearchText}
      </Button>
    </Box>
  );
}
