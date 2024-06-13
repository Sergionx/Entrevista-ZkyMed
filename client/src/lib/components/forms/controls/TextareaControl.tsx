import React from "react";
import { TextAreaProps, Textarea } from "@nextui-org/input";
import { Control, Controller, FieldValues, Path, RegisterOptions } from "react-hook-form";

interface Props<T extends FieldValues, TName extends Path<T>>
  extends TextAreaProps {
  name: Path<T>;
  label: string;

  control: Control<T>;
  rules?: Omit<
    RegisterOptions<T, TName>,
    "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"
  >;
}

export default function TextareaControl<T extends FieldValues>({
  name,
  label,
  control,
  rules,
  ...props
}: Props<T, Path<T>>) {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ formState, fieldState, field }) => (
        <Textarea
          label={label}
          name={name}
          disabled={formState.isSubmitting || field.disabled}
          {...props}
          isInvalid={
            fieldState.invalid && (formState.isSubmitted || fieldState.isDirty)
          }
          errorMessage={fieldState.error?.message}
          value={field.value}
          onChange={field.onChange}
          onBlur={field.onBlur}
        />
      )}
    ></Controller>
  );
}
