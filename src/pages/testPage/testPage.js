import {
  Box,
  Button,
  Center,
  Container,
  HStack,
  useDisclosure,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

import UserForm from "components/testComp/form";
import ListComponent from "components/testComp/list";
import HeroesAdGrid from "components/heroesAdGrid/heroesAdGrid";
import CategoriesGrid from "components/categoriesGrid/categoriesGrid";
import SearchBox from "components/searchBox/searchBox";
import Login from "components/auth/login";
import Register from "components/auth/register";

function TestPage() {
  const navigate = useNavigate();
  const {
    isOpen: isLoginOpen,
    onOpen: onLoginOpen,
    onClose: onLoginClose,
  } = useDisclosure();
  const {
    isOpen: isRegisterOpen,
    onOpen: onRegisterOpen,
    onClose: onRegisterClose,
  } = useDisclosure();

  return (
    <Container
      //style={{ border: "1px solid red" }}
      maxWidth={["100%", "90vw"]}
      h="calc(100vh - 80px)"
      justifyContent="center">
      {/* <SearchBox /> */}
      {/* <CategoriesGrid /> */}
      <HeroesAdGrid />

      <HStack mt="12">
        <Button mt={4} variant="primary" onClick={onLoginOpen}>
          Login
        </Button>
        <Button mt={4} variant="primaryOutline" onClick={onRegisterOpen}>
          Register
        </Button>
      </HStack>

      <Button mb={2} onClick={() => navigate(-1)} variant="primaryOutline">
        Go back
      </Button>
      <Login
        isOpen={isLoginOpen}
        onClose={onLoginClose}
        openRegister={onRegisterOpen}
      />
      <Register
        isOpen={isRegisterOpen}
        onClose={onRegisterClose}
        openLogin={onLoginOpen}
      />
    </Container>
  );
}

export default TestPage;
