import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  HStack,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useBreakpointValue,
  useMediaQuery,
} from "@chakra-ui/react";
import { BsList } from "react-icons/bs";
import ShortUniqueId from "short-unique-id";

const uid = new ShortUniqueId({ length: 5 });

const categoriesList = [
  { id: uid(), categoryName: "Properties" },
  { id: uid(), categoryName: "Phones & Accessories" },
  { id: uid(), categoryName: "Autos and Spare Parts" },
  { id: uid(), categoryName: "Electronics" },
  { id: uid(), categoryName: "Fashion" },
];

export const CategoryPill = ({ category, isLastChild, spacing, separator }) => (
  <BreadcrumbItem
    key={category.id}
    isLastChild={isLastChild}
    spacing={spacing}
    separator={separator}
  >
    <BreadcrumbLink href="#">{category.categoryName}</BreadcrumbLink>
  </BreadcrumbItem>
);

export default function CategoriesGrid() {
  const [isLargeScreen] = useMediaQuery("(min-width: 768px)");
  const selectCategoryText = useBreakpointValue({
    base: "Expand to select category",
    md: "Categories",
  });

  return (
    <Box
      bg="primary"
      color="white"
      borderRadius="md"
      display="flex"
      alignItems="center"
      justifyContent="center"
      gap="1rem"
      fontWeight="semibold"
      w="100%"
      maxW="100%"
      p="3"
      h="4rem"
    >
      <Box display="flex" gap="0.5rem">
        <Menu color="#000">
          <MenuButton
            px={4}
            py={2}
            display="flex"
            transition="all 0.2s"
            borderRadius="md"
            // borderWidth="1px"
            _expanded={{ boxShadow: "gray.200" }}
            _focus={{ boxShadow: "none" }}
          >
            <HStack>
              <BsList color="white" size="1.5rem" />
              <Text>{selectCategoryText}</Text>
            </HStack>
          </MenuButton>
          <MenuList bg="white" shadow="md" color="purple.900">
            {categoriesList.map((c) => (
              <MenuItem key={c.id}>{c.categoryName}</MenuItem>
            ))}
          </MenuList>
        </Menu>
      </Box>
      {isLargeScreen && (
        <Breadcrumb separator="|">
          {categoriesList.map((category) => (
            <CategoryPill category={category} />
          ))}
        </Breadcrumb>
      )}
    </Box>
  );
}
