import { Button, Container, Flex, FormControl, FormErrorMessage, HStack, Input, Modal, ModalContent, ModalOverlay, Text, Textarea, useToast } from "@chakra-ui/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { rpcClient } from "services/rpcClient";

function EditPostModal({ isOpen, onClose, data, postId, refetch }) {
  const [isLoading, setIsLoading] = useState(false);
  // const [postData, setPostData] = useState({});
  const toast = useToast();
  const toggleIsLoading = () => setIsLoading(val => !val);

  const { register, handleSubmit, formState: { errors }, } = useForm({
    defaultValues: {
      title: data?.title,
      description: data?.description,
      price: data?.price,
      location: data?.location,
    }
  });


  const handleEditPost = async (data) => {
    toggleIsLoading();
    try {
      await rpcClient.request("editPost", { postId, data });

      refetch();
      onClose();
      toggleIsLoading();
      toast({
        position: "top",
        title: "Ad updated successfully",
        status: "success",
        isClosable: true,
      });
    } catch (err) {
      console.log(err);
      toggleIsLoading();
      onClose();
      toast({
        position: "top",
        title: "Failed to Edit Ad.",
        status: "error",
        isClosable: true,
      });
    };
  };

  return (
    <Modal maxWidth="400px" marginInline isOpen={isOpen} onClose={onClose} blockScrollOnMount={false}>
      <ModalOverlay />
      <ModalContent>

        <Container maxWidth="500px" h="fit-content" p={4} centerContent>
          <Flex direction="column" w="100%" paddingInline={4}>
            <form onSubmit={handleSubmit(handleEditPost)}>
              <Flex gap={3} direction="column" mb={6}>
                <FormControl isInvalid={errors.title}>
                  <Text fontWeight="semibold" mb='8px'>Title</Text>
                  <Input
                    type="text"
                    w="100%"
                    name="title"
                    {...register("title", {
                      required: "Title cannot be empty",
                    })}
                    bg="#FAF3F391"
                    placeholder="Enter ad title"
                  />

                  <FormErrorMessage>
                    {errors.title && errors.title.message}
                  </FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={errors.description}>
                  <Text fontWeight="semibold" mb='8px'>Description</Text>
                  <Textarea
                    name="description"
                    bg="#FAF3F391"
                    w="100%"
                    placeholder="Enter ad description"
                    {...register("description", {
                      required: "Description cannot be empty",
                    })}
                  />

                  <FormErrorMessage>
                    {errors.description && errors.description.message}
                  </FormErrorMessage>
                </FormControl>
              
                <FormControl isInvalid={errors.price}>
                  <Text fontWeight="semibold" mb='8px'>Price</Text>
                  <Input
                    type="number"
                    w="100%"
                    name="price"
                    {...register("price", {
                      min: {
                        value: 1,
                        message: "Enter a valid price",
                      }
                    })}
                    bg="#FAF3F391"
                    placeholder="Enter ad price"
                  />

                  <FormErrorMessage>
                    {errors.price && errors.price.message}
                  </FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={errors.location}>
                  <Text fontWeight="semibold" mb='8px'>Location</Text>
                  <Input
                    type="text"
                    w="100%"
                    name="location"
                    {...register("location", {
                      required: "location cannot be empty",
                    })}
                    bg="#FAF3F391"
                    placeholder="Enter ad location"
                  />

                  <FormErrorMessage>
                    {errors.location && errors.location.message}
                  </FormErrorMessage>
                </FormControl>
              </Flex>

              <HStack mt={3} gap={4} justifyContent="flex-end">
                <Button variant="primaryOutline" onClick={onClose}>Cancel</Button>
                <Button variant="primary" type="submit" isLoading={isLoading}>Update</Button>
              </HStack>
            </form>
          </Flex>
        </Container>
      </ModalContent>
    </Modal>
  );
}

export default EditPostModal;