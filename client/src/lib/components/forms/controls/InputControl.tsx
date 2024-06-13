import React from "react";
import { Input, InputProps } from "@nextui-org/input";
import {
  Control,
  Controller,
  FieldValues,
  Path,
  RegisterOptions,
} from "react-hook-form";

interface Props<T extends FieldValues, TName extends Path<T>>
  extends InputProps {
  name: Path<T>;
  label: string;

  control: Control<T>;
  rules?: Omit<
    RegisterOptions<T, TName>,
    "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"
  >;
}

export default function InputControl<T extends FieldValues>({
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
      render={({ formState, fieldState, field}) => (
        <Input
          label={label}
          disabled={formState.isSubmitting || field.disabled}
          {...props}
          {...field}
          isInvalid={
            fieldState.invalid && (formState.isSubmitted || fieldState.isDirty)
          }
          errorMessage={fieldState.error?.message}
          value={field.value}
          onChange={(e) => {
            const value =
              props.type === "number" ? Number(e.target.value) : e.target.value;
            field.onChange(value);
          }}
          onBlur={field.onBlur}
        />
      )}
    ></Controller>
  );
}
