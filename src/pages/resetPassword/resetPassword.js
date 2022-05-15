import {
  Button,
  Box,
  FormControl,
  FormErrorMessage,
  Input,
  Text,
  Center
  } from "@chakra-ui/react";
import { useRef } from "react";
import { useForm } from "react-hook-form";



const ResetPassword = ()=>{

  const {
    handleSubmit,
    register,
    watch,
    formState: { errors, },
  } = useForm();
  const newPassword = useRef({});
  newPassword.current.value = watch("newPassword", "");

  const handleOTP = ()=> {
    console.log("hi, hi")
  }
  
  
  const handlePasswordReset = ()=> {
    console.log("success two")
  }
  const handleProceed = (e)=>{
    e.preventDefault()


  }

  return(
  <Box 
   w="70vh"
   m="150px auto"
   p="30px"
    borderRadius="6px"
     border="1px solid gray">
  <Text 
  textAlign="center"
  borderBottom="2px solid green.300"
  mb="6"
  fontSize="1.3rem">
    Enter your email to get reset code
  </Text>
  <form onSubmit={handleSubmit(handlePasswordReset)}>
    <FormControl mb="6" isInvalid={errors.recoveryEmail}>
    <Input 
      type="text"
      w="100%"
      name="recoveryEmail"
      placeholder="Enter your Email Address"
      {...register( "recoveryEmail" ,{
        reguired: "registered Email is required to reset password"
      })}
      bg="#FAF3F391"
      
      />

      <FormErrorMessage>
        {errors.recoveryEmail && errors.recoveryEmail.message}
      </FormErrorMessage>
      </FormControl>
            <Center>
      <Button
      w="50%"
      bg="green.300"
       onClick={handleProceed}>
         Next
       </Button>
       </Center>

      
  </form>
  </Box>

  )};

export default ResetPassword;


