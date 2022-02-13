import {
  Button,
  Center,
  FormControl,
  FormErrorMessage,
  Image,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

//components
import GoogleButton from "components/myButtons/googleButton";
import FacebookButton from "components/myButtons/facebookButton";

//Icons

import { PRIMARY_COLOR } from "utils/constants";
import loginDivider from "assets/images/loginOrWithDivider.svg";

export default function Login({ isOpen, onClose, openRegister }) {
  const initialRef = useRef();
  const toast = useToast();

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting, isValid },
  } = useForm();

  const handleRegisterClick = () => {
    openRegister();
    reset();
    onClose();
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  const handleLogin = (data) => {
    //TODO: login logic
    return new Promise((resolve) => {
      setTimeout(() => {
        toast({
          position: "top",
          title: "Login Succesfull",
          status: "success",
          isClosable: true,
        });
        resolve();
        onClose();
      }, 2500);
    });
  };

  return (
    <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={handleClose}>
      <ModalOverlay />
      <ModalContent px={4}>
        <ModalHeader color={PRIMARY_COLOR}>Sign in</ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          <form onSubmit={handleSubmit(handleLogin)}>
            <FormControl mb={6} isInvalid={errors.identifier}>
              <Input
                type="text"
                w="100%"
                name="identifier"
                {...register("identifier", {
                  required: "Email or Phone number is required for sign in",
                })}
                bg="#FAF3F391"
                placeholder="Email or Phone number"
              />

              <FormErrorMessage>
                {errors.identifier && errors.identifier.message}
              </FormErrorMessage>
            </FormControl>

            <FormControl mb={8} isInvalid={errors.password}>
              <Input
                type="password"
                w="100%"
                {...register("password", {
                  required: "Password is required for sign in",
                })}
                name="password"
                bg="#FAF3F391"
                placeholder="Password"
              />

              <FormErrorMessage>
                {errors.password && errors.password.message}
              </FormErrorMessage>
            </FormControl>

            <Button
              w="100%"
              isLoading={isSubmitting}
              mb={4}
              type="submit"
              variant="primary">
              Sign in
            </Button>
          </form>

          <Image src={loginDivider} mb={5} />

          <GoogleButton onClick={() => alert("SAY HELLO")} />
          <FacebookButton onClick={() => alert("SAY HELLO")} />
        </ModalBody>

        <Center>
          <Text>
            Don't have an account?
            <Link to="#">
              <span
                onClick={handleRegisterClick}
                style={{
                  color: PRIMARY_COLOR,
                  textDecoration: "underline",
                  marginLeft: ".5rem",
                }}>
                Register
              </span>
            </Link>
          </Text>
        </Center>

        <ModalFooter></ModalFooter>
      </ModalContent>
    </Modal>
  );
}
