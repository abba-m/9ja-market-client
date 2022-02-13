import { Button } from "@chakra-ui/react";

export default function MyButton({ buttonText, colorScheme, variant, size }) {
  return (
    <Button variant={variant} colorScheme={colorScheme} size={size}>
      {buttonText}
    </Button>
  );
}
