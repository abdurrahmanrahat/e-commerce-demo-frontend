"use client";

import { Textarea } from "@/components/ui/textarea";
import { Controller, useFormContext } from "react-hook-form";

type TMYTextAreaProps = {
  name: string;
  placeholder?: string;
  rows?: number;
};

const MYTextArea = ({ name, placeholder = "", rows = 4 }: TMYTextAreaProps) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <div>
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <Textarea
            {...field}
            rows={rows}
            placeholder={placeholder}
            className={`py-3 px-4 rounded-md border resize-none
              ${
                errors[name]
                  ? "border-red-500 dark:border-red-400"
                  : "border-gray-200 dark:border-gray-700"
              }
              text-gray-800 dark:text-gray-200
              placeholder-gray-400 dark:placeholder-gray-500
              focus:outline-none hover:border-primary focus:border-primary
              transition-all duration-200 ease-in-out
              bg-light-gray dark:bg-deep-dark`}
          />
        )}
      />
      {errors[name] && (
        <p className="text-red-600 text-sm mt-1">
          {(errors[name]?.message as string) || "Invalid input"}
        </p>
      )}
    </div>
  );
};

export default MYTextArea;
