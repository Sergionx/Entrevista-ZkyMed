import * as yup from "yup";
import { cardSchema } from "./card-schema";

export const deckSchema = yup.object({
  title: yup
    .string()
    .required("The title is required")
    .min(3, "The title must have at least 3 characters")
    .max(63, "The title must have at most 63 characters"),
  description: yup
    .string()
    .required("The description is required")
    .min(10, "The description must have at least 10 characters")
    .max(255, "The description must have at most 255 characters"),
  cards: yup
    .array()
    .of(cardSchema)
    .required("The cards are required")
    .min(1, "At least one card is required"),
});
