import {
  Box,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Select,
  Textarea,
} from "@chakra-ui/react";
import ShortUniqueId from "short-unique-id";

export function InputComponent({
  name,
  label,
  placeholder,
  type,
  register,
  errors,
}) {
  return (
    <FormControl mb={6} isInvalid={errors[name]}>
      <FormLabel htmlFor={name}>{label}</FormLabel>
      <Input
        name={name}
        placeholder={placeholder}
        type={type}
        {...register(name, {
          required: `${label} is required!`,
        })}
      />

      <FormErrorMessage>
        {errors[name] && errors[name].message}
      </FormErrorMessage>
    </FormControl>
  );
}

export function SelectComponent({
  label,
  name,
  placeholder,
  options,
  register,
}) {
  const uid = new ShortUniqueId({ length: 5 });
  return (
    <FormControl mb={6} x>
      <FormLabel htmlFor={name}>{label}</FormLabel>
      <Select
        id={name}
        name={name}
        placeholder={placeholder}
        {...register(name)}
      >
        {options.map((value) => (
          <option key={uid()}>{value}</option>
        ))}
      </Select>
    </FormControl>
  );
}

export function TextareaComponent({
  name,
  label,
  placeholder,
  register,
  errors,
}) {
  return (
    <FormControl mb={6} isInvalid={errors[name]}>
      <FormLabel htmlFor={name}>{label}</FormLabel>
      <Textarea
        name={name}
        placeholder={placeholder}
        {...register(name, { required: `${label} is required!` })}
      />

      <FormErrorMessage>
        {errors[name] && errors[name].message}
      </FormErrorMessage>
    </FormControl>
  );
}
