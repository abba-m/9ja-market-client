import { Box, Button, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

function Dashboard() {
  return (
    <Box p={4}>
      <Text>Hello from Dashboard</Text>
      <Link to="/test">
        <Button mt={4} variant="primary">
          Goto Test
        </Button>
      </Link>
    </Box>
  );
}

export default Dashboard;
