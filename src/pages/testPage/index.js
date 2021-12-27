import { Box, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

import UserForm from "components/form";
import ListComponent from "components/list";

function TestPage() {
  const navigate = useNavigate();

  return (
    <Box w="50%" p={4}>
      <UserForm />
      <Button mb={2} onClick={() => navigate(-1)} variant="primaryOutline">
        Go back
      </Button>
      <ListComponent />
    </Box>
  );
}

export default TestPage;
