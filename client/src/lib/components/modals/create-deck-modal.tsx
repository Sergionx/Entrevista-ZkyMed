import { Deck } from "@/lib/models/Deck";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import React from "react";
import SubmitButton from "../forms/SubmitButton";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { IconPlus, IconTrash } from "@tabler/icons-react";
import InputControl from "../forms/controls/InputControl";
import TextareaControl from "../forms/controls/TextareaControl";
import {
  AnswerFormValues,
  AnswerInput,
  QuestionInput,
} from "./create-card-modal";
import { yupResolver } from "@hookform/resolvers/yup";
import { deckSchema } from "@/lib/schemas/deck-schema";

interface Props {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

export interface FormValues {
  title: string;
  description: string;
  cards: AnswerFormValues[];
}

export default function CreateDeckModal({ isOpen, onOpenChange }: Props) {
  const { handleSubmit, formState, control } = useForm<FormValues>({
    defaultValues: {
      title: "",
      description: "",
      cards: [
        {
          answer: "",
          question: "",
        },
      ],
    },
    shouldFocusError: true,
    mode: "onSubmit",
    resolver: yupResolver(deckSchema),
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "cards",
  });

  // TODO - Pasar como onClose como parametro
  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log(data);
    try {
      // onClose();
    } catch (error) {}
  };

  return (
    <Modal
      isOpen={isOpen}
      isDismissable
      onOpenChange={onOpenChange}
      scrollBehavior="inside"
      classNames={{
        base: "max-h-[60rem]",
        backdrop:
          "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20",
      }}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader>Create a new Deck</ModalHeader>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-1 flex-col overflow-y-auto"
            >
              <ModalBody className="z-10">
                <section className="space-y-4">
                  <InputControl
                    label="Title"
                    placeholder="Write the title for your deck"
                    control={control}
                    name="title"
                    rules={{
                      minLength: {
                        value: 3,
                        message: "The question must have at least 3 characters",
                      },
                      maxLength: {
                        value: 63,
                        message: "The question must have at most 63 characters",
                      },
                    }}
                  />
                  <TextareaControl
                    label="Description"
                    placeholder="Write the description for your deck"
                    control={control}
                    name="description"
                    rules={{
                      minLength: {
                        value: 10,
                        message:
                          "The question must have at least 10 characters",
                      },
                      maxLength: {
                        value: 255,
                        message:
                          "The question must have at most 255 characters",
                      },
                    }}
                  />
                </section>

                <h3 className="font-bold mt-2">Cards for your deck</h3>
                <section className="space-y-4">
                  {fields.map((field, index) => (
                    <fieldset key={field.id} className="space-y-2">
                      <span className="flex justify-between items-center">
                        <h4>Card {index + 1}</h4>

                        <Button
                          color="danger"
                          variant="light"
                          isIconOnly
                          onClick={() => remove(index)}
                          disabled={fields.length === 1}
                          className="disabled:opacity-50 disabled:hover:bg-transparent"
                        >
                          <IconTrash />
                        </Button>
                      </span>

                      <QuestionInput
                        control={control}
                        name={`cards.${index}.question`}
                      />
                      <AnswerInput
                        control={control}
                        name={`cards.${index}.answer`}
                      />
                    </fieldset>
                  ))}
                  <Button
                    color="success"
                    variant="bordered"
                    onClick={() => append({ answer: "", question: "" })}
                  >
                    <IconPlus />
                    Add another card
                  </Button>
                </section>
              </ModalBody>

              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>

                <SubmitButton
                  isLoading={formState.isLoading || formState.isSubmitting}
                />
              </ModalFooter>
            </form>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
