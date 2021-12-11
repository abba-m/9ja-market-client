import {
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  HStack,
} from "@chakra-ui/react";

const UserForm = () => {
  return (
    <form
      style={{ border: "1px solid dotted", width: "400px", padding: "1rem" }}
    >
      <VStack spacing={4}>
        <FormControl>
          <FormLabel>First Name</FormLabel>
          <Input type="text" name="first-name" />
        </FormControl>
        <FormControl>
          <FormLabel>Last Name</FormLabel>
          <Input type="text" name="last-name" />
        </FormControl>

        <HStack>
          <Button variant="primary" size="sm" type="submit">
            Print
          </Button>
          <Button variant="primaryOutline" size="sm" type="reset">
            Clear
          </Button>
        </HStack>
      </VStack>
    </form>
  );
};

export default UserForm;
