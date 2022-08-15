import { Box, Divider, Image, Text, useToast } from "@chakra-ui/react";
import { PostAdContext } from "providers/postAdProvider";
import { formatAmount } from "utils/format.utils";

import { useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import ShortUniqueId from "short-unique-id";

/** Actions & Mutations */
import { setSubmitPostFunction } from "store/actions";
import { postRequest } from "services/request";
import { useMutation } from "@tanstack/react-query";
import { validateInputs } from "utils/utils";
import { useNavigate } from "react-router-dom";

function PreviewAd() {
  const {
    handleForm: { getValues, reset },
    imagesPreviewState: [images, setImages],
    currentImagesState: [currentImages, setCurrentImages],
    selectedCategoryState: [selectedCategory, setSelectedCategory],
  } = useContext(PostAdContext);
  const dispatch = useDispatch();
  const toast = useToast();
  const values = getValues();
  const uid = new ShortUniqueId({ length: 5 });
  const [imagesToBeUploaded, setImagesToBeUploaded] = useState([]);
  const navigate  = useNavigate();

  const { mutate, isLoading, error, data } = useMutation((data) => {
    return postRequest("api/posts", data);
  });

  useEffect(() => {
    if (error) {
      toast({
        position: "top",
        title: error,
        status: "error",
        isClosable: true,
      });
    }
  }, [error]);

  useEffect(() => {
    if (data) {
      toast({
        position: "top",
        title: `Post with ticket no. (${uid()}) has been submitted succesfully`,
        status: "info",
        isClosable: true,
      });

      //reset all fields
      reset();
      setImages([]);
      setCurrentImages([]);
      setSelectedCategory("");

      navigate("/");
    }
  }, [data]);

  const handleSubmit = async () => {
    if (isLoading) return;

    const errors = validateInputs({ selectedCategory, formValues: values, images });
    if (errors.length) {
      errors.forEach((err) =>
        toast({
          position: "top",
          title: err,
          status: "error",
          isClosable: true,
        })
      );
      return;
    }
    console.log("Submitting form....");

    //values.userId = currentUserId;
    values.category = selectedCategory;
    values.price = Number(values.price);

    const postFormData = new FormData();

    for (const i in imagesToBeUploaded) {
      const current = imagesToBeUploaded[i];
      postFormData.append("images", current, current?.name);
    }

    postFormData.append("data", JSON.stringify(values));

    try {

      mutate(postFormData);

     
    } catch (err) {
      //TODO: display error properly
      alert(`${err?.status || "Something went wrong."} Please try again.`);
      console.log("[createPostError]:", err || "Something went wrong.");
    }
  };

  useEffect(() => {
    dispatch(setSubmitPostFunction(handleSubmit));

    currentImages.forEach((current) => {
      for (const i in current) {
        if (!isNaN(i)) {
          imagesToBeUploaded.push(current[i]);
          setImagesToBeUploaded([...imagesToBeUploaded]);
        }
      }
    });
  }, []);

  return (
    <Box w="50" h="85%" overflowY="auto" px={4}>
      {Object.entries(values).map((value) => (
        <Box my={3}>
          <Text
            fontSize="sm"
            fontWeight="bold"
            casing="capitalize"
            color="primary"
          >
            {value[0]}
          </Text>
          <Text fontSize="sm">
            {value[0] === "price" ? formatAmount(value[1]) : value[1]}
          </Text>
        </Box>
      ))}
      <Divider />
      <Box mt={3}>
        <Text
          fontSize="md"
          mb={2}
          fontWeight="bold"
          casing="capitalize"
          color="primary"
        >
          Images
        </Text>
        {images.length === 0 ? (
          <Text color="gray.400">No images selected</Text>
        ) : (
          <Box display="flex" gap={3} flexWrap="wrap">
            {images.map((value) => (
              <Image key={uid()} src={value} h={150} w={150} />
            ))}
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default PreviewAd;
