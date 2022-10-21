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
import { ArrowForwardIcon } from "@chakra-ui/icons";
import { rpcClient } from "services/rpcClient";

function ResetPassword() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const emailInput = useRef();
  const toast = useToast();
  const navigate = useNavigate();
  const toggleIsSubmitting = () => setIsSubmitting((val) => !val);

  const handleProceed = async (e) => {
    if (isSubmitting) {
      return;
    }

    e.preventDefault();
    toggleIsSubmitting();

    const email = emailInput.current.value;

    if (!email) {
      toast({
        position: "top",
        title: "Enter email to proceed.",
        status: "error",
        isClosable: true,
      });
      toggleIsSubmitting();
      return;
    }

    try {
      await rpcClient.request("getPasswordResetCode", { email });
      
      toast({
        position: "bottom",
        title: "Reset code has been sent to your email",
        status: "info",
        isClosable: true,
      });

      return navigate("/update-password");
    } catch (error) {
      toggleIsSubmitting();
      toast({
        position: "top",
        title: error?.message || error?.toString(),
        status: "error",
        isClosable: true,
      });
    }


    
  };

  return (
    <Box maxW="760px" w="90vw" marginInline="auto">
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
              ref={emailInput}
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
    </Box>
  );
}

export default ResetPassword;
