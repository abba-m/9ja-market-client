import {
  Alert,
  AlertIcon,
  CloseButton,
  Center,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Text,
  Button,
  Image,
  InputGroup,
  InputLeftAddon,
  FormControl,
  FormErrorMessage,
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

export default function Register({ isOpen, onClose, openLogin }) {
  const initialRef = useRef();

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting, isValid },
  } = useForm();

  const handleLoginClick = () => {
    openLogin();
    reset();
    onClose();
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  const showAlert = () => {
    return (
      <Alert status="error">
        <AlertIcon />
        Invalid phone number
        <CloseButton position="absolute" right="8px" top="8px" />
      </Alert>
    );
  };

  const handleRegister = (data) => {
    if (!data.phone) return alert("Invalid phone number");

    return new Promise((resolve) => {
      setTimeout(() => {
        alert(JSON.stringify({ Message: "Registeration Succssful" }));
        resolve();
        reset();
      }, 2500);
    });
  };

  return (
    <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={handleClose}>
      <ModalOverlay />
      <ModalContent px={4}>
        <ModalHeader color={PRIMARY_COLOR}>Register</ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          <form onSubmit={handleSubmit(handleRegister)}>
            <FormControl mb={6} isInvalid={errors.fullName}>
              <Input
                type="text"
                w="100%"
                name="fullName"
                {...register("fullName", {
                  required: "Full name is required for sign up",
                })}
                bg="#FAF3F391"
                placeholder="Full Name"
              />

              <FormErrorMessage>
                {errors.fullName && errors.fullName.message}
              </FormErrorMessage>
            </FormControl>

            <FormControl mb={8} isInvalid={errors.email}>
              <Input
                type="email"
                w="100%"
                name="email"
                {...register("email", {
                  required: "Email is required for sign up",
                })}
                bg="#FAF3F391"
                placeholder="Email"
              />

              <FormErrorMessage>
                {errors.email && errors.email.message}
              </FormErrorMessage>
            </FormControl>

            <FormControl mb={8} isInvalid={errors.phone}>
              <InputGroup>
                <InputLeftAddon children="+234" />
                <Input
                  type="tel"
                  w="100%"
                  name="phone"
                  {...register("phone", {
                    required: "Phone number is required for sign up",
                    valueAsNumber: true,
                    minLength: { value: 10, message: "Invalid phone number" },
                  })}
                  bg="#FAF3F391"
                  placeholder="Phone"
                />
              </InputGroup>

              <FormErrorMessage>
                {errors.phone && errors.phone.message}
              </FormErrorMessage>
            </FormControl>

            <FormControl mb={8} isInvalid={errors.password}>
              <Input
                type="password"
                w="100%"
                name="password"
                {...register("password", {
                  required: "Password is required for sign up",
                  minLength: {
                    value: 8,
                    message: "Password must be 8 characters or more",
                  },
                })}
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
              variant="primary"
              type="submit">
              Register
            </Button>
          </form>

          <Image src={loginDivider} mb={5} />

          <GoogleButton onClick={() => alert("SAY HELLO")} />
          <FacebookButton onClick={() => alert("SAY HELLO")} />
        </ModalBody>

        <Center>
          <Text>
            Already have an account?
            <Link to="#">
              <span
                onClick={handleLoginClick}
                style={{
                  color: PRIMARY_COLOR,
                  textDecoration: "underline",
                  marginLeft: ".5rem",
                }}>
                Sign in
              </span>
            </Link>
          </Text>
        </Center>

        <ModalFooter></ModalFooter>
      </ModalContent>
    </Modal>
  );
}
