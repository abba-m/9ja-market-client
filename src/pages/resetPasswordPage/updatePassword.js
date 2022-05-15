import {
  Button,
  Box,
  FormControl,
  FormErrorMessage,
  Input,
  InputGroup,
  Center,
  Text
} from "@chakra-ui/react";
import { useRef } from "react";
import { useForm } from "react-hook-form";



const UpdatePassword = () => {
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();
  const newPassword = useRef({});
  newPassword.current.value = watch("newPassword", "");



  const handlePasswordReset = () => {
    console.log("success two")
  }

  return (
    <Box
      w="70vh"
      m="100px auto"
      p="30px"
      borderRadius="6px"
      border="1px solid gray">
      <Text
        textAlign="center"
        pb="2"
        mb="6"
        fontSize="1.5rem"
        color="green.500">
        Proceed to change password
      </Text>

      <form>
        <FormControl mb="6" isInValid={errors.OTP}>
          <Input
            type="text"
            name="OTP"
            w="100%"
            placeholder="Enter validation code sent to mail"
            {...register("OTP", {
              required: "Enter the One Times Password sent to your Email"
            })}
            bg="#FAF3F391"

          />
          <FormErrorMessage>
            {errors.OTP && errors.OTP.message}
          </FormErrorMessage>

        </FormControl>

        <FormControl mb="6" isInValid={errors.newPassword}>
          <Input
            ref={newPassword}
            type="password"
            name="newPassword"
            w="100%"
            placeholder="Enter new password"
            {...register("newPassword", {
              required: "You must specify a new password",
              minLength: {
                value: 8,
                message: "Password must have at least 8 characters"
              }
            })}
            bg="#FAF3F391"

          />
          <FormErrorMessage>
            {errors.newPassword && errors.newPassword.message}
          </FormErrorMessage>

        </FormControl>
        <FormControl mb="6" isInValid={errors.confirmNewPassword}>
          <Input
            type="password"
            name="confirmNewPassword"
            w="100%"
            placeholder="confirm new password"
            {...register("confirmNewPassword", {
              validate: value =>
                value === newPassword.current.value || "The passwords do not match"
            })}
            bg="#FAF3F391"

          />
          <FormErrorMessage>
            {errors.confirmNewPassword && errors.confirmNewPassword.message}
          </FormErrorMessage>

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

  )
};

export default UpdatePassword;


