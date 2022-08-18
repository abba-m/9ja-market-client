import React from "react";
import { formStructure } from "components/postAdForms/adDetailsForm/adDetailsForm.utils";
import { useForm } from "react-hook-form";
import ShortUniqueId from "short-unique-id";

const PostAdContext = React.createContext();

function PostAdProvider(props) {
  //constructed state objects
  const selectedCategoryState = React.useState("");
  const currentImagesState = React.useState([]);
  const imagesPreviewState = React.useState([]);
  const dynamicFormState = React.useState([]);
  const uid = new ShortUniqueId({ length: 5 });

  //destructured state objects
  const [images] = currentImagesState;
  const [, setPreviews] = imagesPreviewState;
  const [selectedCategory] = selectedCategoryState;
  const [, setDynamicFormValue] = dynamicFormState;

  const createImagePreviews = () => {
    if (!images.length) return;
    const temporaryStore = [];
    images.forEach((current) => {
      for (const i in current) {
        if (!isNaN(i)) {
          const imgSrc = URL.createObjectURL(current[i]);
          temporaryStore.push({ imgSrc: imgSrc, imgId: uid()});
        }
      }
      setPreviews([...temporaryStore]);
    });
    temporaryStore.length = 0;
  };

  const setDynamicForm = () => {
    let getCurrentForm =
      formStructure[selectedCategory] || formStructure["Basic"];
    setDynamicFormValue(getCurrentForm);
  };

  const {
    getValues,
    register,
    reset,
    formState: { errors },
  } = useForm();

  // const val = getValues();
  // console.log({val})

  const handleForm = { register, errors, getValues, reset };

  //Hooks
  React.useEffect(() => {
    if (!images.length) return;
    createImagePreviews();
  }, [images]);

  React.useEffect(() => {
    setDynamicForm();
  }, [selectedCategory]);

  const values = {
    currentImagesState,
    selectedCategoryState,
    imagesPreviewState,
    dynamicFormState,
    handleForm,
  };

  return <PostAdContext.Provider value={values} {...props} />;
}

export { PostAdContext, PostAdProvider };
