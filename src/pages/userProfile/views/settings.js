import { Box, Button, Divider, FormControl, FormErrorMessage, Heading, Input, InputGroup, useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { get, useForm } from "react-hook-form";
import { rpcClient } from "services/rpcClient";

function SettingsView() {
  const toast = useToast();
  const {
    handleSubmit,
    register,
    getValues,
    reset,
    formState: { errors },
  } = useForm();

  const showToast = (message, type) => (
    toast({
      title: message,
      position: "top",
      status: type,
      isClosable: true,
    })
  );

  const handleChangePassword = async (data) => {
    const result = await rpcClient.request("changePassword", data);

    showToast(result.message, result.success ? "success" : "error");
    if (result.success) {
      reset();
    }
  };

  return (
    <Box w="80vw" pr={3}>
      <Heading size="lg" color="secondary">Settings</Heading>
      {/* change password */}
      <Heading mt={2} size="sm">Change password</Heading>
      <Box mt={2} p={4} pl={0}>
        <form onSubmit={handleSubmit(handleChangePassword)}>
          <FormControl mb={6} isInvalid={errors.password}>
            <Input
              type="password"
              w="80%"
              name="password"
              {...register("password", {
                required: "Enter current password",
              })}
              bg="#FAF3F391"
              placeholder="Enter current password"
            />
          </FormControl>

          <FormControl mb={6} isInvalid={errors.newPassword}>
            <InputGroup>
              <Input
                type="password"
                w="80%"
                name="newPassword"
                {...register("newPassword", {
                  required: "New password is required",
                })}
                bg="#FAF3F391"
                placeholder="Enter new password"
              />
            </InputGroup>
          </FormControl>
          
          <FormControl mb={4} isInvalid={errors.confirmPassword}>
            <InputGroup>
              <Input
                type="password"
                w="80%"
                name="confirmPassword"
                {...register("confirmPassword", {
                  deps: ["newPassword"], 
                  validate: {
                    match: (value) => String(value) === String(getValues("newPassword")),
                  },
                })}
                bg="#FAF3F391"
                placeholder="Confirm password"
              />
            </InputGroup>

            <FormErrorMessage>
              {errors.confirmPassword && "Passwords do not match"}
            </FormErrorMessage>
          </FormControl>

          <Button
            type="submit"
            size="sm"
            variant="primary"
          >Save</Button>
        </form>
      </Box>
      <Divider shadow="dark-lg" />
      <Heading mt={2} size="sm">Verify email</Heading>
      <Box mt={2} p={4} pl={0}></Box>
    </Box>
  );
}

export default SettingsView;
