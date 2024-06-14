import * as yup from "yup";
export const cardSchema = yup.object({
  question: yup
    .string()
    .required("The question is required")
    .min(3, "The question must have at least 3 characters")
    .max(63, "The question must have at most 63 characters"),
  answer: yup
    .string()
    .required("The answer is required")
    .min(10, "The answer must have at least 10 characters")
    .max(255, "The answer must have at most 255 characters"),
});
