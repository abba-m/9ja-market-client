import { Button, Container, Flex, HStack, Input, Modal, ModalContent, ModalOverlay, Text, useToast } from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { deleteRequest } from "services/request";

function DeletePostModal ({ isOpen, onClose, postTitle, postId }) {
  const titleRef = useRef();
  const toast = useToast();
  const navigate = useNavigate();

  const { mutate, isLoading, error, data } = useMutation((postId) => {
    return deleteRequest(`api/posts/d/${postId}`);
  });

  useEffect(() => {
    if (data) {
      toast({
        position: "top",
        title: "Post deleted successfully",
        status: "success",
        isClosable: true,
      });
      navigate(-1);
      onClose();
    }

    if (error) {
      onClose();
      toast({
        position: "top",
        title: "[Error]: Failed to delete post, try later.",
        status: "error",
        isClosable: true,
      });
    }
  }, [data, error]);

  const handleDeletePost = () => {
    if (titleRef.current.value === postTitle?.toUpperCase()) {
      mutate(postId);
    } else {
      toast({
        position: "top",
        title: "Supply correct text to perform delete",
        status: "info",
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
            <Text mb={2} fontWeight="medium">Please type <b>"{postTitle?.toUpperCase()}"</b> below to confirm delete</Text>
            <Text mb={8} color="red" as='sub'>This action can not be undone</Text>

            <Input type="text" ref={titleRef} w="100%" />
            <HStack mt={3} justifyContent="flex-end">
              <Button colorScheme="green" onClick={onClose}>Cancel</Button>
              <Button colorScheme="red" onClick={handleDeletePost} isLoading={isLoading}>Proceed delete</Button>
            </HStack>
          </Flex>
        </Container>
      </ModalContent>
    </Modal>
  );
}

export default DeletePostModal;