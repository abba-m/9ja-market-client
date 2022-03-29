import { Box, Divider, Image, Text, useToast } from "@chakra-ui/react";
import { PostAdContext } from "providers/postAdProvider";
import { formatAmount } from "utils/format";
import axios from "axios";

import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useMutation, useApolloClient } from "@apollo/client";

import ShortUniqueId from "short-unique-id";

/** Actions & Mutations */
import { setSubmitPostFunction } from "store/actions";

function PreviewAd() {
  const { handleForm: { getValues, reset }, imagesPreviewState: [images, setImages], currentImagesState: [currentImages, setCurrentImages], selectedCategoryState: [selectedCategory, setSelectedCategory] } = useContext(PostAdContext);
  const dispatch = useDispatch();
  const toast = useToast();
  const values = getValues();
  const uid = new ShortUniqueId({ length: 5 });
  const { currentUserId } = useSelector((state) => ({ currentUserId: state.auth.user.id }));
  const [imagesToBeUploaded, setImagesToBeUploaded] = useState([]);
  const [isLoading, setIsloading] = useState(false);
  const token = localStorage.getItem("token");

  const validateInputs = () => {
    const errors = [];
    console.log("Validating inputs...");


    if (!selectedCategory) {
      errors.push("Please select a catogery and add details");
      return errors
    }

    if (Object.values(values).some((val) => !val)) {
      errors.push("All Post details are required")
    }

    if (!images.length || images.length < 3) {
      errors.push("Please add at least 3 image")
    }

    //TODO: Add more validations...

    return errors
  }

  const handleSubmit = async (callback, step) => {
    if (isLoading) return

    setIsloading(true)

    const errors = validateInputs()
    if (errors.length) {
      errors.forEach(err => toast({
        position: "top",
        title: err,
        status: "error",
        isClosable: true,
      }))
      setIsloading(false)
      return
    };
    console.log("Submitting form....");

    values.postedBy = currentUserId;
    values.category = selectedCategory;
    values.price = Number(values.price)

    const postFormData = new FormData()

    for (const i in imagesToBeUploaded) {
      const current = imagesToBeUploaded[i]
      postFormData.append(`files.images`, current, current?.name)
    }

    postFormData.append("data", JSON.stringify(values))

    try {
      const res = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/posts`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: postFormData
      })

      const data = await res.json()

      if (data.error) {
        throw new Error(data)
      }

      //console.log("[datum]:", data)
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
      callback(step);
      setIsloading(false);

    } catch (err) {
      //TODO: display error properly
      alert(`${err?.status || "Something went wrong."} Please try again.`)
      console.log("[createPostError]:", err || "Something went wrong.")
    }
  }

  const deletePost = async () => {
    try {
      const res = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/posts/4`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      const data = await res.json()
      if (data) {
        console.log("[deletePost]:", data)
      }
    } catch (error) {
      console.warn(error)
    }
  }

  useEffect(() => {
    dispatch(setSubmitPostFunction(handleSubmit))

    currentImages.forEach((current) => {
      for (const i in current) {
        if (!isNaN(i)) {
          imagesToBeUploaded.push(current[i]);
          setImagesToBeUploaded([...imagesToBeUploaded]);
        }
      }
    });
  }, [])

  return (
    <Box w="50" h="85%" overflowY="auto" px={4}>
      {Object.entries(values).map(value => (
        <Box my={3}>
          <Text fontSize="sm" fontWeight="bold" casing="capitalize" color="primary">{value[0]}</Text>
          <Text fontSize="sm">{value[0] === "price" ? formatAmount(value[1]) : value[1]}</Text>
        </Box>
      ))}
      <Divider />
      <Box mt={3}>
        <Text fontSize="md" mb={2} fontWeight="bold" casing="capitalize" color="primary">Images</Text>
        {images.length === 0 ? <Text color="gray.400">No images selected</Text> :
          <Box display="flex" gap={3} flexWrap="wrap">
            {images.map((value) => <Image key={uid()} src={value} h={150} w={150} />)}
          </Box>
        }
      </Box>
    </Box>
  );
}

export default PreviewAd;
