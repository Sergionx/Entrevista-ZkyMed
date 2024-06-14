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
import {
  Control,
  FieldValues,
  Path,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { IconQuestionMark, IconCheck } from "@tabler/icons-react";
import InputControl from "../forms/controls/InputControl";
import TextareaControl from "../forms/controls/TextareaControl";
import { yupResolver } from "@hookform/resolvers/yup";
import { cardSchema } from "../../schemas/card-schema";

interface Props {
  deck: Deck | null;
  onClose: () => void;
}

export interface AnswerFormValues {
  question: string;
  answer: string;
}

export default function CreateCardModal({ deck, onClose }: Props) {
  const { handleSubmit, formState, control } = useForm<AnswerFormValues>({
    defaultValues: {
      question: "",
      answer: "",
    },
    mode: "all",
    resolver: yupResolver(cardSchema),
  });

  const onSubmit: SubmitHandler<AnswerFormValues> = (data) => {
    try {
      onClose();
    } catch (error) {}
  };

  return (
    <Modal
      isOpen={!!deck}
      isDismissable
      onClose={onClose}
      classNames={{
        backdrop:
          "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20",
      }}
    >
      {deck && (
        <ModalContent>
          <ModalHeader>Create a new card</ModalHeader>

          <form onSubmit={handleSubmit(onSubmit)}>
            <ModalBody className="z-10 flex flex-col gap-4">
              <QuestionInput control={control} name="question" />

              <AnswerInput control={control} name="answer" />
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
        </ModalContent>
      )}
    </Modal>
  );
}

interface InputsProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
}

export function QuestionInput<T extends FieldValues>({
  control,
  name,
}: InputsProps<T>) {
  return (
    <InputControl
      label="Question"
      placeholder="Write your question"
      control={control}
      name={name}
      startContent={<IconQuestionMark />}
    />
  );
}

export function AnswerInput<T extends FieldValues>({
  control,
  name,
}: InputsProps<T>) {
  return (
    <TextareaControl
      label="Answer"
      placeholder="Write your answer"
      control={control}
      name={name}
      startContent={<IconCheck />}
    />
  );
}
