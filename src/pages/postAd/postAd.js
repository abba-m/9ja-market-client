import {
  Box,
  Button,
  Container,
  Heading,
  HStack,
  Progress,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import FormView from "./postAd.formView";

import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import { PostAdProvider } from "providers/postAdProvider";

export default function PostAd() {
  const [step, setStep] = useState(1);

  const pageTitles = {
    1: "Category",
    2: "Ad Details",
    3: "Ad  Images",
    4: "Preview Ad",
  };

  const handleNext = () => {
    if (step >= 4) return;
    setStep(step + 1);
  };
  const handlePrevious = () => {
    if (step <= 1) return;
    setStep(step - 1);
  };

  return (
    <PostAdProvider>
      <Container
        maxWidth={["100%", "90vw"]}
        h="calc(100vh - 80px)"
        justifyContent="center">
        <HStack justifyContent="space-between" spacing={6} my={2}>
          <Button
            variant="primaryOutline"
            disabled={step === 1}
            size="sm"
            onClick={handlePrevious}>
            <AiOutlineArrowLeft style={{ marginRight: ".5rem" }} /> Back
          </Button>
          {/* <Center> */}
          <Heading size="lg">{pageTitles[step]}</Heading>
          {/* </Center> */}
          <Button variant="primary" size="sm" onClick={handleNext}>
            {step === 4 ? (
              "Submit"
            ) : (
              <>
                {"Next"}
                <AiOutlineArrowRight style={{ marginLeft: ".5rem" }} />
              </>
            )}
          </Button>
        </HStack>
        <Progress value={step * 25} size="xs" colorScheme="telegram" />
        <FormView step={step} />
      </Container>
    </PostAdProvider>
  );
}

const color = [
  "whiteAlpha" |
    "blackAlpha" |
    "gray" |
    "red" |
    "orange" |
    "yellow" |
    "green" |
    "teal" |
    "blue" |
    "cyan" |
    "purple" |
    "pink" |
    "linkedin" |
    "facebook" |
    "messenger" |
    "whatsapp" |
    "twitter" |
    "telegram",
];
