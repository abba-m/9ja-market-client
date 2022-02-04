import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import { useRef } from "react";
import { useDispatch } from "react-redux";
import { createPost } from "store/actions";

const UserForm = () => {
  const dispatch = useDispatch();

  const title = useRef();
  const description = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();

    if ((title.current.value === "") & (description.current.value === ""))
      return;

    const newPost = {
      title: title.current.value,
      desc: description.current.value,
    };
    dispatch(createPost(newPost));

    e.target.reset();
  };

  return (
    <form onSubmit={handleSubmit} style={{ width: "400px", padding: "1rem" }}>
      <VStack spacing={4}>
        <FormControl>
          <FormLabel>Post title</FormLabel>
          <Input type="text" ref={title} name="first-name" />
        </FormControl>
        <FormControl>
          <FormLabel>Post description</FormLabel>
          <Textarea ref={description} name="last-name" />
        </FormControl>

        <Button variant="primary" size="md" type="submit">
          Post
        </Button>
      </VStack>
    </form>
  );
};

export default UserForm;
