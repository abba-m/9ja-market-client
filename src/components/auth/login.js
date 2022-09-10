import {
  Button,
  Center,
  FormControl,
  FormErrorMessage,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Link,
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
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

/** Api request methods */
import { loginSuccess } from "store/actions";
import { postRequest } from "services/request";
import { useMutation } from "@tanstack/react-query";

/** components */
import GoogleButton from "components/myButtons/googleButton";
import FacebookButton from "components/myButtons/facebookButton";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

/**Icons */
import loginDivider from "assets/images/loginOrWithDivider.svg";

export default function Login({ isOpen, onClose, openRegister }) {
  const initialRef = useRef();
  const toast = useToast();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => setShowPassword(!showPassword);

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
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

  const gotoResetPasswordPage = () => {
    onClose();
    navigate("/reset-password");
  };

  const { mutate, isLoading, error, data } = useMutation((data) => {
    return postRequest("auth/login", data);
  });

  const handleLogin = async (data) => {
    return mutate(data);
  };

  useEffect(() => {
    if (error) {
      toast({
        position: "top",
        title: `[Error]: ${
          error?.response?.data?.error?.message ||
          "Login failed. Please try again."
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
        title: "Login succesful.",
        status: "info",
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
        <ModalHeader color="primary">Sign in</ModalHeader>
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
              <InputGroup>
                <Input
                  type={showPassword ? "text" : "password"}
                  w="100%"
                  {...register("password", {
                    required: "Password is required for sign in",
                  })}
                  name="password"
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
              type="submit"
              variant="primary"
            >
              Sign in
            </Button>
          </form>

          <Center mb={2}>
            <Text>
              Forgotten password?
              <Link to="#">
                <span
                  onClick={() => gotoResetPasswordPage()}
                  style={{
                    color: "primary",
                    textDecoration: "underline",
                    marginLeft: ".5rem",
                  }}
                >
                  Reset password
                </span>
              </Link>
            </Text>
          </Center>

          <Image src={loginDivider} mb={5} />

          <Link href={`${process.env.REACT_APP_SERVER_URL}/api/connect/google`}>
            <GoogleButton />
          </Link>
          <FacebookButton onClick={() => alert("SAY HELLO")} />
        </ModalBody>

        <Center>
          <Text>
            Don't have an account?
            <Link to="#">
              <span
                onClick={handleRegisterClick}
                style={{
                  color: "primary",
                  textDecoration: "underline",
                  marginLeft: ".5rem",
                }}
              >
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
