import { ArrowBackIcon } from "@chakra-ui/icons";
import {
  Button,
  Box,
  FormControl,
  Input,
  Center,
  Text,
  useToast
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { sendRequest } from "utils/connection";

function UpdatePassword() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const toast = useToast()
  const navigate = useNavigate();
  const newPasswordRef = useRef();
  const resetCodeRef = useRef();
  const confirmNewPasswordRef = useRef();
  const token = localStorage.getItem("token");

  const handleSubmit = async (e) => {
    if (isSubmitting) {
      return;
    }
    e.preventDefault();

    setIsSubmitting(true);
    const resetCode = resetCodeRef.current.value
    const newPassword = newPasswordRef.current.value
    const confirmNewPassword = confirmNewPasswordRef.current.value

    if (!resetCode || !newPassword || !confirmNewPassword) {
      setIsSubmitting(false);
      return toast({
        position: "top",
        title: "All fields are required.",
        status: "error",
        isClosable: true,
      })
    }

    if (newPassword !== confirmNewPassword) {
      setIsSubmitting(false);
      return toast({
        position: "top",
        title: "Passwords do not match",
        status: "error",
        isClosable: true,
      })
    }

    const reqData = {
      resetCode,
      password: newPassword,
    }

    const [res, error] = await sendRequest(fetch(`${process.env.REACT_APP_SERVER_URL}/auth/update-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(reqData),
    }))

    if (error) {
      setIsSubmitting(false);
      toast({
        position: "top",
        title: error.title ?? "Something is wrong! Please try again.",
        status: "error",
        isClosable: true,
      });
      return
    }

    const data = await res.json();

    if (data.error) {
      setIsSubmitting(false);
      return toast({
        position: "top",
        title: data.error.message ?? "Something is wrong! Please try again.",
        status: "error",
        isClosable: true,
      });
    }

    toast({
      position: "top",
      title: data.message ?? "Request successful.",
      status: "success",
      isClosable: true,
    })
    setIsSubmitting(false);
    resetCodeRef.current.value = "";
    newPasswordRef.current.value = "";
    confirmNewPasswordRef.current.value = "";
    navigate("/", {
      state: {
        openLogin: true,
      }
    })

  }

  return (
    <>
      <Box w="100%" display="flex" justifyContent="flex-start">
        <Button onClick={() => navigate("/reset-password")} leftIcon={<ArrowBackIcon />} variant='primaryOutline'>
          Prev page
        </Button>
      </Box>
      <Box
        w={["80%", "70%", "50%"]}
        m="70px auto"
        p={4}
        borderRadius="6px"
        border="1px solid gray">
        <Text
          textAlign="center"
          pb="2"
          mb="6"
          fontSize="1.5rem"
          color="green.500">
          Change password
        </Text>

        <form onSubmit={handleSubmit}>
          <FormControl mb="6" isRequired>
            <Input
              type="text"
              ref={resetCodeRef}
              name="resetCode"
              w="100%"
              placeholder="Enter reset code sent to email"
              bg="#FAF3F391"
            />
          </FormControl>

          <FormControl mb="6" isRequired>
            <Input
              type="password"
              ref={newPasswordRef}
              name="newPassword"
              w="100%"
              placeholder="Enter new password"
              bg="#FAF3F391"
            />

          </FormControl>
          <FormControl mb="6" isRequired>
            <Input
              type="password"
              ref={confirmNewPasswordRef}
              name="confirmNewPassword"
              w="100%"
              placeholder="Confirm new password"
              bg="#FAF3F391"
            />
          </FormControl>
          <Center>
            <Button
              w="50%"
              type="submit"
              isLoading={isSubmitting}
              mb="o"
              variant="primary"
            >submit
            </Button>
          </Center>
        </form>
      </Box>
    </>

  )
};

export default UpdatePassword;


