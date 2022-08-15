export const validateInputs = ({ selectedCategory, formValues, images, }) => {
  const errors = [];
  console.log("Validating inputs...");

  if (!selectedCategory) {
    errors.push("Please select a catogery and add details");
    return errors;
  }

  if (Object.values(formValues).some((val) => !val)) {
    errors.push("All Post details are required");
  }

  if (!images.length || images.length < 3) {
    errors.push("Please add at least 3 image");
  }

  //TODO: Add more validations...

  return errors;
};