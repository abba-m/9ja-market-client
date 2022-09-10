import { useContext } from "react";
import { PostAdContext } from "providers/postAdProvider";
import { Box, Center, Text } from "@chakra-ui/react";
import ShortUniqueId from "short-unique-id";
import {
  InputComponent,
  SelectComponent,
  TextareaComponent,
} from "./dynamicFormComponents";

export const formStructure = {
  Phone: [
    {
      name: "title",
      component: "input",
      type: "text",
      label: "Title",
      placeholder: "Enter phone name",
    },
    {
      name: "condition",
      component: "select",
      label: "Condition",
      placeholder: "Select the phone's condition",
      options: ["New", "Used"],
    },
    {
      name: "manufacturer",
      component: "input",
      type: "text",
      label: "Manufacturer",
      placeholder: "Enter phone manufacturer here",
    },
    {
      name: "price",
      component: "input",
      type: "number",
      label: `Price (${"\u20A6"})`,
    },
    {
      name: "description",
      component: "textArea",
      label: "Description",
      placeholder: "Enter phone description here",
    },
    //REVIEW: get location from an api
    {
      name: "location",
      type: "text",
      component: "input",
      label: "Location",
    },
  ],
  Basic: [
    {
      name: "title",
      component: "input",
      type: "text",
      label: "Title",
      placeholder: "Enter Ad title",
    },
    {
      name: "price",
      component: "input",
      type: "number",
      label: `Price (${"\u20A6"})`,
    },
    {
      name: "description",
      component: "textArea",
      label: "Description",
      placeholder: "Enter Ad description here",
    },
    //REVIEW: get location from an api
    {
      name: "location",
      type: "text",
      component: "input",
      label: "Location",
    },
  ],
};

export function DynamicForm({ fieldsArray }) {
  const {
    handleForm: { register, errors },
  } = useContext(PostAdContext);
  const uid = new ShortUniqueId({ length: 5 });

  const renderFields = (fields) => {
    return fields.map(({ component, ...restOfParams }) => {
      const { name, type, label, placeholder } = restOfParams;
      switch (component) {
      case "input":
        return (
          <InputComponent
            name={name}
            type={type}
            label={label}
            key={uid()}
            placeholder={placeholder}
            register={register}
            errors={errors}
          />
        );
      case "select":
        const { options } = restOfParams;
        return (
          <SelectComponent
            name={name}
            label={label}
            key={uid()}
            placeholder={placeholder}
            options={options}
            register={register}
          />
        );
      case "textArea":
        return (
          <TextareaComponent
            name={name}
            label={label}
            key={uid()}
            placeholder={placeholder}
            register={register}
            errors={errors}
          />
        );
      default:
        return <Text>Invalid Component</Text>;
      }
    });
  };

  //return Main form here;
  return (
    <Box w={["100%", "100%", "70%"]} mx="auto">
      {renderFields(fieldsArray)}
    </Box>
  );
}
