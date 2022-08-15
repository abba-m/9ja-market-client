import React from "react";
import { Box } from "@chakra-ui/react";
import CategoryForm from "components/postAdForms/adCategoryForm/adCategoryForm";
import AdDetailsForm from "components/postAdForms/adDetailsForm/adDetailsForm";
import AdImagesForm from "components/postAdForms/adImagesForm/adImagesForm";
import PreviewAd from "./postAd.preview";

export default function FormView({ step }) {
  switch (step) {
  case 1:
    return <CategoryForm />;
  case 2:
    return <AdDetailsForm />;
  case 3:
    return <AdImagesForm />;
  case 4:
    return <PreviewAd />;
  default:
    return <CategoryForm />;
  }
}
