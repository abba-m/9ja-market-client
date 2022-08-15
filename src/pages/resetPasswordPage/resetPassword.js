import { useRef, useState } from "react";
import {
  Button,
  Box,
  FormControl,
  Input,
  Text,
  Center,
  useToast,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { sendRequest } from "utils/connection";
import { ArrowForwardIcon } from "@chakra-ui/icons";

function ResetPassword() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const email = useRef();
  const toast = useToast();
  const navigate = useNavigate();

  const handleProceed = async (e) => {
    if (isSubmitting) {
      return;
    }

    e.preventDefault();
    setIsSubmitting(true);

    const value = email.current.value;
    const reqData = { email: value };

    if (!value) {
      toast({
        position: "top",
        title: "Enter email to proceed.",
        status: "error",
        isClosable: true,
      });
      setIsSubmitting(false);
      return;
    }

    const [res, error] = await sendRequest(
      fetch(`${process.env.REACT_APP_SERVER_URL}/auth/reset-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reqData),
      })
    );

    if (error) {
      setIsSubmitting(false);
      return toast({
        position: "top",
        title: "Something is wrong! Please try again.",
        status: "error",
        isClosable: true,
      });
    }

    const data = await res.json();

    if (!data.error) {
      toast({
        position: "top",
        title: "Reset code has been sent to your email",
        status: "info",
        isClosable: true,
      });
      setIsSubmitting(false);

      return navigate("/update-password");
    }

    toast({
      position: "top",
      title: data.error.message,
      status: "error",
      isClosable: true,
    });
    setIsSubmitting(false);
  };

  return (
    <>
      <Box w="100%" display="flex" justifyContent="flex-end">
        <Button
          onClick={() => navigate("/update-password")}
          rightIcon={<ArrowForwardIcon />}
          variant="primaryOutline"
        >
          Next page
        </Button>
      </Box>
      <Box
        w={["80%", "70%", "50%"]}
        m="100px auto"
        borderRadius="6px"
        p={4}
        border="1px solid gray"
      >
        <Text
          textAlign="center"
          borderBottom="2px solid green.300"
          mb="6"
          fontSize="1.3rem"
        >
          Enter email to get reset code
        </Text>
        <form onSubmit={handleProceed}>
          <FormControl mb="6">
            <Input
              type="text"
              w="100%"
              my={4}
              name="email"
              ref={email}
              placeholder="johndoe@example.com"
              bg="#FAF3F391"
              required
            />
          </FormControl>
          <Center>
            <Button
              w="50%"
              isLoading={isSubmitting}
              bg="green.300"
              type="submit"
            >
              Send
            </Button>
          </Center>
        </form>
      </Box>
    </>
  );
}

export default ResetPassword;
