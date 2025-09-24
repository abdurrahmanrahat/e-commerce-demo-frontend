import { Input } from "@/components/ui/input";
import { Controller, useFormContext } from "react-hook-form";

type TMTInputProps = {
  name: string;
  type?: string;
  className?: string;
  placeholder?: string;
  autoComplete?: string;
};

const MYInput = ({
  name,
  type = "text",
  className,
  placeholder,
  autoComplete = "off",
}: TMTInputProps) => {
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
          <Input
            {...field}
            type={type}
            placeholder={placeholder ?? ""}
            autoComplete={type === "password" ? autoComplete : "off"}
            className={`h-11 px-4 rounded-md border ${
              errors[name]
                ? "border-red-500 dark:border-red-400"
                : "border-gray-300 dark:border-gray-600"
            } 
                text-gray-800 dark:text-gray-200 
                placeholder-gray-400 dark:placeholder-gray-500
                focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary
                transition-all duration-200 ease-in-out
                shadow-sm hover:border-gray-400 dark:hover:border-gray-500 bg-background dark:bg-gray-800
                ${className}
              `}
          />
        )}
      />
      {errors[name] && (
        <p className="text-red-500 text-sm mt-1">
          {(errors[name]?.message as string) || "Invalid input"}
        </p>
      )}
    </div>
  );
};

export default MYInput;
