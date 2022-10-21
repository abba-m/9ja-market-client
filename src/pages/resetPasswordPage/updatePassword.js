import { ArrowBackIcon } from "@chakra-ui/icons";
import {
  Button,
  Box,
  FormControl,
  Input,
  Center,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { rpcClient } from "services/rpcClient";

function UpdatePassword() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();
  const newPasswordRef = useRef();
  const resetCodeRef = useRef();
  const confirmNewPasswordRef = useRef();
  const toggleIsSubmitting = () => setIsSubmitting((val) => !val);


  const handleSubmit = async (e) => {
    if (isSubmitting) {
      return;
    }
    e.preventDefault();

    toggleIsSubmitting();
    const resetCode = resetCodeRef.current.value;
    const newPassword = newPasswordRef.current.value;
    const confirmNewPassword = confirmNewPasswordRef.current.value;

    if (!resetCode || !newPassword || !confirmNewPassword) {
      toggleIsSubmitting();
      return toast({
        position: "top",
        title: "All fields are required.",
        status: "error",
        isClosable: true,
      });
    }

    if (newPassword !== confirmNewPassword) {
      toggleIsSubmitting();
      return toast({
        position: "top",
        title: "Passwords do not match",
        status: "error",
        isClosable: true,
      });
    }

    const reqData = {
      resetCode,
      password: newPassword,
    };

    try {
      const resp = await rpcClient.request("resetPassword", reqData);
      
      if (!resp.success) throw new Error("Something went wrong");

      toggleIsSubmitting();
      navigate("/", {
        state: {
          openLogin: true,
        },
      });
    } catch (err) {
      toggleIsSubmitting();
      toast({
        position: "top",
        title: "Something is wrong! Please try again.",
        status: "error",
        isClosable: true,
      });
    }
  };

  return (
    <Box maxW="760px" w="90vw" marginInline="auto">
      <Box w="100%" display="flex" justifyContent="flex-start">
        <Button
          onClick={() => navigate("/reset-password")}
          leftIcon={<ArrowBackIcon />}
          variant="primaryOutline"
        >
          Prev page
        </Button>
      </Box>
      <Box
        w={["80%", "70%", "50%"]}
        m="70px auto"
        p={4}
        borderRadius="6px"
        border="1px solid gray"
      >
        <Text
          textAlign="center"
          pb="2"
          mb="6"
          fontSize="1.5rem"
          color="green.500"
        >
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
              variant="primary"
            >
              submit
            </Button>
          </Center>
        </form>
      </Box>
    </Box>
  );
}

export default UpdatePassword;
