import { Box, Button, Divider, Text, VStack } from "@chakra-ui/react";
import { useSelector, useDispatch } from "react-redux";
import { deletePost } from "store/actions";

function ListComponent() {
  const dispatch = useDispatch();
  const { Posts } = useSelector((state) => ({
    Posts: state.posts.Posts,
  }));

  const handleDelete = (e) => {
    const id = e.target?.parentNode.getAttribute("postid");
    dispatch(deletePost(id));
  };

  return (
    <>
      <Divider />
      <Box w="50%" p={2}>
        <VStack spacing={2}>
          {Posts && Posts.length ? (
            Posts.map((post, idx) => (
              <Text key={idx} postid={idx} textAlign={"left"}>
                <Button
                  colorScheme="red"
                  size="sm"
                  color="white"
                  mr={4}
                  onClick={handleDelete}
                >
                  X
                </Button>{" "}
                {post.title}
              </Text>
            ))
          ) : (
            <Text fontSize={32}>No Posts Yet</Text>
          )}
        </VStack>
      </Box>
    </>
  );
}

export default ListComponent;
