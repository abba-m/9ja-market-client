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
  Link,
  Text,
  Button,
  Image,
  InputGroup,
  InputRightElement,
  FormControl,
  FormErrorMessage,
  useToast,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { loginSuccess } from "store/actions";
import { postRequest } from "services/request";
import { useMutation } from "@tanstack/react-query";

/** components */
import GoogleButton from "components/myButtons/googleButton";
import FacebookButton from "components/myButtons/facebookButton";

/** Icons and assets */
import loginDivider from "assets/images/loginOrWithDivider.svg";

export default function Register({ isOpen, onClose, openLogin }) {
  const initialRef = useRef();
  const toast = useToast();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
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

  const _showAlert = () => {
    return (
      <Alert status="error">
        <AlertIcon />
        Invalid phone number
        <CloseButton position="absolute" right="8px" top="8px" />
      </Alert>
    );
  };

  const toggleShowPassword = () => setShowPassword(!showPassword);

  const { mutate, isLoading, error, data } = useMutation((data) => {
    return postRequest("auth/register", data);
  });

  const handleRegister = async (data) => {
    return mutate(data);
  };

  useEffect(() => {
    if (error) {
      toast({
        position: "top",
        title: `[Error]: ${
          error?.response?.data?.error?.message ||
          "Signup failed. Please try again."
        }`,
        status: "error",
        isClosable: true,
      });
    }
  }, [error]);

  useEffect(() => {
    if (data) {
      toast({
        position: "top",
        title: "Account created.",
        description: "Please check your inbox to confirm your email.",
        status: "info",
        duration: 9000,
        isClosable: true,
      });
      dispatch(loginSuccess(data?.data));
      handleClose();
    }
  }, [data]);

  return (
    <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={handleClose}>
      <ModalOverlay />
      <ModalContent px={4}>
        <ModalHeader color="primary">Register</ModalHeader>
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
              <Input
                type="tel"
                w="100%"
                name="phone"
                {...register("phone", {
                  required: "phone number is required for sign up",
                })}
                bg="#FAF3F391"
                placeholder="Phone"
              />

              <FormErrorMessage>
                {errors.phone && errors.phone.message}
              </FormErrorMessage>
            </FormControl>

            <FormControl mb={8} isInvalid={errors.password}>
              <InputGroup>
                <Input
                  type={showPassword ? "text" : "password"}
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
                <InputRightElement
                  onClick={toggleShowPassword}
                  children={
                    showPassword ? (
                      <ViewOffIcon color="gray.500" />
                    ) : (
                      <ViewIcon color="gray.500" />
                    )
                  }
                />
              </InputGroup>

              <FormErrorMessage>
                {errors.password && errors.password.message}
              </FormErrorMessage>
            </FormControl>

            <Button
              w="100%"
              isLoading={isLoading}
              mb={4}
              variant="primary"
              type="submit"
            >
              Register
            </Button>
          </form>

          <Image src={loginDivider} mb={5} />

          <Link href={`${process.env.REACT_APP_SERVER_URL}/api/connect/google`}>
            <GoogleButton />
          </Link>
          <FacebookButton onClick={() => alert("SAY HELLO")} />
        </ModalBody>

        <Center>
          <Text>
            Already have an account?
            <Link href="#">
              <span
                onClick={handleLoginClick}
                style={{
                  color: "primary",
                  textDecoration: "underline",
                  marginLeft: ".5rem",
                }}
              >
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
