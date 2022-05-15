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
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { loginSuccess } from "store/actions"


/** components */
import GoogleButton from "components/myButtons/googleButton";
import FacebookButton from "components/myButtons/facebookButton";

/** Icons and assets */
import loginDivider from "assets/images/loginOrWithDivider.svg";
import { sendRequest } from "utils/connection";

export default function Register({ isOpen, onClose, openLogin }) {
  const initialRef = useRef();
  const toast = useToast();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);


  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting },
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

  const toggleShowPassword = () => setShowPassword(!showPassword);

  const handleRegister = async (data) => {
    const [res, error] = await sendRequest(fetch(`${process.env.REACT_APP_SERVER_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    }))

    if (error) {
      return toast({
        position: "top",
        title: `[Error]: Sign up failed. Please try again.`,
        status: "error",
        isClosable: true,
      });
    }

    const value = await res.json();
    if (value && value?.error) {
      return toast({
        position: "top",
        title: `${value?.message || "Register failed"}.`,
        status: "error",
        isClosable: true,
      });
    }


    if (value && value?.user) {
      dispatch(loginSuccess(value))
      handleClose();
      toast({
        position: "top",
        title: "Account created.",
        description: "Please check your inbox to confirm your email.",
        status: "info",
        duration: 9000,
        isClosable: true,
      });
    }
  };


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
                <InputRightElement onClick={toggleShowPassword} children={showPassword ? <ViewOffIcon color="gray.500" /> : <ViewIcon color="gray.500" />} />
              </InputGroup>

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
