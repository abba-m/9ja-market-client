import { Box, Divider, Text, VStack } from "@chakra-ui/react";
import React from "react";
import { useSelector } from "react-redux";

function ListComponent() {
  const { Posts } = useSelector((state) => ({
    Posts: state.posts.Posts,
  }));

  return (
    <>
      <Divider />
      <Box w="50%" p={2}>
        <VStack spacing={2}>
          {Posts && Posts.length ? (
            Posts.map((post) => (
              <Text key={post.id} textAlign={"left"}>
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
